// Form Elements
const nameInput = document.getElementById("name");
const email = document.getElementById("email");
const emailHint = document.getElementById("email-hint");
const jobRoles = document.getElementById("title");
const otherJobRole = document.getElementById("other-job-role");
const size = document.getElementById("size");
const design = document.getElementById("design");
const color = document.getElementById("color");
const activitiesBox = document.querySelector("#activities-box");
const paypal = document.getElementById("paypal");
const bitcoin = document.getElementById("bitcoin");
const creditCard = document.getElementById("credit-card");
const payment = document.getElementById("payment");
const activitiesCostP = document.getElementById("activities-cost");
const activityCheckboxesInput = document.querySelectorAll("#activities-box input");
const cardInfo = document.getElementById("cc-num");
const zipCode = document.getElementById("zip");
const cvv = document.getElementById("cvv");
const form = document.querySelector("form");

// page on load
window.addEventListener("load", () => {
  // focus name element page on load
  nameInput.focus();

  // hide other job roles
  if (jobRoles.value !== "other") {
    otherJobRole.style.display = "none";
  }

  // disable color
  color.disabled = true;

  // hide other pay method
  paypal.style.display = "none";
  bitcoin.style.display = "none";

  // selected credit card
  payment.value = "credit-card";
});

// hide or show other job role
jobRoles.addEventListener("change", (e) => {
  const selectedJobRole = e.target.value;
  otherJobRole.style.display = selectedJobRole !== "other" ? "none" : "block";
});

// change design
design.addEventListener("change", (e) => {
  const designOption = e.target.value;
  const colorChildren = color.children;

   // if 's' is pressed on the keyboard
  if (designOption === "Select Theme") {
    color.disabled = true;
    colorChildren[0].selected = true
  } else {
    color.disabled = false;
    let firstElement = "";
    for (let i = 0; i < colorChildren.length; i++) {
      const dataThemeValue = colorChildren[i].getAttribute("data-theme");

      if (dataThemeValue === designOption) {
        colorChildren[i].removeAttribute("hidden", false);
        if (firstElement == "") {
          firstElement = colorChildren[i];
        }
        colorChildren[i].selected = false;
      } else {
        colorChildren[i].setAttribute("hidden", true);
        colorChildren[i].selected = false;
      }
    }
    // selected first target the element of theme
    firstElement.selected = true;
  }
});

// initial total Cost
let totalCost = 0;

let selectedActivitiesCount = 0;

// change activity
activitiesBox.addEventListener("change", (e) => {
  const activityInput = e.target;
  // convert string to int
  const activityDataCost = parseInt(activityInput.getAttribute("data-cost"));
  // take day and time for set disable
  const activityDataTime = activityInput.getAttribute("data-day-and-time");

  // check target checked or no
  if (activityInput.checked) {
    totalCost += activityDataCost;
    selectedActivitiesCount++;
  } else {
    totalCost -= activityDataCost;
    selectedActivitiesCount--;
  }

  // changes html according to dynamically checked activities cost
  activitiesCostP.innerHTML = `Total: $${totalCost}`;
  for (let i = 0; i < activityCheckboxesInput.length; i++) {
    const time = activityCheckboxesInput[i].getAttribute("data-day-and-time");
    if (
      time === activityDataTime &&
      activityInput.name !== activityCheckboxesInput[i].name
    ) {
      if (activityInput.checked) {
        activityCheckboxesInput[i].disabled = true;
        activityCheckboxesInput[i].parentNode.classList.add('disabled');
      } else {
        activityCheckboxesInput[i].disabled = false;
        activityCheckboxesInput[i].parentNode.classList.remove('disabled');
      }
    }

    // if activity label has got focus class. Remove it.
    if(activityCheckboxesInput[i].parentNode.classList.value === 'focus'){
        activityCheckboxesInput[i].parentNode.classList.remove('focus');
    }
  }
  // focus selected activity
  activityInput.parentNode.classList.add('focus');

});

// change payment method
payment.addEventListener("change", (e) => {
  const paymentMethod = e.target.value;
  if (paymentMethod === "paypal") {
    creditCard.style.display = "none";
    paypal.style.display = "block";
    bitcoin.style.display = "none";
  } else if (paymentMethod === "bitcoin") {
    creditCard.style.display = "none";
    paypal.style.display = "none";
    bitcoin.style.display = "block";
  } else {
    creditCard.style.display = "block";
    paypal.style.display = "none";
    bitcoin.style.display = "none";
  }
});

// Show display success
function validationSuccessed (e) {
  e.parentElement.classList.add("valid");
  e.parentElement.classList.remove("not-valid");
  e.parentElement.lastElementChild.style.display = "none";
};

// Show display errors
function validationFailed (e) {
  e.parentElement.classList.add("not-valid");
  e.parentElement.classList.remove("valid");
  e.parentElement.lastElementChild.style.display = "block";
};

// name validation control
function nameValidator () {
  let nameIsValid = false;
  if (nameInput.value !== "") {
    validationSuccessed(nameInput);
    nameIsValid = true;
  } else {
    validationFailed(nameInput);
  }
  return nameIsValid;
};

// email validation control
function emailValidator () {
  let emailValidCheck = true;
  if (email.value === "") {
    // if email field is empty display a different message
    emailValidCheck = false;
    emailHint.innerHTML = "Email field cannot be blank";
    validationFailed(email);
  } else if (/^[^@]+@[^@.]+\.[a-z]+$/i.test(email.value) === false) {
    emailHint.innerHTML = "Email address must be formatted correctly";
    validationFailed(email);
    emailValidCheck = false;
  } else {
    validationSuccessed(email);
    emailValidCheck = true;
  }
  return emailValidCheck;
};

// activity validation. Have to selected one or more
function activityValidator () {
  const selectedActivities = selectedActivitiesCount > 0;
  if (selectedActivities) {
    validationSuccessed(activitiesBox);
  } else {
    validationFailed(activitiesBox);
  }

  return selectedActivities;
};

// Card is valid control, if selected payment method is credit card
function cardNumberValidator () {
  let cardIsValid = true;
  if (payment.value === "credit-card") {
    if (/^\d{13,16}$/.test(cardInfo.value)) {
      validationSuccessed(cardInfo);
    } else {
      validationFailed(cardInfo);
      cardIsValid = false;
    }
  }
  return cardIsValid;
};

// Zip code is valid control, if selected payment method is credit card
function zipCodeValidator () {
  let zipCodeIsValid = true;
  if (payment.value === "credit-card") {
    if (/^\d{5}$/.test(zipCode.value)) {
      validationSuccessed(zipCode);
      return true;
    } else {
      validationFailed(zipCode);
      zipCodeIsValid = false;
    }
  }
  return zipCodeIsValid;
};

// Cvv is valid control, if selected payment method is credit card
function cvvValidator () {
  let cvvIsValid = true;
  if (payment.value === "credit-card") {
    if (/^\d{3}$/.test(cvv.value)) {
      validationSuccessed(cvv);
    } else {
      validationFailed(cvv);
      cvvIsValid = false;
    }
  }
  return cvvIsValid;
};

// name input listener
nameInput.addEventListener("input", nameValidator);
// email input listener
email.addEventListener("input", emailValidator);
// activity select listener
activitiesBox.addEventListener("change", activityValidator);
// card number listener
cardInfo.addEventListener("input", cardNumberValidator);
// zip code listener
zipCode.addEventListener("input", zipCodeValidator);
// cvv listener
cvv.addEventListener("input", cvvValidator);

form.addEventListener("submit", (e) => {
  // form validations for submit
  const nameIsValid = nameValidator();
  const emailIsValid = emailValidator();
  const activityIsValid = activityValidator();
  const cardNumberIsValid = cardNumberValidator();
  const zipCodeIsValid = zipCodeValidator();
  const CVVIsValid = cvvValidator();

  if (
    !nameIsValid ||
    !emailIsValid ||
    !activityIsValid ||
    !cardNumberIsValid ||
    !zipCodeIsValid ||
    !CVVIsValid
  ) {
    e.preventDefault();
  }
});
