import {initBackButtonClient} from "../utilityServices/commonService.js";
import {getCookie} from "../utilityServices/cookieService.js";
checkSuperAdminStatus();
function checkSuperAdminStatus() {
    let role = getCookie('LOGGED');
    if (role !== 'SUPERADMIN') {
        location.href = '../admin/allQuizzes.html';
    }
}




$.get('http://localhost:8080/Backend_war_exploded/all_users', {limit: 100, offset: 0}, (data) => {
    let allUsers = JSON.parse(data);
    let allUsersDiv = document.getElementById('allUsers');
    allUsers.forEach((user) => {
        allUsersDiv.appendChild(generateOneUserDiv(user))
    })
})
initBackButtonClient();

function generateOneUserDiv(user) {
    let oneUserDiv = document.createElement('div',);
    oneUserDiv.className = 'oneUser';

    let sp1Div = document.createElement('div');
    sp1Div.className = 'sp1';

    let userNameWrap = document.createElement('div');
    userNameWrap.className = 'userName';

    let userNameLabel = document.createElement('div');
    userNameLabel.innerHTML = 'Username:';

    let userNameDiv = document.createElement('div');
    userNameDiv.innerHTML = user.username;


    let userPassWrap = document.createElement('div');
    userPassWrap.className = 'userName';

    let userPassLabel = document.createElement('div');
    userPassLabel.innerHTML = 'Password:';

    let userPassDiv = document.createElement('div');
    userPassDiv.innerHTML = user.password;


    let userRoleWrap = document.createElement('div');
    userRoleWrap.className = 'userName';

    let userRoleLabel = document.createElement('div');
    userRoleLabel.innerHTML = 'Role:';

    let userRoleDiv = document.createElement('div');
    userRoleDiv.innerHTML = user.role;

    userNameWrap.appendChild(userNameLabel);
    userNameWrap.appendChild(userNameDiv);

    userPassWrap.appendChild(userPassLabel);
    userPassWrap.appendChild(userPassDiv);

    userRoleWrap.appendChild(userRoleLabel);
    userRoleWrap.appendChild(userRoleDiv);

    sp1Div.appendChild(userNameWrap);
    sp1Div.appendChild(userPassWrap);
    sp1Div.appendChild(userRoleWrap);

    let sp2Div1 = document.createElement('div');
    sp2Div1.className = 'sp2';


    let sp2Div2 = document.createElement('div');
    sp2Div2.className = 'sp2';

    let deleteButton = document.createElement('button');
    deleteButton.className = 'mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored';
    deleteButton.innerHTML = 'Delete'
    deleteButton.onclick = () => {
        if (confirm('Are you sure you want to delete a user?')) {
            $.post('http://localhost:8080/Backend_war_exploded/delete_user', {userId: user.id}, () => {
                alert('Successfully deleted user!');
                location.reload();
            })
        }
    }

    sp2Div2.appendChild(deleteButton);

    oneUserDiv.appendChild(sp1Div);
    oneUserDiv.appendChild(sp2Div1);
    oneUserDiv.appendChild(sp2Div2);

    return oneUserDiv;


}