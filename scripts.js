async function handleFormSubmit(event) {
    event.preventDefault();

    const userDetails = {
        username: event.target.username.value,
        email: event.target.email.value,
        phone: event.target.phone.value,
    };

    try {
        const response = await fetch('/appointmentData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userDetails),
        });

        const data = await response.json();
        displayUserOnScreen(data);
    } catch (error) {
        console.error('Error:', error);
    }

    // Clear input fields
    document.getElementById('username').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
}

async function fetchAllUsers() {
    try {
        const response = await fetch('/appointmentData');
        const users = await response.json();

        users.forEach(user => {
            displayUserOnScreen(user);
        });
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

function displayUserOnScreen(userDetails) {
    const userItem = document.createElement('li');
    userItem.appendChild(
        document.createTextNode(
            `${userDetails.username} - ${userDetails.email} - ${userDetails.phone}`
        )
    );

    const deleteBtn = document.createElement('button');
    deleteBtn.appendChild(document.createTextNode('Delete'));
    userItem.appendChild(deleteBtn);

    const editBtn = document.createElement('button');
    editBtn.appendChild(document.createTextNode('Edit'));
    userItem.appendChild(editBtn);

    const userList = document.querySelector('ul');
    userList.appendChild(userItem);

    // Add event listener for Delete button
    deleteBtn.addEventListener('click', async function () {
        try {
            await fetch(`/appointmentData/${userDetails.email}`, {
                method: 'DELETE',
            });
            userList.removeChild(userItem);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    });

    // Add event listener for Edit button
    editBtn.addEventListener('click', function () {
        document.getElementById('username').value = userDetails.username;
        document.getElementById('email').value = userDetails.email;
        document.getElementById('phone').value = userDetails.phone;

        userList.removeChild(userItem);

        // Remove the user from the database when editing
        fetch(`/appointmentData/${userDetails.email}`, {
            method: 'DELETE',
        }).catch(error => console.error('Error deleting user:', error));
    });
}

document.addEventListener('DOMContentLoaded', fetchAllUsers);
document.querySelector('form').addEventListener('submit', handleFormSubmit);







// function handleFormSubmit(event) {
//     event.preventDefault();

//     const userDetails = {
//         username: event.target.username.value,
//         email: event.target.email.value,
//         phone: event.target.phone.value,
//     };

//     // Add a new user
//     fetch('http://localhost:3000/appointmentData', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(userDetails),
//     })
//     .then(response => response.json())
//     .then(data => displayUserOnScreen(data))
//     .catch(error => console.log(error));

//     // Clearing the input fields
//     document.getElementById("username").value = "";
//     document.getElementById("email").value = "";
//     document.getElementById("phone").value = "";
// }

// function displayUserOnScreen(userDetails) {
//     const userItem = document.createElement("li");
//     userItem.appendChild(
//         document.createTextNode(
//             `${userDetails.username} - ${userDetails.email} - ${userDetails.phone}`
//         )
//     );

//     const deleteBtn = document.createElement("button");
//     deleteBtn.appendChild(document.createTextNode("Delete"));
//     userItem.appendChild(deleteBtn);

//     const editBtn = document.createElement("button");
//     editBtn.appendChild(document.createTextNode("Edit"));
//     userItem.appendChild(editBtn);

//     const userList = document.querySelector("ul");
//     userList.appendChild(userItem);

//     deleteBtn.addEventListener("click", function () {
//         fetch(`http://localhost:3000/appointmentData/${userDetails.email}`, {
//             method: 'DELETE',
//         })
//         .then(() => {
//             userList.removeChild(userItem);
//         })
//         .catch(error => console.log(error));
//     });

//     editBtn.addEventListener("click", function () {
//         userList.removeChild(userItem);
//         document.getElementById("username").value = userDetails.username;
//         document.getElementById("email").value = userDetails.email;
//         document.getElementById("phone").value = userDetails.phone;

//         // Update user after editing
//         fetch(`http://localhost:3000/appointmentData/${userDetails.email}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(userDetails),
//         })
//         .then(response => response.json())
//         .then(data => displayUserOnScreen(data))
//         .catch(error => console.log(error));
//     });
// }

// // Do not touch the code below
// module.exports = handleFormSubmit;