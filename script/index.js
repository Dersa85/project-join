
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


async function login() {
    let inputName = document.getElementById('input-name');
    let inputPassword = document.getElementById('input-password');
    console.log('login with ', inputName.value);

    let user = await getPossibleUser(inputName.value, inputPassword.value);
    
    if (!user) {
        console.log('Loggin benutzername oder passwort ist falsch');
        return;
    }
    console.log('Anmelden erfolgreich');
    localStorage.setItem('loginname', user['name']);
    
    // redirection with:
    // location.replace("http://www.gruppe-76.developerakademie.com/WEBSITE.html");
    // location.href = "http://www.gruppe-76.developerakademie.com/WEBSITE.html";
}

async function newAccount() {
    let inputName = document.getElementById('input-name');
    let inputPassword = document.getElementById('input-password');

    let user = await getMember(inputName.value);

    if (user) { // check if exist
        console.log('User exist, rename please');
        return;
    }
    console.log('new account with name ' + inputName.value);
    let member = createAccountJson(inputName, inputPassword);
    addObjectToDatabase('members', member);


    // redirection with:
    // location.replace("http://www.gruppe-76.developerakademie.com/WEBSITE.html");
    // location.href = "http://www.gruppe-76.developerakademie.com/WEBSITE.html";
}

async function getMember(memberName) {
    let members = await backend.getItem('members') || [];
    for (let i = 0; i < members.length; i++) {
        if (members[i]['name'] == memberName) {
            return members[i];
        }
    }
    return;
}

function createAccountJson(name, pwd) {
    return {
        'name' : name,
        'passwort' : pwd,
        'picturePath' : '',
        'alreadyAssigned': false, // addTask.js -> assignTo(i)
        'indexOfArray': '' //  provides access: for toggle
        } // TODO default Path
}

async function getPossibleUser(username, password) {
    let user = await getMember(username);
    
    if (!user) {
        return;
    }
    
    if (user['passwort'] != password) {
        return;
    }
    return user;
}