const products = [
    { name: "Espresso", price: 120, category: "coffee", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOHt2rpGGTX9fUD-IKp3Sv68OH-l7hOW7vUxy5qht4Rw&s=10" },
    { name: "Cappuccino", price: 150, category: "coffee", img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93" },
    { name: "Americano", price: 130, category: "coffee", img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93" },

    { name: "Butter Croissant", price: 95, category: "pastries", img: "https://images.unsplash.com/photo-1549903072-7e6e0bedb7fb" },
    { name: "Blueberry Muffin", price: 80, category: "pastries", img: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e" },
    { name: "Cinnamon Roll", price: 100, category: "pastries", img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092" },

    { name: "Chocolate Cake", price: 180, category: "cakes", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587" },
    { name: "Cheesecake", price: 195, category: "cakes", img: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b" },
    { name: "Red Velvet Cake", price: 200, category: "cakes", img: "https://images.unsplash.com/photo-1603021391228-52f1cd2b0f79" }
];

let cart = [];

function loadProducts(category = "all") {
    const list = document.getElementById("productList");
    list.innerHTML = "";

    products
        .filter(p => category === "all" || p.category === category)
        .forEach((p, i) => {
            list.innerHTML += `
            <div class="product">
                <img src="${p.img}">
                <h3>${p.name}</h3>
                <p>₱${p.price}</p>
                <button onclick="addToCart(${i}, this)">
                    Add to Order
                </button>
            </div>`;
        });
}

function filterCategory(cat) {
    document.querySelectorAll(".category-btn").forEach(btn => btn.classList.remove("active"));
    event.target.classList.add("active");
    loadProducts(cat);
}

function addToCart(index, btn) {
    btn.disabled = true;
    btn.innerHTML = `Adding <span class="spinner"></span>`;

    setTimeout(() => {
        cart.push(products[index]);
        document.getElementById("cartCount").innerText = cart.length;
        btn.disabled = false;
        btn.innerText = "Add to Order";
    }, 800);
}

function showCart() {
    const modal = document.getElementById("cartModal");
    const list = document.getElementById("cartItemsList");
    let total = 0;
    list.innerHTML = "";

    if (cart.length === 0) {
        list.innerHTML = "<li>Your cart is empty</li>";
    } else {
        cart.forEach(item => {
            total += item.price;
            list.innerHTML += `<li>${item.name} - ₱${item.price}</li>`;
        });
    }

    document.getElementById("modalTotal").innerText = total;
    modal.style.display = "block";
}

function closeCart() {
    document.getElementById("cartModal").style.display = "none";
}

function completeOrder() {
    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }

    closeCart();
    showReceipt();
    cart = [];
    document.getElementById("cartCount").innerText = 0;
}

function showReceipt() {
    let content = "";
    let total = 0;
    cart.forEach((item, i) => {
        content += `<p>${i + 1}. ${item.name} - ₱${item.price}</p>`;
        total += item.price;
    });
    content += `<hr><p><strong>TOTAL: ₱${total}</strong></p>`;
    
    document.getElementById("receiptContent").innerHTML = content;
    document.getElementById("receiptModal").style.display = "block";
}

function closeReceipt() {
    document.getElementById("receiptModal").style.display = "none";
}

loadProducts();
