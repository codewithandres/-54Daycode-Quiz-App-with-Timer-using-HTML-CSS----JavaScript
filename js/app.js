import { questions } from "./question.js";

const startBtn = document.querySelector('.start_btn button'),
    infoBox = document.querySelector('.info-box'),
    exitBtn = infoBox.querySelector('.buttons .quit'),
    continueBtn = infoBox.querySelector('.buttons .restart'),
    quizBox = document.querySelector('.quiz_box');
const optionList = document.querySelector('.option_list');
const timeCount = document.querySelector('.timer .timer_second')
const timeLine = document.querySelector('.time_line');

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

const nextBtn = quizBox.querySelector('.next-btn');

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
    } else {

        console.log('Question completed.');
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
            timeCount.textContent = `0:0s`
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

