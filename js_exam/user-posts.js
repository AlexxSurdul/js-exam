//      На сторінці post-details.html:
// 7. Вивести всю, без виключення, інформацію про об'єкт post на який клікнули.
// 8. Нижче інформація про пост, вивести всі коментарі поточного поста (ендпоінт - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)

//витягуємо post id з url
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

//задаємо контейнери для постів і коментарів
const userPostBox = document.getElementById('user-post');
const postCommentsBox = document.getElementById('post-comments-box');

//перевіряємо чи прийшов user id і, чи він валідний
if (!postId || isNaN(postId)) {
    userPostBox.innerHTML = '<p class="back-btn">You need to choose a user <a href="index.html">HERE</a></p>';
} else {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then((response) => response.json())
        .then((post) => {
            console.log(post);

            //перевіряємо чи валідний об'єкт
            if (Object.keys(post).length === 0) {
                userPostBox.innerHTML = '<p class="back-btn">Something went wrong, please try again later or choose a user <a href="index.html">HERE</a></p>';

            } else {
                //виводимо пост
                userPostBox.innerHTML =
                    `<h5>post number: ${post.id}, user id: ${post.userId}</h5>
                <h3>${post.title}</h3>
                <p>${post.body}</p>`;

                //витягуємо коменти до поста
                fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`)
                    .then(response => response.json())
                    .then(comments => {
                        //витягуємо та виводимо окремі пости з масиву
                        comments.forEach(comment => {
                            //створюємо елемент для виводу коментарів
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

            }

        })
}
