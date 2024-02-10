
/*
в этом варианте получаю данные из json файла, 
const signBtn = document.querySelectorAll('.sign'); не работает
const signBtnLive = document.getElementsByClassName('sign'); это тоже почему-то не работает, то есть коллекцию вроде возвращает, но длина ее равна 0, и получить элементы не могу (не знаю почему),
поэтому событие "onclick" навешиваю на кнопку в момент формирования.
в него обязательно надо передать event
*/


//JSON данные расписания

'use strict'


const scheduleBox = document.querySelector('.schedule');

fetch("./data.json")
    .then((response) => response.json())
    .then((data) => formSchedule(data));


function formSchedule(data) {
    for (let item of data) {
        scheduleBox.insertAdjacentHTML('beforeend',
            `
            <div class= "schedule-item" >
                    <h3 class="name">${item.title}</h3>
                    <p class="time">время: <br> <span class="big>"${item.time}</span></p>
                    <p class="descr">максимальное количество участников:</p>
                    <p class="max"> ${item.maxCount}</p>
                    <p class="descr">текущее количество участников:</p>
                    <p class="cur"> ${item.currentCount}</p>
                    <button onclick="signForTraining(event)" class="sign">sign</button>
                    <button onclick="cancelSignForTraning(event)" class="cancel">cancel</button>
                </div >
                `
        )
        localStorage.setItem(item.title, JSON.stringify([item.maxCount, item.currentCount]));
    }
};




console.log('localStorage = ', localStorage);

function getData(event) {

    const items = Object.keys(localStorage);
    const div = event.target.parentElement; // див, в котором кнопка
    const trainingDataAll = div.children;   // все дети дива
    const title = trainingDataAll[0].innerHTML; //название тренировки
    const maxCount = trainingDataAll[3].innerHTML;
    const currentCountElement = trainingDataAll[5];
    let currentCount = null;
    for (let item of items) {
        if (item == title) {
            currentCount = JSON.parse(localStorage.getItem(item))[1];
        }
    }
    // console.log('из гетдата maxcount = ', maxCount, 'currentcount = ', currentCount, 'title= ', title);
    return [title, maxCount, currentCount, currentCountElement];
}

function signForTraining(event) {
    let [title, maxCount, currentCount, currentCountElement] = getData(event);
    if (Number(currentCount) < Number(maxCount)) {
        currentCountElement.innerHTML = (Number(currentCount)) + 1;
        localStorage.setItem(title, JSON.stringify([maxCount, Number(currentCount) + 1]));
        if ((Number(maxCount) - Number(currentCount)) == 1) { //тут надо бы подумать, может
            event.target.disabled = true;
            console.log('ты не влезешь');
        }
    }
}


function cancelSignForTraning(event) {
    let [title, maxCount, currentCount, currentCountElement] = getData(event);
    const signBtn = event.target.previousElementSibling;
    signBtn.disabled = false;
    currentCountElement.innerHTML = (Number(currentCount)) - 1;
    localStorage.setItem(title, JSON.stringify([maxCount, Number(currentCount) - 1]));

}

// localStorage.clear();