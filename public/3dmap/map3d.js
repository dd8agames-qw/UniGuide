// 3D Map logic using CesiumJS
const params = new URLSearchParams(window.location.search);
const name = params.get('name');
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

const campusData = {
  "University of Texas at Austin": {
    center: [30.285, -97.735],
    zoom: 16
  },
  "Texas A&M University": {
    center: [30.6152, -96.3415],
    zoom: 16
  },
  "Rice University": {
    center: [29.7182, -95.3977],
    zoom: 16
  },
  // ...add other universities as needed
};

const cesiumContainer = document.getElementById('cesiumContainer');
if (cesiumContainer && campusData[name]) {
  Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0YWQ3Y2RmYS1hMzA2LTQ1Y2QtYjk3OC1kOTZmNGNhY2Y5OTYiLCJpZCI6MzI0ODUxLCJpYXQiOjE3NTMzNzUxMjB9.T7AP3Fvj0lhU0SIB3fVG2oTKc_QGfw1ujqvyWmfGpBY';
  let terrainProvider;
  if (typeof Cesium.createWorldTerrain === 'function') {
    terrainProvider = Cesium.createWorldTerrain();
  } else if (Cesium.WorldTerrain) {
    terrainProvider = Cesium.WorldTerrain;
  } else {
    terrainProvider = undefined;
  }
  const viewer = new Cesium.Viewer('cesiumContainer', {
    terrainProvider: terrainProvider,
    animation: false,
    timeline: false,
    baseLayerPicker: false,
    geocoder: false,
    homeButton: false,
    sceneModePicker: true,
    navigationHelpButton: true,
    infoBox: false,
    fullscreenButton: true
  });
  viewer.scene.globe.enableLighting = true;
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(
      campusData[name].center[1],
      campusData[name].center[0],
      2000
    )
  });
}
