console.log('hello,world');
/*
Задание 1
• Используя Symbol.iterator, создайте объект "Музыкальная коллекция", который можно итерировать. Каждая итерация должна возвращать следующий альбом из коллекции.

• Создайте объект musicCollection, который содержит массив альбомов и имеет свойство-символ Symbol.iterator. Каждый альбом имеет следующую структуру:

{
title: "Название альбома",
artist: "Исполнитель",
year: "Год выпуска"
}

• Реализуйте кастомный итератор для объекта musicCollection. Итератор должен перебирать альбомы по порядку.
• Используйте цикл for...of для перебора альбомов в музыкальной коллекции и вывода их на консоль в формате: Название альбома - Исполнитель (Год выпуска)
*/
const musicCollection = {
    collection: [
        {
            title: "Название альбома",
            artist: "Исполнитель",
            year: "Год выпуска",
        },
        {
            title: "Название альбома1",
            artist: "Исполнитель1",
            year: "Год выпуска1",
        },
        {
            title: "Название альбома2",
            artist: "Исполнитель2",
            year: "Год выпуска2",
        }
    ]
}

/*почему нельзя сделать так?
for (let key of musicCollection.collection) {
    console.log(`${key.title} - ${key.artist} (${key.year})`);
 }
*/

musicCollection[Symbol.iterator] = function () {
    return {
        collection: this.collection,
        current: 0,
        last: this.collection.length,
        next() {
            if (this.current <= this.last) {
                return {
                    done: false, value: this.collection[this.current++]
                };
            } else {
                return { done: true };
            }
        }
    };

}
for (let album of musicCollection) {
    console.log(album);
}


/*

Задание 2
Вы управляете рестораном, в котором работают разные повара, специализирующиеся на определенных блюдах. Клиенты приходят и делают заказы на разные блюда.

Необходимо создать систему управления этими заказами, которая позволит:

• Отслеживать, какой повар готовит какое блюдо.
• Записывать, какие блюда заказал каждый клиент.

Используйте коллекции Map для хранения блюд и их поваров, а также для хранения заказов каждого клиента. В качестве ключей для клиентов используйте объекты.

Повара и их специализации:

Виктор - специализация: Пицца.
Ольга - специализация: Суши.
Дмитрий - специализация: Десерты.

Блюда и их повара:

Пицца "Маргарита" - повар: Виктор.
Пицца "Пепперони" - повар: Виктор.
Суши "Филадельфия" - повар: Ольга.
Суши "Калифорния" - повар: Ольга.
Тирамису - повар: Дмитрий.
Чизкейк - повар: Дмитрий.

Заказы:

Клиент Алексей заказал: Пиццу "Пепперони" и Тирамису.
Клиент Мария заказала: Суши "Калифорния" и Пиццу "Маргарита".
Клиент Ирина заказала: Чизкейк.
*/


//класс для блюд
class Dish {
    constructor(name) {
        this.name = name;
    }
}

// класс работников 
class Worker {
    constructor(name, speciality) {
        this.name = name,
            this.speciality = speciality
    }
}

//класс клиентов
class Client {
    constructor(name, contact) {
        this.name = name,
            this.contact = contact
    }
}


// map ы для хранения
const nowCooking = new Map();
const orders = new Map();

//создаем работников
const viktor = new Worker('Viktor', 'pizza');
const olga = new Worker('Olga', 'sushi');
const dmitriy = new Worker('Dmitriy', 'desserts');

//создаем меню
const peperoni = new Dish('pizza Pepperoni');
const margarita = new Dish('pizza Margarita');
const filadelfia = new Dish('sushi Filadelfia');
const california = new Dish('sushi California');
const tiramisu = new Dish('Tiramisu');
const cheesecake = new Dish('cheesecake');

//кто что готовит
nowCooking.set(peperoni, viktor)
    .set(margarita, viktor)
    .set(california, olga)
    .set(filadelfia, olga)
    .set(cheesecake, dmitriy)
    .set(tiramisu, dmitriy);
console.log(nowCooking);

//наши клиенты
const client1 = new Client('John', '123-45-78');
const client2 = new Client('Bill', '456-78-78');

//оформляем заказы

const order1 = [];
order1.push(peperoni);
order1.push(tiramisu);
console.log(order1)
const order2 = [];
order2.push(filadelfia, cheesecake, peperoni);

//добавляем заказы в (бд, бухгалтерию...)
orders.set(client1, order1);
orders.set(client2, order2);
console.log(orders);
