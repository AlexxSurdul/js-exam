//set block for cards
let wrapper = document.getElementById("users-block");

//get an array of users objects
fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => {
        if (users && users.length > 0) {
            //дістаємо об'єкти user з отриманого масиву
            for (const user of users) {
                const userId = user.id;
                const userName = user.name;

                //create a structure for blocks with user
                let userBlock = document.createElement("div");
                userBlock.classList.add("user-block");
                wrapper.append(userBlock);

                //add info inside blocks with user
                userBlock.innerHTML = `
            <p><strong>User ID</strong>: ${userId}</p>
            <p><strong>User Name</strong>: ${userName}</p>
            <a class="user-details-button" href=user-details.html?id=${userId}>Details</a>`;
                //add a link to the page with information about the user to the user-details-button button,
                // pass the userId to the URL, which we will process on the user-details.html page

            }
        } else {

        }
    })
    .catch(error => console.error('Error retrieving data:', error));