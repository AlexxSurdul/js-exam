//extract post id from url
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

//set containers for posts and comments
const userPostBox = document.getElementById('user-post');
const postCommentsBox = document.getElementById('post-comments-box');

//we check whether the user id has arrived and whether it is valid
if (!postId || isNaN(postId)) {
    userPostBox.innerHTML = '<p class="back-btn">You need to choose a user <a href="index.html">HERE</a></p>';
} else {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then((response) => response.json())
        .then((post) => {
            console.log(post);

            //check if the object is valid and not a null
            if (!post || Object.keys(post).length === 0) {
                userPostBox.innerHTML = '<p class="back-btn">Something went wrong, please try again later or choose a user <a href="index.html">HERE</a></p>';

            } else {
                //display the post
                userPostBox.innerHTML =
                    `<h5>post number: ${post.id}, user id: ${post.userId}</h5>
                <h3>${post.title}</h3>
                <p>${post.body}</p>`;

                //extract comments to a post
                fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`)
                    .then(response => response.json())
                    .then(comments => {
                        //extract and display individual posts from the array
                        comments.forEach(comment => {
                            //create an element for displaying comments
                            const postComments = document.createElement('div');
                            postComments.classList.add('post-comments');
                            postCommentsBox.appendChild(postComments);
                            postComments.innerHTML =
                                `<h5>post number: ${comment.postId}, id: ${comment.id}</h5>
                        <p>name: <strong>${comment.name}</strong></p>
                        <p>email: ${comment.email}</p>
                        <p class="post-text">${comment.body}</p>`;
                        })
                    })
                    .catch(error => console.error('Error retrieving data:', error));
            }
        })
        .catch(error => console.error('Error retrieving data:', error));
}
