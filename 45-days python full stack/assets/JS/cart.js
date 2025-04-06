document.addEventListener("DOMContentLoaded", function () {
    displayCartItems();
});

function displayCartItems() {
    const cartContainer = document.getElementById("cart-items");
    const totalAmount = document.getElementById("total-amount");
    // const checkout = document.getElementById("checkout")

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartContainer.innerHTML = "";
    
    let totalPrice = 0;



    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your Cart is Empty!</p>";
        totalAmount.innerHTML = `Total: $0.00`;
        disableCheckout()
       
    } else {
        enableCheckout()
        cart.forEach((product, index) => {
            // Ensure quantity is at least 1
            if (!product.quantity || product.quantity < 1) {
                product.quantity = 1;
            }

            totalPrice += parseFloat(product.sellingPrice) * product.quantity;

            // Create Cart Item Element
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");

            cartItem.innerHTML = `
                <img src="${product.imageSrc}" alt="${product.name}" class="cart-image">
                <h2>${product.name}</h2>
                <p>Price: $${product.sellingPrice}</p>
                <div class="quantity-controls">
                    <button class="decrease" data-index="${index}">-</button>
                    <span>${product.quantity}</span>
                    <button class="increase" data-index="${index}">+</button>
                </div>
                <button class="remove-item" data-index="${index}">Remove</button>
            `;

            cartContainer.appendChild(cartItem);
        });

        totalAmount.innerHTML = `Total: $${totalPrice.toFixed(2)}`;
       

    }

    // Attach event listeners to buttons
    document.querySelectorAll(".increase").forEach((button) => {
        button.addEventListener("click", function () {
            const index = parseInt(this.getAttribute("data-index"));
            updateQuantity(index, 1);
        });
    });

    document.querySelectorAll(".decrease").forEach((button) => {
        button.addEventListener("click", function () {
            const index = parseInt(this.getAttribute("data-index"));
            updateQuantity(index, -1);
        });
    });

    document.querySelectorAll(".remove-item").forEach((button) => {
        button.addEventListener("click", function () {
            const index = parseInt(this.getAttribute("data-index"));
            removeFromCart(index);
        });
    });

    // Update local storage with correct quantity
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Function to Update Quantity
function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart[index]) {
        cart[index].quantity += change;

        // Ensure quantity is at least 1
        if (cart[index].quantity < 1) {
            cart.splice(index, 1); // Remove if quantity becomes 0
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        displayCartItems(); // Re-render cart
    }
}

// Function to Remove Item from Cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1); // Remove item at index
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems(); // Re-render cart
}

// Disable Checkout Button and Prevent Navigation
function disableCheckout() {
    const checkoutBtn = document.getElementById("checkout");
    if (checkoutBtn) {
        checkoutBtn.style.pointerEvents = "none"; // Disable clicking
        checkoutBtn.style.opacity = "0.5"; // Visual indicator
        checkoutBtn.style.cursor = "not-allowed";
    }
}

// Enable Checkout Button
function enableCheckout() {
    const checkoutBtn = document.getElementById("checkout");
    if (checkoutBtn) {
        checkoutBtn.style.pointerEvents = "auto"; // Enable clicking
        checkoutBtn.style.opacity = "1"; // Restore visibility
        checkoutBtn.style.cursor = "pointer";
    }
}
