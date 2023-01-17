import throttle from 'lodash.throttle';

const formEl = document.querySelector(`form`);
const emailInputEl = document.querySelector(`[name=email]`);
const messageInputEl = document.querySelector(`[name=message]`);

function formListener() {
  const {
    elements: { email, message },
  } = formEl;
  localStorage.setItem(
    'feedback-form-state',
    JSON.stringify({ email: email.value, message: message.value })
  );
}

if (JSON.parse(localStorage.getItem(`feedback-form-state`)) === null) {
  formEl.reset();
} else {
  emailInputEl.value = JSON.parse(
    localStorage.getItem(`feedback-form-state`)
  ).email;
  messageInputEl.value = JSON.parse(
    localStorage.getItem(`feedback-form-state`)
  ).message;
}

formEl.addEventListener(`submit`, event => {
  event.preventDefault();
  if (formEl.email.value === '' || formEl.message.value.length === 0) {
    console.log(`нужно заполнить все поля!`);
  } else {
    console.log(localStorage.getItem('feedback-form-state'));
    formEl.reset();
    localStorage.removeItem('feedback-form-state');
  }
});

formEl.addEventListener(`input`, throttle(formListener, 500));
