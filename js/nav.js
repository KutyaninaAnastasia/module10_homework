// Saved script just in case
const currentUrl = window.location.href;
const navPoints = document.querySelectorAll('.nav__point');

navPoints.forEach(point => {
  if (currentUrl.includes(point.getAttribute('href'))) {
    point.classList.add('active');
  } else {
    point.classList.remove('active'); 
  }
});
