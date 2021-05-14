
function changeModeToLogin() {
    let successButton = document.getElementById('success-button');
    let loginButton = document.getElementById('login-button');
    let newAccountButton = document.getElementById('new-account-button');
    
    successButton.innerText = 'Login';
    successButton.setAttribute('onclick', 'login()');
    loginButton.classList.add('selected');
    newAccountButton.classList.remove('selected');
}

function changeModeToRegistration() {
    let successButton = document.getElementById('success-button');
    let loginButton = document.getElementById('login-button');
    let newAccountButton = document.getElementById('new-account-button');

    successButton.innerText = 'New Account';
    successButton.setAttribute('onclick', 'newAccount()');
    newAccountButton.classList.add('selected');
    loginButton.classList.remove('selected');
}


function login() {
    let inputName = document.getElementById('input-name');
    let inputPassword = document.getElementById('input-password');
    console.log('login with ', inputName.value);

    // redirection with:
    // location.replace("http://www.gruppe-76.developerakademie.com/WEBSITE.html");
    // location.href = "http://www.gruppe-76.developerakademie.com/WEBSITE.html";
}

function newAccount() {
    let inputName = document.getElementById('input-name');
    let inputPassword = document.getElementById('input-password');
    console.log('new account with ' + inputName.value);

    if (getMember(inputName)) { // check if exist
        console.log('User exist, rename please');
        return;
    }
    let member = {
        'name' : inputName.value,
        'passwort' : inputPassword,
        'picturePath' : ''  // TODO default Path
    }
    addObjectToDatabase('members', member);


    // redirection with:
    // location.replace("http://www.gruppe-76.developerakademie.com/WEBSITE.html");
    // location.href = "http://www.gruppe-76.developerakademie.com/WEBSITE.html";
}

async function getMember(memberName) {
    let members = await backend.getItem('members') || [];
    members.forEach(member => {
        if (member['name'] == memberName) {
            return member;
        }
    });
    return;
}

