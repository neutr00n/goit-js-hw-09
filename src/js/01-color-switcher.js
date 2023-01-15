const refs = {
  strartBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

const TIME_DELAY = 1000;
let timerId = null;
refs.stopBtn.disabled = true;

refs.strartBtn.addEventListener('click', handleStartBtnClick);
refs.stopBtn.addEventListener('click', handleStopBtnClick);

function handleStartBtnClick(e) {
  timeDelayChangeBgColor();
  e.target.disabled = true;
  refs.stopBtn.disabled = false;
}

function handleStopBtnClick(e) {
  clearInterval(timerId);
  e.target.disabled = true;
  refs.strartBtn.disabled = false;
}

function timeDelayChangeBgColor() {
  timerId = setInterval(changeBgColor, TIME_DELAY);
}

function changeBgColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
