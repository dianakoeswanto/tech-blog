const addCommentHandler = async (event) => {
    event.preventDefault();
    const postId = document.getElementById('postId').value.trim();
    const comment = document.getElementById('comment').value.trim();

    if(comment) {
        const response = await fetch(`/api/comments/post/${postId}`, {
            method: 'POST',
            body: JSON.stringify({ comment }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            alert(response.text());
        } else {
            document.location.reload();
        }
    } else {
        alert("Comment is required");
    }

    return true;
}


document.getElementById('btnAddComment').addEventListener('click', addCommentHandler);