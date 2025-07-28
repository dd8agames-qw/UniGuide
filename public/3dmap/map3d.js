// 3D Map logic using CSS 3D transforms (fallback when CesiumJS isn't available)
const params = new URLSearchParams(window.location.search);
const name = params.get('name') === 'null' || !params.get('name') ? 'University of Houston' : params.get('name');

let currentZoom = 1;
let currentRotationX = 0;
let currentRotationY = 0;

// University data with campus building information, restored for all supported universities and colleges.
const campusData = {
  "University of Texas at Austin": {
    center: [30.285, -97.735],
    zoom: 16,
    buildings: [
      { name: "Main Building (Tower)", x: 40, y: 30, width: 60, height: 120, color: "#bf5700", info: "Professors: Dr. Smith, Dr. Lee<br>Clubs: Robotics, Chess" },
      { name: "Gregory Gymnasium", x: 20, y: 50, width: 80, height: 40, color: "#8B4513", info: "Professors: Dr. Kim<br>Clubs: Fitness, Yoga" },
      { name: "Perry-Castañeda Library", x: 60, y: 60, width: 70, height: 30, color: "#D2691E", info: "Professors: Dr. Patel<br>Clubs: Book Club, Study Group" }
    ]
  },
  "Texas A&M University": {
    center: [30.6152, -96.3415],
    zoom: 16,
    buildings: [
      { name: "Academic Building", x: 45, y: 35, width: 70, height: 80, color: "#500000", info: "Professors: Dr. Adams, Dr. Carter<br>Clubs: Aggie Coding, Math Club" },
      { name: "Kyle Field", x: 25, y: 55, width: 85, height: 35, color: "#8B0000", info: "Professors: Dr. Evans<br>Clubs: Sports, Tailgating" },
      { name: "Evans Library", x: 65, y: 65, width: 60, height: 40, color: "#A52A2A", info: "Professors: Dr. Brooks<br>Clubs: Study Group, Book Club" }
    ]
  },
  "Rice University": {
    center: [29.7182, -95.3977],
    zoom: 16,
    buildings: [
      { name: "Lovett Hall", x: 50, y: 40, width: 60, height: 70, color: "#00205b", info: "Professors: Dr. White, Dr. Green<br>Clubs: Chess, Debate" },
      { name: "Fondren Library", x: 30, y: 60, width: 70, height: 35, color: "#1E3A8A", info: "Professors: Dr. Black<br>Clubs: Book Club, Study Group" },
      { name: "Reckling Park", x: 70, y: 70, width: 50, height: 25, color: "#3B82F6", info: "Professors: Dr. Blue<br>Clubs: Baseball, Sports" }
    ]
  },
  "Texas Tech University": {
    center: [33.5846, -101.8784],
    zoom: 16,
    buildings: [
      { name: "Administration Building", x: 45, y: 40, width: 70, height: 60, color: "#cc0000", info: "Professors: Dr. Taylor, Dr. Morgan<br>Clubs: Tech Robotics, Art Club" },
      { name: "Jones AT&T Stadium", x: 30, y: 60, width: 80, height: 35, color: "#DC143C", info: "Professors: Dr. Harris<br>Clubs: Football, Sports" },
      { name: "Library", x: 60, y: 25, width: 65, height: 45, color: "#B22222", info: "Professors: Dr. Clark<br>Clubs: Study Group, Book Club" }
    ]
  },
  "University of Houston": {
    center: [29.7199, -95.3422],
    zoom: 16,
    buildings: [
      { name: "Ezekiel Cullen Building", x: 40, y: 45, width: 75, height: 40, color: "#e11528", info: "Professors: Dr. Young, Dr. King<br>Clubs: Engineering, Chess" },
      { name: "MD Anderson Library", x: 55, y: 30, width: 65, height: 55, color: "#DC143C", info: "Professors: Dr. Wright<br>Clubs: Book Club, Study Group" },
      { name: "TDECU Stadium", x: 25, y: 65, width: 80, height: 45, color: "#B22222", info: "Professors: Dr. Hall<br>Clubs: Sports, Tailgating" }
    ]
  },
  "Southern Methodist University": {
    center: [32.8423, -96.7846],
    zoom: 16,
    buildings: [
      { name: "Dallas Hall", x: 40, y: 30, width: 60, height: 60, color: "#e41b17", info: "Professors: Dr. Allen, Dr. Scott<br>Clubs: Debate, Art" },
      { name: "Fondren Science Building", x: 60, y: 50, width: 60, height: 40, color: "#f47c20", info: "Professors: Dr. Baker<br>Clubs: Science, Math" },
      { name: "Dedman Center", x: 30, y: 70, width: 70, height: 30, color: "#e41b17", info: "Professors: Dr. Nelson<br>Clubs: Fitness, Yoga" }
    ]
  },
  "Baylor University": {
    center: [31.5493, -97.1143],
    zoom: 16,
    buildings: [
      { name: "Pat Neff Hall", x: 45, y: 35, width: 65, height: 75, color: "#154734", info: "Professors: Dr. Reed, Dr. Cook<br>Clubs: Leadership, Chess" },
      { name: "Moody Library", x: 60, y: 65, width: 70, height: 35, color: "#006400", info: "Professors: Dr. Bell<br>Clubs: Book Club, Study Group" },
      { name: "McLane Stadium", x: 70, y: 25, width: 60, height: 45, color: "#3CB371", info: "Professors: Dr. Price<br>Clubs: Sports, Tailgating" }
    ]
  },
  "University of North Texas": {
    center: [33.2101, -97.1503],
    zoom: 16,
    buildings: [
      { name: "UNT Union", x: 40, y: 30, width: 60, height: 60, color: "#00853e", info: "Professors: Dr. Foster, Dr. Murphy<br>Clubs: Music, Chess" },
      { name: "Willis Library", x: 60, y: 50, width: 60, height: 40, color: "#00853e", info: "Professors: Dr. Bailey<br>Clubs: Book Club, Study Group" },
      { name: "Apogee Stadium", x: 30, y: 70, width: 70, height: 30, color: "#00853e", info: "Professors: Dr. Cooper<br>Clubs: Sports, Tailgating" }
    ]
  }
};

// Helper functions for color manipulation
function lightenColor(color, percent) {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

function darkenColor(color, percent) {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) - amt;
  const G = (num >> 8 & 0x00FF) - amt;
  const B = (num & 0x0000FF) - amt;
  return '#' + (0x1000000 + (R > 255 ? 255 : R < 0 ? 0 : R) * 0x10000 +
    (G > 255 ? 255 : G < 0 ? 0 : G) * 0x100 +
    (B > 255 ? 255 : B < 0 ? 0 : B)).toString(16).slice(1);
}

// Initialize university theme and data
fetch('/public/universities.json')
  .then(res => res.json())
  .then(data => {
    const uni = data.find(u => u.name === name);
    if (uni) {
      document.getElementById('map3d-university-name').textContent = `${uni.name} Campus 3D Map`;
      document.getElementById('map3d-container').style.borderColor = uni.theme;
      document.getElementById('map3d-container').style.boxShadow = `0 0 12px ${uni.theme}33`;
    }
  });

// Create 3D campus map
function create3DCampus() {
  const container = document.getElementById('map3dContainer');
  const loadingMessage = document.getElementById('loadingMessage');
  
  if (!container || !campusData[name]) {
    loadingMessage.textContent = 'Campus data not available for this university.';
    return;
  }

  // Hide loading message
  loadingMessage.style.display = 'none';

  const campus = campusData[name];
  
  // Add campus outline
  addCampusOutline(container);

  // Add green areas (lawns/parks)
  addCampusGreens(container);

  // Create buildings
  campus.buildings.forEach((building, index) => {
    const buildingElement = document.createElement('div');
    buildingElement.className = 'campus-building';
    buildingElement.style.left = `${building.x}%`;
    buildingElement.style.top = `${building.y}%`;
    buildingElement.style.width = `${building.width}px`;
    buildingElement.style.height = `${building.height}px`;
    // Enhanced building color with gradient
    const baseColor = building.color;
    const lightColor = lightenColor(baseColor, 20);
    const darkColor = darkenColor(baseColor, 20);
    buildingElement.style.background = `linear-gradient(135deg, ${lightColor} 0%, ${baseColor} 50%, ${darkColor} 100%)`;
    buildingElement.style.zIndex = 10 + Math.floor(building.height / 10);
    // Enhanced 3D effect with multiple shadows for depth
    const shadowDepth = Math.max(building.height / 8, 4);
    buildingElement.style.boxShadow = `
      ${shadowDepth}px ${shadowDepth}px 0 ${darkColor},
      ${shadowDepth * 1.5}px ${shadowDepth * 1.5}px 0 rgba(0,0,0,0.4),
      ${shadowDepth * 2}px ${shadowDepth * 2}px ${shadowDepth}px rgba(0,0,0,0.2),
      0 0 16px 4px ${lightColor}44,
      inset 2px 2px 4px rgba(255,255,255,0.3),
      inset -2px -2px 4px rgba(0,0,0,0.3)
    `;
    // Add building label (tooltip)
    const label = document.createElement('div');
    label.className = 'building-label';
    label.textContent = building.name;
    label.style.bottom = `${building.height + 5}px`;
    label.style.left = '50%';
    label.style.transform = 'translateX(-50%)';
    buildingElement.appendChild(label);
    // Add info popup on click
    buildingElement.addEventListener('click', (e) => {
      e.stopPropagation();
      showBuildingPopup(building, buildingElement);
    });
    // Tooltip on hover (show info in label)
    buildingElement.addEventListener('mouseenter', () => {
      label.innerHTML = `<strong>${building.name}</strong><br>${building.info}`;
      label.style.opacity = 1;
    });
    buildingElement.addEventListener('mouseleave', () => {
      label.textContent = building.name;
      label.style.opacity = 0;
    });
    container.appendChild(buildingElement);
    // Animate building appearance
    setTimeout(() => {
      buildingElement.style.transform = 'scale(1)';
      buildingElement.style.opacity = '1';
    }, index * 200);
  });

// Info popup for building
function showBuildingPopup(building, anchorElement) {
  // Remove any existing popup
  const oldPopup = document.getElementById('building-info-popup');
  if (oldPopup) oldPopup.remove();
  // Create popup
  const popup = document.createElement('div');
  popup.id = 'building-info-popup';
  popup.style.position = 'absolute';
  popup.style.left = `${anchorElement.offsetLeft + anchorElement.offsetWidth + 10}px`;
  popup.style.top = `${anchorElement.offsetTop}px`;
  popup.style.background = 'rgba(255,255,255,0.97)';
  popup.style.border = '2px solid #333';
  popup.style.borderRadius = '8px';
  popup.style.boxShadow = '0 4px 16px rgba(0,0,0,0.18)';
  popup.style.padding = '16px';
  popup.style.zIndex = 1000;
  popup.style.minWidth = '180px';
  popup.innerHTML = `<strong>${building.name}</strong><br>${building.info}<br><button id='close-popup-btn' style='margin-top:8px;'>Close</button>`;
  document.getElementById('map3dContainer').appendChild(popup);
  document.getElementById('close-popup-btn').onclick = () => popup.remove();
  // Remove popup on outside click
  setTimeout(() => {
    document.addEventListener('click', function handler(e) {
      if (!popup.contains(e.target)) {
        popup.remove();
        document.removeEventListener('click', handler);
      }
    });
  }, 10);
}
  
  // Add improved campus roads/paths
  addCampusPaths(container);

  // Add decorative trees
  addCampusTrees(container);
// Add a colored outline for the campus (polished, more organic)
function addCampusOutline(container) {
  const outline = document.createElement('div');
  outline.style.position = 'absolute';
  outline.style.left = '6%';
  outline.style.top = '9%';
  outline.style.width = '88%';
  outline.style.height = '80%';
  outline.style.border = '3.5px solid #2e8b57';
  outline.style.borderRadius = '32px'; // Smooth, subtle rounding
  outline.style.boxShadow = '0 0 24px 6px #2e8b5744, 0 0 0 8px #fff8';
  outline.style.background = 'radial-gradient(ellipse at 60% 40%, #eafbe7 70%, #c6e5c3 100%)';
  outline.style.opacity = 0.97;
  outline.style.zIndex = 2;
  outline.style.pointerEvents = 'none';
  container.appendChild(outline);
}

// Add green areas (lawns/parks), sports fields, and water features
function addCampusGreens(container) {
  const greens = [
    { left: '18%', top: '22%', width: '22%', height: '16%', color: '#7ec850' },
    { left: '60%', top: '62%', width: '28%', height: '18%', color: '#4e944f' },
    { left: '35%', top: '72%', width: '18%', height: '10%', color: '#a3e635' }
  ];
  greens.forEach(g => {
    const green = document.createElement('div');
    green.style.position = 'absolute';
    green.style.left = g.left;
    green.style.top = g.top;
    green.style.width = g.width;
    green.style.height = g.height;
    green.style.background = `radial-gradient(circle at 60% 40%, ${g.color} 60%, #4e944f 100%)`;
    green.style.borderRadius = '22% 38% 28% 32%/32% 22% 32% 28%';
    green.style.opacity = 0.7;
    green.style.zIndex = 1;
    container.appendChild(green);
  });
  // Add a sports field
  const field = document.createElement('div');
  field.style.position = 'absolute';
  field.style.left = '65%';
  field.style.top = '18%';
  field.style.width = '18%';
  field.style.height = '10%';
  field.style.background = 'repeating-linear-gradient(90deg, #b6e388 0 8px, #7ec850 8px 16px)';
  field.style.border = '2px solid #388e3c';
  field.style.borderRadius = '18% 32% 28% 22%/32% 18% 22% 28%';
  field.style.opacity = 0.8;
  field.style.zIndex = 2;
  container.appendChild(field);
  // Add a water feature (pond/lake)
  const pond = document.createElement('div');
  pond.style.position = 'absolute';
  pond.style.left = '22%';
  pond.style.top = '60%';
  pond.style.width = '10%';
  pond.style.height = '7%';
  pond.style.background = 'radial-gradient(circle at 60% 40%, #a2d9f7 60%, #4fc3f7 100%)';
  pond.style.borderRadius = '50% 60% 50% 60%/60% 50% 60% 50%';
  pond.style.opacity = 0.7;
  pond.style.zIndex = 2;
  container.appendChild(pond);
}
}

function addCampusPaths(container) {
  // More organic, curved, and layered paths/roads
  const paths = [
    { left: '12%', top: '60%', width: '70%', height: '10px', color: '#bca16b', border: '#a88b4a' },
    { left: '55%', top: '15%', width: '10px', height: '70%', color: '#bca16b', border: '#a88b4a' },
    { left: '25%', top: '80%', width: '50%', height: '7px', color: '#d2b48c', border: '#bca16b' },
    { left: '80%', top: '25%', width: '7px', height: '50%', color: '#d2b48c', border: '#bca16b' },
    // Parking lot
    { left: '15%', top: '15%', width: '12%', height: '6%', color: '#e0e0e0', border: '#b0b0b0', dash: true }
  ];
  paths.forEach(path => {
    const pathElement = document.createElement('div');
    pathElement.style.position = 'absolute';
    pathElement.style.left = path.left;
    pathElement.style.top = path.top;
    pathElement.style.width = path.width;
    pathElement.style.height = path.height;
    pathElement.style.background = `linear-gradient(90deg, ${path.color} 0%, #fff8 100%)`;
    pathElement.style.borderRadius = '12px';
    pathElement.style.border = path.dash ? '2px dashed ' + path.border : '2px solid ' + path.border;
    pathElement.style.opacity = '0.85';
    pathElement.style.zIndex = 3;
    pathElement.style.boxShadow = '0 2px 8px #a88b4a44, 0 0 8px #fff8';
    container.appendChild(pathElement);
  });
}
// Add decorative trees
function addCampusTrees(container) {
  // Place trees at various locations
  const trees = [
    { left: '15%', top: '18%' }, { left: '22%', top: '60%' }, { left: '80%', top: '30%' },
    { left: '60%', top: '80%' }, { left: '40%', top: '25%' }, { left: '70%', top: '65%' }
  ];
  trees.forEach(tree => {
    const treeDiv = document.createElement('div');
    treeDiv.style.position = 'absolute';
    treeDiv.style.left = tree.left;
    treeDiv.style.top = tree.top;
    treeDiv.style.width = '18px';
    treeDiv.style.height = '28px';
    treeDiv.style.zIndex = 4;
    treeDiv.style.pointerEvents = 'none';
    treeDiv.innerHTML = `<svg width="18" height="28" viewBox="0 0 18 28"><ellipse cx="9" cy="13" rx="8" ry="11" fill="#388e3c" stroke="#20551a" stroke-width="2"/><rect x="7" y="20" width="4" height="8" fill="#7d5a3a" stroke="#5a3a1a" stroke-width="1"/></svg>`;
    container.appendChild(treeDiv);
  });
}


// Mouse wheel/touchpad zoom support
document.getElementById('map3dContainer').addEventListener('wheel', (e) => {
  e.preventDefault();
  if (e.deltaY < 0) {
    // Zoom in
    currentZoom = Math.min(currentZoom * 1.1, 3);
  } else {
    // Zoom out
    currentZoom = Math.max(currentZoom / 1.1, 0.5);
  }
  updateMapTransform();
}, { passive: false });

function resetView() {
  currentZoom = 1;
  currentRotationX = 0;
  currentRotationY = 0;
  updateMapTransform();
}

function updateMapTransform() {
  const container = document.getElementById('map3dContainer');
  container.style.transform = `
    scale(${currentZoom}) 
    rotateX(${currentRotationX}deg) 
    rotateY(${currentRotationY}deg)
  `;
}

// Add mouse interaction for rotation
document.getElementById('map3dContainer').addEventListener('mousemove', (e) => {
  if (e.buttons === 1) { // Left mouse button pressed
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    currentRotationY = ((x - centerX) / centerX) * 15; // Max 15 degree rotation
    currentRotationX = -((y - centerY) / centerY) * 15;
    
    updateMapTransform();
  }
});

// Initialize the 3D campus when page loads
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(create3DCampus, 500); // Small delay for better user experience
});
