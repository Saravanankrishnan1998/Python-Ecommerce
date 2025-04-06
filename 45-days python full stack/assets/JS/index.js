// script.js
document.addEventListener("DOMContentLoaded", function() {
    const addToCartButton = document.querySelector("button");
    
    if (addToCartButton) {
        addToCartButton.addEventListener("click", function(event) {
            event.preventDefault(); // Prevent default link behavior
            alert("Item added to cart!");
        });
    }
});