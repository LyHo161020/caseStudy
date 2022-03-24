let products = [];
let smartPhones;
let laptop;
let searchProducts;
let cart = [];
let favouriteProducts = [];
let intoMoney = [];

const productData = "productData";
const favouriteData = "favouriteData";
const cartData = "cartData";
const intoMoneyData = "intoMoneyData";

document.getElementById("add-Product").addEventListener('click', () => {
    let product = {};
    let name = document.getElementById("name-product").value;
    let image = document.getElementById("img-product").value;
    let amount = document.getElementById("amount-product").value;
    let price = document.getElementById("price-product").value;
        price = addCharactor(price + "₫");
    let type = document.getElementById("type-product").value;
    product.type = type;
    product.name = name;
    product.image = image;
    product.amount = amount;
    product.price = price;
    product.cartStatus = false;
    products.favoriteStatus = false;
    products.push(product);
    setLocalStorage(productData, products);
    showProduct();
});

document.querySelector(".sub-menu>ul>li").addEventListener('click', showSmartPhone = () => {
    document.getElementById("show-smartphone").style.display = "block";
    document.getElementById("show-laptop").style.display = "none";
    document.getElementById("show-search").style.display = "none";
    document.getElementById("show-product").style.display = "none";
    document.getElementById("add-product").style.display = "none";
    document.getElementById("show-favorite-product").style.display = "none";
    document.getElementById("show-cart").style.display = "none";
    smartPhones = [];
    for (let element of products) {
        if (element.type == "điện thoại") {
            smartPhones.push(element);
        }
    }
    show(smartPhones, `show-smartphone`);
});

document.querySelector("#laptop").addEventListener('click', showLaptop = () => {
    document.getElementById("show-laptop").style.display = "block";
    document.getElementById("show-smartphone").style.display = "none";
    document.getElementById("show-search").style.display = "none";
    document.getElementById("show-product").style.display = "none";
    document.getElementById("add-product").style.display = "none";
    document.getElementById("show-favorite-product").style.display = "none";
    document.getElementById("show-cart").style.display = "none";
        laptop = [];
        for (let element of products) {
            if (element.type == "laptop") {
                laptop.push(element);
            }
        }
        show(laptop, `show-laptop`);
        // document.getElementById('show-laptop').scrollIntoView();
});

const init = () => {
    if (getLocalStorage(productData) == null) {
        products = [{
                type: "điện thoại",
                name: 'Samsung Galaxy Note 21',
                image: 'source/galaxy-note-21.jpg',
                amount: 10,
                favoriteStatus: false,
                cartStatus: false,
                price: '29.000.000₫'
            },
            {
                type: "điện thoại",
                name: 'Apple iPhone 12 Mini New',
                image: 'source/apple-iphone-12-mini-new.jpg',
                amount: 10,
                favoriteStatus: false,
                cartStatus: false,
                price: '26.000.000₫'
            },
            {
                type: "điện thoại",
                name: 'iPhone XR - Vàng Chính Hãng VN/A',
                image: 'source/iphone-xr-mau-vang.jpg',
                amount: 10,
                favoriteStatus: false,
                cartStatus: false,
                price: '8.000.000₫'
            },
            {
                type: "laptop",
                name: "Intel NUC M15 Kit i5 1135G7 (BBC510EAUXBC1)",
                image: "source/intel-nuc-m15-i5-bbc510eauxbc1.jpg",
                amount: 10,
                favoriteStatus: false,
                cartStatus: false,
                price: "21.000.000₫"
            },
            {
                type: "laptop",
                name: 'MacBook Pro 14 M1 Pro 2021/14 core-GPU',
                image: "source/apple-macbook-pro-14-m1-pro-2021.jpg",
                amount: 10,
                favoriteStatus: false,
                cartStatus: false,
                price: "52.990.000₫",
            },
            {
                type: "laptop",
                name: 'Dell Gaming G15 5511 i7 11800H (P105F006AGR)',
                image: "source/dell-gaming-g15-5511-i7-p105f006agr.jpg",
                amount: 10,
                favoriteStatus: false,
                cartStatus: false,
                price: "33.690.000₫",
            }
        ];
        setLocalStorage(productData, products);

    } else {
        products = getLocalStorage(productData);
    }

    if (getLocalStorage(cartData) == null) {
        setLocalStorage(cartData, cart)
    } else {
        cart = getLocalStorage(cartData);
    }

    if (getLocalStorage(favouriteData) == null) {
        setLocalStorage(favouriteData, favouriteProducts)
    } else {
        favouriteProducts = getLocalStorage(favouriteData);
    }

    if (getLocalStorage(intoMoneyData) == null) {
        setLocalStorage(intoMoneyData, intoMoney)
    } else {
        intoMoney = getLocalStorage(intoMoneyData);
    }
};

const setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

const getLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
};


const show = (arr, nameTable) => {
    let html = arr.map((element, index) => {
        let str = "";
        str += `<tr id="product${index}">
                            <td>${index+1}</td>
                            <td>${element.name}</td>
                            <td>
                                <img src="${element.image}"  class="smartphone"/>
                            </td>
                            <td>${element.amount}</td>
                            <td>${element.price}</td>
                            <td>
                                <div class="action">
                                    <button type="button" name="${nameTable}" class="btn btn-edit" onclick="editProduct(${index},'${nameTable}')">Sửa</button>
                                    <button type="button" name="${nameTable}" class="btn btn-delete" onclick="removeProduct(${index},'${nameTable}')">Xoá</button>
                                    `
        if (element.favoriteStatus) {
            str += `
                                    <span class="add-cart add-favourite${index}" title="Thêm vào danh sách yêu thích"><i class="far fa-heart icon1" onclick="addFavouriteProduct(${index},'${nameTable}')"></i></span>                                 
                                   `
        } else {
            str += `
                                    <span class="add-cart add-favourite${index}" title="Thêm vào danh sách yêu thích"><i class="far fa-heart" onclick="addFavouriteProduct(${index},'${nameTable}')"></i></span>
                                   `
        }
        if (element.cartStatus) {
            str += `<span class="add-cart add-cart1" title="Thêm vào giỏ hàng"><i class="fas fa-shopping-cart icon1" onclick="addToCart(${index},'${nameTable}')"></i></span>                         
                            </div>
                        </td>
                </tr>`
        } else {
            str += `<span class="add-cart add-cart1" title="Thêm vào giỏ hàng"><i class="fas fa-shopping-cart" onclick="addToCart(${index},'${nameTable}')"></i></span>                         
                            </div>
                        </td>
                </tr>`
        }
        return str;

    })
    document.querySelector(`.${nameTable}>tbody`).innerHTML = html.join("");
}

const showCart = () => {
    document.querySelector("#show-search").style.display = "none";
    document.getElementById("show-laptop").style.display = "none";
    document.getElementById("show-smartphone").style.display = "none";
    document.getElementById("show-product").style.display = "none";
    document.getElementById("add-product").style.display = "none";
    document.getElementById("show-favorite-product").style.display = "none";
    document.getElementById("show-cart").style.display = "block";
    if (cart.length == 0) {
        document.querySelector("#show-cart").innerHTML = `<div class="container1">
                                                            <h2 class="title">GIỎ HÀNG CỦA BẠN:<span id="no-result">Chưa có sản phẩm nào được thêm</span></h2>
                                                            <div class="border"></div>
                                                        </div>`;
    } else {
        document.querySelector("#show-cart").innerHTML = `<div class="container1">
                                                            <h2 class="title">GIỎ HÀNG CỦA BẠN</h2>
                                                            <div class="border"></div>
                                                        </div>
                                                        <div id="showCart">
                                                            <div id="show-cart1">
                                                                <table class="show-cart" border="1">
                                                                    <thead>
                                                                        <th>STT</th>
                                                                        <th>Tên sản phẩm</th>
                                                                        <th>Ảnh minh hoạ</th>
                                                                        <th>Đơn giá</th>
                                                                        <th>Số lượng</th>
                                                                        <th>Thành tiền</th>
                                                                        <th>Hành động</th>
                                                                    </thead>
                                                                    <tbody>
                                                                    </tbody>
                                                                    <tfoot id="tfoot">
                                                                    </tfoot>
                                                                </table>
                                                            </div>
                                                            <div class="wrap">
                                                                <div class="pay">
                                                                    <div>Thanh toán</div>
                                                                </div>
                                                            </div>
                                                        </div>`;
        let html = cart.map((element, index) => {
            let price = removeCharactor(".", element.price);
            price = removeCharactor("₫", price);
            return `<tr>
                    <td>${index+1}</td>
                    <td>${element.name}</td>
                    <td><img src="${element.image}"  class="smartphone"/></td>
                    <td>${element.price}</td>
                    <td>
                        <div id="amountProduct">
                            <div class="quantity-change" onclick="descreasedProduct(${index})"><button class="btn-change" id="btn-descreased${index}">-</button></div>
                            <input type="text" class="amountProduct" value="${element.quantity}" id="numberOfProducts${index}" oninput="this.value = 
                            !!this.value && Math.abs(this.value) >= 0 ? Math.abs(this.value) : null" onchange = "checkInput(${index})"/>
                            <div class="quantity-change" onclick="augmentProduct(${index})" ><button class="btn-change" >+</button>
                            </div>
                        </div>
                    </td>
                    <td id="totalmoney${index}">${element.totalPrice}</td>
                    <td>
                        <button type="button" class="btn btn-delete"
                            onclick="removeProduct(${index},'show-cart')">Xoá</button>
                    </td>
                </tr>`

        })
        let str = `<tr>
                    <td colspan="4"></td>
                    <td>Tổng tiền</td>
                    <td colspan="2" id="intoMoney">${intoMoney[0]}</td>
               </tr>`
        document.querySelector(`.show-cart >tbody`).innerHTML = html.join("");
        document.getElementById("tfoot").innerHTML = str;
    }

};

const showFavouriteProduct = () => {
    document.querySelector("#show-search").style.display = "none";
    document.getElementById("show-laptop").style.display = "none";
    document.getElementById("show-smartphone").style.display = "none";
    document.getElementById("show-product").style.display = "none";
    document.getElementById("add-product").style.display = "none";
    document.getElementById("show-favorite-product").style.display = "block";
    document.getElementById("show-cart").style.display = "none";
    if (favouriteProducts.length == 0) {
        document.querySelector("#show-favorite-product").innerHTML = `<div class="container1">
                                                                        <h2 class="title">DANH SÁCH YÊU THÍCH CỦA TÔI:<span id="no-result">Chưa có sản phẩm yêu thích nào</span></h2>
                                                                        <div class="border"></div>
                                                                    </div>`;
    } else {
        document.querySelector("#show-favorite-product").innerHTML = `<div class="container1">
                                                                        <h2 class="title">DANH SÁCH YÊU THÍCH CỦA TÔI</h2>
                                                                        <div class="border"></div>
                                                                    </div>
                                                                    <div>
                                                                        <table class="show-favorite-product" border="1">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>STT</th>
                                                                                    <th>Tên sản phẩm</th>
                                                                                    <th>Ảnh minh hoạ</th>
                                                                                    <th>Số lượng</th>
                                                                                    <th>Giá</th>
                                                                                    <th>Hành động</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                            </tbody>
                                                                        </table>`;
        show(favouriteProducts, "show-favorite-product");
        document.querySelectorAll(".show-favorite-product tbody .action").forEach(element => {
            element.children[0].style.display = "none";
        });
        document.querySelectorAll(".show-favorite-product tbody .action").forEach(element => {
            element.children[2].style.display = "none";
        });
        document.querySelectorAll(".show-favorite-product tbody .action").forEach(element => {
            element.children[3].style.display = "none";
        });
    }
};

const showProduct = () => {
    show(products, 'show-product');
};

const findAndRemove = (nameProduct) => {
    for (let index in products) {
        if (products[index].name == nameProduct) {
            products.splice(index, 1);
            setLocalStorage(productData, products);
            break;
        }
    }
}

const checkStatusBeforeRemove = (arr, index) => {
    let indexOfArr = findIndex(arr, index, cart);
    if (indexOfArr) {
        let price1 = removeCharactor(".", arr[index].price);
        price1 = removeCharactor("₫", price1);
        let price2 = removeCharactor(".", intoMoney[0]);
        price2 = removeCharactor("₫", price2);
        intoMoney[0] = addCharactor((price2 - price1) + "₫");
        cart.splice(indexOfArr, 1);
    }

    let indexOfArr1 = findIndex(arr, index, favouriteProducts);
    if (indexOfArr1) {
        favouriteProducts.splice(indexOfArr1, 1);
    }
};

const removeProduct = (index, name) => {
    let confirm = window.confirm("bạn có chắc muốn xoá!")
    if (confirm) {
        if (name == 'show-product') {
            checkStatusBeforeRemove(products, index);
            products.splice(index, 1);
            showProduct();
        } else if (name == 'search-product') {
            checkStatusBeforeRemove(searchProducts, index);
            findAndRemove(searchProducts[index].name);
            showSearch();
        } else if (name == "show-laptop") {
            checkStatusBeforeRemove(laptop, index);
            findAndRemove(laptop[index].name);
            showLaptop();
        } else if (name == "show-smartphone") {
            checkStatusBeforeRemove(smartPhones, index);
            findAndRemove(smartPhones[index].name);
            showSmartPhone();
        } else if (name == "show-favorite-product") {
            let result;
            for (let i = 0; i < products.length; i++) {
                if (products[i].name == favouriteProducts[index].name) {
                    result = i;
                }
            }
            products[result].favoriteStatus = false;
            favouriteProducts.splice(index, 1);
            showFavouriteProduct();
        } else {
            let result;
            for (let i = 0; i < products.length; i++) {
                if (products[i].name == cart[index].name) {
                    result = i;
                }
            }

            products[result].cartStatus = false;
            cart.splice(index, 1);

            let sum = 0;
            for (let i = 0; i < cart.length; i++) {
                let intoMoney = removeCharactor(".", cart[i].totalPrice);
                intoMoney = removeCharactor("₫", intoMoney);
                sum += Number(intoMoney);
            }
            intoMoney[0] = addCharactor(sum + "₫");
            showCart();
        }
        setLocalStorage(favouriteData, favouriteProducts);
        setLocalStorage(intoMoneyData, intoMoney);
        setLocalStorage(productData, products);
        setLocalStorage(cartData, cart);
    }
};

const edit = (arr, index, nameTable) => {
    let html = `<tr id="product${index}">
                    <td>${index+1}</td>
                    <td id="name${index}">
                        <label for="name-product" class="name-img-price"></label>
                        <input type="text" id="edit-name${index}" class="input-name-img-price" value="${arr[index].name}">
                    </td>
                    <td id="image${index}">
                        <label for="img-product" class="name-img-price"></label>
                        <input type="url" id="edit-img${index}" multiple="image" class="input-name-img-price" value="${arr[index].image}">
                    </td>
                    <td id="amount${index}">
                        <label for="price-product" class="name-img-price"></label>
                        <input type="number" id="edit-amount${index}" class="input-name-img-price" value="${arr[index].amount}">
                    </td>
                    <td id="price${index}">
                        <label for="price-product" class="name-img-price"></label>
                        <input type="text" id="edit-price${index}" class="input-name-img-price" value="${arr[index].price}">
                    </td>
                    <td id="action${index}">
                        <span><i class="fas fa-times check" onclick="keepStableProduct(${index},'${nameTable}')"></i></span>
                        <span><i class="fas fa-check-circle check" id="true" onclick="changeProduct(${index},'${nameTable}')"></i></span>
                    </td>
                </tr>`
    document.querySelector(`.${nameTable} #product${index}`).innerHTML = html;
}

const editProduct = (index, nameTable) => {
    if (nameTable == "show-product") {
        edit(products, index, "show-product");
    } else if (nameTable == "show-laptop") {
        edit(laptop, index, "show-laptop");
    } else if (nameTable == "search-product") {
        edit(searchProducts, index, "search-product");
    } else edit(smartPhones, index, "show-smartphone");

};

const getOriginalProductInfo = (arr, index, name) => {
    document.querySelector(`.${name} #product${index} #name${index}`).innerHTML = arr[index].name;
    document.querySelector(`.${name} #product${index} #image${index}`).innerHTML = `<img src="${ arr[index].image}"  class="smartphone"/>`;
    document.querySelector(`.${name} #product${index} #amount${index}`).innerHTML = arr[index].amount;
    document.querySelector(`.${name} #product${index} #price${index}`).innerHTML = arr[index].price;
    document.querySelector(`.${name} #product${index} #action${index}`).innerHTML =
        `<div class="action">
            <button type="button" class="btn btn-edit" onclick="editProduct(${index},'${name}')">Sửa</button>
            <button type="button" class="btn btn-delete" onclick="removeProduct(${index},'${name}')">Xoá</button>
            <span class="add-cart add-favourite"><i class="far fa-heart" onclick="addFavouriteProduct(${index},'${name}')"></i></span>
            <span class="add-cart add-cart1"><i class="fas fa-shopping-cart" onclick="addToCart(${index},'${name}')"></i></span>                         
        </div>`;
}

const keepStableProduct = (index, nameTable) => {
    if (nameTable == "show-product") {
        getOriginalProductInfo(products, index, "show-product");
    } else if (nameTable == "show-laptop") {
        getOriginalProductInfo(laptop, index, "show-laptop");
    } else if (nameTable == "search-product") {
        getOriginalProductInfo(searchProducts, index, "search-product");
    } else getOriginalProductInfo(smartPhones, index, "show-smartphone");
};

const findIndex = (arr1, index, arr2) => {
    for (let indexProduct in arr2) {
        if (arr2[indexProduct].name == arr1[index].name) {
            return indexProduct;
        }
    }
};

const changeProduct = (index, nameTable) => {
    let confirm = window.confirm("Bạn có chắc muốn sửa lại thông tin sản phẩm này không?")
    if (confirm) {
        let result;
        let product = {};
        let name = document.querySelector(`#edit-name${index}`).value;
        let image = document.querySelector(`#edit-img${index}`).value;
        let amount = document.querySelector(`#edit-amount${index}`).value;
        let price = document.querySelector(`#edit-price${index}`).value;
        price = addCharactor(price + "₫");
        product.name = name;
        product.image = image;
        product.amount = amount;
        product.price = price;
        product.cartStatus = false;
        product.favoriteStatus = false;
        if (nameTable == "show-product") {
            product.type = products[index].type;
            checkStatusBeforeRemove(products, index);
            products[index] = product;
        } else if (nameTable == "show-laptop") {
            checkStatusBeforeRemove(laptop, index);
            result = findIndex(laptop, index, products);
            product.type = products[result].type;
            products[result] = product;
            laptop[index] = product;
        } else if (nameTable == "search-product") {
            checkStatusBeforeRemove(searchProducts, index);
            result = findIndex(searchProducts, index, products);
            product.type = products[result].type;
            products[result] = product;
            searchProducts[index] = product;
        } else {
            checkStatusBeforeRemove(smartPhones, index);
            result = findIndex(smartPhones, index, products);
            product.type = products[result].type;
            products[result] = product;
            smartPhones[index] = product;
        }
        setLocalStorage(favouriteData, favouriteProducts);
        setLocalStorage(intoMoneyData, intoMoney);
        setLocalStorage(productData, products);
        setLocalStorage(cartData, cart);
        keepStableProduct(index, nameTable);
    }
}

const addToCart = (index, nameTable) => {
    if (nameTable == "show-product") {
        if (products[index].amount == 0 && products[index].cartStatus == false) {
            alert("Mặt hàng này đã hết hàng!");
        } else {
            let result;
            for (let i = 0; i < cart.length; i++) {
                if (products[index].name == cart[i].name) {
                    result = i;
                    break;
                }
            }
            if (products[index].cartStatus == false) {
                alert("Mặt hàng đã được thêm vào giỏ hàng của bạn!");
                products[index].cartStatus = true;
                products[index].amount--;
                cart.push(products[index]);
                cart[cart.length - 1].quantity = 1;
                cart[cart.length - 1].totalPrice = cart[cart.length - 1].price;
                showProduct();
            } else {
                products[index].cartStatus = false;
                let indexOfArr = findIndex(products, index, cart);
                products[index].amount += Number(cart[indexOfArr].quantity);
                cart.splice(result, 1);
            }
            setLocalStorage(productData, products);
            showProduct();
        }
    } else if (nameTable == "show-laptop") {
        if (laptop[index].amount == 0 && laptop[index].cartStatus == false) {
            alert("Mặt hàng này đã hết hàng!");
        } else {
            checkStatusCart(laptop, index);
            showLaptop();
        }
    } else if (nameTable == "search-product") {
        if (searchProducts[index].amount == 0) {
            alert("Mặt hàng này đã hết hàng!");
        } else
            checkStatusCart(searchProducts, index);
        show(searchProducts, 'search-product');
    } else {
        if (smartPhones[index].amount == 0 && smartPhones[index].cartStatus == false) {
            alert("Mặt hàng này đã hết hàng!");
        } else {
            checkStatusCart(smartPhones, index);
            showSmartPhone();
        }
    }
    setLocalStorage(cartData, cart);
    let sum = 0;
    for (let i = 0; i < cart.length; i++) {
        let price = removeCharactor(".", cart[i].totalPrice);
        price = removeCharactor("₫", price);
        sum += Number(price);
    }
    intoMoney[0] = addCharactor(sum + "₫");
    setLocalStorage(intoMoneyData, intoMoney);
};

const productBilling = () => {
    let sum = 0;
    for (let i = 0; i < cart.length; i++) {
        let price = removeCharactor(".", cart[i].totalPrice);
        price = removeCharactor("₫", price);
        sum += Number(price);
    }
    intoMoney[0] = addCharactor(sum + "₫");
};

const checkStatusFavouriteProduct = (arr, index) => {
    let result1, result2;
    for (let i = 0; i < products.length; i++) {
        if (arr[index].name == products[i].name) {
            result1 = i;
            break;
        }
    }

    for (let i = 0; i < favouriteProducts.length; i++) {
        if (arr[index].name == favouriteProducts[i].name) {
            result2 = i;
            break;
        }
    }
    if (arr[index].favoriteStatus == false) {
        arr[index].favoriteStatus = true;
        favouriteProducts.push(arr[index]);
    } else {
        arr[index].favoriteStatus = false;
        favouriteProducts.splice(result2, 1);
    }
    products[result1].favoriteStatus = arr[index].favoriteStatus;
    setLocalStorage(productData, products);
};

const checkStatusCart = (arr, index) => {
    let result1, result2;
    let indexOfArr = findIndex(arr, index, products);
    for (let i = 0; i < products.length; i++) {
        if (arr[index].name == products[i].name) {
            result1 = i;
            break;
        }
    }

    for (let i = 0; i < cart.length; i++) {
        if (arr[index].name == cart[i].name) {
            result2 = i;
            break;
        }
    }

    if (arr[index].cartStatus == false) {
        alert("Mặt hàng đã được thêm vào giỏ hàng của bạn!");
        arr[index].cartStatus = true;
        products[indexOfArr].amount--;
        cart.push(arr[index]);
        cart[cart.length - 1].quantity = 1;
        cart[cart.length - 1].totalPrice = cart[cart.length - 1].price;
    } else {
        arr[index].cartStatus = false;
        let indexOfArr1 = findIndex(arr, index, products);
        products[indexOfArr].amount += Number(products[indexOfArr1].quantity);
        cart.splice(result2, 1);
    }
    products[result1].cartStatus = arr[index].cartStatus;
    setLocalStorage(productData, products);
}

const addFavouriteProduct = (index, nameTable) => {
    if (nameTable == "show-product") {
        let result;
        for (let i = 0; i < favouriteProducts.length; i++) {
            if (products[index].name == favouriteProducts[i].name) {
                result = i;
                break;
            }
        }
        if (products[index].favoriteStatus == false) {
            products[index].favoriteStatus = true;
            favouriteProducts.push(products[index]);
        } else {
            products[index].favoriteStatus = false;
            favouriteProducts.splice(result, 1);
        }
        setLocalStorage(productData, products);
        showProduct();
    } else if (nameTable == "show-laptop") {
        checkStatusFavouriteProduct(laptop, index);
        showLaptop();
    } else if (nameTable == "search-product") {
        checkStatusFavouriteProduct(searchProducts, index);
        show(searchProducts, 'search-product');
    } else {
        checkStatusFavouriteProduct(smartPhones, index);
        showSmartPhone();
    }
    setLocalStorage(favouriteData, favouriteProducts);
};

const showSearch = () => {
    document.querySelector("#show-search").style.display = "block";
    document.getElementById("show-laptop").style.display = "none";
    document.getElementById("show-smartphone").style.display = "none";
    document.getElementById("show-product").style.display = "none";
    document.getElementById("add-product").style.display = "none";
    document.getElementById("show-favorite-product").style.display = "none";
    document.getElementById("show-cart").style.display = "none";
    let search = document.getElementById("search").value;
    searchProducts = [];
    for (let i = 0; i < products.length; i++) {
        let str = products[i].name.toLowerCase();
        if (str.includes(search)) {
            searchProducts.push(products[i]);
        }
    }
    if (searchProducts.length == 0) {
        document.querySelector("#show-search").innerHTML = `<h2 class="title">Danh sách kết quả tìm kiếm:<span id="no-result">Không tìm thấy kết quả nào phù hợp</span></h2>`;
    } else {
        document.querySelector("#show-search").innerHTML = `<h2 class="title">Danh sách kết quả tìm kiếm</h2>
                                                            <table class="search-product" border="1">
                                                                <thead>
                                                                    <tr>
                                                                        <th>STT</th>
                                                                        <th>Tên sản phẩm</th>
                                                                        <th>Ảnh minh hoạ</th>
                                                                        <th>Giá</th>
                                                                        <th>Hành động</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                </tbody>
                                                            </table>`;
        document.getElementById("search").value = "";
        show(searchProducts, 'search-product');
    }
};

const removeCharactor = (charactor, letters) => {
    letters = letters.replaceAll(charactor, "");
    return letters;
}

const addCharactor = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const augmentProduct = (index) => {

    let indexOfArr = findIndex(cart, index, products);
    let value = document.getElementById(`numberOfProducts${index}`).value;
    if (products[indexOfArr].amount == 0) {
        alert("Mặt hàng này không còn đủ số lượng mà bạn muốn!!");
    } else {
        products[indexOfArr].amount--;
        cart[index].quantity++;
        let sum = 0;
        value = Number(value) + 1;
        document.getElementById(`numberOfProducts${index}`).value = value;
        let price = removeCharactor(".", cart[index].price);
        price = removeCharactor("₫", price);
        let newTotalMoney = Number(price) * value;
        let numResult = addCharactor(newTotalMoney + "₫");
        cart[index].totalPrice = numResult;
        cart[index].quantity = value;
        setLocalStorage(cartData, cart);
        showCart();
        for (let i = 0; i < cart.length; i++) {
            let intoMoney = removeCharactor(".", cart[i].totalPrice);
            intoMoney = removeCharactor("₫", intoMoney);
            sum += Number(intoMoney);
        }
        let sumResult = addCharactor(sum + "₫");
        intoMoney[0] = sumResult
        setLocalStorage(intoMoneyData, intoMoney);
        setLocalStorage(productData, products);
        document.getElementById("intoMoney").innerHTML = sumResult;
    }
};

const descreasedProduct = (index) => {
    let value1 = document.getElementById(`numberOfProducts${index}`).value;
    if (Number(value1) == 1) {
        document.getElementById(`btn-descreased${index}`).disabled = true;
    } else {
        let indexOfArr = findIndex(cart, index, products);
        products[indexOfArr].amount++;
        cart.quantity--;
        let value = document.getElementById(`numberOfProducts${index}`).value;
        let sum = 0;
        value = Number(value) - 1;
        document.getElementById(`numberOfProducts${index}`).value = value;
        let price = removeCharactor(".", cart[index].price);
        price = removeCharactor("₫", price);
        let newTotalMoney = Number(price) * value;
        let numResult = addCharactor(newTotalMoney + "₫");
        cart[index].totalPrice = numResult;
        cart[index].quantity = value;
        setLocalStorage(cartData, cart);
        showCart();
        for (let i = 0; i < cart.length; i++) {
            let intoMoney = removeCharactor(".", cart[i].totalPrice);
            intoMoney = removeCharactor("₫", intoMoney);
            sum += Number(intoMoney);
        }
        let sumResult = addCharactor(sum + "₫");
        intoMoney[0] = sumResult;
        setLocalStorage(intoMoneyData, intoMoney);
        setLocalStorage(productData, products);
        setLocalStorage(cartData, cart);
        document.getElementById("intoMoney").innerHTML = sumResult;
    }
};

const checkInput = (index) => {
    let indexOfArr = findIndex(cart, index, products);
    let value = document.getElementById(`numberOfProducts${index}`).value;
    if (products[indexOfArr].amount + Number(cart[index].quantity) < Number(value)) {
        alert("Mặt hàng này không còn đủ số lượng mà bạn muốn! Vui lòng chọn lại số lượng phù hợp!");
    } else {
        let newValue = products[indexOfArr].amount + Number(cart[index].quantity) - Number(value)
        cart[index].quantity = value;
        products[indexOfArr].amount = newValue;
        setLocalStorage(productData, products);
        setLocalStorage(cartData, cart);
        let price = removeCharactor(".", cart[index].price);
        price = removeCharactor("₫", price);
        cart[index].totalPrice = addCharactor(price * value + "₫");
        productBilling();
        setLocalStorage(cartData, cart);
        setLocalStorage(intoMoneyData, intoMoney);
        showCart();
    }
};

(() => {
    init();
    showProduct();
})()