const fs = require('fs');
const ExcelJS = require('exceljs');
const puppeteer = require('puppeteer');
const os = require('os');

// Anthony Icons
const ANT = {
  processing: '🐜 ⏳',
  success: '🐜 ✅',
  error: '🐜 ❌',
  warning: '🐜 ⚠️', 
  info: '🐜 ℹ️',
  launching: '🐜 🚀',
  retrying: '🐜 🔄',
  done: '🐜 🎉',
  skipped: '🐜 ⏭️',
  queueing: '🐜 📥'
};

// Config Block
const CONFIG = {
  inputFile: 'CollegeOfArts.xlsx', // input file
  outputFile: 'results-requestinfo.xlsx', // output file - results
  errorFile: 'errors.xlsx', // error file output - so we know what failed
  skippedFile: 'skipped.xlsx', // skipped file output - so we know what was skipped
  progressFile: 'progress.json', // progress json so we can resume if we crash
  columnMapping: { url: 'URL' }, // column mapping for output file
  searchTerms: [''], // search terms to look for
  enableTermSearch: false, // toggle true/false to enable/disable
  searchLinks: ['https://www.uagc.edu/request-information'], // search links to look for
  enableLinkSearch: true,  // toggle true/false to enable/disable
  saveInterval: 400, //saves progress every 400 urls
  maxRetries: 3, ///number of retries before giving up
  enableETA: true, // toggle for ETA logs
};

// Desktop User Agents
const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5735.110 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:119.0) Gecko/20100101 Firefox/119.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_3_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 12_6_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.3 Safari/605.1.15',
  'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'
];

// ETA
const startTime = Date.now();
function printProgress(count, total, errorCount = 0) {
  const now = new Date();
  const percent = ((count / total) * 100).toFixed(2);
  const elapsedMs = Date.now() - startTime;
  const elapsedMin = (elapsedMs / 60000).toFixed(1);
  const rate = (count / (elapsedMs / 1000)).toFixed(2); // pages/sec
  const remaining = ((total - count) / rate / 60).toFixed(1); // minutes left

  const startTimestamp = new Date(startTime).toISOString().replace('T', ' ').split('.')[0];
  const nowTimestamp = now.toISOString().replace('T', ' ').split('.')[0];

  // System memory usage
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMemPercent = (((totalMem - freeMem) / totalMem) * 100).toFixed(1);

  // System CPU usage (approx)
  const cpus = os.cpus();
  const idle = cpus.reduce((acc, cpu) => acc + cpu.times.idle, 0);
  const totalCpu = cpus.reduce((acc, cpu) => acc + Object.values(cpu.times).reduce((a, b) => a + b, 0), 0);
  const cpuLoad = (100 - (idle / totalCpu) * 100).toFixed(1);

  console.log(`\n== Start:     ${startTimestamp}`);
  console.log(`== Now:       ${nowTimestamp} (running for ${elapsedMin} minutes)`);
  console.log(`== Progress:  ${count} / ${total} (${percent}%), errors: ${errorCount} (${((errorCount / count) * 100 || 0).toFixed(2)}%)`);
  console.log(`== Remaining: ${remaining} minutes (@ ${rate} pages/second)`);
  console.log(`== Sys. load: ${cpuLoad}% CPU / ${usedMemPercent}% memory\n`);
}

// Normalize URL
function normalizeUrl(url) {
  if (!url || typeof url !== 'string') return '';

  const cleaned = url.trim();

  // Block invalid or junk inputs
  if (cleaned.length < 3 || cleaned.includes(' ')) return '';

  // Fix improperly formatted base URLs (e.g. missing www)
  if (cleaned.startsWith('http')) {
    return cleaned.replace(/^https?:\/\/(?!www\.)uagc\.edu/, 'https://www.uagc.edu');
  }

  // Catch improperly prepended domain strings like 'uagc.edu/about'
  if (cleaned.includes('uagc.edu') && !cleaned.startsWith('/')) return '';

  // Default relative path case
  return `https://www.uagc.edu${cleaned.startsWith('/') ? cleaned : '/' + cleaned}`;
}

// Load progress
let processed = new Set();
let results = [];
let errors = [];
let skipped = [];
let count = 0;

if (fs.existsSync(CONFIG.progressFile)) {
  const saved = JSON.parse(fs.readFileSync(CONFIG.progressFile));
  processed = new Set(saved.processed);
  results = saved.results || [];
  errors = saved.errors || [];
  skipped = saved.skipped || [];
  count = saved.count || 0;
  console.log(`${ANT.success} Resumed progress: ${processed.size} URLs processed`);
}

// Load URLs from Excel
async function loadUrls() {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(CONFIG.inputFile);
  const sheet = wb.worksheets[0];
  const urls = [];

  sheet.eachRow((row, i) => {
    if (i === 1) return;
    const raw = row.getCell(1).value;
    const url = normalizeUrl(raw);

    if (!url) {
      console.warn(`${ANT.warning} Skipping invalid input on row ${i}:`, raw);
      skipped.push({ row: i, input: raw });
      return;
    }

    if (!processed.has(url)) urls.push(url);
  });

  return urls;
}

// Retry wrapper
async function processWithRetry(browser, url, retries = 0) {
  try {
    return await processPage(browser, url);
  } catch (err) {
    if (retries < CONFIG.maxRetries) {
      console.log(`${ANT.retrying} ${url} (${retries + 1}/${CONFIG.maxRetries})`);
      return processWithRetry(browser, url, retries + 1);
    }
    throw err;
  }
}

// Page processing
async function processPage(browser, url) {
  const page = await browser.newPage();
  const userAgent = USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
  await page.setUserAgent(userAgent);
  await page.setRequestInterception(true);
  page.on('request', req => {
    if (['image', 'font', 'media', 'stylesheet'].includes(req.resourceType())) {
      req.abort().catch(() => {});
    } else {
      req.continue().catch(() => {});
    }
  });

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });//timeout after 6s//

    const content = await page.content();
    const text = await page.evaluate(() => document.body.innerText.toLowerCase());
    const hrefs = await page.$$eval('a[href]', anchors =>
      anchors.map(a => a.href.toLowerCase())
    );

    const result = { [CONFIG.columnMapping.url]: url };

    if (CONFIG.enableTermSearch) {
      CONFIG.searchTerms.forEach((term, i) => {
        const found = text.includes(term.toLowerCase());
        result[`Term ${i + 1} (${term})`] = found ? 'found' : 'not found';//output results//
      });
    }

    if (CONFIG.enableLinkSearch) {
      CONFIG.searchLinks.forEach((link, i) => {
        const found = hrefs.some(href => href.includes(link.toLowerCase()));
        result[`Link ${i + 1} (${link})`] = found ? 'found' : 'not found';
      });
    }

    return result;
  } finally {
    await page.close(); // clean close
  }
}

// Main runner
(async () => {
  console.log(`${ANT.launching} Starting scraper...`);
  const browser = await puppeteer.launch({ headless: true });
  const urls = await loadUrls();
  const total = urls.length + processed.size;
  console.log(`${ANT.queueing} Queueing ${urls.length} URLs (${processed.size} already done)`);

  for (const url of urls) {
    const current = count + 1;
    console.log(`${ANT.processing} Processing: ${current} / ${total} → ${url}`);
  
    try {
      const row = await processWithRetry(browser, url);
      results.push(row);
    } catch (err) {
      console.error(`${ANT.error} Error: ${url}\n   ↳ ${err.message}`);
      errors.push({ url, error: err.message });
    }

    processed.add(url);
    count++;

    // 🔁 Periodic progress save
    if (count % CONFIG.saveInterval === 0) {
      fs.writeFileSync(CONFIG.progressFile, JSON.stringify({
        processed: [...processed],
        results,
        errors,
        skipped,
        count
      }, null, 2));
      console.log(`${ANT.info} Saved progress at ${count} URLs`);
    }

    if (CONFIG.enableETA) printProgress(count, total, errors.length);

  }

  await browser.close();

  // Save progress
  fs.writeFileSync(CONFIG.progressFile, JSON.stringify({
    processed: [...processed],
    results,
    errors,
    skipped,
    count
  }, null, 2));


  // Write output
  const wb = new ExcelJS.Workbook();
  const sheet = wb.addWorksheet('Results');
  sheet.columns = Object.keys(results[0] || {}).map(k => ({ header: k, key: k }));
  sheet.addRows(results);
  await wb.xlsx.writeFile(CONFIG.outputFile);

  // Write errors
  if (errors.length) {
    const ew = new ExcelJS.Workbook();
    const es = ew.addWorksheet('Errors');
    es.columns = [{ header: 'URL', key: 'url' }, { header: 'Error', key: 'error' }];
    es.addRows(errors);
    await ew.xlsx.writeFile(CONFIG.errorFile);
  }

  // Write skipped rows
  if (skipped.length) {
    const swb = new ExcelJS.Workbook();
    const ss = swb.addWorksheet('Skipped');
    ss.columns = [{ header: 'Row #', key: 'row' }, { header: 'Original Input', key: 'input' }];
    ss.addRows(skipped);
    await swb.xlsx.writeFile(CONFIG.skippedFile);
    console.log(`📄 Skipped rows saved to ${CONFIG.skippedFile}`);
  }

  console.log('\n✅ Done!');
  console.log(`   • Processed: ${count}`);
  console.log(`   • Successes: ${results.length}`);
  console.log(`   • Errors: ${errors.length}`);
  console.log(`   • Skipped: ${skipped.length}`);
})();
