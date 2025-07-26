// 3D Map logic using CSS 3D transforms (fallback when CesiumJS isn't available)
const params = new URLSearchParams(window.location.search);
const name = params.get('name');

let currentZoom = 1;
let currentRotationX = 0;
let currentRotationY = 0;

// University data with campus building information
const campusData = {
  "University of Texas at Austin": {
    center: [30.285, -97.735],
    zoom: 16,
    buildings: [
      { name: "Main Building (Tower)", x: 40, y: 30, width: 60, height: 120, color: "#bf5700" },
      { name: "PCL Library", x: 20, y: 50, width: 80, height: 40, color: "#8B4513" },
      { name: "Student Union", x: 60, y: 60, width: 70, height: 30, color: "#D2691E" },
      { name: "Engineering Building", x: 30, y: 80, width: 90, height: 50, color: "#A0522D" },
      { name: "Business School", x: 70, y: 20, width: 60, height: 35, color: "#CD853F" },
      { name: "Fine Arts Building", x: 10, y: 70, width: 50, height: 25, color: "#DEB887" }
    ]
  },
  "Texas A&M University": {
    center: [30.6152, -96.3415],
    zoom: 16,
    buildings: [
      { name: "Academic Building", x: 45, y: 35, width: 70, height: 80, color: "#500000" },
      { name: "Memorial Student Center", x: 25, y: 55, width: 85, height: 35, color: "#8B0000" },
      { name: "Evans Library", x: 65, y: 65, width: 60, height: 40, color: "#A52A2A" },
      { name: "Engineering Complex", x: 35, y: 85, width: 80, height: 45, color: "#DC143C" },
      { name: "Recreation Center", x: 75, y: 25, width: 55, height: 30, color: "#B22222" }
    ]
  },
  "Rice University": {
    center: [29.7182, -95.3977],
    zoom: 16,
    buildings: [
      { name: "Lovett Hall", x: 50, y: 40, width: 60, height: 70, color: "#00205b" },
      { name: "Fondren Library", x: 30, y: 60, width: 70, height: 35, color: "#1E3A8A" },
      { name: "Student Center", x: 70, y: 70, width: 50, height: 25, color: "#3B82F6" },
      { name: "Engineering Quad", x: 40, y: 80, width: 80, height: 40, color: "#60A5FA" },
      { name: "Baker Institute", x: 20, y: 30, width: 65, height: 45, color: "#93C5FD" }
    ]
  },
  "Texas Tech University": {
    center: [33.5779, -101.8552],
    zoom: 16,
    buildings: [
      { name: "Administration Building", x: 45, y: 40, width: 70, height: 60, color: "#cc0000" },
      { name: "Student Union", x: 30, y: 60, width: 80, height: 35, color: "#DC143C" },
      { name: "Library", x: 60, y: 25, width: 65, height: 45, color: "#B22222" },
      { name: "Engineering Building", x: 25, y: 80, width: 75, height: 50, color: "#8B0000" },
      { name: "Business Building", x: 70, y: 65, width: 55, height: 40, color: "#A52A2A" }
    ]
  },
  "University of Houston": {
    center: [29.7199, -95.3422],
    zoom: 16,
    buildings: [
      { name: "Student Center", x: 40, y: 45, width: 75, height: 40, color: "#e11528" },
      { name: "Library", x: 55, y: 30, width: 65, height: 55, color: "#DC143C" },
      { name: "Engineering Building", x: 25, y: 65, width: 80, height: 45, color: "#B22222" },
      { name: "Business Building", x: 65, y: 70, width: 60, height: 35, color: "#8B0000" },
      { name: "Recreation Center", x: 20, y: 25, width: 55, height: 30, color: "#A52A2A" }
    ]
  },
  "Baylor University": {
    center: [31.5489, -97.1131],
    zoom: 16,
    buildings: [
      { name: "Pat Neff Hall", x: 45, y: 35, width: 65, height: 75, color: "#154734" },
      { name: "Student Union", x: 30, y: 55, width: 75, height: 40, color: "#228B22" },
      { name: "Library", x: 60, y: 65, width: 70, height: 35, color: "#006400" },
      { name: "Engineering Building", x: 25, y: 75, width: 80, height: 50, color: "#2E8B57" },
      { name: "Business Building", x: 70, y: 25, width: 60, height: 45, color: "#3CB371" }
    ]
  }
};

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
  
  // Create buildings
  campus.buildings.forEach((building, index) => {
    const buildingElement = document.createElement('div');
    buildingElement.className = 'campus-building';
    buildingElement.style.left = `${building.x}%`;
    buildingElement.style.top = `${building.y}%`;
    buildingElement.style.width = `${building.width}px`;
    buildingElement.style.height = `${building.height}px`;
    buildingElement.style.backgroundColor = building.color;
    buildingElement.style.zIndex = Math.floor(building.height / 10);
    
    // Add 3D effect
    buildingElement.style.boxShadow = `
      ${building.height / 4}px ${building.height / 4}px 0 rgba(0,0,0,0.3),
      ${building.height / 2}px ${building.height / 2}px 0 rgba(0,0,0,0.1)
    `;
    
    // Add building label
    const label = document.createElement('div');
    label.className = 'building-label';
    label.textContent = building.name;
    label.style.bottom = `${building.height + 5}px`;
    label.style.left = '50%';
    label.style.transform = 'translateX(-50%)';
    buildingElement.appendChild(label);
    
    container.appendChild(buildingElement);
    
    // Animate building appearance
    setTimeout(() => {
      buildingElement.style.transform = 'scale(1)';
      buildingElement.style.opacity = '1';
    }, index * 200);
  });
  
  // Add some campus paths/roads
  addCampusPaths(container);
}

function addCampusPaths(container) {
  const paths = [
    { x: 0, y: 45, width: '100%', height: '8px' },
    { x: 45, y: 0, width: '8px', height: '100%' },
    { x: 0, y: 75, width: '70%', height: '6px' },
    { x: 75, y: 0, width: '6px', height: '70%' }
  ];
  
  paths.forEach(path => {
    const pathElement = document.createElement('div');
    pathElement.style.position = 'absolute';
    pathElement.style.left = `${path.x}%`;
    pathElement.style.top = `${path.y}%`;
    pathElement.style.width = path.width;
    pathElement.style.height = path.height;
    pathElement.style.backgroundColor = '#888';
    pathElement.style.opacity = '0.6';
    pathElement.style.zIndex = '1';
    container.appendChild(pathElement);
  });
}

// Map control functions
function zoomIn() {
  currentZoom = Math.min(currentZoom * 1.2, 3);
  updateMapTransform();
}

function zoomOut() {
  currentZoom = Math.max(currentZoom / 1.2, 0.5);
  updateMapTransform();
}

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
