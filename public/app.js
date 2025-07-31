fetch('/public/universities.json')

  .then(res => res.json())
  .then(data => {
    const select = document.getElementById('universitySelect');
    const searchBar = document.getElementById('searchBar');
    const filterMapAvailable = document.getElementById('filterMapAvailable');
    const filterFavorites = document.getElementById('filterFavorites');
    const favoritesList = document.getElementById('favoritesList');
    const mapAvailable = [
      "University of Texas at Austin",
      "Texas A&M University",
      "Rice University",
      "Texas Tech University",
      "University of Houston",
      "Southern Methodist University",
      "Baylor University",
      "University of North Texas"
    ];
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    function renderOptions() {
      select.innerHTML = '<option value="" disabled selected>Select a university...</option>';
      let filtered = data.filter(u => {
        let match = true;
        if (searchBar.value) {
          match = u.name.toLowerCase().includes(searchBar.value.toLowerCase());
        }
        if (filterMapAvailable.checked) {
          match = match && mapAvailable.includes(u.name);
        }
        if (filterFavorites.checked) {
          match = match && favorites.includes(u.name);
        }
        return match;
      });
      filtered.forEach(u => {
        const option = document.createElement('option');
        option.value = u.name;
        const hasMap = mapAvailable.includes(u.name);
        option.innerHTML = hasMap
          ? `<span style='color:#43ea7f;'>&#x2BC8;</span> ${u.name}`
          : `<span style='color:#e11528;'>*</span> ${u.name}`;
        option.setAttribute('data-theme', u.theme);
        select.appendChild(option);
      });
    }

    function renderFavorites() {
      favoritesList.innerHTML = '<h3>Favorites</h3>';
      if (favorites.length === 0) {
        favoritesList.innerHTML += '<div>No favorites yet.</div>';
        return;
      }
      favorites.forEach(name => {
        favoritesList.innerHTML += `<div style="margin-bottom:8px;">${name} <button class='submit-btn' style='padding:2px 8px;font-size:0.9em;' onclick='removeFavorite("${name}")'>Remove</button></div>`;
      });
    }

    window.removeFavorite = function(name) {
      favorites = favorites.filter(f => f !== name);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      renderFavorites();
      renderOptions();
    };

    select.addEventListener('change', function() {
      const theme = select.options[select.selectedIndex].getAttribute('data-theme');
      const container = document.getElementById('main-container');
      container.style.borderColor = theme;
      container.style.boxShadow = `0 0 12px ${theme}33`;
    });

    select.addEventListener('dblclick', function() {
      const selected = select.value;
      if (selected && !favorites.includes(selected)) {
        favorites.push(selected);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        renderFavorites();
      }
    });

    searchBar.addEventListener('input', renderOptions);
    filterMapAvailable.addEventListener('change', renderOptions);
    filterFavorites.addEventListener('change', renderOptions);

    renderOptions();
    renderFavorites();
  });

document.getElementById('collegeForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const select = document.getElementById('universitySelect');
  const selected = select.value;
  if (selected) {
    window.location.href = `/public/login.html?name=${encodeURIComponent(selected)}`;
  }
});

// Dark mode toggle
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', function() {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark-mode');
}

// Feedback form
document.getElementById('feedbackForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const text = document.getElementById('feedbackText').value;
  if (text.trim().length < 3) {
    document.getElementById('feedbackMsg').textContent = 'Please enter more feedback.';
    return;
  }
  document.getElementById('feedbackMsg').textContent = 'Thank you for your feedback!';
  document.getElementById('feedbackText').value = '';
});
