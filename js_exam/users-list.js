// В index.html
// 1. отримати масив об'єктів з endpoint`a https://jsonplaceholder.typicode.com/users
// 2. Вивести id, name всіх user в index.html. Окремий блок для кожного user.
// 3. Додати кожному блоку кнопку/посилання, при кліку на яку відбувається перехід на сторінку user-details.html,
//   котра має детальну інформацію про об'єкт на який клікнули

//div id="wrapper" - створив в index.html як обгортку для блоків user
let wrapper = document.getElementById("wrapper");

//отримуємо масив об'єктів users
fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => {
        
        //дістаємо об'єкти user з отриманого масиву
        for (const user of users) {
            console.log(user);                                      //візуалізація проміжного результату - видалити
            const userId = user.id;
            const usedName = user.name;

            //створюємо структуру для майбутніх блоків з user
            let userBlock = document.createElement("div");
            userBlock.classList.add("user-block");
            wrapper.append(userBlock);

            //додаємо інфу всередину блоків з user
            userBlock.innerHTML = `
            <p><strong>User ID</strong>: ${userId}</p>
            <p><strong>User Name</strong>: ${usedName}</p>
            <div class="user-details-button"><a href=user-details.html?id=${userId}>Details</a></div>
            `;
            //додаємо перехід на сторінку з інформацією про user, передаємо userId в URL
        }
    })


//      На сторінці user-details.html:
// 4. Вивести всю, без виключення, інформацію про об'єкт user на який клікнули
// 5. Додати кнопку "post of current user", при кліку на яку, з'являються title всіх постів поточного юзера
//    (для отримання постів використовуйте ендпоінт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
// 6. Кожному посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку post-details.html, котра має детальну інфу про поточний пост.


//      На сторінці post-details.html:
// 7. Вивести всю, без виключення, інформацію про об'єкт post на який клікнули.
// 8. Нижче інформація про пост, вивести всі коментарі поточного поста (ендпоінт - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)


// Стилізація проєкта -
// index.html - всі блоки з user - по 2 в рядок. кнопки/посилання розташувати під інформацією про user.
// user-details.html - блок з інфою про user зверху сторінки. Кнопка нижче, на 90% ширини сторінки, по центру.
//     блоки з короткою інфою про post - в ряд по 5.
// post-details.html - блок з інфою про пост зверху. Коментарі - по 4 в ряд.
//     Всі елементи котрі характеризують users, posts, comments візуалізувати, так, щоб було видно що це блоки (дати фон. марджини і тд.)