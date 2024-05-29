import { questions } from "./question.js";

const startBtn = document.querySelector('.start_btn button'),
    infoBox = document.querySelector('.info-box'),
    exitBtn = infoBox.querySelector('.buttons .quit'),
    continueBtn = infoBox.querySelector('.buttons .restart'),
    quizBox = document.querySelector('.quiz_box');

startBtn.addEventListener('click', () => infoBox.classList.add('active'));

exitBtn.addEventListener('click', () => infoBox.classList.remove('active'));

continueBtn.addEventListener('click', () => {

    infoBox.classList.remove('active');
    quizBox.classList.add('activeQuiz');
    showQuestion(0);
});

let queCount = 0;

const nextBtn = quizBox.querySelector('.next-btn');

nextBtn.addEventListener('click', () => {

    if (queCount < questions.length - 1) {

        queCount++;
        showQuestion(queCount);
    } else {

        console.log('Question completed.');
    };
});

const showQuestion = index => {

    const quuText = document.querySelector('.que_text');
    const optionList = document.querySelector('.option_list');

    let queTag = `<p>${questions[index].numb}. ${questions[index].question}</p>`;
    let optionTag = `

        <article class="option">
            <p>${questions[index].options[0]}</p>
            <span class="icon tick"><i class="ri-check-fill"></i></span>
        </article>
        
        <article class="option">
            <p>${questions[index].options[1]}</p>
            <span class="icon croos"><i class="ri-close-line"></i></span>
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

    quuText.innerHTML = queTag;
    optionList.innerHTML = optionTag
};