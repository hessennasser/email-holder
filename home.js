const allEmails = document.querySelector(".left-side ul");
const emailHolder = document.querySelector(".right-side ul");
let emails;

const apiUrl = "https://ahmedapi.onrender.com/api/v1/message";

// ------------ Check if user is logged in ------------- //
const checkLogin = () => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');

    const authKey = sessionStorage.getItem('authKey');

    if (isLoggedIn && authKey) {
        getAllEmails();
    }
    else {
        window.location.href = 'index.html';
    }
};

// ---------- Get All emails on the left side from home page ----------- //  

let getAllEmails = () => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    fetch(`${apiUrl}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            const data = result.messages;
            for (email of data) {
                let listItem = document.createElement("li");
                listItem.setAttribute("userId", email._id);
                listItem.innerHTML = `
                    <p class="user">${email.name}</p>
                    <p class="email">${email.email}</p>
                `;
                allEmails.appendChild(listItem);
            }
            emails = document.querySelectorAll(".left-side ul li");
        })
        .finally(() => { getEmail(); })
        .catch(error => console.log('error', error));
};

window.addEventListener("load", () => {
    checkLogin();
});

// ---------- get the email ------- //

let getEmail = () => {
    emails.forEach(ele => {
        console.log(ele);
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        let userId = ele.attributes.userId.value;
        fetch(`${apiUrl}/${userId}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                ele.addEventListener("click", () => {
                    console.log(result);
                    emailHolder.innerHTML = "";
                    let listItem = document.createElement("li");
                    listItem.classList.add("email");
                    listItem.innerHTML =
                        `
                            <h2 class="subject">Subject : ${result.message.subject}</h1>
                            <p class="email">Email : ${result.message.email}</p>
                            <p class="name">Name : ${result.message.name}</p>
                            <p class="message">
                                ${result.message.message}
                            </p>
                            <span class="date">${result.message.createdAt.slice(0, 10)} | ${result.message.createdAt.slice(11, 19)}</span>
                            `;
                    emailHolder.appendChild(listItem);
                });
            })
            .catch(error => console.log('error', error));
    });
};


// -------- logout ---------- //
const logoutBtn = document.querySelector(".logout-btn");
logoutBtn.addEventListener("click", () => {
    sessionStorage.clear();
    checkLogin();
});

