const params = new URLSearchParams(window.location.search);
const name = params.get('name');
fetch('/public/universities.json')
  .then(res => res.json())
  .then(data => {
    const uni = data.find(u => u.name === name);
    if (uni) {
      document.getElementById('map-university-name').textContent = `${uni.name} Campus Map`;
      document.getElementById('map-container').style.borderColor = uni.theme;
      document.getElementById('map-container').style.boxShadow = `0 0 12px ${uni.theme}33`;
    }
  });

// Campus data for all supported universities

const campusData = {
  "University of Texas at Austin": {
    center: [30.285, -97.735],
    zoom: 16,
    entrance: [30.2842, -97.7375],
    buildings: [
      { name: "Main Building (Tower)", coords: [30.2861, -97.7394], info: "Professors: Dr. Smith, Dr. Lee<br>Clubs: Robotics, Chess<br>Description: Iconic UT Austin tower." },
      { name: "Gregory Gymnasium", coords: [30.2845, -97.7367], info: "Professors: Dr. Kim<br>Clubs: Fitness, Yoga<br>Description: Popular gym and fitness center." },
      { name: "Perry-Castañeda Library", coords: [30.2839, -97.7354], info: "Professors: Dr. Patel<br>Clubs: Book Club, Study Group<br>Description: Main campus library." },
      { name: "Student Union", coords: [30.2855, -97.7362], info: "Professors: Dr. Lee<br>Clubs: Student Government, Gaming<br>Description: Hub for student activities." },
      { name: "Engineering Building", coords: [30.2865, -97.7370], info: "Professors: Dr. Carter<br>Clubs: Robotics, Coding<br>Description: Engineering classes and labs." }
    ]
  },
  "Texas A&M University": {
    center: [30.6152, -96.3415],
    zoom: 16,
    entrance: [30.6135, -96.3428],
    buildings: [
      { name: "Academic Building", coords: [30.6157, -96.3406], info: "Professors: Dr. Adams, Dr. Carter<br>Clubs: Aggie Coding, Math Club<br>Description: Historic academic building." },
      { name: "Kyle Field", coords: [30.6102, -96.3417], info: "Professors: Dr. Evans<br>Clubs: Sports, Tailgating<br>Description: Football stadium." },
      { name: "Evans Library", coords: [30.6172, -96.3386], info: "Professors: Dr. Brooks<br>Clubs: Study Group, Book Club<br>Description: Main campus library." },
      { name: "Student Center", coords: [30.6145, -96.3412], info: "Professors: Dr. Carter<br>Clubs: Student Government, Gaming<br>Description: Student activities center." },
      { name: "Engineering Complex", coords: [30.6162, -96.3420], info: "Professors: Dr. Adams<br>Clubs: Robotics, Coding<br>Description: Engineering classes and labs." }
    ]
  },
  "Rice University": {
    center: [29.7182, -95.3977],
    zoom: 16,
    entrance: [29.7172, -95.3988],
    buildings: [
      { name: "Lovett Hall", coords: [29.7191, -95.3985], info: "Professors: Dr. White, Dr. Green<br>Clubs: Chess, Debate<br>Description: Historic Rice entrance." },
      { name: "Fondren Library", coords: [29.7176, -95.3966], info: "Professors: Dr. Black<br>Clubs: Book Club, Study Group<br>Description: Main campus library." },
      { name: "Reckling Park", coords: [29.7161, -95.3997], info: "Professors: Dr. Blue<br>Clubs: Baseball, Sports<br>Description: Baseball stadium." },
      { name: "Student Center", coords: [29.7180, -95.3970], info: "Professors: Dr. Green<br>Clubs: Student Government, Gaming<br>Description: Student activities center." },
      { name: "Engineering Building", coords: [29.7190, -95.3960], info: "Professors: Dr. White<br>Clubs: Robotics, Coding<br>Description: Engineering classes and labs." }
    ]
  },
  "Texas Tech University": {
    center: [33.5846, -101.8784],
    zoom: 16,
    entrance: [33.5835, -101.8795],
    buildings: [
      { name: "Administration Building", coords: [33.5846, -101.8784], info: "Professors: Dr. Taylor, Dr. Morgan<br>Clubs: Tech Robotics, Art Club<br>Description: Main admin building." },
      { name: "Jones AT&T Stadium", coords: [33.5841, -101.8747], info: "Professors: Dr. Harris<br>Clubs: Football, Sports<br>Description: Football stadium." },
      { name: "Library", coords: [33.5861, -101.8787], info: "Professors: Dr. Clark<br>Clubs: Study Group, Book Club<br>Description: Main campus library." },
      { name: "Student Union", coords: [33.5850, -101.8770], info: "Professors: Dr. Morgan<br>Clubs: Student Government, Gaming<br>Description: Student activities center." },
      { name: "Engineering Building", coords: [33.5865, -101.8790], info: "Professors: Dr. Taylor<br>Clubs: Robotics, Coding<br>Description: Engineering classes and labs." }
    ]
  },
  "University of Houston": {
    center: [29.7199, -95.3422],
    zoom: 16,
    entrance: [29.7185, -95.3440],
    buildings: [
      { name: "Ezekiel Cullen Building", coords: [29.7211, -95.3431], info: "Professors: Dr. Young, Dr. King<br>Clubs: Engineering, Chess<br>Description: Main admin building." },
      { name: "MD Anderson Library", coords: [29.7202, -95.3412], info: "Professors: Dr. Wright<br>Clubs: Book Club, Study Group<br>Description: Main campus library." },
      { name: "TDECU Stadium", coords: [29.7191, -95.3451], info: "Professors: Dr. Hall<br>Clubs: Sports, Tailgating<br>Description: Football stadium." },
      { name: "Student Center", coords: [29.7195, -95.3420], info: "Professors: Dr. King<br>Clubs: Student Government, Gaming<br>Description: Student activities center." },
      { name: "Engineering Building", coords: [29.7205, -95.3435], info: "Professors: Dr. Young<br>Clubs: Robotics, Coding<br>Description: Engineering classes and labs." }
    ]
  },
  "Southern Methodist University": {
    center: [32.8423, -96.7846],
    zoom: 16,
    entrance: [32.8408, -96.7860],
    buildings: [
      { name: "Dallas Hall", coords: [32.8423, -96.7846], info: "Professors: Dr. Allen, Dr. Scott<br>Clubs: Debate, Art<br>Description: Historic main building." },
      { name: "Fondren Science Building", coords: [32.8431, -96.7837], info: "Professors: Dr. Baker<br>Clubs: Science, Math<br>Description: Science classes and labs." },
      { name: "Dedman Center", coords: [32.8412, -96.7852], info: "Professors: Dr. Nelson<br>Clubs: Fitness, Yoga<br>Description: Fitness and recreation center." },
      { name: "Student Center", coords: [32.8420, -96.7840], info: "Professors: Dr. Scott<br>Clubs: Student Government, Gaming<br>Description: Student activities center." },
      { name: "Engineering Building", coords: [32.8435, -96.7850], info: "Professors: Dr. Allen<br>Clubs: Robotics, Coding<br>Description: Engineering classes and labs." }
    ]
  },
  "Baylor University": {
    center: [31.5493, -97.1143],
    zoom: 16,
    entrance: [31.5478, -97.1155],
    buildings: [
      { name: "Pat Neff Hall", coords: [31.5493, -97.1143], info: "Professors: Dr. Reed, Dr. Cook<br>Clubs: Leadership, Chess<br>Description: Main admin building." },
      { name: "Moody Library", coords: [31.5485, -97.1161], info: "Professors: Dr. Bell<br>Clubs: Book Club, Study Group<br>Description: Main campus library." },
      { name: "McLane Stadium", coords: [31.5532, -97.1081], info: "Professors: Dr. Price<br>Clubs: Sports, Tailgating<br>Description: Football stadium." },
      { name: "Student Center", coords: [31.5488, -97.1140], info: "Professors: Dr. Cook<br>Clubs: Student Government, Gaming<br>Description: Student activities center." },
      { name: "Engineering Building", coords: [31.5498, -97.1150], info: "Professors: Dr. Reed<br>Clubs: Robotics, Coding<br>Description: Engineering classes and labs." }
    ]
  },
  "University of North Texas": {
    center: [33.2101, -97.1503],
    zoom: 16,
    entrance: [33.2088, -97.1515],
    buildings: [
      { name: "UNT Union", coords: [33.2101, -97.1503], info: "Professors: Dr. Foster, Dr. Murphy<br>Clubs: Music, Chess<br>Description: Student union building." },
      { name: "Willis Library", coords: [33.2107, -97.1487], info: "Professors: Dr. Bailey<br>Clubs: Book Club, Study Group<br>Description: Main campus library." },
      { name: "Apogee Stadium", coords: [33.2075, -97.1527], info: "Professors: Dr. Cooper<br>Clubs: Sports, Tailgating<br>Description: Football stadium." },
      { name: "Student Center", coords: [33.2095, -97.1495], info: "Professors: Dr. Murphy<br>Clubs: Student Government, Gaming<br>Description: Student activities center." },
      { name: "Engineering Building", coords: [33.2110, -97.1500], info: "Professors: Dr. Foster<br>Clubs: Robotics, Coding<br>Description: Engineering classes and labs." }
    ]
  }
};


const mapDiv = document.getElementById('map');
if (mapDiv) {
  let map;
  let routeLine;
  if (campusData[name]) {
    map = L.map('map').setView(campusData[name].center, campusData[name].zoom);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Disable Leaflet's default double-click zoom to use custom handler
    map.doubleClickZoom.disable();

    // Add "You are here" marker at campus entrance
    const entranceCoords = campusData[name].entrance;
    const entranceMarker = L.marker(entranceCoords, {
      icon: L.icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      })
    }).addTo(map);
    entranceMarker.bindPopup(`<strong>You are here (Campus Entrance)</strong>`).openPopup();

    // Add building markers and popups
    campusData[name].buildings.forEach(b => {
      const marker = L.marker(b.coords).addTo(map);
      marker.bindPopup(`<div class='bubble'><strong>${b.name}</strong><br>${b.info}</div>`);
      marker.on('click', function() {
        if (routeLine) {
          map.removeLayer(routeLine);
        }
        routeLine = L.polyline([entranceCoords, b.coords], {
          color: '#43ea7f',
          weight: 5,
          opacity: 0.8,
          dashArray: '10,10'
        }).addTo(map);
      });
    });

    // Enable all zoom and pan controls for touchpad/touch compatibility
    map.touchZoom.enable();
    map.doubleClickZoom.enable();
    map.scrollWheelZoom.enable();
    map.boxZoom.enable();
    map.keyboard.enable();

    // Add a deep red square outline for the campus
    // Define bounds for each campus (approximate)
    const campusBounds = {
      "University of Texas at Austin": [[30.282, -97.742], [30.288, -97.732]],
      "Texas A&M University": [[30.612, -96.344], [30.618, -96.338]],
      "Rice University": [[29.715, -95.401], [29.721, -95.395]],
      "Texas Tech University": [[33.582, -101.882], [33.588, -101.874]],
      "University of Houston": [[29.717, -95.347], [29.723, -95.339]],
      "Southern Methodist University": [[32.840, -96.787], [32.845, -96.782]],
      "Baylor University": [[31.547, -97.117], [31.552, -97.112]],
      "University of North Texas": [[33.208, -97.153], [33.213, -97.148]],
      "Texas State University": [[29.886, -97.941], [29.891, -97.936]],
      "Sam Houston State University": [[30.711, -95.553], [30.716, -95.548]],
      "Lamar University": [[30.040, -94.074], [30.045, -94.069]],
      "Stephen F. Austin State University": [[31.615, -94.654], [31.620, -94.649]],
      "Angelo State University": [[31.440, -100.464], [31.445, -100.459]],
      "Prairie View A&M University": [[30.087, -95.993], [30.092, -95.988]]
    };
    if (campusBounds[name]) {
      L.rectangle(campusBounds[name], {
        color: '#b20000',
        weight: 4,
        fill: false,
        dashArray: '8',
        opacity: 0.9
      }).addTo(map);
      // Add a light gray polyline as a border around the campus
      const bounds = campusBounds[name];
      const borderCoords = [
        [bounds[0][0], bounds[0][1]],
        [bounds[0][0], bounds[1][1]],
        [bounds[1][0], bounds[1][1]],
        [bounds[1][0], bounds[0][1]],
        [bounds[0][0], bounds[0][1]]
      ];
      L.polyline(borderCoords, {
        color: '#cccccc',
        weight: 5,
        opacity: 0.7,
        dashArray: '2,8'
      }).addTo(map);
    }

    // Keyboard controls for zooming
    document.addEventListener('keydown', function(e) {
      if (!map) return;
      if (e.key === 'ArrowUp' || e.key === '+') {
        map.setZoom(map.getZoom() + 1);
      } else if (e.key === 'ArrowDown' || e.key === '-') {
        map.setZoom(map.getZoom() - 1);
      }
    });

    // Custom double-click to zoom in (in addition to Leaflet's default)
    map.on('dblclick', function(e) {
      map.setZoom(map.getZoom() + 1);
      map.panTo(e.latlng);
    });
  } else {
    map = L.map('map').setView([31.0, -99.0], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    L.marker([31.0, -99.0]).addTo(map).bindPopup("Campus map not available for this university.");
  }
}
