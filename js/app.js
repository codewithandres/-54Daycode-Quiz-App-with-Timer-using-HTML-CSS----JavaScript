// Importamos las preguntas desde el archivo question.js
import { questions } from "./question.js";

// Seleccionamos los elementos necesarios del DOM
const startBtn = document.querySelector('.start_btn button'),
    infoBox = document.querySelector('.info-box'),
    exitBtn = infoBox.querySelector('.buttons .quit'),
    continueBtn = infoBox.querySelector('.buttons .restart'),
    quizBox = document.querySelector('.quiz_box');
const optionList = document.querySelector('.option_list');
const timeCount = document.querySelector('.timer .timer_second')
const timeLine = document.querySelector('.time_line');
const timeOff = document.querySelector('header .Time_text');

// Agregamos un evento de click al botón de inicio para mostrar la caja de información
startBtn.addEventListener('click', () => infoBox.classList.add('active'));

// Agregamos un evento de click al botón de salida para ocultar la caja de información
exitBtn.addEventListener('click', () => infoBox.classList.remove('active'));

// Agregamos un evento de click al botón de continuar para iniciar el cuestionario
continueBtn.addEventListener('click', () => {

    // Ocultamos la caja de información y mostramos la caja del cuestionario
    infoBox.classList.remove('active');
    quizBox.classList.add('activeQuiz');

    // Mostramos la primera pregunta, iniciamos el contador de preguntas y el temporizador
    showQuestion(0);
    queCounter(1);
    startTimer(15);
    counterTimeLIne(0);
});

// Inicializamos las variables necesarias
let queCount = 0;
let queButtom = 1;
let counter;
let couterLine;
let timeValue = 15;
let valueWhidth = 0;
let userCore = 0;

// Seleccionamos los botones de siguiente, reiniciar y salir
const nextBtn = quizBox.querySelector('.next-btn');
const resultBox = document.querySelector('.result-box');
const restarBtn = document.querySelector('.result-box .restart');
const quitBtn = document.querySelector('.result-box .quit');

// Agregamos un evento de click al botón de salir para recargar la página
quitBtn.addEventListener('click', () => window.location.reload());

// Agregamos un evento de click al botón de reiniciar para reiniciar el cuestionario
restarBtn.addEventListener('click', () => {

    // Ocultamos la caja de resultados y mostramos la caja del cuestionario
    resultBox.classList.remove('activeResult');
    quizBox.classList.add('activeQuiz')

    // Reiniciamos las variables necesarias
    let queCount = 0;
    let queButtom = 1;
    let couterLine;
    let timeValue = 15;
    let valueWhidth = 0;
    let userCore = 0;

    // Mostramos la primera pregunta, iniciamos el contador de preguntas y el temporizador
    showQuestion(queCount);
    queCounter(queButtom);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(couterLine);
    counterTimeLIne(valueWhidth);

    // Ocultamos el botón de siguiente y reiniciamos el texto del temporizador
    nextBtn.style.display = 'none';
    timeOff.textContent = `Time Left`;

})

// Agregamos un evento de click al botón de siguiente para pasar a la siguiente pregunta
nextBtn.addEventListener('click', () => {

    // Si aún quedan preguntas por responder
    if (queCount < questions.length - 1) {

        // Incrementamos el contador de preguntas y mostramos la siguiente pregunta
        queCount++;
        queButtom++;

        showQuestion(queCount);
        queCounter(queButtom);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(couterLine);
        counterTimeLIne(valueWhidth);

        // Ocultamos el botón de siguiente y reiniciamos el texto del temporizador
        nextBtn.style.display = 'none';
        timeOff.textContent = `Time Left`;

    } else {

        // Si ya no quedan preguntas por responder, mostramos la caja de resultados
        clearInterval(counter);
        clearInterval(couterLine);
        showResultBox();
    };
});

// Función para mostrar una pregunta
const showQuestion = index => {

    const quuText = document.querySelector('.que_text');

    // Creamos el HTML de la pregunta y las opciones de respuesta
    let queTag = `<p>${questions[index].numb}. ${questions[index].question}</p>`;
    let optionTag = `

        <article class="option">
            <p>${questions[index].options[0]}</p>
            
        </article>
        
        <article class="option">
            <p>${questions[index].options[1]}</p>
           
        </article>

        <article class="option">
            <p>${questions[index].options[2]}</p>
            <span class="icon"></span>
        </article>

        <article class="option">
            <p>${questions[index].options[3]}</p>
            <span class="icon"></span>
        </article>
    `;

    // Insertamos el HTML de la pregunta y las opciones de respuesta en el DOM
    quuText.innerHTML = queTag;
    optionList.innerHTML = optionTag;

    // Seleccionamos todas las opciones de respuesta
    const options = optionList.querySelectorAll('.option p');

    // Agregamos un evento de click a cada opción de respuesta
    [...options].map(option => {

        option.addEventListener('click', event => optionSelected(event.target));
    });
};

// Creamos el HTML de los iconos de correcto e incorrecto
let tickIcon = `<span class="icon tick"><i class="ri-check-fill"></i></span>`;
let corssIcon = ` <span class="icon croos"><i class="ri-close-line"></i></span>`;

// Función para manejar la selección de una opción de respuesta
const optionSelected = answer => {

    // Obtenemos la respuesta del usuario y la respuesta correcta
    let userAnds = answer.textContent;
    let correntAns = questions[queCount].answer;
    let allOption = optionList.children.length;

    // Detenemos el temporizador
    clearInterval(counter);
    clearInterval(couterLine)

    // Si la respuesta del usuario es correcta
    if (userAnds === correntAns) {
        userCore += 1;

        // Marcamos la opción de respuesta como correcta y mostramos el icono de correcto
        answer.parentElement.classList.add('correct');
        answer.parentElement.insertAdjacentHTML('beforeend', tickIcon);
    }
    else {
        // Si la respuesta del usuario es incorrecta

        // Marcamos la opción de respuesta como incorrecta y mostramos el icono de incorrecto
        answer.parentElement.classList.add('incorrect');
        answer.parentElement.insertAdjacentHTML('beforeend', corssIcon);

        // Marcamos la opción de respuesta correcta y mostramos el icono de correcto
        for (let i = 0; i < allOption; i++) {
            if (optionList.children[i].textContent.trim() == correntAns) {

                optionList.children[i].classList.add('correct');
                optionList.children[i].insertAdjacentHTML('beforeend', tickIcon);
            };
        };
    };

    // Deshabilitamos todas las opciones de respuesta
    for (let i = 0; i < allOption; i++) {
        optionList.children[i].classList.add('disable');
    };
    nextBtn.style.display = 'block';
};

// Función para mostrar la caja de resultados
const showResultBox = () => {

    // Ocultamos la caja de información y la caja del cuestionario y mostramos la caja de resultados
    infoBox.classList.remove('active');
    quizBox.classList.remove('activeQuiz');
    resultBox.classList.add('activeResult');

    const scoreText = resultBox.querySelector('.score-text');

    // Mostramos el puntaje del usuario
    if (scoreText > 3) {
        let scoreTag = ` <span>and congrats!, you got only <p>${userCore}</p> out of <p>${questions.length}</p></span>`;
        scoreText.innerHTML = scoreTag;
    }
    else if (scoreText > 1) {
        let scoreTag = ` <span>and nice!, you got only <p>${userCore}</p> out of <p>${questions.length}</p></span>`;
        scoreText.innerHTML = scoreTag;
    }
    else {
        let scoreTag = ` <span>and sorry, you got only <p>${userCore}</p> out of <p>${questions.length}</p></span>`;
        scoreText.innerHTML = scoreTag;
    };
};
// Función para iniciar el temporizador
const startTimer = time => {

    // Iniciamos el temporizador
    counter = setInterval(() => {
        timeCount.textContent = `${time}s`;
        time--;

        // Si el tiempo es menor a 9, agregamos un cero al principio
        if (time < 9) {
            let addZero = timeCount.textContent;

        };

        // Si el tiempo se agota, detenemos el temporizador y mostramos el botón de siguiente
        if (time < 0) {
            clearInterval(counter)
            timeCount.textContent = `0:0s`;
            timeOff.textContent = `Time off`;

            let correntAns = questions[queCount].answer;
            let allOption = optionList.children.length;

            // Marcamos la opción de respuesta correcta y mostramos el icono de correcto
            for (let i = 0; i < allOption; i++) {
                if (optionList.children[i].textContent.trim() == correntAns) {

                    optionList.children[i].classList.add('correct');
                    optionList.children[i].insertAdjacentHTML('beforeend', tickIcon);
                };
            };

            // Deshabilitamos todas las opciones de respuesta
            for (let i = 0; i < allOption; i++) {
                optionList.children[i].classList.add('disable');
            };
            nextBtn.style.display = 'block';
        };
    }, 1000);
};

// Función para iniciar la línea de tiempo
const counterTimeLIne = time => {

    // Iniciamos la línea de tiempo
    couterLine = setInterval(() => {
        time += 1;
        timeLine.style.width = `${time}px`
        if (time > 549) clearInterval(couterLine);
    }, 29);
};

// Función para actualizar el contador de preguntas
const queCounter = index => {

    // Actualizamos el contador de preguntas
    const buttonQuestCounter = quizBox.querySelector('.total_que');
    let totalQuestCountTag = `<span><p>${index}</p> Of <p>${questions.length}</p> Question</span>`;
    buttonQuestCounter.innerHTML = totalQuestCountTag;
};
