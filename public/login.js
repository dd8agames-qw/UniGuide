const params = new URLSearchParams(window.location.search);
const name = params.get('name');
fetch('/public/universities.json')
  .then(res => res.json())
  .then(data => {
    const uni = data.find(u => u.name === name);
    if (uni) {
      document.getElementById('login-university-name').textContent = `Login - ${uni.name}`;
      document.getElementById('login-container').style.borderColor = uni.theme;
      document.getElementById('login-container').style.boxShadow = `0 0 12px ${uni.theme}33`;
    }
  });

document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = document.querySelector('.submit-btn');
  btn.style.background = 'linear-gradient(90deg, #28a745 0%, #43ea7f 100%)';
  btn.textContent = 'Submitted!';
  setTimeout(() => {
    window.location.href = `/public/map.html?name=${encodeURIComponent(name)}`;
  }, 800);
});
