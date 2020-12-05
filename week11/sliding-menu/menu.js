var updateElement = document.getElementById("menu-icon");
updateElement.addEventListener('click', () => { 
  updateElement.classList.toggle("open");
  document.getElementById("menu").classList.toggle("open");
});