// Drive functionality

document.addEventListener('DOMContentLoaded', function() {
  // Check access
  const userRole = getUserRole();
  if (userRole !== 'student' && userRole !== 'faculty') {
    alert('Access denied. This page is only for Students and Faculty.');
    window.location.href = 'index.html';
    return;
  }

  initializeDrive();
});

function initializeDrive() {
  const createFolderBtn = document.getElementById('createFolderBtn');
  const fileUpload = document.getElementById('fileUpload');
  const folderModal = document.getElementById('folderModal');
  const cancelFolderBtn = document.getElementById('cancelFolderBtn');
  const createFolderConfirmBtn = document.getElementById('createFolderConfirmBtn');
  const folderNameInput = document.getElementById('folderName');

  // Create folder button
  if (createFolderBtn) {
    createFolderBtn.addEventListener('click', () => {
      if (folderModal) {
        folderModal.classList.add('active');
        if (folderNameInput) folderNameInput.focus();
      }
    });
  }

  // Cancel folder creation
  if (cancelFolderBtn) {
    cancelFolderBtn.addEventListener('click', () => {
      if (folderModal) {
        folderModal.classList.remove('active');
        if (folderNameInput) folderNameInput.value = '';
      }
    });
  }

  // Confirm folder creation
  if (createFolderConfirmBtn) {
    createFolderConfirmBtn.addEventListener('click', () => {
      const folderName = folderNameInput ? folderNameInput.value.trim() : '';
      if (!folderName) {
        alert('Please enter a folder name');
        return;
      }
      createFolder(folderName);
      if (folderModal) folderModal.classList.remove('active');
      if (folderNameInput) folderNameInput.value = '';
    });
  }

  // File upload
  if (fileUpload) {
    fileUpload.addEventListener('change', function(e) {
      const files = Array.from(e.target.files);
      files.forEach(file => {
        uploadFile(file);
      });
      e.target.value = ''; // Reset input
    });
  }

  // Load existing files
  loadDriveFiles();
}

function createFolder(name) {
  const userRole = getUserRole();
  if (!campusData.driveFiles[userRole]) {
    campusData.driveFiles[userRole] = [];
  }

  const folder = {
    id: Date.now(),
    name: name,
    type: 'folder',
    createdAt: new Date().toISOString()
  };

  campusData.driveFiles[userRole].push(folder);
  loadDriveFiles();
}

function uploadFile(file) {
  const userRole = getUserRole();
  if (!campusData.driveFiles[userRole]) {
    campusData.driveFiles[userRole] = [];
  }

  const fileItem = {
    id: Date.now(),
    name: file.name,
    type: 'file',
    size: file.size,
    mimeType: file.type,
    createdAt: new Date().toISOString()
  };

  campusData.driveFiles[userRole].push(fileItem);
  loadDriveFiles();
}

function loadDriveFiles() {
  const driveFiles = document.getElementById('driveFiles');
  if (!driveFiles) return;

  const userRole = getUserRole();
  const files = campusData.driveFiles[userRole] || [];

  if (files.length === 0) {
    driveFiles.innerHTML = `
      <div class="empty-drive">
        <i class="fas fa-cloud"></i>
        <h3>Your drive is empty</h3>
        <p>Upload files or create folders to get started</p>
      </div>
    `;
    return;
  }

  driveFiles.innerHTML = '';

  // Separate folders and files
  const folders = files.filter(f => f.type === 'folder');
  const fileItems = files.filter(f => f.type === 'file');

  // Display folders first
  folders.forEach(item => {
    const itemElement = createDriveItem(item);
    driveFiles.appendChild(itemElement);
  });

  // Then display files
  fileItems.forEach(item => {
    const itemElement = createDriveItem(item);
    driveFiles.appendChild(itemElement);
  });
}

function createDriveItem(item) {
  const div = document.createElement('div');
  div.className = 'drive-item';
  div.dataset.id = item.id;

  const icon = item.type === 'folder' 
    ? '<i class="fas fa-folder"></i>'
    : getFileIcon(item.mimeType || '');

  const size = item.type === 'file' ? formatFileSize(item.size) : '';

  div.innerHTML = `
    <div class="drive-item-icon">${icon}</div>
    <div class="drive-item-info">
      <div class="drive-item-name">${escapeHtml(item.name)}</div>
      ${size ? `<div class="drive-item-size">${size}</div>` : ''}
    </div>
    <button class="drive-item-delete" onclick="deleteDriveItem(${item.id})">
      <i class="fas fa-trash"></i>
    </button>
  `;

  if (item.type === 'folder') {
    div.style.cursor = 'pointer';
    div.addEventListener('click', () => {
      alert(`Opening folder: ${item.name}`);
    });
  }

  return div;
}

function getFileIcon(mimeType) {
  if (mimeType.startsWith('image/')) return '<i class="fas fa-image"></i>';
  if (mimeType.startsWith('video/')) return '<i class="fas fa-video"></i>';
  if (mimeType.includes('pdf')) return '<i class="fas fa-file-pdf"></i>';
  if (mimeType.includes('word') || mimeType.includes('document')) return '<i class="fas fa-file-word"></i>';
  if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) return '<i class="fas fa-file-excel"></i>';
  return '<i class="fas fa-file"></i>';
}

function formatFileSize(bytes) {
  if (!bytes) return '';
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function deleteDriveItem(id) {
  if (!confirm('Are you sure you want to delete this item?')) return;

  const userRole = getUserRole();
  const files = campusData.driveFiles[userRole] || [];
  const index = files.findIndex(f => f.id === id);
  if (index > -1) {
    files.splice(index, 1);
    loadDriveFiles();
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
