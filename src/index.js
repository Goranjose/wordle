const btnInfo = document.getElementById("info");

btnInfo.addEventListener("click", () => {
  Swal.fire({
    title: "Cómo jugar",
    html: "<p class='info-game'>Después de cada intento el color de las letras cambia para mostrar qué tan cerca estás de acertar la palabra.</br>🟢Verde está en la palabra y en la posición correcta.</br>🟡 Amarillo está en la palabra pero en la posición incorrecta.</br>🟤 Marron no está en la palabra.</p>",
    icon: "info",
  });
});

const keyboard = document.getElementById("keyboard");
const grid = document.getElementById("grid");

const keyboardLetters = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ"],
  ["enter", "z", "x", "c", "v", "b", "n", "m", " "],
];

let listElement = [];
let myAnswer = [];

let myArray = ["platzi", "dormir", "laguna"];

let rand = Math.floor(Math.random() * myArray.length);
let rValue = myArray[rand];

let str = rValue;
let arr = str.split("");

let secretWord = arr;

let spanLetter = document.getElementById("letter");

spanLetter.textContent = secretWord[0].toUpperCase();

let positions = [];
let attempts = 0;

let rows = [];
for (let row = 0; row < 5; row++) {
  const list = document.createElement("ul");
  list.classList.add("grid__row");
  for (let col = 0; col < 6; col++) {
    const listItem = document.createElement("li");
    listItem.classList.add("grid__item");
    listItem.id = `${row}-${col}`;
    list.appendChild(listItem);
  }
  rows.push(list);
}
grid.append(...rows);

keyboardLetters.map((letters) => {
  const list = document.createElement("ul");
  list.classList.add("keyboard__list");
  letters.map((letter) => {
    const listItem = document.createElement("li");
    listItem.classList.add("keyboard__list--item");
    const btnItem = document.createElement("button");
    btnItem.classList.add("keyboard__button");
    btnItem.setAttribute("id", `${letter}`);
    btnItem.textContent = `${letter}`;
    iconDelete = document.createElement("img");
    iconDelete.classList.add("delete-icon");
    iconDelete.src = "./assets/delete.png";
    list.appendChild(listItem);
    listItem.appendChild(btnItem);
    switch (letter) {
      case "enter":
        btnItem.addEventListener("click", () => checkWord());
        break;
      case " ":
        btnItem.classList.add("keyboard__button--delete");
        btnItem.appendChild(iconDelete);
        btnItem.addEventListener("click", () => deleteLetter());
        break;
      default:
        btnItem.addEventListener("click", () => pressLetter(`${letter}`));
    }
  });
  listElement.push(list);
});

keyboard.append(...listElement);

// ENTER BUTTON
const checkWord = () => {
  if (myAnswer.join("") === secretWord.join("")) {
    Swal.fire("Ganaste. Dale al boton de reset");
    let keyboard = document.getElementById("keyboard");
    keyboard.classList.add("keyboard__button--disabled");
  }
  if (attempts === 5) {
    noAttempts();
    return;
  }
  if (myAnswer.length === 6) {
    attempts += 1;
    for (let i = 0; i < 6; i++) {
      switch (true) {
        case myAnswer[i] === secretWord[i]:
          positions.push("green");
          break;
        case secretWord.includes(myAnswer[i]):
          positions.push("yellow");
          break;
        default:
          positions.push("brown");
          break;
      }
    }
    positions.map((color, id) => {
      const item = document.getElementById(`${attempts - 1}-${id}`);
      item.classList.add(color);
    });
    positions = [];
    myAnswer = [];
  } else {
    Swal.fire(`Tu respuesta tiene ${myAnswer.length} caracteres aun le faltan`);
  }
};

// DELETE BUTTON
const deleteLetter = () => {
  if (myAnswer.length === 0) {
    Swal.fire("No tienes nada escrito");
  } else {
    const currentItem = document.getElementById(
      `${attempts}-${myAnswer.length - 1}`
    );
    currentItem.textContent = "";
    myAnswer.pop();
  }

  if (attempts === 5) {
    noAttempts();
    return;
  }
};

const pressLetter = (letter) => {
  if (attempts === 5) {
    noAttempts();
    return;
  }

  keyboard.classList.remove("keyboard__button--disabled");
  if (myAnswer.length < 6) {
    const currentItem = document.getElementById(
      `${attempts}-${myAnswer.length}`
    );
    currentItem.textContent = letter;
    console.log(currentItem.textContent);
    myAnswer.push(letter);
  } else {
    Swal.fire("Tu palabra esta completa. Dale al boton de enter");
  }
};


// RESET BUTTON
const btnReset = document.getElementById("reset");
btnReset.addEventListener("click", () => clickReset());

const clickReset = () => {
  keyboard.classList.remove("keyboard__button--disabled");
  for (let row = 0; row < 5; row++) {
    for (let column = 0; column < 6; column++) {
      const item = document.getElementById(`${row}-${column}`);
      item.textContent = "";
      item.classList.remove("green");
      item.classList.remove("yellow");
      item.classList.remove("brown");
    }
  }
  positions = [];
  attempts = 0;
  listElement = [];
  myAnswer = [];

  rand = Math.floor(Math.random() * myArray.length);
  rValue = myArray[rand];

  str = rValue;
  arr = str.split("");

  secretWord = arr;

  spanLetter = document.getElementById("letter");
  spanLetter.textContent = secretWord[0].toUpperCase();
};

const noAttempts = () => {
  return Swal.fire("Ya no tienes intentos. Dale al boton de reset");
};
