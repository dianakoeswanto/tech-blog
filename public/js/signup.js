
const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
  
    if (email && password && password.length > 8) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(await response.text());
      }
    } else {
      alert("Please enter an email & password greater than 8 characters");
    }
  };

document.querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);