let name = document.getElementById('name');
let email = document.getElementById('email');
let isFemale = document.getElementById('genderFemale');
let isMale = document.getElementById('genderMale');
let password = document.getElementById('password');
let confirmPassword = document.getElementById('confirmPassword');
let confirmBtn = document.getElementById('submit-btn');

// console.log(name.outerHTML);
// console.log(email.outerHTML);
// console.log(isFemale.outerHTML);
// console.log(isMale.outerHTML);
// console.log(password.outerHTML);
// console.log(confirmPassword.outerHTML);

async function register(e) {
    e.preventDefault();
    name = name.value;
    email = email.value;
    password = password.value;
    confirmPassword = confirmPassword.value;
    let gender = 'male';
    if (isFemale.checked) {
        gender = 'female';
    }
    let user = { name, email, password, confirmPassword, gender };
    let data = await fetch('https://book-store-api-msp.onrender.com/api/user/register', { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(user) });
    console.log(data);
    data = await data.json();
    console.log(data);
}

confirmBtn.onclick = register;

