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
        if (users.length !== 0 || !users) {
            //дістаємо об'єкти user з отриманого масиву
            for (const user of users) {
                const userId = user.id;
                const userName = user.name;

                //створюємо структуру для майбутніх блоків з user
                let userBlock = document.createElement("div");
                userBlock.classList.add("user-block");
                wrapper.append(userBlock);

                //додаємо інфу всередину блоків з user
                userBlock.innerHTML = `
            <p><strong>User ID</strong>: ${userId}</p>
            <p><strong>User Name</strong>: ${userName}</p>
            <a class="user-details-button" href=user-details.html?id=${userId}>Details</a>
            `;
                //додаємо перехід на сторінку з інформацією про user в кнопку user-details-button,
                // передаємо userId в URL, який обробимо на сторінці user-details.html

            }
        }
    })
