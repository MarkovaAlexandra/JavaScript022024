/*Задание 1
Представьте, что у вас есть класс для управления библиотекой. В этом классе будет приватное свойство для хранения списка книг, а также методы для добавления книги, удаления книги и получения информации о наличии книги.

Класс должен содержать приватное свойство #books, которое инициализируется пустым массивом и представляет собой список книг в библиотеке.

Реализуйте геттер allBooks, который возвращает текущий список книг.

Реализуйте метод addBook(title), который позволяет добавлять книгу в список. Если книга с таким названием уже существует в списке, выбросьте ошибку с соответствующим сообщением.

Реализуйте метод removeBook(title), который позволит удалять книгу из списка по названию. Если книги с таким названием нет в списке, выбросьте ошибку с соответствующим сообщением.

Реализуйте метод hasBook(title), который будет проверять наличие книги в библиотеке и возвращать true или false в зависимости от того, есть ли такая книга в списке или нет.

Реализуйте конструктор, который принимает начальный список книг (массив) в качестве аргумента. Убедитесь, что предоставленный массив не содержит дубликатов; в противном случае выбрасывайте ошибку.
*/

class Book {
    constructor(title) {
        this.title = title;
    }
}
class Library {
    #books = [];
    constructor(books) {
        if (books.length != new Set(books).size) {
            throw new Error('список книг содержит дубликаты, библиотека не создана');
        }
        this.#books = books;
    }

    getAllBooks() {
        return this.#books;
    }

    addBook(book) {
        if (this.#books.length == 0) {
            throw new Error('библиотека не создана');
        }
        try {
            for (let item of this.#books) {
                if (item === book) {
                    throw new Error('такая книга уже добавлена');
                }
            }
            this.#books.push(book);
        }
        catch { console.error('такая книга уже добавлена'); }
    }

    removeBook(book) {
        try {
            let flag = false;
            for (let i = 0; i < this.#books.length; i++) {
                if (this.#books[i] === book) {
                    this.#books.splice(i, 1);
                    flag = true;
                }
            }
            if (flag == true) {
                console.log(`книга ${book.title} удалена`);
            }
            if (flag == false) {
                throw new Error('такой книги нет в списке');
            }
        }
        catch {
            console.error('такой книги нет в списке');
        }
    }


    hasBook(book) {
        for (let item of this.#books) {
            if (item === book) {
                return true;
            }
        }
        return false;
    }
}
const aliceInWonderland = new Book('Alice in a wonderland');
const evgeniyOnegin = new Book('Evgeniy Onegin');
const warAndPeace = new Book('War and Peace');

const goneWithTheWind = new Book('Gone with the Wind');
const bookList = [aliceInWonderland, evgeniyOnegin];

const library = new Library(bookList);
console.log(library);
library.addBook(goneWithTheWind);
library.addBook(goneWithTheWind);
console.log(library.getAllBooks());
library.removeBook(evgeniyOnegin);
library.removeBook(evgeniyOnegin);
console.log(library.getAllBooks());
console.log(library.hasBook(aliceInWonderland));
console.log(library.hasBook(evgeniyOnegin));
library.addBook(warAndPeace);
console.log(library.getAllBooks());
