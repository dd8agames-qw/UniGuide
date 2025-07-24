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
    buildings: [
      { name: "Main Building (Tower)", coords: [30.2861, -97.7394], info: "Professors: Dr. Smith, Dr. Lee<br>Clubs: Robotics, Chess" },
      { name: "Gregory Gymnasium", coords: [30.2845, -97.7367], info: "Professors: Dr. Kim<br>Clubs: Fitness, Yoga" },
      { name: "Perry-Castañeda Library", coords: [30.2839, -97.7354], info: "Professors: Dr. Patel<br>Clubs: Book Club, Study Group" }
    ]
  },
  "Texas A&M University": {
    center: [30.6152, -96.3415],
    zoom: 16,
    buildings: [
      { name: "Academic Building", coords: [30.6157, -96.3406], info: "Professors: Dr. Adams, Dr. Carter<br>Clubs: Aggie Coding, Math Club" },
      { name: "Kyle Field", coords: [30.6102, -96.3417], info: "Professors: Dr. Evans<br>Clubs: Sports, Tailgating" },
      { name: "Evans Library", coords: [30.6172, -96.3386], info: "Professors: Dr. Brooks<br>Clubs: Study Group, Book Club" }
    ]
  },
  "Rice University": {
    center: [29.7182, -95.3977],
    zoom: 16,
    buildings: [
      { name: "Lovett Hall", coords: [29.7191, -95.3985], info: "Professors: Dr. White, Dr. Green<br>Clubs: Chess, Debate" },
      { name: "Fondren Library", coords: [29.7176, -95.3966], info: "Professors: Dr. Black<br>Clubs: Book Club, Study Group" },
      { name: "Reckling Park", coords: [29.7161, -95.3997], info: "Professors: Dr. Blue<br>Clubs: Baseball, Sports" }
    ]
  },
  "Texas Tech University": {
    center: [33.5846, -101.8784],
    zoom: 16,
    buildings: [
      { name: "Administration Building", coords: [33.5846, -101.8784], info: "Professors: Dr. Taylor, Dr. Morgan<br>Clubs: Tech Robotics, Art Club" },
      { name: "Jones AT&T Stadium", coords: [33.5841, -101.8747], info: "Professors: Dr. Harris<br>Clubs: Football, Sports" },
      { name: "Library", coords: [33.5861, -101.8787], info: "Professors: Dr. Clark<br>Clubs: Study Group, Book Club" }
    ]
  },
  "University of Houston": {
    center: [29.7199, -95.3422],
    zoom: 16,
    buildings: [
      { name: "Ezekiel Cullen Building", coords: [29.7211, -95.3431], info: "Professors: Dr. Young, Dr. King<br>Clubs: Engineering, Chess" },
      { name: "MD Anderson Library", coords: [29.7202, -95.3412], info: "Professors: Dr. Wright<br>Clubs: Book Club, Study Group" },
      { name: "TDECU Stadium", coords: [29.7191, -95.3451], info: "Professors: Dr. Hall<br>Clubs: Sports, Tailgating" }
    ]
  },
  "Southern Methodist University": {
    center: [32.8423, -96.7846],
    zoom: 16,
    buildings: [
      { name: "Dallas Hall", coords: [32.8423, -96.7846], info: "Professors: Dr. Allen, Dr. Scott<br>Clubs: Debate, Art" },
      { name: "Fondren Science Building", coords: [32.8431, -96.7837], info: "Professors: Dr. Baker<br>Clubs: Science, Math" },
      { name: "Dedman Center", coords: [32.8412, -96.7852], info: "Professors: Dr. Nelson<br>Clubs: Fitness, Yoga" }
    ]
  },
  "Baylor University": {
    center: [31.5493, -97.1143],
    zoom: 16,
    buildings: [
      { name: "Pat Neff Hall", coords: [31.5493, -97.1143], info: "Professors: Dr. Reed, Dr. Cook<br>Clubs: Leadership, Chess" },
      { name: "Moody Library", coords: [31.5485, -97.1161], info: "Professors: Dr. Bell<br>Clubs: Book Club, Study Group" },
      { name: "McLane Stadium", coords: [31.5532, -97.1081], info: "Professors: Dr. Price<br>Clubs: Sports, Tailgating" }
    ]
  },
  "University of North Texas": {
    center: [33.2101, -97.1503],
    zoom: 16,
    buildings: [
      { name: "UNT Union", coords: [33.2101, -97.1503], info: "Professors: Dr. Foster, Dr. Murphy<br>Clubs: Music, Chess" },
      { name: "Willis Library", coords: [33.2107, -97.1487], info: "Professors: Dr. Bailey<br>Clubs: Book Club, Study Group" },
      { name: "Apogee Stadium", coords: [33.2075, -97.1527], info: "Professors: Dr. Cooper<br>Clubs: Sports, Tailgating" }
    ]
  },
  "Texas State University": {
    center: [29.8883, -97.9384],
    zoom: 16,
    buildings: [
      { name: "Alkek Library", coords: [29.8891, -97.9436], info: "Professors: Dr. Hill<br>Clubs: Study Group, Book Club" },
      { name: "LBJ Student Center", coords: [29.8883, -97.9384], info: "Professors: Dr. Adams<br>Clubs: Student Government, Events" },
      { name: "Strahan Arena", coords: [29.8902, -97.9367], info: "Professors: Dr. Carter<br>Clubs: Sports, Basketball" }
    ]
  },
  "Sam Houston State University": {
    center: [30.7131, -95.5508],
    zoom: 16,
    buildings: [
      { name: "Newton Gresham Library", coords: [30.7131, -95.5508], info: "Professors: Dr. Lee<br>Clubs: Study Group, Book Club" },
      { name: "Lowman Student Center", coords: [30.7135, -95.5487], info: "Professors: Dr. White<br>Clubs: Student Government, Events" },
      { name: "Bowers Stadium", coords: [30.7152, -95.5472], info: "Professors: Dr. Green<br>Clubs: Sports, Football" }
    ]
  },
  "Lamar University": {
    center: [30.0419, -94.0721],
    zoom: 16,
    buildings: [
      { name: "Mary and John Gray Library", coords: [30.0419, -94.0721], info: "Professors: Dr. Black<br>Clubs: Study Group, Book Club" },
      { name: "Setzer Student Center", coords: [30.0425, -94.0707], info: "Professors: Dr. Brown<br>Clubs: Student Government, Events" },
      { name: "Provost Umphrey Stadium", coords: [30.0437, -94.0702], info: "Professors: Dr. Blue<br>Clubs: Sports, Football" }
    ]
  },
  "Stephen F. Austin State University": {
    center: [31.6176, -94.6514],
    zoom: 16,
    buildings: [
      { name: "Ralph W. Steen Library", coords: [31.6176, -94.6514], info: "Professors: Dr. Smith<br>Clubs: Study Group, Book Club" },
      { name: "Baker Pattillo Student Center", coords: [31.6179, -94.6492], info: "Professors: Dr. Johnson<br>Clubs: Student Government, Events" },
      { name: "Homer Bryce Stadium", coords: [31.6192, -94.6481], info: "Professors: Dr. Williams<br>Clubs: Sports, Football" }
    ]
  },
  "Angelo State University": {
    center: [31.4424, -100.4616],
    zoom: 16,
    buildings: [
      { name: "Porter Henderson Library", coords: [31.4424, -100.4616], info: "Professors: Dr. Martinez<br>Clubs: Study Group, Book Club" },
      { name: "Houston Harte University Center", coords: [31.4431, -100.4602], info: "Professors: Dr. Robinson<br>Clubs: Student Government, Events" },
      { name: "LeGrand Stadium", coords: [31.4442, -100.4591], info: "Professors: Dr. Clark<br>Clubs: Sports, Football" }
    ]
  },
  "Prairie View A&M University": {
    center: [30.0891, -95.9905],
    zoom: 16,
    buildings: [
      { name: "John B. Coleman Library", coords: [30.0891, -95.9905], info: "Professors: Dr. Lewis<br>Clubs: Study Group, Book Club" },
      { name: "Memorial Student Center", coords: [30.0897, -95.9887], info: "Professors: Dr. Walker<br>Clubs: Student Government, Events" },
      { name: "Panther Stadium", coords: [30.0908, -95.9872], info: "Professors: Dr. Hall<br>Clubs: Sports, Football" }
    ]
  }
};


const mapDiv = document.getElementById('map');
if (mapDiv) {
  let map;
  if (campusData[name]) {
    map = L.map('map').setView(campusData[name].center, campusData[name].zoom);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    campusData[name].buildings.forEach(b => {
      const marker = L.marker(b.coords).addTo(map);
      marker.bindPopup(`<div class='bubble'><strong>${b.name}</strong><br>${b.info}</div>`);
    });

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
    }
  } else {
    map = L.map('map').setView([31.0, -99.0], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    L.marker([31.0, -99.0]).addTo(map).bindPopup("Campus map not available for this university.");
  }
}
