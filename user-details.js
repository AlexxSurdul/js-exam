//extract user id from url
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');

//specify a block for displaying information
const userContainer = document.getElementById('user-details');

//---------------------form a block with information about the user---------------------------------------------
//we check whether the user id has arrived and whether it is valid
if (!userId || isNaN(userId)) {
    userContainer.innerHTML = '<p class="back-btn">You need to choose a user <a href="index.html">HERE</a></p>';
} else {
    fetch(`https://jsonplaceholder.typicode.com/users?id=${userId}`)
        .then((response) => response.json())
        .then(userDetails => {

            //check if the array is not empty
            if (!userDetails || userDetails.length === 0) {
                userContainer.innerHTML = '<p class="back-btn">Something went wrong, please try again later or choose a user <a href="index.html">HERE</a></p>';

            } else {
                for (const userDetail of userDetails) {

                    const userName = document.createElement('h3') //add a title
                    userContainer.appendChild(userName);
                    userName.innerText = userDetail.username;

                    for (const userDetailKey in userDetail) {

                        //check the value to see if it is not an object
                        if (Object.prototype.toString.call(userDetail[userDetailKey]) !== '[object Object]') {
                            const userInfo = document.createElement('div'); //build a DOM structure for values
                            userInfo.classList.add('user-info');
                            userContainer.appendChild(userInfo);
                            userInfo.innerHTML = `<p><strong>${userDetailKey}</strong>: ${userDetail[userDetailKey]}</p>`;

                        }
                        //if the value [object Object] we extract data from it
                        if (Object.prototype.toString.call(userDetail[userDetailKey]) === '[object Object]') {
                            const address = document.createElement('h4'); //title
                            userContainer.appendChild(address);
                            address.innerText = `${userDetailKey}`;

                            for (const innerKey in userDetail[userDetailKey]) {
                                const innerObj = userDetail[userDetailKey][innerKey];
                                //check the value to see if it is not an object
                                if (Object.prototype.toString.call(innerObj) !== '[object Object]') {

                                    const additionalInfo = document.createElement('div'); //we build a DOM structure for values
                                    additionalInfo.classList.add('additional-info');
                                    userContainer.appendChild(additionalInfo);
                                    additionalInfo.innerHTML = `<p><strong>${innerKey}</strong>: ${innerObj}</p>`;
                                } else {
                                    const geo = document.createElement('div');
                                    userContainer.appendChild(geo);

                                    const {lat, lng} = innerObj; //destructuring the geo object
                                    geo.innerHTML = `<p><strong>${innerKey}</strong> (lat: ${lat}, lng: ${lng}) </p>`;

                                }
                            }
                        }
                    }
                }
            }
        })
        .catch(error => console.error('Error retrieving data:', error));
}

//---------------------form a block with user posts---------------------------------------------
//set a button that will open posts
const hideBtn = document.getElementById('hide-btn');

//block for posts
const userPosts = document.getElementById('user-posts');

//event for displaying a block
hideBtn.onclick = () => {
    //clear the block before adding new data
    userPosts.innerHTML = '';
//check whether the user id has arrived and whether it is valid
    if (!userId || isNaN(userId)) {
        console.log('no id');
    } else {
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
            .then((response) => response.json())
            .then((json) => {
                for (const jsonElement of json) {
                    const postTitle = document.createElement('div');
                    userPosts.appendChild(postTitle);
                    postTitle.innerHTML = `<p>${jsonElement.title} <br><a href="post-details.html?id=${jsonElement.id}" class="read-btn">read more...</a></p>`;
                }
            })
            .catch(error => console.error('Error retrieving data:', error));
    }
}
