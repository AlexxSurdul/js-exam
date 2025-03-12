//      На сторінці user-details.html:
// 4. Вивести всю, без виключення, інформацію про об'єкт user на який клікнули
// 5. Додати кнопку "post of current user", при кліку на яку, з'являються title всіх постів поточного юзера
//    (для отримання постів використовуйте ендпоінт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
// 6. Кожному посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку post-details.html, котра має детальну інфу про поточний пост.
//----------------------------------------------------------------------------------------------------------------------------------------------------------

//витягуємо user id з url
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');

//задаємо блок для виведення інформації
const userContainer = document.getElementById('user-details');

//---------------------формуємо блок з інфою про юзера---------------------------------------------
//перевіряємо чи прийшов user id і, чи він валідний
if (!userId || isNaN(userId)) {
    userContainer.innerHTML = '<p class="back-btn">You need to choose a user <a href="index.html">HERE</a></p>';
} else {
    fetch(`https://jsonplaceholder.typicode.com/users?id=${userId}`)
        .then((response) => response.json())
        .then(userDetails => {

                //перевіряємо чи масив не пустий
                if (userDetails.length === 0) {
                    userContainer.innerHTML = '<p class="back-btn">Something went wrong, please try again later or choose a user <a href="index.html">HERE</a></p>';

                } else {
                    for (const userDetail of userDetails) {

                        const userName = document.createElement('h3') //додаємо заголовок
                        userContainer.appendChild(userName);
                        userName.innerText = userDetail.username;

                        for (const userDetailKey in userDetail) {

                            //перевіряємо значення чи воно не є об'єктом
                            if (Object.prototype.toString.call(userDetail[userDetailKey]) !== '[object Object]') {
                                const userInfo = document.createElement('div'); //будуємо DOM структуру для значень
                                userInfo.classList.add('user-info');
                                userContainer.appendChild(userInfo);
                                userInfo.innerHTML = `<p><strong>${userDetailKey}</strong>: ${userDetail[userDetailKey]}</p>`;

                            }
                            //якщо значення [object Object] витягуємо з нього дані
                            if (Object.prototype.toString.call(userDetail[userDetailKey]) === '[object Object]') {
                                const address = document.createElement('h4'); //заголовок
                                userContainer.appendChild(address);
                                address.innerText = `${userDetailKey}`;

                                for (const innerKey in userDetail[userDetailKey]) {
                                    const innerObj = userDetail[userDetailKey][innerKey];
                                    //перевіряємо значення чи воно не є об'єктом
                                    if (Object.prototype.toString.call(innerObj) !== '[object Object]') {

                                        const additionalInfo = document.createElement('div'); //будуємо DOM структуру для значень
                                        additionalInfo.classList.add('additional-info');
                                        userContainer.appendChild(additionalInfo);
                                        additionalInfo.innerHTML = `<p><strong>${innerKey}</strong>: ${innerObj}</p>`;
                                    } else {
                                        const geo = document.createElement('div');
                                        userContainer.appendChild(geo);

                                        const {lat, lng} = innerObj; //деструктуруємо об'єкт geo
                                        geo.innerHTML = `<p><strong>${innerKey}</strong> (lat: ${lat}, lng: ${lng}) </p>`;

                                    }
                                }
                            }

                        }

                    }
                }
            }
        )
}


//---------------------формуємо блок з постами юзера---------------------------------------------
//задаємо кнопку, яка буде відкривати пости
const hideBtn = document.getElementById('hide-btn');

//блок для постів
const userPosts = document.getElementById('user-posts');

//івент для відображення блока
hideBtn.onclick = () => {
    //очищаємо блок перед додаванням нових даних
    userPosts.innerHTML = '';
//перевіряємо чи прийшов user id і, чи він валідний
    if (!userId || isNaN(userId)) {
        console.log('no id');
    } else {
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
            .then((response) => response.json())
            .then((json) => {
                for (const jsonElement of json) {
                    const postTitle = document.createElement('div');
                    userPosts.appendChild(postTitle);
                    postTitle.innerHTML = `<p>${jsonElement.title} <a href="post-details.html?id=${jsonElement.id}">read more...</a></p>`;
                }
            })
    }

}
