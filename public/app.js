fetch('/public/universities.json')
  .then(res => res.json())
  .then(data => {
    const select = document.getElementById('universitySelect');
    // List of universities with campus maps available
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
    data.forEach(u => {
      const option = document.createElement('option');
      option.value = u.name;
      const hasMap = mapAvailable.includes(u.name);
      // Green grave: U+2BC8, Red asterisk: *
      option.innerHTML = hasMap
        ? `<span style='color:#43ea7f;'>&#x2BC8;</span> ${u.name}`
        : `<span style='color:#e11528;'>*</span> ${u.name}`;
      option.setAttribute('data-theme', u.theme);
      select.appendChild(option);
    });

    select.addEventListener('change', function() {
      const theme = select.options[select.selectedIndex].getAttribute('data-theme');
      const container = document.getElementById('main-container');
      container.style.borderColor = theme;
      container.style.boxShadow = `0 0 12px ${theme}33`;
    });
  });

document.getElementById('collegeForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const select = document.getElementById('universitySelect');
  const selected = select.value;
  if (selected) {
    window.location.href = `/public/login.html?name=${encodeURIComponent(selected)}`;
  }
});
