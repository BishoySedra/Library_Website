let email = document.getElementById('email');
let password = document.getElementById('password');
let loginBtn = document.getElementById('login-btn');

async function login(e) {
    e.preventDefault();
    email = email.value;
    password = password.value;

    const user = { email, password };

    let response = await fetch('https://book-store-api-msp.onrender.com/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    });

    console.log(response);

    if (response.status === 200) {
        let { id } = await response.json();
        localStorage.setItem('ID', id);
        window.location.href = "Pages/Home/Home.html";
    } else {
        alert(Error('Invalid Email or Password!!'));
    }

    console.log(response);

}

loginBtn.addEventListener('click', login);