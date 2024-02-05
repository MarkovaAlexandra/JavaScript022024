/*
Задание 2
Вы разрабатываете систему отзывов для вашего веб-сайта. Пользователи могут оставлять отзывы, но чтобы исключить слишком короткие или слишком длинные сообщения, вы решаете установить некоторые ограничения.

Создайте HTML-структуру с текстовым полем для ввода отзыва, кнопкой для отправки и контейнером, где будут отображаться отзывы.

Напишите функцию, которая будет добавлять отзыв в контейнер с отзывами. Однако если длина введенного отзыва менее 50 или более 500 символов, функция должна генерировать исключение.

При добавлении отзыва, он должен отображаться на странице под предыдущими отзывами, а не заменять их.


*/

const buttonElement = document.querySelector('button');
const inputElement = document.querySelector('input');
const reviewList = document.querySelector('ul');
const userError = document.querySelector('.forError');


buttonElement.addEventListener('click', () => {
    try {
        if (inputElement.value.length > 10 || inputElement.value.length < 3) {
            throw new Error('не соответствует длина отзыва');
        }
        const review = document.createElement('li');
        review.textContent = inputElement.value;
        reviewList.appendChild(review);
    }
    catch (error) {
        userError.textContent = error.message;
    }
})
