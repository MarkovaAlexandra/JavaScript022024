
/*
Вы разрабатываете веб-страницу для отображения расписания занятий в спортивном клубе. Каждое занятие имеет название, время проведения, максимальное количество участников и текущее количество записанных участников.

1. Создайте веб-страницу с заголовком "Расписание занятий" и областью для отображения занятий.

2. Загрузите информацию о занятиях из предоставленных JSON-данных. Каждое занятие должно отображаться на странице с указанием его названия, времени проведения, максимального количества участников и текущего количества записанных участников.

3. Пользователь может нажать на кнопку "Записаться" для записи на занятие. Если максимальное количество участников уже достигнуто, кнопка "Записаться" становится неактивной.

4. После успешной записи пользователя на занятие, обновите количество записанных участников и состояние кнопки "Записаться".

5. Запись пользователя на занятие можно отменить путем нажатия на кнопку "Отменить запись". После отмены записи, обновите количество записанных участников и состояние кнопки.

6. Все изменения (запись, отмена записи) должны сохраняться и отображаться в реальном времени на странице.
*/


//JSON данные расписания
const schedule = [
    {
        title: 'TotalStretch',
        time: '10:00',
        maxCount: '20',
        currentCount: '10'
    },
    {
        title: 'GymTime Full Body',
        time: '11:00',
        maxCount: '25',
        currentCount: '22'
    },
    {
        title: 'Spirit.Yoga',
        time: '12:00',
        maxCount: '10',
        currentCount: '5'
    },
    {
        title: 'Fighter',
        time: '15:30',
        maxCount: '20',
        currentCount: '15'
    },
    {
        title: 'HardCore',
        time: '15:00',
        maxCount: '20',
        currentCount: '15'
    },
    {
        title: 'Pump It Up',
        time: '17:00',
        maxCount: '20',
        currentCount: '10'
    },
    {
        title: 'Pilates',
        time: '19:00',
        maxCount: '20',
        currentCount: '10'
    }
]
const scheduleBox = document.querySelector('.schedule');
schedule.forEach((item) => {

    scheduleBox.insertAdjacentHTML('beforeend',
        `
    <div class= "schedule-item" >
            <h3 class="name">${item.title}</h3>
            <p class="time">время: <br> ${item.time}</p>
           
            <p class="descr">максимальное количество участников:</p>
            <p class="max"> ${item.maxCount}</p>
           
            <p class="descr">текущее количество участников:</p>
            <p class="cur"> ${item.currentCount}</p>
            <button class="sign">записаться</button>
            <button class="cancel">отменить запись</button>
        </div >
        `
    )
    localStorage.setItem(item.title, JSON.stringify([item.maxCount, item.currentCount]))

})

console.log('localStorage = ', localStorage);

const signBtn = document.querySelectorAll('.sign');
signBtn.forEach((btn) => {
    btn.addEventListener('click', signForTraining);
})
// console.log(signBtn);
const cancelBtn = document.querySelectorAll('.cancel');
cancelBtn.forEach((btn) => {
    btn.addEventListener('click', cancelSignForTraning);
})
// console.log(cancelBtn);


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