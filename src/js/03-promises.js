const refs = {
  form: document.querySelector('.form'),
  delayInput: document.querySelector('input[name="delay"]'),
  delayStepInput: document.querySelector('input[name="step"]'),
  amountInput: document.querySelector('input[name="amount"]'),
  submitBtn: document.querySelector('button[type="submit"]'),
};

const formData = {};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });

  return promise;
}

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', onInputChange);

function onInputChange(event) {
  formData[event.target.name] = +event.target.value;

  return formData;
}

function onFormSubmit(event) {
  event.preventDefault();
  let { delay, amount, step } = formData;
  if (delay > 0 && amount > 0 && step > 0) {
    for (let i = 1 && delay; i <= amount; i += 1) {
      let position = i;
      delay += step;
      const promise = createPromise(position, delay)
        .then(({ position, delay }) => {
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }
  } else {
    alert('Enter values > 0 !!!');
  }
}
