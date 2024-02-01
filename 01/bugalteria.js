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
    constructor(name, price) {
        this.name = name;
        this.price = price

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
const peperoni = new Dish('pizza Pepperoni', 500);
const margarita = new Dish('pizza Margarita', 600);
const filadelfia = new Dish('sushi Filadelfia', 700);
const california = new Dish('sushi California', 650);
const tiramisu = new Dish('Tiramisu', 300);
const cheesecake = new Dish('cheesecake', 330);

//кто что готовит
nowCooking.set(peperoni, viktor)
    .set(margarita, viktor)
    .set(california, olga)
    .set(filadelfia, olga)
    .set(cheesecake, dmitriy)
    .set(tiramisu, dmitriy);
// console.log(nowCooking);

//наши клиенты
const client1 = new Client('John', '123-45-78');
const client2 = new Client('Bill', '456-78-78');

//оформляем заказы

const order1 = new Map();
order1.set(peperoni, 1);
order1.set(tiramisu, 2);
// console.log(order1)
const order2 = new Map();
order2.set(margarita, 3);
order2.set(cheesecake, 5);

//добавляем заказы в (бд, бухгалтерию...)
orders.set(client1, order1);
orders.set(client2, order2);
// console.log(orders);

const bugalteria = [];
bugalteria.push(order1, order2)
class Buh {
    constructor(array) {
        this.array = array;
    }
    printOrder(index) {
        let orderSum = 0;
        for (let key of this.array[index]) {
            console.log(`${key[0].name}`);
            console.log(`цена ${key[0].price}`);
            console.log(`количество ${key[1]}`);
            console.log('--------------');
            let currentSum = key[0].price * key[1];
            orderSum += currentSum;
        }
        console.log(`total - ${orderSum}`);
        return orderSum;
    }

    totalOrders() {
        let total = 0;
        let current = 0
        for (let i = 0; i < this.array.length; i++) {
            current = this.printOrder(i);
            total += current;
            console.log(`сумма заказа = ${current}`);
            console.log(`общая сумма = ${total}`);
            current = 0;
        }

        // console.log(`current = ${current}`);
        // console.log(`total = ${total}`);
        return total;
    }
}

const buhi = new Buh(bugalteria);
const order0sum = buhi.printOrder(0);
console.log(order0sum);
console.log('*****************************');
console.log(buhi.totalOrders());

