import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const inputTimer = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

startBtn.disabled = true;
let setIntervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > options.defaultDate) {
      startBtn.disabled = false;

      startBtn.addEventListener('click', () => {
        setIntervalId = setInterval(() => {
          const timeDifference = selectedDates[0] - Date.now();
          const time = convertMs(timeDifference);

          updateTimerFace(time);

          if (timeDifference < 1000) {
            clearInterval(setIntervalId);
          }
        }, 1000);
        startBtn.disabled = true;
        inputTimer.disabled = true;
      });
    } else {
      Notiflix.Notify.warning('Please choose a date in the future');
    }
  },
};

flatpickr(inputTimer, options);

function updateTimerFace({ days, hours, minutes, seconds }) {
  dataDays.textContent = days;
  dataHours.textContent = hours;
  dataMinutes.textContent = minutes;
  dataSeconds.textContent = seconds;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

//////////////////////////////////////

// const refs = {
//   dataPickr: document.getElementById('datetime-picker'),
//   startBtn: document.querySelector('[data-start]'),
//   days: document.querySelector('[data-days]'),
//   hours: document.querySelector('[data-hours]'),
//   minutes: document.querySelector('[data-minutes]'),
//   seconds: document.querySelector('[data-seconds]'),
// };
// let setIntervalId = null;

// refs.startBtn.disabled = true;

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,

//   onClose(selectedDates) {
//     if (selectedDates[0] > options.defaultDate) {
//       refs.startBtn.disabled = false;

//       refs.startBtn.addEventListener('click', () => {
//         setIntervalId = setInterval(() => {
//           const deltaTime = selectedDates[0] - Date.now();
//           const time = convertMs(deltaTime);

//           updateClockFace(time), 1000;

//           if (deltaTime < 1000) {
//             clearInterval(setIntervalId);
//           }
//         });

//         refs.startBtn.disabled = true;
//         refs.dataPickr.disabled = true;
//       });
//     } else {
//       Notiflix.Notify.failure('Please choose a date in the future');
//     }
//   },
// };

// flatpickr(refs.dataPickr, options);

// function updateClockFace({ days, hours, minutes, seconds }) {
//   refs.days.textContent = days;
//   refs.hours.textContent = hours;
//   refs.minutes.textContent = minutes;
//   refs.seconds.textContent = seconds;
// }

// function addLeadingZero(value) {
//   return String(value).padStart(2, '0');
// }

// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   // Remaining days
//   const days = addLeadingZero(Math.floor(ms / day));
//   // Remaining hours
//   const hours = addLeadingZero(Math.floor((ms % day) / hour));
//   // Remaining minutes
//   const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
//   // Remaining seconds
//   const seconds = addLeadingZero(
//     Math.floor((((ms % day) % hour) % minute) / second)
//   );

//   return { days, hours, minutes, seconds };
// }
