import '../css/common.css';
import Notiflix from 'notiflix';

// VARIABLES

const refs = {
  formEl: document.querySelector('form'),
};

let delay = null;
let step = null;
let amount = null;

// EVENT LISTENERS
refs.formEl.addEventListener('submit', onSubmitBtnClick);

// FUNCTION

// SUBMIT
function onSubmitBtnClick(evt) {
  evt.preventDefault();
  delay = Number(refs.formEl.elements.delay.value);
  step = Number(refs.formEl.elements.step.value);
  amount = Number(refs.formEl.elements.amount.value);

  for (let position = 1; position <= amount; position += 1) {
    console.log('amount', amount);
    console.log('position', position);
    console.log('delay', delay);

    createPromise(position, delay)
      .then(({ position, delay }) => {
        setTimeout(() => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        }),
          delay;
      })
      .catch(({ position, delay }) => {
        setTimeout(() => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        });
      });
    delay += step;
  }
}

// CREATE PROMISE
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
