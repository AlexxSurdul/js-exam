//витягуємо used id з url
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');

//задаємо блок для виведення інформації
const userInfo = document.getElementById('user-details');

if (!userId || userId !== 'number') {
    userInfo.innerHTML = 'You need to choose a user <a href="index.html">HERE</a>';
} else {
    console.log(userId);
}