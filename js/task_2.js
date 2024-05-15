const btn = document.querySelector('.btn');

btn.addEventListener('click', () => {
  alert(`Screen width: ${document.documentElement.clientWidth}\nScreen height: ${document.documentElement.clientHeight}`);
});