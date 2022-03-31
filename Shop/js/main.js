'Use strict'

let cart = {};

function init() {
    // $.post( // Подключаемся к базе данных и получаем оттуда объект с товарами
    //     "../connect/core.php",
    //     {
    //         "action": "init"
    //     },
    //     showGoods
    // );
    $.getJSON('goods.json', showGoods);
}

function showGoods(data) { //функция принимает объект с товарами и отрисовывает их на странице
    // data = JSON.parse(data);
    console.log(data);
    let out = "";
    for (let key in data) { //перебираем полученный объект и заполняем поля
        out += `<div class="main-cart">
                        <div class="cart">
                        <p class="name">${data[key].product_name}</p>
                        <div class="price">${data[key].price} р.</div>
                         <button class="add-to-cart btn btn-outline-primary" data-id="${key}">Купить</button>
                         </div>
                    </div>`;
    };
    $('.goods-out').html(out); // отрисовываем товары на странице
    $('.add-to-cart').on('click', addToCart); //устанавливаем слушатель события по кнопке "купить"
}

function addToCart() { //функция добавляет товар в корзину
    let id = $(this).attr('data-id'); //получаем дата атрибут, чтобы по нему ориентироваться в корзине
    if (cart[id] == undefined) {
        cart[id] = 1;
    } else {
        cart[id]++;
    }
    addCount(); //вызываем функцию счетчика для кнопки корзины
    saveCart();// вызываем функцию сохранения купленных товаров в локальном хранилище
}


function addCount() { //функция - счетчик для кнопки корзины
    let count = document.querySelector('.counter');
    if (count.textContent == 0) {
        count.textContent = Number(1);
    } else {
        count.textContent++

    };
}

function saveCart() { // функция сохраняет товар в локальное хранилище
    localStorage.setItem('cart', JSON.stringify(cart));
}


function loadCart() { //функция загружает товар из локального хранилища
    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));

    };
}

$(document).ready(function () {
    init();
    loadCart();
});