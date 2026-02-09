const products = [
    { name: "Espresso", price: 120, category: "coffee", img: "https://images.unsplash.com/photo-1510627498534-cf7e9002facc" },
    { name: "Cappuccino", price: 150, category: "coffee", img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93" },
    { name: "Croissant", price: 90, category: "pastries", img: "https://images.unsplash.com/photo-1549903072-7e6e0bedb7fb" },
    { name: "Chocolate Cake", price: 180, category: "cakes", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587" }
];

let cart = [];

function loadProducts(category = "all") {
    const list = document.getElementById("productList");
    list.innerHTML = "";

    products
        .filter(p => category === "all" || p.category === category)
        .forEach((p, index) => {
            list.innerHTML += `
            <div class="product">
                <img src="${p.img}">
                <h3>${p.name}</h3>
                <p>₱${p.price}</p>
                <button onclick="addToCart(${index})">Add to Order</button>
            </div>`;
        });
}

function filterCategory(cat) {
    document.querySelectorAll(".category-btn").forEach(btn => btn.classList.remove("active"));
    event.target.classList.add("active");
    loadProducts(cat);
}

function addToCart(index) {
    cart.push(products[index]);
    document.getElementById("cartCount").innerText = cart.length;
}

function showCart() {
    const modal = document.getElementById("cartModal");
    const list = document.getElementById("cartItemsList");
    let total = 0;
    list.innerHTML = "";

    cart.forEach(item => {
        total += item.price;
        list.innerHTML += `<li>${item.name} - ₱${item.price}</li>`;
    });

    document.getElementById("modalTotal").innerText = total;
    modal.style.display = "block";
}

function closeCart() {
    document.getElementById("cartModal").style.display = "none";
}

function checkout() {
    alert("Order successful!");
    cart = [];
    document.getElementById("cartCount").innerText = 0;
    closeCart();
}

loadProducts();
