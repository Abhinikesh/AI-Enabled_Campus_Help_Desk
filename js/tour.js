// 360° Virtual Tour functionality

let currentLocation = null;
let selectedDestination = null;

document.addEventListener('DOMContentLoaded', function() {
  // Wait for A-Frame to initialize
  if (typeof AFRAME !== 'undefined') {
    initializeTour();
  } else {
    // Retry if A-Frame hasn't loaded yet
    setTimeout(initializeTour, 500);
  }

  // Initialize panels
  initializePanels();
  initializeDirections();
});

function initializeTour() {
  // Setup hotspot click handlers
  const hotspots = document.querySelectorAll('.clickable');
  hotspots.forEach(hotspot => {
    hotspot.addEventListener('click', function() {
      const locationId = this.dataset.location;
      openLocationDetail(locationId);
    });
  });

  // Setup sidebar location items
  const hotspotItems = document.querySelectorAll('.hotspot-item');
  hotspotItems.forEach(item => {
    item.addEventListener('click', function() {
      const locationId = this.dataset.location;
      openLocationDetail(locationId);
    });
  });
}

function initializePanels() {
  const panelClose = document.getElementById('panelClose');
  const askAIBtn = document.getElementById('askAIBtn');
  const getDirectionsBtn = document.getElementById('getDirectionsBtn');

  if (panelClose) {
    panelClose.addEventListener('click', closeLocationDetail);
  }

  if (askAIBtn) {
    askAIBtn.addEventListener('click', () => {
      if (currentLocation) {
        askAIAboutLocation();
      }
    });
  }

  if (getDirectionsBtn) {
    getDirectionsBtn.addEventListener('click', () => {
      if (currentLocation) {
        openDirectionsPanel();
      }
    });
  }
}

function initializeDirections() {
  const directionsClose = document.getElementById('directionsClose');
  const directionsFrom = document.getElementById('directionsFrom');
  const directionsTo = document.getElementById('directionsTo');

  if (directionsClose) {
    directionsClose.addEventListener('click', closeDirectionsPanel);
  }

  // Populate destinations dropdown
  if (directionsTo && campusData.locations) {
    directionsTo.innerHTML = '<option value="">Select destination</option>';
    campusData.locations.forEach(loc => {
      const option = document.createElement('option');
      option.value = loc.id;
      option.textContent = loc.name;
      directionsTo.appendChild(option);
    });
  }

  // Update directions when selection changes
  if (directionsFrom && directionsTo) {
    directionsFrom.addEventListener('change', updateDirections);
    directionsTo.addEventListener('change', updateDirections);
  }
}

function openLocationDetail(locationId) {
  currentLocation = locationId;
  const location = campusData.locations.find(loc => loc.id === locationId);
  
  if (!location) return;

  const panel = document.getElementById('locationDetailPanel');
  const panelTitle = document.getElementById('panelTitle');
  const panelDescription = document.getElementById('panelDescription');
  const panelImage = document.getElementById('panelImage');
  const panelFacilities = document.getElementById('panelFacilities');
  const panelTimings = document.getElementById('panelTimings');

  if (!panel) return;

  // Update panel content
  if (panelTitle) panelTitle.textContent = location.name;
  if (panelDescription) panelDescription.textContent = location.aiDescription || location.description;
  
  if (panelImage) {
    panelImage.innerHTML = `
      <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400" 
           alt="${location.name}" 
           onerror="this.src='https://via.placeholder.com/600x400/1e293b/6366f1?text=${encodeURIComponent(location.name)}'" />
    `;
  }

  if (panelFacilities && location.facilities) {
    panelFacilities.innerHTML = `
      <h4><i class="fas fa-list"></i> Facilities</h4>
      <ul>
        ${location.facilities.map(f => `<li>${f}</li>`).join('')}
      </ul>
    `;
  }

  if (panelTimings && location.timings) {
    panelTimings.innerHTML = `
      <h4><i class="fas fa-clock"></i> Timings</h4>
      <p>${location.timings}</p>
    `;
  }

  // Highlight selected hotspot
  highlightHotspot(locationId);

  // Show panel
  panel.classList.add('active');
  
  // Update 360 Sky Background to location's dummy ambient color
  const sky = document.getElementById('sky');
  if (sky && location.ambientColor) {
    // Remove the default panorama image to allow color to show
    sky.removeAttribute('src');
    sky.setAttribute('color', location.ambientColor);
  }
  
  // Update sidebar
  updateSidebarLocation(locationId);
}

function closeLocationDetail() {
  const panel = document.getElementById('locationDetailPanel');
  if (panel) {
    panel.classList.remove('active');
  }
  currentLocation = null;
}

function highlightHotspot(locationId) {
  // Highlight in sidebar
  const hotspotItems = document.querySelectorAll('.hotspot-item');
  hotspotItems.forEach(item => {
    if (item.dataset.location === locationId) {
      item.style.background = 'var(--primary-color)';
      item.style.color = 'white';
    } else {
      item.style.background = 'var(--bg-primary)';
      item.style.color = 'var(--text-secondary)';
    }
  });

  // Highlight in 360 view (visual feedback)
  const hotspot = document.getElementById(`hotspot-${locationId}`);
  if (hotspot) {
    // Add highlight class or animation
    hotspot.setAttribute('material', 'color: #10b981; opacity: 1');
    setTimeout(() => {
      hotspot.setAttribute('material', 'color: #4f46e5; opacity: 0.8');
    }, 2000);
  }
}

function updateSidebarLocation(locationId) {
  const location = campusData.locations.find(loc => loc.id === locationId);
  const locationInfo = document.getElementById('locationInfo');
  
  if (locationInfo && location) {
    locationInfo.innerHTML = `
      <h3>${location.name}</h3>
      <p>${location.description}</p>
    `;
  }
}

function openDirectionsPanel() {
  const panel = document.getElementById('directionsPanel');
  if (panel) {
    panel.classList.add('active');
    
    // Set destination to current location
    const directionsTo = document.getElementById('directionsTo');
    if (directionsTo && currentLocation) {
      directionsTo.value = currentLocation;
      updateDirections();
    }
  }
}

function closeDirectionsPanel() {
  const panel = document.getElementById('directionsPanel');
  if (panel) {
    panel.classList.remove('active');
  }
}

function updateDirections() {
  const directionsFrom = document.getElementById('directionsFrom');
  const directionsTo = document.getElementById('directionsTo');
  const directionsSteps = document.getElementById('directionsSteps');

  if (!directionsFrom || !directionsTo || !directionsSteps) return;

  const from = directionsFrom.value;
  const to = directionsTo.value;

  if (!from || !to) {
    directionsSteps.innerHTML = '<p>Please select both origin and destination.</p>';
    return;
  }

  const routeKey = `${from}-${to}`;
  const reverseRouteKey = `${to}-${from}`;
  let steps = campusData.directions[routeKey] || campusData.directions[reverseRouteKey];

  if (!steps) {
    // Generate generic directions
    const fromLocation = getLocationName(from);
    const toLocation = getLocationName(to);
    steps = [
      `Start from ${fromLocation}`,
      `Walk towards the main pathway`,
      `Follow the signs to ${toLocation}`,
      `You'll reach ${toLocation}`
    ];
  }

  // Display steps
  directionsSteps.innerHTML = `
    <div class="directions-route">
      <div class="route-from">
        <i class="fas fa-map-marker-alt"></i>
        <span>${getLocationName(from)}</span>
      </div>
      <div class="route-steps">
        ${steps.map((step, index) => `
          <div class="route-step">
            <div class="step-number">${index + 1}</div>
            <div class="step-text">${step}</div>
          </div>
        `).join('')}
      </div>
      <div class="route-to">
        <i class="fas fa-flag"></i>
        <span>${getLocationName(to)}</span>
      </div>
    </div>
  `;

  // Highlight destination hotspot
  if (to) {
    highlightHotspot(to);
    selectedDestination = to;
  }
}

function getLocationName(locationId) {
  const location = campusData.locations.find(loc => loc.id === locationId);
  return location ? location.name : locationId;
}

function askAIAboutLocation() {
  if (!currentLocation) {
    alert('Please select a location first');
    return;
  }

  const location = campusData.locations.find(loc => loc.id === currentLocation);
  if (!location) return;

  // Show AI chat interface or redirect
  const message = `Tell me about ${location.name}. What facilities are available?`;
  window.location.href = `chat.html?message=${encodeURIComponent(message)}&agent=navigation`;
}

// Legacy function for backward compatibility
function selectLocation(locationId) {
  openLocationDetail(locationId);
}
