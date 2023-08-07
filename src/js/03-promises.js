import Notiflix from 'notiflix';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

document.querySelector('.form').addEventListener('submit', function (event) {
  event.preventDefault();

  const delayInput = document.querySelector('input[name="delay"]');
  const stepInput = document.querySelector('input[name="step"]');
  const amountInput = document.querySelector('input[name="amount"]');

  const firstDelay = parseInt(delayInput.value);
  const step = parseInt(stepInput.value);
  const amount = parseInt(amountInput.value);

  for (let i = 0; i < amount; i++) {
    const delay = firstDelay + i * step;
    createPromise(i + 1, delay)
      .then(({ position, delay }) => {
        const message = `✅ Fulfilled promise ${position} in ${delay}ms`;
        Notiflix.Notify.success('Success', message);
      })
      .catch(({ position, delay }) => {
        const message = `❌ Rejected promise ${position} in ${delay}ms`;
        Notiflix.Notify.failure('Failure', message);
      });
  }

  this.reset();
});
