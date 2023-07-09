const userId = localStorage.getItem('ID');
let container = document.getElementById('all-books');

// console.log(userId);

async function getUserReadList() {

    let response = await fetch(`https://book-store-api-msp.onrender.com/api/user/read-list/${userId}`);
    console.log(response);
    response = await response.json();
    console.log(response[`readList`].length);

    let htmlCode = ``;

    if (response[`readList`].length === 0) {
        htmlCode = `
        <div>
        <h1 style = "text-align: center;">No Books To Read!!!</h1>
        </div>
        `
    }

    response['readList'].forEach(element => {
        let { _id, name, imagePath } = element['bookId'];
        console.log(name, imagePath);
        htmlCode += `
        <div class = "book">
        <div class = "bookImage">
            <img src = ${imagePath} alt = "Book Cover!!">
        </div>
        <div class = "bookName">
            <h3>${name}</h3>
        </div>
            <button class = "removeButton" onclick = "removeBookFromReading('${_id}')">Remove from reading list</button>
        </div>
        `
        // console.log(_id, name, imagePath);
    });

    container.innerHTML = htmlCode;
}

async function removeBookFromReading(bookId) {
    let userBook = { userId, bookId };
    let response = await fetch(`https://book-store-api-msp.onrender.com/api/user/remove-book`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userBook)
    });

    console.log(response);
    response = await response.json();
    console.log('Removing Book', response);
    await getUserReadList();
}

getUserReadList();