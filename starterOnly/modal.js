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

// Validation confirmation modal
const confirmationMsg = document.querySelector('.confirmation-msg');
const confirmationMsgBtn = confirmationMsg.querySelectorAll('button');

const showConfirmation = () => {
  confirmationMsg.style.display = 'flex';
  validationConfirmed();
};

const validationConfirmed = () => {
  confirmationMsgBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      confirmationMsg.style.display = 'none';
    });
  });
};

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
const validData = {
  first: null,
  last: null,
  email: null,
  birthdate: null,
  quantity: null,
  EventPlace: null,
  mailing: false,
};
let validation = null;

form.addEventListener('submit', (e) => {
  validationCheckbox();
  validationInputs((i = null));
  isValidated();
  e.preventDefault();

  if (validation) {
    getData();
    showConfirmation();
    modalbg.style.display = 'none';
    form.reset();
  }
});

formInputs.forEach((input, i) => {
  input.addEventListener('input', (e) => {
    validationInputs(i);
  });
});

const validationCheckbox = () => {
  let checked;

  if (!checkbox1.checked) {
    checkError1.innerHTML =
      'Vous devez vérifier que vous acceptez les termes et conditions';
    checkError1.style.color = 'red';
  } else {
    checkError1.innerHTML = '';
    checkError1.style.color = 'green';
  }

  multiCheckbox.forEach((box) => {
    checked = box.checked || checked === true ? true : false;

    if (!checked) {
      multicheckError.innerHTML = 'Vous devez choisir une option';
      multicheckError.style.color = 'red';
    } else {
      validData.EventPlace = box.value;
      multicheckError.innerHTML = '';
    }
  });
  if (checkbox2.checked) {
    validData.mailing = true;
  } else {
    validData.mailing = false;
  }
};

const validationInputs = (i) => {
  let emailRegExp = new RegExp('/^S+@S+.S+$/');
  const objArray = [
    {
      name: 'first',
      target: prenom,
      message: 'Veuillez entrer 2 caractères ou plus',
      condition: prenom.value.trim().length < 2,
    },
    {
      name: 'last',
      target: nom,
      message: 'Veuillez entrer 2 caractères ou plus',
      condition: nom.value.trim().length < 2,
    },
    {
      name: 'email',
      target: email,
      message: 'Veuillez entrer une adresse mail valide',
      condition:
        email.value.trim() === '' && !emailRegExp.test(email.value.trim()),
    },
    {
      name: 'birthdate',
      target: birthdate,
      message: 'Vous devez entrer votre date de naissance',
      condition: birthdate.value === '',
    },
    {
      name: 'quantity',
      target: quantity,
      message: 'Veuillez entrer une adresse mail valide',
      condition: isNaN(quantity.value.trim()) || quantity.value.trim() === '',
    },
  ];

  if (i == null) {
    objArray.forEach(({ condition, target, message }) => {
      if (condition) {
        showError(target, message);
      } else {
        success(target);
      }
    });
  } else {
    let obj = objArray[i];

    if (obj.condition) {
      showError(obj.target, obj.message);
    } else {
      success(obj.target);
    }
  }
};

const success = (input) => {
  input.classList.remove('border-error');
  input.nextSibling.innerText = '';
};
const showError = (input, message) => {
  input.nextSibling.innerText = message;
  input.nextSibling.style.color = 'red';
  input.classList.add('border-error');
};
const isValidated = () => {
  let validator = [];

  errorMessage.forEach((msg) => {
    if (msg.innerText !== '') {
      validator.push('error');
    }
  });

  if (validator.length > 0) {
    validation = false;
  } else {
    validation = true;
  }
};
const getData = () => {
  let formData = new FormData(form);
  validData.first = formData.get('first');
  validData.last = formData.get('last');
  validData.email = formData.get('email');
  validData.birthdate = formData.get('birthdate');
  validData.quantity = formData.get('quantity');
  validData.prenom = formData.get('last');

  console.log(validData);
};
