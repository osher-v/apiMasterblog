let currentPostId = null;

window.onload = function() {
    var savedBaseUrl = localStorage.getItem('api-base-url');
    if (savedBaseUrl) {
        document.getElementById('api-base-url').value = savedBaseUrl;
        loadPosts();
    }
}

function loadPosts() {
    var baseUrl = document.getElementById('api-base-url').value;
    localStorage.setItem('api-base-url', baseUrl);

    fetch(baseUrl + '/posts')
        .then(response => response.json())
        .then(data => {
            const postContainer = document.getElementById('post-container');
            postContainer.innerHTML = '';

            data.forEach(post => {
                const postDiv = document.createElement('div');
                postDiv.className = 'post';
                postDiv.setAttribute('data-id', post.id);
                postDiv.innerHTML = `
                    <h2>ID: ${post.id}</h2>
                    <input type="text" class="post-title" value="${post.title}" disabled />
                    <textarea class="post-content" disabled>${post.content}</textarea>
                    <button class="delete-button" onclick="deletePost(${post.id})">Delete</button>
                    <button class="update-button" onclick="editPost(${post.id})">Edit</button>
                    <button class="save-button" onclick="saveEdit(${post.id})" style="display:none;">Save</button>`;
                postContainer.appendChild(postDiv);
            });
        })
        .catch(error => console.error('Error:', error));
}

function editPost(postId) {
    const postDiv = document.querySelector(`.post[data-id='${postId}']`);
    const titleElement = postDiv.querySelector('.post-title');
    const contentElement = postDiv.querySelector('.post-content');
    const editButton = postDiv.querySelector('.update-button');
    const saveButton = postDiv.querySelector('.save-button');

    titleElement.disabled = false;
    contentElement.disabled = false;
    editButton.style.display = 'none';
    saveButton.style.display = 'inline-block';
}

function saveEdit(postId) {
    const postDiv = document.querySelector(`.post[data-id='${postId}']`);
    const newTitle = postDiv.querySelector('.post-title').value;
    const newContent = postDiv.querySelector('.post-content').value;

    var baseUrl = document.getElementById('api-base-url').value;

    fetch(`${baseUrl}/posts/${postId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: newTitle, content: newContent })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to update post');
        }
        return response.json();
    })
    .then(updatedPost => {
        console.log('Post updated:', updatedPost);
        postDiv.querySelector('.post-title').value = updatedPost.title;
        postDiv.querySelector('.post-content').value = updatedPost.content;

        postDiv.querySelector('.post-title').disabled = true;
        postDiv.querySelector('.post-content').disabled = true;
        postDiv.querySelector('.update-button').style.display = 'inline-block';
        postDiv.querySelector('.save-button').style.display = 'none';
    })
    .catch(error => console.error('Error:', error));
}

function deletePost(postId) {
    var baseUrl = document.getElementById('api-base-url').value;

    fetch(baseUrl + '/posts/' + postId, {
        method: 'DELETE'
    })
    .then(response => {
        console.log('Post deleted:', postId);
        loadPosts();
    })
    .catch(error => console.error('Error:', error));
}

function addPost() {
    var baseUrl = document.getElementById('api-base-url').value;
    var postTitle = document.getElementById('post-title').value;
    var postContent = document.getElementById('post-content').value;

    fetch(baseUrl + '/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: postTitle, content: postContent })
    })
    .then(response => response.json())
    .then(post => {
        console.log('Post added:', post);
        loadPosts();
        clearFields();
    })
    .catch(error => console.error('Error:', error));
}

function clearFields() {
    document.getElementById('post-title').value = '';
    document.getElementById('post-content').value = '';
    currentPostId = null;
}
