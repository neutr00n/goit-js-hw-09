const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

const TIME_DELAY = 1000;
let timerId = null;
refs.stopBtn.disabled = true;

refs.startBtn.addEventListener('click', handleStartBtnClick);
refs.stopBtn.addEventListener('click', handleStopBtnClick);

function handleStartBtnClick(e) {
  timeDelayChangeBgColor();
  disabledBtnStatusOnStartBtnClick(e);
}

function handleStopBtnClick(e) {
  clearInterval(timerId);
  disabledBtnStatusOnStopBtnClick(e);
}

function disabledBtnStatusOnStartBtnClick(e) {
  e.target.disabled = true;
  refs.stopBtn.disabled = false;
}
function disabledBtnStatusOnStopBtnClick(e) {
  e.target.disabled = true;
  refs.startBtn.disabled = false;
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
