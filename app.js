const input = document.querySelector("input");
const button = document.querySelector("button");
const buttonNewGame = document.querySelector("#buttonnewgame");
const result = document.querySelector("#result");
const win = document.querySelector("#win");
const loss = document.querySelector("#loss");
const lives = document.querySelector("#lives");
const attempts = document.querySelector("#attempts");
let randomNumber = random();

let guesses = [];
let attemptsLeft = 10;

button.addEventListener("click", () => {

    const guess = parseInt(input.value);
    guesses.push(guess);

    if (input.value == 0) {
        return
    }

    if (input.value > 100) {
        alert('Введите значение от 1 до 100')
        return
    }

    // Сообщаем игроку, угадал ли он число
    if (guess < randomNumber) {
        input.value = ""
        result.innerHTML += "<li>" + "Число больше" + "</li>";
    } else {
        input.value = ""
        result.innerHTML += "<li>" + "Число меньше" + "</li>";
    }

    // Добавляем попытку в список
    attempts.innerHTML += "<li>" + guess + "</li>";

    // Уменьшаем количество попыток
    attemptsLeft--;


    // Проверяем, закончилась ли игра
    if (attemptsLeft === 0) {
        remove(attempts)
        remove(result)
        loss.textContent = "Вы проиграли!";
        button.disabled = true;
        buttonNewGame.style.display = "block";
    }

    //Новая игра
    buttonNewGame.addEventListener("click", () => {
        win.textContent = "";
        loss.textContent = "";
        result.textContent = "";
        attemptsLeft = 10;
        button.disabled = false;
        buttonNewGame.style.display = "none";
        remove(result)
        randomNumber = random();
        lives.textContent = attemptsLeft;
    });

    if (guess === randomNumber) {
        win.innerHTML = "Вы угадали, число было - " + randomNumber + `<br>` + " Попыток использовано - " + (guesses.length);
        button.disabled = true;
        remove(attempts)
        remove(result)
        buttonNewGame.style.display = "block";
    }

    function remove(object) {
        while (object.firstChild) {
            object.removeChild(object.firstChild);
        }
    }

    lives.textContent = attemptsLeft;
});

function random() {
    return Math.floor(Math.random() * 100) + 1;
}

document.addEventListener("keydown", function(event) {
    // Проверяем, была ли нажата клавиша "Enter"
    if (event.key === "Enter") {
        // Симулируем клик на кнопку, когда нажата клавиша "Enter"
        button.click();
    }
});