import '../css/common.css';

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const BodyEl = document.querySelector('body');
let timerId = null;

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

stopBtn.disabled = true;

function onStartBtnClick() {
  timerId = setInterval(() => {
    console.log(`Interval with id ${timerId} has started!`);
    BodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
  if (timerId) {
    startBtn.disabled = true;
    stopBtn.disabled = false;
  }
}

function onStopBtnClick() {
  clearInterval(timerId);
  console.log(`Interval with id ${timerId} has stopped!`);
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
