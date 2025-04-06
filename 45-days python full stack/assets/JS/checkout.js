document.addEventListener("DOMContentLoaded", function () {
    displayOrderSummery();
     
    document.getElementById("form")
    document.addEventListener("submit", (event)=>{
        event.preventDefault();
        placeOrder();
    });

});

function displayOrderSummery(){
    const orderSummery = document.getElementById("order-summery");
    let cart = JSON.parse(localStorage.getItem('cart') || []);
    
    if(cart.length === 0){
        orderSummery.innerHtml = "<p>Your cart is Empty!</p>";
        return;
    }

    let totalPrice = 0;
    let summerHtml = "<h2>Order Summery</h2>";
    
    cart.forEach((product) => {
        totalPrice += product.sellingPrice*product.quantity;
        summerHtml +=`
            <div class="order-item">
               <h3>${product.name} (x${product.quantity})</h3>
               <p>Price: $${product.sellingPrice * product.quantity}</p>
            </div>`
    });
    summerHtml += `<h2>Total: $${totalPrice}</h2>`;
    orderSummery.innerHTML = summerHtml;
}

function placeOrder(){
    const name = document.getElementById("name").value.trim();
    const address = document.getElementById("address").value.trim();
    const payment = document.getElementById("payment-method").value;

    if(name.trim() === "" || address.trim() === ""){
        alert("Please Enter All Required Details!");
        return;
    }

    const orderDetails = {
        name, 
        address,
        payment,
        cart:JSON.parse(localStorage.getItem("cart")),
    };

    localStorage.setItem("order", JSON.stringify(orderDetails))
    localStorage.removeItem("cart")

    alert("Order Placed Successful!");
    window.location.href = "products.html";
}
  

