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
                <span class="column-count">${column.count}</span>
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
