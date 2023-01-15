import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  dateInput: document.getElementById('datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  daysField: document.querySelector('span[data-days]'),
  hoursField: document.querySelector('span[data-hours]'),
  minutesField: document.querySelector('span[data-minutes]'),
  secondsField: document.querySelector('span[data-seconds]'),
};

const stopBtn = document.createElement('button');
stopBtn.type = 'button';
stopBtn.textContent = 'Stop';
stopBtn.style.marginLeft = '5px';
stopBtn.disabled = true;

refs.startBtn.after(stopBtn);

refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      Notify.failure('Please choose a date in the future');
      return;
    }
    refs.startBtn.disabled = false;
  },
};

let calendar = flatpickr(refs.dateInput, options);

class Timer {
  constructor({ updateTimerFace }) {
    this.intervalId = null;
    this.isActiv = false;
    this.updateTimerFace = updateTimerFace;
  }

  start() {
    if (this.isActiv) {
      Notify.info('Timer already started');
      return;
    }

    this.isActiv = true;
    stopBtn.disabled = false;

    const finishTime = calendar.selectedDates[0];

    this.intervalId = setInterval(() => {
      const timeForEnd = finishTime - Date.now();

      const time = this.convertMs(timeForEnd);
      this.updateTimerFace(time);

      if (timeForEnd <= 0) {
        this.stop();
        Notify.info('Timer is over');
      }
    }, 1000);
  }

  stop() {
    if (!this.isActiv) {
      Notify.info('Timer already stopped');
      return;
    }

    this.isActiv = false;
    clearInterval(this.intervalId);

    const time = this.convertMs(0);
    this.updateTimerFace(time);
  }

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = this.addLeadingZero(Math.floor(ms / day));

    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));

    const minutes = this.addLeadingZero(
      Math.floor(((ms % day) % hour) / minute)
    );

    const seconds = this.addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
  }
}

const timer = new Timer({
  updateTimerFace,
});

function updateTimerFace({ days, hours, minutes, seconds }) {
  refs.daysField.textContent = days;
  refs.hoursField.textContent = hours;
  refs.minutesField.textContent = minutes;
  refs.secondsField.textContent = seconds;
}

refs.startBtn.addEventListener('click', handleStartBtnClick);

stopBtn.addEventListener('click', handleStopBtnClick);

function handleStartBtnClick(e) {
  timer.start();
}

function handleStopBtnClick(e) {
  timer.stop();
}
