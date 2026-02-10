
// ===============================
// VARIABLES + OBJECTS + CLASSES
// ===============================

class Product {

    constructor(id,name,price,image){
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
    }

    getPriceWithTax(){
        let tax = 0.05; // operator
        return this.price + (this.price * tax);
    }

}


// ARRAY OF OBJECTS
let products = [

    new Product(1,"Bamboo Toothbrush",120,"https://via.placeholder.com/200"),
    new Product(2,"Reusable Bottle",350,"https://via.placeholder.com/200"),
    new Product(3,"Eco Bag",200,"https://via.placeholder.com/200"),
    new Product(4,"Solar Lamp",900,"https://via.placeholder.com/200")

];


let cart = [];


// ===============================
// LOOP + FUNCTION
// ===============================

function loadProducts(){

    let container = document.getElementById("productContainer");

    container.innerHTML="";

    // loop
    for(let i=0; i<products.length; i++){

        let p = products[i];

        container.innerHTML += `

        <div class="col-md-3">
        <div class="card p-3 mb-3">

        <img src="${p.image}" class="img-fluid">

        <h5>${p.name}</h5>

        <p class="price">₹ ${p.price}</p>

        <button class="btn btn-success"
        onclick="addToCart(${p.id})">Add To Cart</button>

        </div>
        </div>

        `;
    }
}


// ===============================
// EVENTS + CONDITIONS + OPERATORS
// ===============================

function addToCart(id){

    // condition
    let product = products.find(p => p.id === id);

    if(product){

        cart.push(product); // object added

        document.getElementById("cartCount").innerText = cart.length;

        alert(product.name + " added to cart");
    }

}


// FUNCTION + LOOP
function showCart(){

    let modal = new bootstrap.Modal(document.getElementById('cartModal'));

    let html="";

    let total = 0;

    for(let item of cart){

        html += `<p>${item.name} - ₹ ${item.price}</p>`;

        total += item.price; // operator
    }

    // condition
    if(cart.length === 0){
        html = "Cart is empty";
    } else {
        html += `<hr><h5>Total : ₹ ${total}</h5>`;
    }

    document.getElementById("cartItems").innerHTML = html;

    modal.show();
}


// ===============================
// EVENT LISTENER
// ===============================

document.addEventListener("DOMContentLoaded", loadProducts);
