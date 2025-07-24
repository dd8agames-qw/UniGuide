
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;


// Set Content Security Policy to allow CesiumJS and external resources
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'self' data: blob: https://cesium.com https://cesiumjs.org https://assets.cesium.com https://unpkg.com https://cdn.jsdelivr.net https://fonts.googleapis.com https://fonts.gstatic.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://cesium.com https://cesiumjs.org https://assets.cesium.com https://unpkg.com https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://cesium.com https://cesiumjs.org https://assets.cesium.com https://unpkg.com https://cdn.jsdelivr.net https://fonts.googleapis.com; img-src 'self' data: blob: https://cesium.com https://cesiumjs.org https://assets.cesium.com https://unpkg.com https://cdn.jsdelivr.net https://{s}.tile.openstreetmap.org https://a.tile.openstreetmap.org https://b.tile.openstreetmap.org https://c.tile.openstreetmap.org;");
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
});

// Serve static files
app.use('/public', express.static(path.join(__dirname, 'public')));

// Redirect root to the main page
app.get('/', (req, res) => {
  res.redirect('/public/index.html');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
