const body = document.querySelector('body');
const startColortButton = document.querySelector('button[data-start]');
const stopColortButton = document.querySelector('button[data-stop]');
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBodyColor() {
  return (body.style.backgroundColor = getRandomHexColor());
}

startColortButton.addEventListener('click', startChangeColor);
stopColortButton.addEventListener('click', stopChangeColor);
stopColortButton.disabled = true;

function startChangeColor() {
  startColortButton.disabled = true;
  stopColortButton.disabled = false;
  timerId = setInterval(changeBodyColor, 1000);
}

function stopChangeColor() {
  startColortButton.disabled = false;
  stopColortButton.disabled = true;
  clearInterval(timerId);
}
