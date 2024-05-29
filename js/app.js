import { questions } from "./question.js";

const startBtn = document.querySelector('.start_btn button'),
    infoBox = document.querySelector('.info-box'),
    exitBtn = infoBox.querySelector('.buttons .quit'),
    continueBtn = infoBox.querySelector('.buttons .restart'),
    quizBox = document.querySelector('.quiz_box');
const optionList = document.querySelector('.option_list');

startBtn.addEventListener('click', () => infoBox.classList.add('active'));

exitBtn.addEventListener('click', () => infoBox.classList.remove('active'));

continueBtn.addEventListener('click', () => {

    infoBox.classList.remove('active');
    quizBox.classList.add('activeQuiz');

    showQuestion(0);
    queCounter(1);
});

let queCount = 0;
let queButtom = 1;

const nextBtn = quizBox.querySelector('.next-btn');

nextBtn.addEventListener('click', () => {

    if (queCount < questions.length - 1) {

        queCount++;
        queButtom++;

        showQuestion(queCount);
        queCounter(queButtom);
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
    optionList.innerHTML = optionTag;

    const options = optionList.querySelectorAll('.option p');

    [...options].map(option => {

        option.addEventListener('click', event => optionSelected(event.target));
        //option.setAttribute('onclick', 'optionSelected(this)');
    });
    //console.log(options);
};

const optionSelected = answer => {

    let userAnds = answer.textContent;
    let correntAns = questions[queCount].answer;
    let allOption = optionList.children.length;

    if (userAnds === correntAns) {
        answer.parentElement.classList.add('correct');
    }
    else {
        answer.parentElement.classList.add('incorrect');

        for (let i = 0; i < allOption; i++) {
            if (optionList.children[i].textContent.trim() == correntAns) {
                console.log(`esta opcion es la correcta `);
                optionList.children[i].classList.add('correct');
            };
        };
    };

    for (let i = 0; i < allOption; i++) {
        optionList.children[i].classList.add('disable');
    };

};

const queCounter = index => {

    const buttonQuestCounter = quizBox.querySelector('.total_que');
    let totalQuestCountTag = `<span><p>${index}</p> Of <p>${questions.length}</p> Question</span>`;
    buttonQuestCounter.innerHTML = totalQuestCountTag;
};

