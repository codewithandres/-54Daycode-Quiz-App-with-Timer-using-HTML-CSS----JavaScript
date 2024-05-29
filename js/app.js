import { questions } from "./question.js";

const startBtn = document.querySelector('.start_btn button'),
    infoBox = document.querySelector('.info-box'),
    exitBtn = infoBox.querySelector('.buttons .quit'),
    continueBtn = infoBox.querySelector('.buttons .restart'),
    quizBox = document.querySelector('.quiz_box');
const optionList = document.querySelector('.option_list');
const timeCount = document.querySelector('.timer .timer_second')
const timeLine = document.querySelector('.time_line');
const timeOff = document.querySelector('header .Time_text');

startBtn.addEventListener('click', () => infoBox.classList.add('active'));

exitBtn.addEventListener('click', () => infoBox.classList.remove('active'));

continueBtn.addEventListener('click', () => {

    infoBox.classList.remove('active');
    quizBox.classList.add('activeQuiz');

    showQuestion(0);
    queCounter(1);
    startTimer(15);
    counterTimeLIne(0)
});

let queCount = 0;
let queButtom = 1;
let counter;
let couterLine;
let timeValue = 15;
let valueWhidth = 0;
let userCore = 0;

const nextBtn = quizBox.querySelector('.next-btn');
const resultBox = document.querySelector('.result-box');
const restarBtn = document.querySelector('.result-box .restart');
const quitBtn = document.querySelector('.result-box .quit');

console.log(quitBtn, restarBtn);

quitBtn.addEventListener('click', () => window.location.reload());

restarBtn.addEventListener('click', () => {

    resultBox.classList.remove('activeResult');
    quizBox.classList.add('activeQuiz')
    let queCount = 0;
    let queButtom = 1;
    let couterLine;
    let timeValue = 15;
    let valueWhidth = 0;
    let userCore = 0;

    showQuestion(queCount);
    queCounter(queButtom);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(couterLine);
    counterTimeLIne(valueWhidth);

    nextBtn.style.display = 'none';
    timeOff.textContent = `Time Left`;

})

nextBtn.addEventListener('click', () => {

    if (queCount < questions.length - 1) {

        queCount++;
        queButtom++;

        showQuestion(queCount);
        queCounter(queButtom);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(couterLine);
        counterTimeLIne(valueWhidth);

        nextBtn.style.display = 'none';
        timeOff.textContent = `Time Left`;

    } else {

        clearInterval(counter);
        clearInterval(couterLine);
        showResultBox();
    };
});

const showQuestion = index => {

    const quuText = document.querySelector('.que_text');

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

    quuText.innerHTML = queTag;
    optionList.innerHTML = optionTag;

    const options = optionList.querySelectorAll('.option p');

    [...options].map(option => {

        option.addEventListener('click', event => optionSelected(event.target));
    });
};

let tickIcon = `<span class="icon tick"><i class="ri-check-fill"></i></span>`;
let corssIcon = ` <span class="icon croos"><i class="ri-close-line"></i></span>`;

const optionSelected = answer => {

    let userAnds = answer.textContent;
    let correntAns = questions[queCount].answer;
    let allOption = optionList.children.length;

    clearInterval(counter);
    clearInterval(couterLine)

    if (userAnds === correntAns) {
        userCore += 1;

        answer.parentElement.classList.add('correct');
        answer.parentElement.insertAdjacentHTML('beforeend', tickIcon);
    }
    else {
        answer.parentElement.classList.add('incorrect');
        answer.parentElement.insertAdjacentHTML('beforeend', corssIcon);

        for (let i = 0; i < allOption; i++) {
            if (optionList.children[i].textContent.trim() == correntAns) {

                optionList.children[i].classList.add('correct');
                optionList.children[i].insertAdjacentHTML('beforeend', tickIcon);
            };
        };
    };

    for (let i = 0; i < allOption; i++) {
        optionList.children[i].classList.add('disable');
    };
    nextBtn.style.display = 'block';
};

const showResultBox = () => {

    infoBox.classList.remove('active');
    quizBox.classList.remove('activeQuiz');
    resultBox.classList.add('activeResult');

    const scoreText = resultBox.querySelector('.score-text');

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

const startTimer = time => {

    counter = setInterval(() => {
        timeCount.textContent = `${time}s`;
        time--;

        if (time < 9) {
            let addZero = timeCount.textContent;

        };

        if (time < 0) {
            clearInterval(counter)
            timeCount.textContent = `0:0s`;
            timeOff.textContent = `Time off`;

            let correntAns = questions[queCount].answer;
            let allOption = optionList.children.length;

            for (let i = 0; i < allOption; i++) {
                if (optionList.children[i].textContent.trim() == correntAns) {

                    optionList.children[i].classList.add('correct');
                    optionList.children[i].insertAdjacentHTML('beforeend', tickIcon);
                };
            };
            for (let i = 0; i < allOption; i++) {
                optionList.children[i].classList.add('disable');
            };
            nextBtn.style.display = 'block';
        };
    }, 1000);
};

const counterTimeLIne = time => {

    couterLine = setInterval(() => {
        time += 1;
        timeLine.style.width = `${time}px`
        if (time > 549) clearInterval(couterLine);
    }, 29);
};


const queCounter = index => {

    const buttonQuestCounter = quizBox.querySelector('.total_que');
    let totalQuestCountTag = `<span><p>${index}</p> Of <p>${questions.length}</p> Question</span>`;
    buttonQuestCounter.innerHTML = totalQuestCountTag;
};


