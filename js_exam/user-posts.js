//      На сторінці post-details.html:
// 7. Вивести всю, без виключення, інформацію про об'єкт post на який клікнули.
// 8. Нижче інформація про пост, вивести всі коментарі поточного поста (ендпоінт - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)

//витягуємо post id з url
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

//задаємо контейнери для постів і коментарів
const userPostBox = document.getElementById('user-post');
const postCommentsBox = document.getElementById('post-comments');

//перевіряємо чи прийшов user id і, чи він валідний
if (!postId || isNaN(postId)) {
    console.log('no id');
} else {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then((response) => response.json())
        .then((post) => {
            //створюємо елемент для виводу поста
            const userPost = document.createElement('div');
            userPost.classList.add('user-post');
            userPostBox.appendChild(userPost);
            userPost.innerHTML =
                `<h5>post number: ${post.id}, user id: ${post.userId}</h5>
                <h3>${post.title}</h3>
                <p>${post.body}</p>`;


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
                        <p>name: ${comment.name}, email: ${comment.email}</p>
                        <p>${comment.body}</p>`;

                    })
                })
        })
}
