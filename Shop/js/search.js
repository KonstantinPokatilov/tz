'Use strict'

let cart = {};

document.querySelector('.search-form').addEventListener('submit', e => {
    e.preventDefault();
    init();
})


function init() {
    // $.post(
    //     "../connect/core.php",
    //     {
    //         "action": "init"
    //     },
    //     showGoods
    // );

    $.getJSON('goods.json', showGoods);
}

function showGoods(data) {
    // data = JSON.parse(data);
    let dataArray = [];
    for (let id in data) {
        dataArray.push(data[id]);
    }
    let searchValue = document.querySelector('.search-field').value;
    const regexp = new RegExp(searchValue, 'i');
    let filtered = dataArray.filter(product => regexp.test(product.product_name));
    let out = "";
    for (let key in filtered) {
        out += `<div class="main-cart">
                        <div class="cart">
                        <p class="name">${filtered[key].product_name}</p>
                        <div class="price">${filtered[key].price} р.</div>
                         <button class="add-to-cart btn btn-outline-primary" data-id="${+key + 1}">Купить</button>
                         </div>
                    </div>`;
    }
    $('.goods-out').html(out);
    $('.add-to-cart').on('click', addToCart);
}



function addToCart() {
    let id = $(this).attr('data-id');
    if (cart[id] == undefined) {
        cart[id] = 1;
    } else {
        cart[id]++;
    }
    addCount();
    saveCart();
}

function addCount() {
    let count = document.querySelector('.counter');
    if (count.textContent == 0) {
        count.textContent = Number(1);
    } else {
        count.textContent++
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}


function loadCart() {
    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));

    }
}

$(document).ready(function () {
    loadCart();
});


