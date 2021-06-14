
const logoutHandler = async () => {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.text());
    };
  }
  
  document
      .querySelector("#btnLogout")
      .addEventListener("click", logoutHandler);