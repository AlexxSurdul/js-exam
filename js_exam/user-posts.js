//      На сторінці post-details.html:
// 7. Вивести всю, без виключення, інформацію про об'єкт post на який клікнули.
// 8. Нижче інформація про пост, вивести всі коментарі поточного поста (ендпоінт - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)

//витягуємо post id з url
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

//перевіряємо чи прийшов user id і, чи він валідний
if (!postId || isNaN(postId)) {
    console.log('no id');
} else {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then((response) => response.json())
        .then((json) => {
            console.log(json)

        })
}

