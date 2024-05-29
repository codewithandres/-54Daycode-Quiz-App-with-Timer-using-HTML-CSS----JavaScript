
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
});