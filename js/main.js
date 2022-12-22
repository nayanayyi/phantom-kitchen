let carts = document.querySelectorAll('.option1');
let products=[
    {
        name: "Nasi Gulai",
        tag: "gulai",
        price: 15000,
        inCart: 0
    },
    {
        name: "Nasi Pecel",
        tag: "pecel",
        price: 15000,
        inCart: 0
    },
    {
        name: "Nasi Padang",
        tag: "padang",
        price: 22000,
        inCart: 0
    },
    {
        name: "Burger",
        tag: "burger",
        price: 20000,
        inCart: 0
    },
    {
        name: "Hotdog",
        tag: "hotdog",
        price: 15000,
        inCart: 0
    },
    {
        name: "Pizza",
        tag: "pizza",
        price: 20000,
        inCart: 0
    },
    {
        name: "Roti Tawar",
        tag: "tawar",
        price: 15000,
        inCart: 0
    },
    {
        name: "Roti Gembong",
        tag: "gembong",
        price: 15000,
        inCart: 0
    },
    {
        name: "Roti Sobek",
        tag: "sobek",
        price: 20000,
        inCart: 0
    },
    {
        name: "Roti Bakar",
        tag: "bakar",
        price: 20000,
        inCart: 0
    },
     {
        name: "Es Boba",
        tag: "boba",
        price: 13000,
        inCart: 0
    },
    {
        name: "Thai Tea",
        tag: "thaitea",
        price: 15000,
        inCart: 0
    },
    {
        name: "Alpukat Kocok",
        tag: "alpukat",
        price: 20000,
        inCart: 0
    },
];

for (let index = 0; index < carts.length; index++) {
    carts[index].addEventListener('click', () => {
        cartNumbers(products[index]);
        totalProducts(products[index]);
    })
    
}


function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) {
        document.querySelector('.cart .nav-link span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers= parseInt(productNumbers);
    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers +1);
        document.querySelector('.cart .nav-link span').textContent = productNumbers +1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart .nav-link span').textContent = 1;
    }
    setItem(product);
}

function setItem(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems=JSON.parse(cartItems);
    if (cartItems != null) {
        if (cartItems[product.tag]==undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else{
        product.inCart = 1;
        cartItems={
            [product.tag]:product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems))
}

function totalProducts(product) {
    let cartCost = localStorage.getItem('totalCost');

    if (cartCost != null) {
        cartCost = parseInt(cartCost)
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost",product.price);
    }
}

function displayCart() {
    let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
    let total = localStorage.getItem('totalCost');
    let productTable = document.querySelector('.cart-table');
    if (cartItems && productTable && total) {
        productTable.innerHTML = '';
        let index = 1
        Object.values(cartItems).map(item=>{
            productTable.innerHTML += `
                <tr>
                   <th scope="row">${index}</th>
                   <td><img width="100" src="images/${item.tag}.png" alt=""></td>
                   <td class="name-products">${item.name}</td>
                   <td class="price-products">${item.price}</td>
                   <td><a href="#" class="delete-qty"><i class="fa fa-minus-circle" aria-hidden="true"></i></a> ${item.inCart} <a href="#" class="add-qty"><i class="fa fa-plus-circle" aria-hidden="true"></i></a></td>
                   <td>${item.price*item.inCart}</td>
                </tr>
            `
            index+=1;
        })
        productTable.innerHTML += `
            <tr>
                <th scope="row"></th>
                <td></td>
                <td></td>
                <td></td>
                <th>Total</th>
                <td><b>${total}</b></td>
            </tr>
        `
        let addQty = document.querySelectorAll('.add-qty');
        for (let i = 0; i < addQty.length; i++) { 
            addQty[i].addEventListener('click', () => {
                addProducts(i);
            })
        }
        let delQty = document.querySelectorAll('.delete-qty');
        for (let i = 0; i < delQty.length; i++) { 
            delQty[i].addEventListener('click', () => {
                deleteProducts(i);
            })
        }
    }
}

function addProducts(index) {
    let cartItems = localStorage.getItem('productsInCart');
    let total = localStorage.getItem('totalCost');
    cartItems = JSON.parse(cartItems);
    let tmpCartItems = cartItems
    let name = document.querySelectorAll('.name-products')
    Object.values(tmpCartItems).map(item=>{
        if (item.name == name[index].textContent) {
            cartNumbers(item)
            totalProducts(item);
            displayCart()
        }
    })
    
}

function deleteProducts(index) {
    let cartItems = localStorage.getItem('productsInCart');
    let total = localStorage.getItem('totalCost');
    cartItems = JSON.parse(cartItems);
    let tmpCartItems = cartItems
    let itemCost = parseInt(localStorage.getItem('totalCost'))
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers= parseInt(productNumbers);
    let name = document.querySelectorAll('.name-products')
    Object.values(tmpCartItems).map(item=>{
        if (item.name == name[index].textContent) {

            if (item.inCart>1) {
                item.inCart-=1
                localStorage.setItem('cartNumbers', productNumbers -1);
                localStorage.setItem("productsInCart", JSON.stringify(tmpCartItems))
                localStorage.setItem("totalCost", itemCost - item.price);  
            }else{
                delete tmpCartItems[item.tag]
                localStorage.setItem('cartNumbers', productNumbers -1);
                localStorage.setItem("productsInCart", JSON.stringify(tmpCartItems))
                localStorage.setItem("totalCost", itemCost - item.price);  
            }
            displayCart()
        }
    })
    
}

displayCart()
onLoadCartNumbers()