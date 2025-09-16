// Dashboard Data and Configuration
let dashboardData = null;
let uploadedFiles = [];
const MAX_FILES = 5;
const MAX_TOTAL_SIZE = 50 * 1024 * 1024; // 50MB in bytes

// Initialize the application
document.addEventListener('DOMContentLoaded', function () {
    loadDashboardData();
    initializeEventListeners();
    initializeFileUpload();
    initializeKeywordCalculator();
    initializeSeoTool();
});

// Load dashboard data from JSON file
async function loadDashboardData() {
    try {
        const response = await fetch('dxdashboard.json');
        dashboardData = await response.json();
        renderKanbanBoard();
        renderUsefulTools();
    } catch (error) {
        console.error('Error loading dashboard data:', error);
        // Fallback data if JSON file is not available
        dashboardData = getFallbackData();
        renderKanbanBoard();
        renderUsefulTools();
    }
}

// Fallback data in case JSON file is not available
function getFallbackData() {
    return {
        dashboard: {
            title: "DX One-Stop",
            theme: {
                primaryColor: "#5c647c",
                accentColor: "#ab0520",
                backgroundColor: "#f8f9fa"
            },
            kanbanBoard: {
                title: "Team tasks",
                columns: [
                    {
                        id: "working-on-it",
                        title: "Working on it",
                        count: 2,
                        color: "#ff9500",
                        tasks: [
                            {
                                id: "task-1",
                                title: "Monitor budget",
                                assignee: {
                                    name: "John Smith",
                                    avatar: "male-short-dark-hair"
                                }
                            },
                            {
                                id: "task-2",
                                title: "Update contractor agreement",
                                assignee: {
                                    name: "Sarah Johnson",
                                    avatar: "female-long-brown-hair"
                                }
                            }
                        ]
                    },
                    {
                        id: "waiting-for-review",
                        title: "Waiting for review",
                        count: 2,
                        color: "#007AFF",
                        tasks: [
                            {
                                id: "task-3",
                                title: "Facebook integration",
                                assignee: {
                                    name: "Maria Garcia",
                                    avatar: "female-curly-dark-hair"
                                }
                            },
                            {
                                id: "task-4",
                                title: "Communication plan",
                                assignee: {
                                    name: "Sarah Johnson",
                                    avatar: "female-long-brown-hair"
                                }
                            }
                        ]
                    },
                    {
                        id: "stuck",
                        title: "Stuck",
                        count: 1,
                        color: "#ab0520",
                        tasks: [
                            {
                                id: "task-5",
                                title: "Identify key resources",
                                assignee: {
                                    name: "Mike Wilson",
                                    avatar: "male-short-brown-hair-beard"
                                }
                            }
                        ]
                    },
                    {
                        id: "done",
                        title: "Done",
                        count: 1,
                        color: "#34C759",
                        tasks: [
                            {
                                id: "task-6",
                                title: "Finalize kickoff materials",
                                assignee: {
                                    name: "David Brown",
                                    avatar: "male-bald-dark-skin"
                                }
                            }
                        ]
                    }
                ]
            }
        }
    };
}

// Render the Kanban board
function renderKanbanBoard() {
    const kanbanBoard = document.getElementById('kanbanBoard');
    if (!kanbanBoard || !dashboardData) return;

    const columns = dashboardData.dashboard.kanbanBoard.columns;

    kanbanBoard.innerHTML = columns.map(column => `
        <div class="kanban-column">
            <div class="column-header">
                <span class="column-title">${column.title}</span>
            </div>
            <div class="column-tasks">
                ${column.tasks.map(task => `
                    <div class="task-card" data-task-id="${task.id}">
                        <div class="task-title">${task.title}</div>
                        <div class="task-assignee">
                            <div class="assignee-avatar">${getInitials(task.assignee.name)}</div>
                            <span class="assignee-name">${task.assignee.name}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// Render the Useful Tools section
function renderUsefulTools() {
    const toolsGrid = document.getElementById('toolsGrid');
    if (!toolsGrid) return;

    const tools = [
        {
            id: 'drupal-leads',
            title: 'Send leads from Drupal links',
            subtitle: 'Webform Integration',
            description: 'Submit leads directly to UAGC webform system',
            icon: 'fas fa-external-link-alt',
            url: 'https://www.uagc.edu/admin/structure/webform',
            action: 'openUrl'
        },
        {
            id: 'browserstack',
            title: 'Browserstack',
            subtitle: 'Cross Browser Testing',
            description: 'Test your applications across different browsers and devices',
            icon: 'fas fa-globe',
            url: 'https://live.browserstack.com/dashboard',
            action: 'openUrl'
        },
        {
            id: 'antriver-scraper',
            title: 'Scrape website using "ANTRIVER"',
            subtitle: 'Web Scraping Tool',
            description: 'Advanced web scraping tool for data extraction and analysis',
            icon: 'fas fa-spider',
            url: '#',
            action: 'openScraper'
        },
        {
            id: 'sprint-planning',
            title: 'Weekly Sprint Planning',
            subtitle: 'Team Meeting',
            description: 'Join the weekly sprint planning session on Zoom',
            icon: 'fas fa-video',
            url: 'https://uagc-edu.zoom.us/j/83653867582?pwd=U3a2FewykRfVLszmeJvebdq0acb7AT.1&from=addon',
            action: 'openUrl'
        },
        {
            id: 'dx-hangout',
            title: 'DX Team Hangout',
            subtitle: 'Microsoft Teams',
            description: 'Join the DX team hangout session',
            icon: 'fas fa-users',
            url: 'https://teams.microsoft.com/l/meetup-join/19%3ameeting_MWJiYWMwNmUtODQ1Ny00M2YwLWIxMTgtNDAyYWI2MDNmZmQz%40thread.v2/0?context=%7b%22Tid%22%3a%22b460013b-012d-43a9-a3e9-da74877079e9%22%2c%22Oid%22%3a%221e86d62f-a2d3-4c65-aa5e-fb768e2eb65a%22%7d',
            action: 'openUrl'
        }
    ];

    toolsGrid.innerHTML = tools.map(tool => `
        <div class="tool-card" onclick="handleToolClick('${tool.id}', '${tool.action}', '${tool.url}')">
            <div class="tool-card-header">
                <span class="tool-card-author">By DX Team</span>
                <span class="tool-card-date">${getCurrentDate()}</span>
            </div>
            <div class="tool-card-image">
                <i class="tool-card-icon ${tool.icon}"></i>
            </div>
            <div class="tool-card-content">
                <div class="tool-title">${tool.title}</div>
                <div class="tool-subtitle">${tool.subtitle}</div>
                <div class="tool-description">${tool.description}</div>
                <div class="tool-card-footer">
                    <a href="#" class="tool-read-more" onclick="event.stopPropagation(); handleToolClick('${tool.id}', '${tool.action}', '${tool.url}')">Read More</a>
                    <div class="tool-engagement">
                        <div class="tool-engagement-item">
                            <i class="fas fa-thumbs-up tool-engagement-icon"></i>
                            <span>${getRandomLikes()} people like</span>
                        </div>
                        <div class="tool-engagement-item">
                            <i class="fas fa-comment tool-engagement-icon"></i>
                            <span>${getRandomComments()}.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Handle tool clicks
function handleToolClick(toolId, action, url) {
    switch (action) {
        case 'openUrl':
            window.open(url, '_blank');
            break;
        case 'openScraper':
            openScraperModal();
            break;
        default:
            console.log('Tool clicked:', toolId);
    }
}

// Open scraper modal
function openScraperModal() {
    const modal = document.getElementById('toolModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    modalTitle.textContent = 'ANTRIVER Web Scraper';
    modalBody.innerHTML = `
        <div style="margin-bottom: 20px;">
            <p>The ANTRIVER scraper is a powerful tool for web scraping and data extraction. It can process Excel files with URLs and search for specific terms or links.</p>
        </div>
        <div style="margin-bottom: 20px;">
            <h4>Features:</h4>
            <ul style="margin-left: 20px; margin-top: 10px;">
                <li>Process Excel files with URL lists</li>
                <li>Search for specific terms on web pages</li>
                <li>Find specific links on pages</li>
                <li>Generate detailed reports</li>
                <li>Error handling and retry logic</li>
                <li>Progress tracking and ETA calculations</li>
            </ul>
        </div>
        <div style="margin-bottom: 20px;">
            <h4>How to use:</h4>
            <ol style="margin-left: 20px; margin-top: 10px;">
                <li>Prepare an Excel file with URLs in the first column</li>
                <li>Configure the scraper settings in the script</li>
                <li>Run the scraper using Node.js</li>
                <li>Review the generated results and error reports</li>
            </ol>
        </div>
        <div style="text-align: center; margin-top: 30px;">
            <button onclick="downloadScraperCode()" style="background: #5c647c; color: white; border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer; font-size: 16px;">
                <i class="fas fa-download"></i> Download Scraper Code
            </button>
        </div>
    `;

    modal.style.display = 'block';
}

// Download scraper code
function downloadScraperCode() {
    // This would typically fetch the scraper.js content and create a download
    // For now, we'll create a simple text file with instructions
    const scraperInfo = `ANTRIVER Web Scraper
====================

This is a Node.js application for web scraping and data extraction.

Requirements:
- Node.js
- npm packages: exceljs, puppeteer

Installation:
1. npm install exceljs puppeteer
2. Place your Excel file with URLs in the same directory
3. Update the CONFIG object in scraper.js
4. Run: node scraper.js

Features:
- Excel file processing
- URL validation and normalization
- Web page content analysis
- Search term detection
- Link detection
- Progress tracking
- Error handling and retry logic
- ETA calculations
- Memory and CPU monitoring

For the full code, please refer to the scraper.js file in your project directory.`;

    const blob = new Blob([scraperInfo], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'antriver-scraper-info.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Initialize event listeners
function initializeEventListeners() {
    // Menu button
    const menuBtn = document.getElementById('menuBtn');
    if (menuBtn) {
        menuBtn.addEventListener('click', function () {
            alert('Menu functionality would be implemented here');
        });
    }

    // Add tool button
    const addToolBtn = document.getElementById('addToolBtn');
    if (addToolBtn) {
        addToolBtn.addEventListener('click', function () {
            alert('Add new tool functionality would be implemented here');
        });
    }

    // Modal close
    const closeModal = document.getElementById('closeModal');
    const modal = document.getElementById('toolModal');
    if (closeModal && modal) {
        closeModal.addEventListener('click', function () {
            modal.style.display = 'none';
        });
    }

    // Close modal when clicking outside
    if (modal) {
        window.addEventListener('click', function (event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
}

// Initialize file upload functionality
function initializeFileUpload() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const fileList = document.getElementById('fileList');

    if (!uploadArea || !fileInput || !fileList) return;

    // Click to upload
    uploadArea.addEventListener('click', () => fileInput.click());

    // File input change
    fileInput.addEventListener('change', handleFileSelect);

    // Drag and drop
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    uploadArea.addEventListener('drop', handleDrop);
}

// Handle file selection
function handleFileSelect(event) {
    const files = Array.from(event.target.files);
    processFiles(files);
}

// Handle drag over
function handleDragOver(event) {
    event.preventDefault();
    event.currentTarget.classList.add('dragover');
}

// Handle drag leave
function handleDragLeave(event) {
    event.currentTarget.classList.remove('dragover');
}

// Handle drop
function handleDrop(event) {
    event.preventDefault();
    event.currentTarget.classList.remove('dragover');
    const files = Array.from(event.dataTransfer.files);
    processFiles(files);
}

// Process uploaded files
function processFiles(files) {
    // Check file count limit
    if (uploadedFiles.length + files.length > MAX_FILES) {
        alert(`Maximum ${MAX_FILES} files allowed. You have ${uploadedFiles.length} files and trying to add ${files.length} more.`);
        return;
    }

    // Check file size limit
    const totalSize = uploadedFiles.reduce((sum, file) => sum + file.size, 0);
    const newFilesSize = files.reduce((sum, file) => sum + file.size, 0);

    if (totalSize + newFilesSize > MAX_TOTAL_SIZE) {
        alert(`Total file size cannot exceed 50MB. Current size: ${formatFileSize(totalSize)}, trying to add: ${formatFileSize(newFilesSize)}`);
        return;
    }

    // Add files
    files.forEach(file => {
        if (!uploadedFiles.some(f => f.name === file.name && f.size === file.size)) {
            uploadedFiles.push(file);
        }
    });

    updateFileList();
    updateUploadProgress();
}

// Update file list display
function updateFileList() {
    const fileList = document.getElementById('fileList');
    if (!fileList) return;

    if (uploadedFiles.length === 0) {
        fileList.innerHTML = '';
        return;
    }

    fileList.innerHTML = uploadedFiles.map((file, index) => `
        <div class="file-item">
            <div class="file-info">
                <i class="file-icon ${getFileIcon(file.type)}"></i>
                <div class="file-details">
                    <div class="file-name">${file.name}</div>
                    <div class="file-size">${formatFileSize(file.size)}</div>
                </div>
            </div>
            <button class="file-remove" onclick="removeFile(${index})">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join('');
}

// Remove file
function removeFile(index) {
    uploadedFiles.splice(index, 1);
    updateFileList();
    updateUploadProgress();
}

// Get file icon based on type
function getFileIcon(type) {
    if (type.startsWith('image/')) return 'fas fa-image';
    if (type.startsWith('video/')) return 'fas fa-video';
    if (type.includes('pdf')) return 'fas fa-file-pdf';
    if (type.includes('word') || type.includes('document')) return 'fas fa-file-word';
    if (type.includes('excel') || type.includes('spreadsheet')) return 'fas fa-file-excel';
    return 'fas fa-file';
}

// Format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Update upload progress
function updateUploadProgress() {
    const totalSize = uploadedFiles.reduce((sum, file) => sum + file.size, 0);
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const uploadProgress = document.getElementById('uploadProgress');

    if (!progressFill || !progressText || !uploadProgress) return;

    const percentage = (totalSize / MAX_TOTAL_SIZE) * 100;
    progressFill.style.width = `${Math.min(percentage, 100)}%`;
    progressText.textContent = `${formatFileSize(totalSize)} / ${formatFileSize(MAX_TOTAL_SIZE)}`;

    if (uploadedFiles.length > 0) {
        uploadProgress.style.display = 'block';
    } else {
        uploadProgress.style.display = 'none';
    }
}

// Get initials from name
function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

// Get current date in the format shown in the image
function getCurrentDate() {
    const now = new Date();
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
}

// Generate random likes count
function getRandomLikes() {
    return Math.floor(Math.random() * 20) + 5; // Random between 5-24
}

// Generate random comments count
function getRandomComments() {
    return Math.floor(Math.random() * 15) + 2; // Random between 2-16
}

// Add task function (placeholder)
function addTask(columnId) {
    const taskTitle = prompt('Enter task title:');
    if (taskTitle) {
        // This would typically add the task to the appropriate column
        console.log(`Adding task "${taskTitle}" to column ${columnId}`);
        alert(`Task "${taskTitle}" would be added to the ${columnId} column`);
    }
}

// Utility function to show notifications
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 6px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;

    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.backgroundColor = '#34C759';
            break;
        case 'error':
            notification.style.backgroundColor = '#FF3B30';
            break;
        case 'warning':
            notification.style.backgroundColor = '#FF9500';
            break;
        default:
            notification.style.backgroundColor = '#5c647c';
    }

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(notificationStyles);

// Keyword Value Calculator Functionality
const keywordDatabase = {
    // High-value keywords for adult learners (25+)
    highValue: {
        'career advancement': { adultAppeal: 95, enrollment: 90, uagcAlignment: 85, alternatives: ['professional development', 'career growth', 'advancement opportunities'] },
        'flexible learning': { adultAppeal: 92, enrollment: 88, uagcAlignment: 90, alternatives: ['online education', 'work-life balance', 'flexible schedule'] },
        'adult education': { adultAppeal: 90, enrollment: 85, uagcAlignment: 80, alternatives: ['continuing education', 'lifelong learning', 'mature student'] },
        'online degree': { adultAppeal: 88, enrollment: 92, uagcAlignment: 95, alternatives: ['distance learning', 'virtual education', 'remote degree'] },
        'professional development': { adultAppeal: 87, enrollment: 82, uagcAlignment: 88, alternatives: ['skill building', 'career enhancement', 'workplace training'] },
        'work-life balance': { adultAppeal: 85, enrollment: 78, uagcAlignment: 82, alternatives: ['flexible schedule', 'family-friendly', 'time management'] },
        'career change': { adultAppeal: 83, enrollment: 85, uagcAlignment: 80, alternatives: ['new career', 'transition', 'second career'] },
        'accredited program': { adultAppeal: 80, enrollment: 88, uagcAlignment: 92, alternatives: ['recognized degree', 'certified program', 'validated education'] },
        'evening classes': { adultAppeal: 75, enrollment: 70, uagcAlignment: 75, alternatives: ['part-time study', 'after-hours learning', 'weekend courses'] },
        'transfer credits': { adultAppeal: 78, enrollment: 82, uagcAlignment: 85, alternatives: ['credit transfer', 'prior learning', 'existing credits'] }
    },

    // Medium-value keywords
    mediumValue: {
        'university': { adultAppeal: 70, enrollment: 75, uagcAlignment: 90, alternatives: ['college', 'institution', 'higher education'] },
        'degree program': { adultAppeal: 72, enrollment: 80, uagcAlignment: 88, alternatives: ['academic program', 'course of study', 'educational track'] },
        'student support': { adultAppeal: 65, enrollment: 70, uagcAlignment: 85, alternatives: ['academic support', 'student services', 'learning assistance'] },
        'affordable education': { adultAppeal: 68, enrollment: 75, uagcAlignment: 80, alternatives: ['cost-effective', 'budget-friendly', 'value education'] },
        'experienced faculty': { adultAppeal: 60, enrollment: 65, uagcAlignment: 85, alternatives: ['qualified instructors', 'expert teachers', 'professional educators'] }
    },

    // Low-value keywords (less effective for adult learners)
    lowValue: {
        'college life': { adultAppeal: 30, enrollment: 25, uagcAlignment: 40, alternatives: ['campus experience', 'student activities', 'university culture'] },
        'dormitory': { adultAppeal: 20, enrollment: 15, uagcAlignment: 30, alternatives: ['housing', 'accommodation', 'residence'] },
        'fraternity': { adultAppeal: 15, enrollment: 10, uagcAlignment: 20, alternatives: ['student organizations', 'clubs', 'social groups'] },
        'freshman': { adultAppeal: 25, enrollment: 20, uagcAlignment: 35, alternatives: ['new student', 'beginner', 'first-year'] },
        'campus party': { adultAppeal: 10, enrollment: 5, uagcAlignment: 15, alternatives: ['social events', 'networking', 'community activities'] }
    }
};

// Initialize keyword calculator
function initializeKeywordCalculator() {
    const analyzeBtn = document.getElementById('analyzeBtn');
    const keywordInput = document.getElementById('keywordInput');

    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', analyzeKeyword);
    }

    if (keywordInput) {
        keywordInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                analyzeKeyword();
            }
        });
    }
}

// Analyze keyword function
function analyzeKeyword() {
    const keywordInput = document.getElementById('keywordInput');
    const keyword = keywordInput.value.trim().toLowerCase();

    if (!keyword) {
        showNotification('Please enter a keyword to analyze', 'warning');
        return;
    }

    const analysis = analyzeKeywordValue(keyword);
    displayResults(keyword, analysis);
}

// Analyze keyword value
function analyzeKeywordValue(keyword) {
    // Check in high-value keywords
    for (const [key, data] of Object.entries(keywordDatabase.highValue)) {
        if (keyword.includes(key) || key.includes(keyword)) {
            return { ...data, category: 'high', keyword: key };
        }
    }

    // Check in medium-value keywords
    for (const [key, data] of Object.entries(keywordDatabase.mediumValue)) {
        if (keyword.includes(key) || key.includes(keyword)) {
            return { ...data, category: 'medium', keyword: key };
        }
    }

    // Check in low-value keywords
    for (const [key, data] of Object.entries(keywordDatabase.lowValue)) {
        if (keyword.includes(key) || key.includes(keyword)) {
            return { ...data, category: 'low', keyword: key };
        }
    }

    // If no exact match, analyze based on word patterns
    return analyzeByPatterns(keyword);
}

// Analyze by word patterns
function analyzeByPatterns(keyword) {
    let adultAppeal = 50;
    let enrollment = 50;
    let uagcAlignment = 50;
    const alternatives = [];

    // Adult-focused terms
    const adultTerms = ['adult', 'mature', 'professional', 'career', 'work', 'flexible', 'online', 'evening', 'part-time'];
    const enrollmentTerms = ['degree', 'program', 'education', 'learning', 'study', 'course', 'accredited'];
    const uagcTerms = ['university', 'college', 'higher education', 'academic', 'institution'];

    // Check for adult-focused terms
    adultTerms.forEach(term => {
        if (keyword.includes(term)) {
            adultAppeal += 15;
            enrollment += 10;
        }
    });

    // Check for enrollment-focused terms
    enrollmentTerms.forEach(term => {
        if (keyword.includes(term)) {
            enrollment += 15;
            uagcAlignment += 10;
        }
    });

    // Check for UAGC-aligned terms
    uagcTerms.forEach(term => {
        if (keyword.includes(term)) {
            uagcAlignment += 15;
        }
    });

    // Generate alternatives based on patterns
    if (keyword.includes('career')) {
        alternatives.push('professional development', 'work advancement', 'job growth');
    }
    if (keyword.includes('online')) {
        alternatives.push('distance learning', 'virtual education', 'remote study');
    }
    if (keyword.includes('flexible')) {
        alternatives.push('convenient', 'adaptable', 'accommodating');
    }

    // Cap scores at 100
    adultAppeal = Math.min(adultAppeal, 100);
    enrollment = Math.min(enrollment, 100);
    uagcAlignment = Math.min(uagcAlignment, 100);

    return {
        adultAppeal,
        enrollment,
        uagcAlignment,
        category: 'analyzed',
        keyword: keyword,
        alternatives: alternatives.length > 0 ? alternatives : ['career advancement', 'flexible learning', 'adult education']
    };
}

// Display analysis results
function displayResults(keyword, analysis) {
    const resultsContainer = document.getElementById('calculatorResults');
    const keywordDisplay = document.getElementById('keywordDisplay');
    const adultAppealScore = document.getElementById('adultAppealScore');
    const enrollmentScore = document.getElementById('enrollmentScore');
    const uagcScore = document.getElementById('uagcScore');
    const overallScore = document.getElementById('overallScore');
    const adultAppealDesc = document.getElementById('adultAppealDesc');
    const enrollmentDesc = document.getElementById('enrollmentDesc');
    const uagcDesc = document.getElementById('uagcDesc');
    const overallDesc = document.getElementById('overallDesc');
    const recommendationsContent = document.getElementById('recommendationsContent');
    const alternativesContent = document.getElementById('alternativesContent');

    // Show results container
    resultsContainer.style.display = 'block';

    // Update keyword display
    keywordDisplay.textContent = keyword;

    // Calculate overall score
    const overall = Math.round((analysis.adultAppeal + analysis.enrollment + analysis.uagcAlignment) / 3);

    // Animate scores
    animateScore(adultAppealScore, analysis.adultAppeal);
    animateScore(enrollmentScore, analysis.enrollment);
    animateScore(uagcScore, analysis.uagcAlignment);
    animateScore(overallScore, overall);

    // Update descriptions
    adultAppealDesc.textContent = getScoreDescription(analysis.adultAppeal, 'adult');
    enrollmentDesc.textContent = getScoreDescription(analysis.enrollment, 'enrollment');
    uagcDesc.textContent = getScoreDescription(analysis.uagcAlignment, 'uagc');
    overallDesc.textContent = getScoreDescription(overall, 'overall');

    // Generate recommendations
    recommendationsContent.innerHTML = generateRecommendations(analysis, overall);

    // Display alternatives
    alternativesContent.innerHTML = analysis.alternatives.map(alt =>
        `<span class="alternative-keyword" onclick="selectAlternative('${alt}')">${alt}</span>`
    ).join('');

    // Scroll to results
    resultsContainer.scrollIntoView({ behavior: 'smooth' });
}

// Animate score counting
function animateScore(element, targetScore) {
    let currentScore = 0;
    const increment = targetScore / 30;
    const timer = setInterval(() => {
        currentScore += increment;
        if (currentScore >= targetScore) {
            currentScore = targetScore;
            clearInterval(timer);
        }
        element.textContent = Math.round(currentScore);
    }, 50);
}

// Get score description
function getScoreDescription(score, type) {
    if (score >= 80) return `Excellent ${type} potential`;
    if (score >= 60) return `Good ${type} potential`;
    if (score >= 40) return `Moderate ${type} potential`;
    return `Low ${type} potential`;
}

// Generate recommendations
function generateRecommendations(analysis, overall) {
    const recommendations = [];

    if (analysis.adultAppeal < 70) {
        recommendations.push('Consider adding adult-focused terms like "career advancement" or "flexible learning"');
    }

    if (analysis.enrollment < 70) {
        recommendations.push('Include enrollment-focused keywords like "degree program" or "accredited education"');
    }

    if (analysis.uagcAlignment < 70) {
        recommendations.push('Add university-specific terms to better align with UAGC branding');
    }

    if (overall < 60) {
        recommendations.push('This keyword may not be optimal for attracting adult learners to UAGC');
    } else if (overall >= 80) {
        recommendations.push('Excellent keyword choice for adult learner content!');
    }

    if (analysis.category === 'high') {
        recommendations.push('This is a high-value keyword from our database - great choice!');
    }

    return recommendations.length > 0 ?
        recommendations.map(rec => `<p>• ${rec}</p>`).join('') :
        '<p>• Consider testing this keyword in your content to see how it performs</p>';
}

// Select alternative keyword
function selectAlternative(alternative) {
    const keywordInput = document.getElementById('keywordInput');
    keywordInput.value = alternative;
    analyzeKeyword();
}

// Add CSS for score animations
const scoreAnimationStyles = document.createElement('style');
scoreAnimationStyles.textContent = `
    .score-value {
        transition: all 0.3s ease;
    }
    
    .alternative-keyword {
        cursor: pointer;
    }
`;
document.head.appendChild(scoreAnimationStyles);

// SEO Score Tool Functionality
function initializeSeoTool() {
    const analyzeSeoBtn = document.getElementById('analyzeSeoBtn');
    const urlInput = document.getElementById('urlInput');

    if (analyzeSeoBtn) {
        analyzeSeoBtn.addEventListener('click', analyzeSeo);
    }

    if (urlInput) {
        urlInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                analyzeSeo();
            }
        });
    }
}

// Analyze SEO function
async function analyzeSeo() {
    const urlInput = document.getElementById('urlInput');
    const url = urlInput.value.trim();

    if (!url) {
        showNotification('Please enter a URL to analyze', 'warning');
        return;
    }

    if (!isValidUrl(url)) {
        showNotification('Please enter a valid URL (e.g., https://example.com)', 'error');
        return;
    }

    // Show loading state
    const analyzeBtn = document.getElementById('analyzeSeoBtn');
    const originalText = analyzeBtn.innerHTML;
    analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
    analyzeBtn.disabled = true;

    try {
        // Simulate analysis (in a real implementation, this would make API calls)
        const seoAnalysis = await performSeoAnalysis(url);
        displaySeoResults(url, seoAnalysis);
    } catch (error) {
        showNotification('Error analyzing URL. Please try again.', 'error');
        console.error('SEO Analysis Error:', error);
    } finally {
        // Reset button
        analyzeBtn.innerHTML = originalText;
        analyzeBtn.disabled = false;
    }
}

// Validate URL
function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

// Perform SEO Analysis (simulated)
async function performSeoAnalysis(url) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate SEO analysis results
    const analysis = {
        technical: Math.floor(Math.random() * 40) + 60, // 60-100
        content: Math.floor(Math.random() * 40) + 60,   // 60-100
        performance: Math.floor(Math.random() * 40) + 60, // 60-100
        mobile: Math.floor(Math.random() * 40) + 60,     // 60-100
        issues: generateSeoIssues(),
        contentAnalysis: generateContentAnalysis(),
        performanceMetrics: generatePerformanceMetrics(),
        mobileOptimization: generateMobileOptimization(),
        recommendations: generateSeoRecommendations()
    };

    analysis.overall = Math.round((analysis.technical + analysis.content + analysis.performance + analysis.mobile) / 4);

    return analysis;
}

// Generate SEO Issues
function generateSeoIssues() {
    const issues = [
        { type: 'warning', icon: '⚠️', text: 'Missing meta description' },
        { type: 'info', icon: 'ℹ️', text: 'Consider adding structured data markup' },
        { type: 'warning', icon: '⚠️', text: 'Some images lack alt text' },
        { type: 'critical', icon: '🚨', text: 'No SSL certificate detected' },
        { type: 'info', icon: 'ℹ️', text: 'Consider optimizing page loading speed' }
    ];

    return issues.slice(0, Math.floor(Math.random() * 3) + 2); // 2-4 issues
}

// Generate Content Analysis
function generateContentAnalysis() {
    const analyses = [
        'Title tag is optimized and within recommended length',
        'Content has good keyword density and relevance',
        'Headings are properly structured (H1, H2, H3)',
        'Content length is adequate for SEO',
        'Internal linking structure is well organized',
        'Content appears to be original and valuable'
    ];

    return analyses.slice(0, Math.floor(Math.random() * 3) + 3); // 3-5 items
}

// Generate Performance Metrics
function generatePerformanceMetrics() {
    const metrics = [
        'Page load time: ' + (Math.random() * 2 + 1).toFixed(1) + ' seconds',
        'First Contentful Paint: ' + (Math.random() * 1.5 + 0.5).toFixed(1) + ' seconds',
        'Largest Contentful Paint: ' + (Math.random() * 2.5 + 1).toFixed(1) + ' seconds',
        'Cumulative Layout Shift: ' + (Math.random() * 0.1).toFixed(3),
        'Time to Interactive: ' + (Math.random() * 3 + 2).toFixed(1) + ' seconds'
    ];

    return metrics.slice(0, Math.floor(Math.random() * 2) + 3); // 3-4 metrics
}

// Generate Mobile Optimization
function generateMobileOptimization() {
    const optimizations = [
        'Responsive design is properly implemented',
        'Touch targets are appropriately sized',
        'Text is readable without zooming',
        'Mobile page speed is optimized',
        'Viewport meta tag is correctly configured',
        'Mobile-friendly navigation is present'
    ];

    return optimizations.slice(0, Math.floor(Math.random() * 2) + 4); // 4-5 items
}

// Generate SEO Recommendations
function generateSeoRecommendations() {
    const recommendations = [
        'Optimize images by compressing them and using modern formats like WebP',
        'Implement lazy loading for images and videos',
        'Add more internal links to improve site structure',
        'Create an XML sitemap and submit it to Google Search Console',
        'Improve page loading speed by minifying CSS and JavaScript',
        'Add more relevant keywords to your content naturally',
        'Implement breadcrumb navigation for better user experience',
        'Consider adding FAQ sections to target long-tail keywords'
    ];

    return recommendations.slice(0, Math.floor(Math.random() * 3) + 4); // 4-6 recommendations
}

// Display SEO Results
function displaySeoResults(url, analysis) {
    const resultsContainer = document.getElementById('seoResults');
    const urlDisplay = document.getElementById('urlDisplay');
    const overallSeoScore = document.getElementById('overallSeoScore');
    const technicalScore = document.getElementById('technicalScore');
    const contentScore = document.getElementById('contentScore');
    const performanceScore = document.getElementById('performanceScore');
    const mobileScore = document.getElementById('mobileScore');
    const technicalValue = document.getElementById('technicalValue');
    const contentValue = document.getElementById('contentValue');
    const performanceValue = document.getElementById('performanceValue');
    const mobileValue = document.getElementById('mobileValue');
    const technicalIssues = document.getElementById('technicalIssues');
    const contentAnalysis = document.getElementById('contentAnalysis');
    const performanceMetrics = document.getElementById('performanceMetrics');
    const mobileOptimization = document.getElementById('mobileOptimization');
    const seoRecommendations = document.getElementById('seoRecommendations');

    // Show results container
    resultsContainer.style.display = 'block';

    // Update URL display
    urlDisplay.textContent = url;

    // Animate overall score
    animateSeoScore(overallSeoScore, analysis.overall);

    // Animate breakdown scores
    setTimeout(() => {
        animateBreakdownScore(technicalScore, technicalValue, analysis.technical);
        animateBreakdownScore(contentScore, contentValue, analysis.content);
        animateBreakdownScore(performanceScore, performanceValue, analysis.performance);
        animateBreakdownScore(mobileScore, mobileValue, analysis.mobile);
    }, 500);

    // Display detailed analysis
    technicalIssues.innerHTML = analysis.issues.map(issue =>
        `<div class="seo-issue ${issue.type}">
            <span class="seo-issue-icon">${issue.icon}</span>
            <span class="seo-issue-text">${issue.text}</span>
        </div>`
    ).join('');

    contentAnalysis.innerHTML = analysis.contentAnalysis.map(item =>
        `<p>• ${item}</p>`
    ).join('');

    performanceMetrics.innerHTML = analysis.performanceMetrics.map(metric =>
        `<p>• ${metric}</p>`
    ).join('');

    mobileOptimization.innerHTML = analysis.mobileOptimization.map(item =>
        `<p>• ${item}</p>`
    ).join('');

    seoRecommendations.innerHTML = analysis.recommendations.map(rec =>
        `<p>• ${rec}</p>`
    ).join('');

    // Scroll to results
    resultsContainer.scrollIntoView({ behavior: 'smooth' });
}

// Animate SEO score counting
function animateSeoScore(element, targetScore) {
    let currentScore = 0;
    const increment = targetScore / 30;
    const timer = setInterval(() => {
        currentScore += increment;
        if (currentScore >= targetScore) {
            currentScore = targetScore;
            clearInterval(timer);
        }
        element.textContent = Math.round(currentScore);
    }, 50);
}

// Animate breakdown score
function animateBreakdownScore(barElement, valueElement, targetScore) {
    let currentScore = 0;
    const increment = targetScore / 20;
    const timer = setInterval(() => {
        currentScore += increment;
        if (currentScore >= targetScore) {
            currentScore = targetScore;
            clearInterval(timer);
        }
        const roundedScore = Math.round(currentScore);
        barElement.style.width = `${roundedScore}%`;
        valueElement.textContent = `${roundedScore}/100`;
    }, 50);
}

// Add CSS for SEO tool animations
const seoAnimationStyles = document.createElement('style');
seoAnimationStyles.textContent = `
    .score-number {
        transition: all 0.3s ease;
    }
    
    .breakdown-fill {
        transition: width 1s ease-in-out;
    }
    
    .seo-issue {
        animation: slideInLeft 0.3s ease-out;
    }
    
    @keyframes slideInLeft {
        from {
            transform: translateX(-20px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(seoAnimationStyles);
