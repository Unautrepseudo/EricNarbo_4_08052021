function editNav() {
  let x = document.getElementById('myTopnav');
  if (x.className === 'topnav') {
    x.className += ' responsive';
  } else {
    x.className = 'topnav';
  }
}

// DOM Elements
const modalbg = document.querySelector('.bground');
const modalBtn = document.querySelectorAll('.modal-btn');
const formData = document.querySelectorAll('.formData');
const closeModal = document.querySelector('.close');

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = 'block';
}

// close modal form
closeModal.addEventListener('click', () => {
  modalbg.style.display = 'none';
});

// VALIDATION RULES
const form = document.getElementById('form');
const formInputs = document.querySelectorAll('.text-control');
const checkBoxInputs = document.querySelectorAll('.checkbox-input');
const errorMessage = document.querySelectorAll('small');

const prenom = document.getElementById('first');
const nom = document.getElementById('last');
const email = document.getElementById('email');
const birthdate = document.getElementById('birthdate');
const quantity = document.getElementById('quantity');
const checkbox1 = document.getElementById('checkbox1');
const checkMailing = document.getElementById('checkbox2');

const checkError1 = document.querySelector('.checkError1');
const multiCheckbox = document.querySelectorAll('input[id^="location"]');
const multicheckError = document.querySelector('.multicheck-error');

const validatedData = {
  first: null,
  last: null,
  email: null,
  birthdate: null,
  quantity: null,
  EventPlace: null,
  mailing: false,
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let formData = new FormData(form);

  checkInputs();
  validateCheckbox();

  validatedData.first = formData.get('first');
  validatedData.last = formData.get('last');
  validatedData.email = formData.get('email');
  validatedData.birthdate = formData.get('birthdate');
  validatedData.quantity = formData.get('quantity');
  validatedData.prenom = formData.get('last');

  console.log(validatedData);

  //message de validation
});

const validateCheckbox = () => {
  let checked;
  let formData = new FormData(form);

  if (!checkbox1.checked) {
    checkError1.innerHTML =
      'Vous devez vérifier que vous acceptez les termes et conditions';
    checkError1.style.color = 'red';
  } else {
    checkError1.innerHTML = '';
    checkError1.style.color = 'green';
  }

  multiCheckbox.forEach((box, i) => {
    checked = box.checked || checked === true ? true : false;

    if (!checked) {
      multicheckError.innerHTML = 'Vous devez choisir une option';
      multicheckError.style.color = 'red';
    } else {
      validatedData.EventPlace = box.value;
      multicheckError.innerHTML = '';
    }
  });
  if (checkbox2.checked) {
    validatedData.mailing = true;
  } else {
    validatedData.mailing = false;
  }
};

const checkInputs = () => {
  const prenomValue = prenom.value.trim();
  const nomValue = nom.value.trim();
  const emailValue = email.value.trim();
  const birthdateValue = birthdate.value.trim();
  const quantityValue = quantity.value.trim();

  let emailRegExp = new RegExp('/^S+@S+.S+$/');
  let testEmail = emailRegExp.test(emailValue);

  const objArray = [
    {
      name: 'first',
      target: document.getElementById('first'),
      message: 'Veuillez entrer 2 caractères ou plus',
      condition: prenomValue.length < 2,
    },
    {
      name: 'last',
      target: document.getElementById('last'),
      message: 'Veuillez entrer 2 caractères ou plus',
      condition: nomValue.length < 2,
    },
    {
      name: 'email',
      target: document.getElementById('email'),
      message: 'Veuillez entrer une adresse mail valide',
      condition: emailValue === '' && !testEmail,
    },
    {
      name: 'birthdate',
      target: document.getElementById('birthdate'),
      message: 'Vous devez entrer votre date de naissance',
      condition: birthdateValue === '',
    },
    {
      name: 'quantity',
      target: document.getElementById('quantity'),
      message: 'Veuillez entrer une adresse mail valide',
      condition: isNaN(quantityValue) || quantityValue === '',
    },
  ];

  objArray.forEach(({ target, message, condition, name }) => {
    if (condition) {
      showError(target, message);
    } else {
      // let formData = new FormData(form);
      // console.log(`${validatedData.name}.${name}`);
      // console.log(toto.name);
      success(target, 'bravo!');
      // formData.get(`${name}`);
    }
  });
};

const success = (input, message) => {
  input.nextSibling.innerText = message;
  input.nextSibling.style.color = 'green';
  input.classList.add('border-success');
};
const showError = (input, message) => {
  input.nextSibling.innerText = message;
  input.nextSibling.style.color = 'red';
  input.classList.add('border-error');
};
