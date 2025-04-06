// Function to fetch data and display products
let allProducts = []; 

async function fetchAndDisplayProducts() {
    try {
        const response = await fetch("/assets/product.json"); 
        const products = await response.json(); 

        if (!response.ok) {
            throw new Error("Failed to load products data.");
        }

        allProducts = products; 
        displayProduct(products); 
    } catch (error) {
        console.error("Error loading data:", error);
    }
}

const productContainer = document.getElementById("product");
const searchBox = document.getElementById("search-box");
const searchResults = document.getElementById("search-results");


// Function to display products dynamically
function displayProduct(products) {
    productContainer.innerHTML = ""; 

    if (products.length === 0) {
        productContainer.innerHTML = "<p>No products found</p>";
        return;
    }

    products.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product_details");
        productDiv.innerHTML = `
            <img src="${product.imageSrc}" class='product-image' alt="${product.name}">
            <h2>${product.name}</h2>
            <p><s>₹${product.originalPrice}</s> <strong>₹${product.sellingPrice}</strong></p>
            <button class='addbtn' data-id=${product.id}>Add To Cart</button>
            <button class='buynow'>Buy Now</button>
        `;
        productContainer.appendChild(productDiv);
    });

    // Add event listeners for "Add to Cart" buttons
    document.querySelectorAll(".addbtn").forEach((button) => {
        button.addEventListener("click", function () {
            const productId = parseInt(this.getAttribute("data-id"));
            addToCart(productId);
        });
    });
}


// Function to filter products
function filterProducts(category) {
    if (category === "All") {
        displayProduct(allProducts);
    } else {
        const filteredProducts = allProducts.filter(product => product.name.toLowerCase().includes(category.toLowerCase()));
        displayProduct(filteredProducts);
    }
}

// Function to add products to cart
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const selectedProduct = allProducts.find((product) => product.id === productId);

    if (selectedProduct) {
        cart.push(selectedProduct);
        localStorage.setItem("cart", JSON.stringify(cart));

        // Show alert message
        alert(`${selectedProduct.name} Product added to cart!`);
    }
}

// Event listener for category filter
document.querySelectorAll(".category-link").forEach(link => {
    link.addEventListener("click", function (event) {
        event.preventDefault();
        const category = this.getAttribute("data-category");
        filterProducts(category);
    });
});

// Fetch and display products on page load
fetchAndDisplayProducts();

const commonSearches = []; // Common search suggestions

searchBox.addEventListener("input", searchProducts);

function searchProducts() {
    const searchText = searchBox.value.toLowerCase();
    searchResults.innerHTML = "";

    if (searchText === "") {
        displaySuggestions(); 
        return;
    }

    const filteredProducts = allProducts.filter(product =>
        product.name.toLowerCase().includes(searchText)
    );

    searchResults.style.display = "block"; 

    if (filteredProducts.length > 0) {
        filteredProducts.forEach(product => {
            const listItem = document.createElement("ul");
            listItem.textContent = product.name;
            listItem.setAttribute("data-id", product.id);
            listItem.classList.add("search-item");

            listItem.addEventListener("click", () => {
                displayProduct([product]);
                searchBox.value = product.name;
                searchResults.innerHTML = "";
            });

            searchResults.appendChild(listItem);
        });
    } else {
        searchResults.innerHTML = "<li class='no-result'>No results found</li>";
    }
}

// Function to show suggested searches under the search box
function displaySuggestions() {
    searchResults.innerHTML = "";
    searchResults.style.display = "block";

    commonSearches.forEach(term => {
        const listItem = document.createElement("ul");
        listItem.textContent = term;
        listItem.classList.add("search-suggestion");
        
        listItem.addEventListener("click", () => {
            searchBox.value = term;
            searchProducts(); 
        });

        searchResults.appendChild(listItem);
    });
}

// Call this initially to show search suggestions
displaySuggestions();

// Fetch and display products on page load
fetchAndDisplayProducts();

