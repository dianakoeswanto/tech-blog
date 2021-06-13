const editPostHandler = async (event) => {
    event.preventDefault();
    const postId = document.getElementById('postId').value.trim();
    const title = document.getElementById('title').value.trim();
    const content = document.getElementById('content').value.trim();

    if(title && content) {
        const response = await fetch(`/api/posts/${postId}`, {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        };
    } else {
        alert("Title & Content are required");
    }

    return false;
}

const deletePostHandler = async (event) => {
    event.preventDefault();
    const postId = document.getElementById('postId').value.trim();

    const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    };
}

document
    .querySelector('#btnSubmit')
    .addEventListener('click', editPostHandler);

document
    .querySelector('#btnDelete')
    .addEventListener('click', deletePostHandler);