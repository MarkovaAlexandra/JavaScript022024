
let arr = Object.keys(localStorage); //получаем список ключей из local storage

const loadBtn = document.querySelector('.load_review');

loadBtn.addEventListener('click', () => {
    let check = document.querySelector('.product__list'); // проверяем, есть ли список на странице
    if (check != null) check.remove(); //если уже есть, то удаляем его
    const productList = document.createElement('ul'); //создаем (тег)список для вывода отзывов на страницу
    productList.classList.add('product__list');// и добавляем ему класс, по которому ьудем проверять его наличие при следующем клике
    loadBtn.after(productList);//размещаем этоот список под кнопкой
    let arr = Object.keys(localStorage);//получаем список ключей из local storage

    for (item of arr) {
        const product = document.createElement('li'); //элемент списка на странице
        const title = document.createElement('div'); // в него див с названием
        title.addEventListener('click', showReviews) // на название сразу обработчик, ф-ция ниже
        title.classList.add('product__title')
        title.innerHTML = item;
        product.prepend(title);
        productList.prepend(product);
    }
})


function showReviews(event) {
    // console.log(event);
    // console.log('event target = ', event.target); // это по какой из кнопок кликнули

    let userTarget = event.target.innerHTML;//это название продукта, на который кликнули
    let arr = Object.keys(localStorage);//это массив названий

    for (item of arr) {
        if (item == userTarget) {
            let productReviews = document.createElement('div');//создаем контейнер для отзывов
            //если он уже создан (то есть ф-ция уже вызывалась), удаляем его
            if (event.target.nextElementSibling != null) event.target.nextElementSibling.remove();

            event.target.after(productReviews); //контейнер для отзывов размещаем на странице под названием продукта
            let revList = document.createElement('ul');//в контейнере список ul для отзывов
            productReviews.append(revList);
            let prodReviewdata = JSON.parse(localStorage.getItem(item));//получаем список отзывов

            for (let review of prodReviewdata) {
                let element = document.createElement('li');//создаем тег ли, в него кладем текст отзыва
                element.innerHTML = review;
                let delBtn = document.createElement('button');//создаем кнопку "удалить отзыв"
                delBtn.classList.add('del-btn');
                delBtn.innerHTML = 'удалить отзыв';
                delBtn.addEventListener('click', deleteReview)// вешаем на кнопку событие
                element.append(delBtn);
                revList.prepend(element);//ли с отзывом препендим в ул с отзывами
            }

        }
    }
}

function deleteReview(event) {
    // //тут закомментированы все дети, родители и братья, использованные для поиска
    console.log('я событие с кнопки удалить', event);
    console.log('я таргет события с кнопки удалить', event.target);
    console.log('я предыдущий брат события с кнопки удалить', event.target.previousElementSibling)
    console.log('я родитель кнопки удалить, меня тоже надо удалить', event.target.parentElement);

    const reviewToDelete = event.target.parentElement;
    console.log('я текст отзыва', event.target.parentElement.innerHTML);
    let reviewText = event.target.parentElement.innerHTML;//текст с родителя кнопки удалить
    let reviewTextArr = reviewText.split('<');
    // console.log('сплитанули', reviewTextArr);
    reviewText = reviewTextArr[0];
    const targetValue = reviewText;
    console.log('я  брат родителя родителя родителя кнопки удалить',
        event.target.parentElement.parentElement.parentElement.previousElementSibling);
    console.log('я текст брат родителя родителя родителя кнопки удалить(название продукта, отзыв по которому нужно удалить)',
        event.target.parentElement.parentElement.parentElement.previousElementSibling.innerHTML);
    const targetKey = event.target.parentElement.parentElement.parentElement.previousElementSibling.innerHTML;
    // console.log('проверка - продукт!!!', targetKey);
    // console.log('проверка - отзыв!!!', targetValue)

    let arr = Object.keys(localStorage);
    for (let item of arr) {
        if (item === targetKey) {
            let values = JSON.parse(localStorage.getItem(item)); // массив отзывов
            for (let i = 0; i < values.length; i++) {
                if (values[i] === targetValue) {
                    values.splice(i, 1); //вырезали отзыв из массива
                }
            }
            localStorage.setItem(targetKey, JSON.stringify(values));
            reviewToDelete.remove();
        }
    }


}
// localStorage.clear();