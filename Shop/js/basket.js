'Use strict'

let cart = {};

function loadCart() {
    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
        console.log(cart);
        if (!isEmpty(cart)) {
            $('.main-basket').html('Корзина пуста');
        } else {
            showMainCart();
        };

    } else {
        $('.main-basket').html('Корзина пуста');
    };
}

function showMainCart() {
    if (!isEmpty(cart)) {
        $('.main-basket').html('Корзина пуста');
    } else {
        // $.post(
        //     "../connect/core.php",
        //     {
        //         "action": "init"
        //     },
        //     showGoods
        // );
        $.getJSON('goods.json', showGoods);
    };
}


function showGoods(data) {
    // let goods = JSON.parse(data);
    let out = '';
    for (let id in cart) {
        out += `
                <div>
                    <div class="cart">
                    <button type="button" class="btn-close btn-del" aria-label="Close"
                    data-id="${id}"></button>
                    <p class="name">${data[id].product_name}</p>
                     <p>Колво.${cart[id]} шт.</p>
                     <div class="price">Итого:${data[id].price * cart[id]} р.</div>
                     <button class="btn-plus" data-id="${id}">+</button>
                     <button class="btn-min" data-id="${id}">-</button>
                    </div>
                </div>
                `
    };
    $('.main-basket').html(out);
    $('.btn-del').on('click', delGoods);
    $('.btn-plus').on('click', plusGoods);
    $('.btn-min').on('click', minGoods);
}


function delGoods() { //удаление товаров из корзины
    let id = $(this).attr('data-id');
    delete cart[id];
    saveCart();
    showMainCart();
}

function plusGoods() { //добавляем товары в корзину++
    let id = $(this).attr('data-id');
    cart[id]++;
    saveCart();
    showMainCart();
}

function minGoods() { //уменьшаем товары в корзину++
    let id = $(this).attr('data-id');
    if (cart[id] == 1) {
        delete cart[id];
    } else {
        cart[id]--;
    };
    saveCart();
    showMainCart();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function isEmpty(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            return true;
        } else {
            return false;
        };
    };
}

$(document).ready(function () {
    loadCart();
});