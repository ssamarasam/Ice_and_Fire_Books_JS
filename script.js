const BOOKS_API = "https://www.anapioficeandfire.com/api/books";

// Navigation bar and footer
const topNav = document.createElement("div");
topNav.setAttribute("class", "topnav");
const aTag = document.createElement("a");
aTag.href = "#";
aTag.innerHTML = "Ice and Fire - Books";
const pageNumbers = document.createElement("div");
pageNumbers.setAttribute("class", "page-number");
topNav.appendChild(aTag);
topNav.appendChild(pageNumbers);
document.body.appendChild(topNav);
const footer = document.createElement("div");
footer.setAttribute("class", "footer");
const aTagFooter = document.createElement("a");
aTagFooter.href = "#";
aTagFooter.innerHTML = "Go to Top";
aTagFooter.setAttribute("class", "footer-line");
footer.appendChild(aTagFooter);
document.body.appendChild(footer);

// main - area to dislay all books
const contentContainer = document.createElement("div");
contentContainer.setAttribute("class", "content-container");
const divBook = document.createElement("div");
divBook.setAttribute("class", "book");
contentContainer.appendChild(divBook);
document.body.appendChild(contentContainer);

let pageElement = document.getElementsByClassName("page-number")[0];
let ulButton = document.createElement("ul");

let allBooksLi = document.createElement("li");
let allBooksBtn = document.createElement("button");
allBooksBtn.setAttribute("class", "show-all-books");
allBooksBtn.innerText = "All Books";
allBooksLi.appendChild(allBooksBtn);
ulButton.appendChild(allBooksLi);

let liOne = document.createElement("li");
let buttonOne = document.createElement("button");
buttonOne.setAttribute("class", "page");
buttonOne.innerHTML = "1";
buttonOne.value = 0;
liOne.appendChild(buttonOne);
ulButton.appendChild(liOne);

let liTwo = document.createElement("li");
let buttonTwo = document.createElement("button");
buttonTwo.setAttribute("class", "page");
buttonTwo.innerHTML = "2";
buttonTwo.value = 1;
liTwo.appendChild(buttonTwo);
ulButton.appendChild(liTwo);

let liThree = document.createElement("li");
let buttonThree = document.createElement("button");
buttonThree.setAttribute("class", "page");
buttonThree.innerHTML = "3";
buttonThree.value = 2;
liThree.appendChild(buttonThree);
ulButton.appendChild(liThree);

let liFour = document.createElement("li");
let buttonFour = document.createElement("button");
buttonFour.setAttribute("class", "page");
buttonFour.innerHTML = "4";
buttonFour.value = 3;
liFour.appendChild(buttonFour);
ulButton.appendChild(liFour);

let liFive = document.createElement("li");
let buttonFive = document.createElement("button");
buttonFive.setAttribute("class", "page");
buttonFive.innerHTML = "5";
buttonFive.value = 4;
liFive.appendChild(buttonFive);
ulButton.appendChild(liFive);

let liSix = document.createElement("li");
let buttonSix = document.createElement("button");
buttonSix.setAttribute("class", "page");
buttonSix.innerHTML = "6";
buttonSix.value = 5;
liSix.appendChild(buttonSix);
ulButton.appendChild(liSix);

let liSeven = document.createElement("li");
let buttonSeven = document.createElement("button");
buttonSeven.setAttribute("class", "page");
buttonSeven.innerHTML = "7";
buttonSeven.value = 6;
liSeven.appendChild(buttonSeven);
ulButton.appendChild(liSeven);

let liEight = document.createElement("li");
let buttonEight = document.createElement("button");
buttonEight.setAttribute("class", "page");
buttonEight.innerHTML = "8";
buttonEight.value = 7;
liEight.appendChild(buttonEight);
ulButton.appendChild(liEight);

let liNine = document.createElement("li");
let buttonNine = document.createElement("button");
buttonNine.setAttribute("class", "page");
buttonNine.innerHTML = "9";
buttonNine.value = 8;
liNine.appendChild(buttonNine);
ulButton.appendChild(liNine);

let liTen = document.createElement("li");
let buttonTen = document.createElement("button");
buttonTen.setAttribute("class", "page");
buttonTen.innerHTML = "10";
buttonTen.value = 9;
liTen.appendChild(buttonTen);
ulButton.appendChild(liTen);
pageElement.appendChild(ulButton);

// get data using api

async function getBooksData() {
  try {
    const response = await fetch(BOOKS_API);
    const result = await response.json();
    if (result.length > 0) {
      renderBooks(result);
    }
  } catch (error) {
    console.log("something went wrong: ", error);
  }
}

getBooksData();

function renderBooks(booksList) {
  let isbn;
  let bookName;
  let numberOfPages;
  let authors;
  let publisherName;
  let relDate;
  let releasedDate;
  let charactersList;

  booksList.forEach((book) => {
    isbn = book.isbn;
    bookName = book.name;
    authors = book.authors[0];
    numberOfPages = book.numberOfPages;
    publisherName = book.publisher;
    relDate = new Date(book.released);
    releasedDate = relDate.toDateString();

    getCharacters(book.characters).then((response) => {
      charactersList = response.join("\n");

      // let ul = document.createElement("ul");

      // for (let i = 0; i < response.length; i++) {
      //   let li = document.createElement("li");
      //   li.innerHTML = response[i];
      //   ul.appendChild(li);
      // }
      // charactersList = ul;

      const tableObject = {
        isbn,
        bookName,
        authors,
        numberOfPages,
        publisherName,
        releasedDate,
        charactersList,
        headings: [
          "Book Name",
          "ISBN",
          "Author",
          "Number of Pages",
          "Publisher Name",
          "Release Date",
          "Characters",
        ],
        keys: [
          "bookName",
          "isbn",
          "authors",
          "numberOfPages",
          "publisherName",
          "releasedDate",
          "charactersList",
        ],
      };

      let divElement = document.createElement("div");
      divElement.setAttribute("class", "each-book");
      const tableChild = createTableChild(tableObject);
      divElement.appendChild(tableChild);
      divBook.appendChild(divElement);
    });
  });
}

async function getCharacters(charApiArray, charLength) {
  let output = [];

  for (let i = 1; i <= 10; i++) {
    await getNames(charApiArray[i]).then((response) => {
      if (response[0] !== "") {
        output.push(response[0]);
      }
    });
  }
  console.log("output: ", output);
  return output;
}

async function getNames(charApiLink) {
  let output = [];
  try {
    let response = await fetch(charApiLink);
    let result = await response.json();
    let name = await result.name;

    output.push(name);
  } catch (error) {
    console.log("characters fetch error: ", error);
  }
  return await output;
}

function createTableChild(rows) {
  console.log("Rows: ", rows);
  let tableElement = document.createElement("table");

  for (let i = 0; i < rows.headings.length; i++) {
    let tr = document.createElement("tr");
    let th = document.createElement("th");
    th.innerHTML = rows.headings[i];
    td = document.createElement("td");
    let key = rows.keys[i];
    console.log("table values", rows[key]);
    td.innerHTML = rows[key];
    tr.appendChild(th);
    tr.appendChild(td);
    tableElement.appendChild(tr);
  }

  return tableElement;
}

let books = document.getElementsByClassName("each-book");

document.querySelectorAll(".page").forEach((page) => {
  page.addEventListener("click", (event) => {
    for (let i = 0; i < books.length; i++) {
      if (i !== +event.target.value) {
        books[i]?.classList.add("display-hidden");
      }
    }
    for (let i = 0; i < books.length; i++) {
      if (i === +event.target.value) {
        books[i]?.classList.remove("display-hidden");
      }
    }

    console.log("button is clicked");
    console.log(event.target.value);
  });
});

allBooksBtn.addEventListener("click", (event) => {
  for (let i = 0; i < books.length; i++) {
    books[i]?.classList.remove("display-hidden");
  }
});

aTag.addEventListener("click", (event) => {
  for (let i = 0; i < books.length; i++) {
    books[i]?.classList.remove("display-hidden");
  }
});

// let trBookName = document.createElement("tr");
// let thBookName = document.createElement("th");
// thBookName.innerHTML = "Book Name";
// let tdBookName = document.createElement("td");
// tdBookName.innerHTML = rows.bookName;
// trBookName.appendChild(thBookName);
// trBookName.appendChild(tdBookName);

// let trIsbn = document.createElement("tr");
// let thIsbn = document.createElement("th");
// thIsbn.innerHTML = "ISBN";
// let tdIsbn = document.createElement("td");
// tdIsbn.innerHTML = rows.isbn;
// trIsbn.appendChild(thIsbn);
// trIsbn.appendChild(tdIsbn);

// let trAuthor = document.createElement("tr");
// let thAuthor = document.createElement("th");
// thAuthor.innerHTML = "Author";
// let tdAuthor = document.createElement("td");
// tdAuthor.innerHTML = rows.authors;
// trAuthor.appendChild(thAuthor);
// trAuthor.appendChild(tdAuthor);

// let trNumberOfPages = document.createElement("tr");
// let thNumberOfPages = document.createElement("th");
// thNumberOfPages.innerHTML = "NumberOfPages";
// let tdNumberOfPages = document.createElement("td");
// tdNumberOfPages.innerHTML = rows.numberOfPages;
// trNumberOfPages.appendChild(thNumberOfPages);
// trNumberOfPages.appendChild(tdNumberOfPages);

// let trPublisherName = document.createElement("tr");
// let thPublisherName = document.createElement("th");
// thPublisherName.innerHTML = "PublisherName";
// let tdPublisherName = document.createElement("td");
// tdPublisherName.innerHTML = rows.publisherName;
// trPublisherName.appendChild(thPublisherName);
// trPublisherName.appendChild(tdPublisherName);

// let trReleasedDate = document.createElement("tr");
// let thReleasedDate = document.createElement("th");
// thReleasedDate.innerHTML = "ReleasedDate";
// let tdReleasedDate = document.createElement("td");
// tdReleasedDate.innerHTML = rows.releasedDate;
// trReleasedDate.appendChild(thReleasedDate);
// trReleasedDate.appendChild(tdReleasedDate);

// let trCharactersList = document.createElement("tr");
// let thCharactersList = document.createElement("th");
// thCharactersList.innerHTML = "CharactersList";
// let tdCharactersList = document.createElement("td");
// tdCharactersList.innerHTML = rows.charactersList.join(",");
// trCharactersList.appendChild(thCharactersList);
// trCharactersList.appendChild(tdCharactersList);

// tableElement.appendChild(trBookName);
// tableElement.appendChild(trIsbn);
// tableElement.appendChild(trAuthor);
// tableElement.appendChild(trNumberOfPages);
// tableElement.appendChild(trPublisherName);
// tableElement.appendChild(trReleasedDate);
// tableElement.appendChild(trCharactersList);
