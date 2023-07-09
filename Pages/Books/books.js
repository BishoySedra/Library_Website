let container = document.getElementById('all-books');

const userId = localStorage.getItem('ID');

const readingBooks = [];

async function getBooks() {
    await getUserReadList();

    let data = await fetch('https://book-store-api-msp.onrender.com/api/book');
    // console.log(data);
    data = await data.json();
    // console.log(data['books']);

    let htmlCode = ``;
    data['books'].forEach(element => {
        let { _id, name, imagePath } = element;
        htmlCode += `
        <div class = "book">
        <div class = "bookImage">
            <img src = "${imagePath}" alt = "Book Cover!!">
        </div>
        <div class = "bookName">
            <h3>${name}</h3>
        </div>
            ${readingBooks.includes(_id)
                ? `<button class = "removeButton" onclick = "removeBookFromReading('${_id}')">Remove from reading list</button>`
                : `<button class = "addButton" onclick = "addBookToReading('${_id}')">Add to reading list</button>`
            }
        </div>
        `
        // console.log(_id, name, imagePath);
    });
    container.innerHTML = htmlCode;
}

async function getUserReadList() {

    let response = await fetch(`https://book-store-api-msp.onrender.com/api/user/read-list/${userId}`);
    // console.log(response);
    response = await response.json();
    // console.log(response);

    response['readList'].forEach((element) => {
        let { _id } = element['bookId'];
        readingBooks.push(_id);
    });

    // console.log(readingBooks);
}

getBooks();

async function addBookToReading(bookId) {

    let userBook = { userId, bookId };

    let response = await fetch('https://book-store-api-msp.onrender.com/api/user/add-book', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userBook)
    });

    // console.log(response);
    response = await response.json();
    // console.log('Adding Book', response);

    await getBooks();
}

async function removeBookFromReading(bookId) {
    let userBook = { userId, bookId };
    let response = await fetch(`https://book-store-api-msp.onrender.com/api/user/remove-book`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userBook)
    });

    // console.log(response);
    response = await response.json();
    // console.log('Removing Book', response);

    await getBooks();
}

// const form = document.querySelector('.form');
// const button = document.getElementById('submit-btn');

// async function addBook(e) {
//     e.preventDefault();

//     const formData = new FormData(form);

//     console.log(formData.get('name'));
//     console.log(formData.get('description'));
//     console.log(formData.get('image'));

//     let response = await fetch(`https://book-store-api-msp.onrender.com/api/book/add`, {
//         method: "POST",
//         body: formData
//     });

//     console.log(response);
//     response = await response.json();
//     console.log(response);

//     // console.log(formData);
// }


// button.addEventListener('click', addBook);
