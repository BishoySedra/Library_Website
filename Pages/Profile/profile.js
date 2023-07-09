let name = document.getElementById('name');
let email = document.getElementById('email');
let isFemale = document.getElementById('genderFemale');
let isMale = document.getElementById('genderMale');
let saveBtn = document.getElementById('save-btn');

async function update() {
    let id = localStorage.getItem('ID');
    console.log(id);
    email = email.value;
    name = name.value;
    let gender = 'male';
    if (isFemale.checked) {
        gender = 'female';
    }

    let user = { email, gender, name };

    let response = await fetch(`https://book-store-api-msp.onrender.com/api/user/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user) // *GET, POST, PUT, DELETE, etc.
    });

    console.log(response);
    response = await response.json();
    console.log(response);

}

saveBtn.addEventListener('click', update);

update();

