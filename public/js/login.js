const loginFormHandler = async (event) => {
    event.preventDefault();
    
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (email && password) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/users/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
          document.location.reload();
        } else {
          alert(response.text());
        }
      }
}

  
document.querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);