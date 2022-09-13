import '../css/common.css';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
// require('flatpickr/dist/themes/material_blue.css');
import Notiflix from 'notiflix';

// VARIABLES
const refs = {
  currentTime: Date.now(),
  startBtn: document.querySelector('[data-start]'),
  daysFace: document.querySelector('[data-days]'),
  hoursFace: document.querySelector('[data-hours]'),
  minutesFace: document.querySelector('[data-minutes]'),
  secondsFace: document.querySelector('[data-seconds]'),
};
let selectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    if (selectedDate < refs.currentTime) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    refs.startBtn.disabled = false;
  },
};

flatpickr('#datetime-picker', options);

init();

// EVENT LISTENERS
refs.startBtn.addEventListener('click', onStartBtnClick);

// FUNCTIONS

function onStartBtnClick() {
  console.log('запускаем отсчет');

  setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = selectedDate - currentTime;
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    console.log(`количество дней ${days}, ${hours}, ${minutes}, ${seconds}`);

    if (deltaTime < 0) {
      console.log('Дельта меньше 0, выхожу из функции');
      return;
    }
    refs.daysFace.textContent = `${days}`;
    refs.hoursFace.textContent = `${hours}`;
    refs.minutesFace.textContent = `${minutes}`;
    refs.secondsFace.textContent = `${seconds}`;
  }, 1000);
}

/*
 * Принимает разницу в милисикундах ms, переводит в дни, часы, минуты, секунды
 */

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  // console.log(`количество дней ${days}, ${hours}, ${minutes}, ${seconds}`);

  return { days, hours, minutes, seconds };
}

/*
 * Принимает число, приводит к строке и добавляет в начало 0 если число меньше 2-х знаков
 */

function pad(value) {
  return String(value).padStart(2, '0');
}

function init() {
  refs.startBtn.disabled = true;
}
