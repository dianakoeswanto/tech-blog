const addPostHandler = async (event) => {
    event.preventDefault();
    const title = document.getElementById('title').value.trim();
    const content = document.getElementById('content').value.trim();

    alert(title);
    alert(content);
    if(title && content) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        };
    } else {
        alert("Title & Content are required");
    }

    return false;
}

document
    .querySelector('#btnSubmit')
    .addEventListener('click', addPostHandler);