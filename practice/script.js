  // ============================
  // Grab elements
  // ============================
  const form = document.getElementById('settingsForm');
  const nameInput = document.getElementById('fullName');
  const emailInput = document.getElementById('email');
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const successMessage = document.getElementById('successMessage');

  // A standard, widely-used regex for "is this a valid email shape".
  // It checks for: something@something.something
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // ============================
  // Reusable validation functions
  // Each returns true/false AND shows/hides its own error message.
  // ============================
  function validateName() {
    const value = nameInput.value.trim();
    const isValid = value.length > 0;

    nameInput.classList.toggle('invalid', !isValid);
    nameError.classList.toggle('visible', !isValid);
    return isValid;
  }

  function validateEmail() {
    const value = emailInput.value.trim();
    const isEmpty = value.length === 0;
    const isValid = !isEmpty && emailPattern.test(value);

    // change the message depending on WHY it failed
    emailError.textContent = isEmpty
      ? 'Email is required.'
      : 'Please enter a valid email address.';

    emailInput.classList.toggle('invalid', !isValid);
    emailError.classList.toggle('visible', !isValid);
    return isValid;
  }

  // ============================
  // Validate live: on blur (leaving the field),
  // and while typing only if it was already flagged invalid
  // ============================
  nameInput.addEventListener('blur', validateName);
  emailInput.addEventListener('blur', validateEmail);
  emailInput.addEventListener('input', () => {
    if (emailInput.classList.contains('invalid')) validateEmail();
  });

  // ============================
  // Final check on submit
  // ============================
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();

    if (!isNameValid || !isEmailValid) {
      // move focus to the first invalid field
      if (!isNameValid) nameInput.focus();
      else emailInput.focus();
      successMessage.classList.remove('visible');
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());
    console.log('Saved settings:', data);

    successMessage.classList.add('visible');
    setTimeout(() => successMessage.classList.remove('visible'), 2500);
  });