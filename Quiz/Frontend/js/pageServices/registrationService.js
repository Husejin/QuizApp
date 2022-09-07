

export default function registerRegistrationHandler() {
    let signInButton = document.getElementById('registerButton');
    signInButton.onclick = registerHandler;
}

function registerHandler() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    let userInfo = {
        id: null,
        username: username,
        password: password,
        role: 'EDITOR'
    };
    registerUser(userInfo, registerUserCallback);
}


async function registerUser(userInfo, callback) {
    console.log(userInfo);
    $.post("http://localhost:8080/Backend_war_exploded/registerUser",
        {userInfo: JSON.stringify(userInfo)}, callback);
}

function registerUserCallback(data) {
    let registerResponse = JSON.parse(data);
    if (registerResponse.username !== '#') {
        console.log(data);
        alert("Registration successful");
        location.href = "login.html";
    } else {
        alert("Registration could not be performed!");
    }
}