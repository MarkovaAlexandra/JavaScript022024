/*
Создайте интерактивную веб-страницу для оставления и просмотра отзывов о продуктах. Пользователи могут добавлять отзывы о различных продуктах и просматривать добавленные отзывы.

Страница добавления отзыва:

Поле для ввода названия продукта.
Текстовое поле для самого отзыва.
Кнопка "Добавить отзыв", которая сохраняет отзыв о продукте в LocalStorage.

Страница просмотра отзывов:

Показывает список всех продуктов, о которых были оставлены отзывы.
При клике на название продукта отображается список всех отзывов по этому продукту.
Возможность удаления отзыва (при нажатии на кнопку "Удалить" рядом с отзывом, данный отзыв удаляется из LocalStorage).
*/
'use strict'


const addBtn = document.querySelector('.add_btn');
const userInputTitle = document.getElementById('input-title');
const userInputText = document.getElementById('input-text');

addBtn.addEventListener('click', () => {
    const title = userInputTitle.value;
    const text = userInputText.value;
    //получаем список отзывов на продукт по ключу title, приводим его в массив, если нет ничего, то создаем массив
    let prodReviews = JSON.parse(localStorage.getItem(title)) || [];
    prodReviews.push(text);

    localStorage.setItem(title, JSON.stringify(prodReviews));

    userInputText.value = '';
    userInputTitle.value = '';
})

