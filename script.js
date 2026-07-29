// =========================
// Hero Button Scroll
// =========================

const bookNowBtn = document.getElementById("bookNowBtn");

bookNowBtn.addEventListener("click", () => {
    document.getElementById("booking").scrollIntoView({
        behavior: "smooth"
    });
});

// =========================
// Laundry Services
// =========================

const services = [
    {
        id: 1,
        name: "Wash & Fold",
        price: 150,
        image: "images/laundry1.png"
    },
    {
        id: 2,
        name: "Dry Cleaning",
        price: 250,
        image: "images/laundry2.png"
    },
    {
        id: 3,
        name: "Steam Iron",
        price: 100,
        image: "images/laundry3.png"
    },
    {
        id: 4,
        name: "Premium Laundry",
        price: 300,
        image: "images/laundry4.png"
    }
];

const serviceContainer = document.getElementById("serviceContainer");

const cartItems = document.getElementById("cartItems");

const totalPrice = document.getElementById("totalPrice");

let cart = [];

// =========================
// Display Services
// =========================

function displayServices() {

    serviceContainer.innerHTML = "";

    services.forEach(service => {

        serviceContainer.innerHTML += `

        <div class="service-card">

            <img src="${service.image}" alt="${service.name}">

            <h3>${service.name}</h3>

            <p>₹${service.price}</p>

            <button onclick="addToCart(${service.id})">
                Add Item
            </button>

        </div>

        `;

    });

}

displayServices();

// =========================
// Add To Cart
// =========================

function addToCart(id) {

    const service = services.find(item => item.id === id);

    cart.push(service);

    updateCart();

}

// =========================
// Remove Item
// =========================

function removeItem(index) {

    cart.splice(index, 1);

    updateCart();

}

// =========================
// Update Cart
// =========================

function updateCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = "<p>No items added.</p>";

        totalPrice.innerText = "0";

        return;

    }

    let total = 0;

    cart.forEach((item, index) => {

        total += item.price;

        cartItems.innerHTML += `

        <div class="cart-item">

            <span>${item.name}</span>

            <span>₹${item.price}</span>

            <button onclick="removeItem(${index})">
                Remove
            </button>

        </div>

        `;

    });

    totalPrice.innerText = total;

}
// =========================
// EmailJS Initialization
// =========================

// Replace YOUR_PUBLIC_KEY with your EmailJS Public Key
emailjs.init("YOUR_PUBLIC_KEY");

// =========================
// Booking Form
// =========================

const bookingForm = document.getElementById("bookingForm");
const thankYouMessage = document.getElementById("thankYouMessage");

bookingForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();

    // Name Validation
    if (name.length < 3) {
        alert("Please enter a valid name.");
        return;
    }

    // Email Validation
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Phone Validation
    const phonePattern = /^[0-9]{10}$/;

    if (!phonePattern.test(phone)) {
        alert("Please enter a valid 10-digit phone number.");
        return;
    }

    // Address Validation
    if (address === "") {
        alert("Please enter your address.");
        return;
    }

    // Cart Validation
    if (cart.length === 0) {
        alert("Please add at least one laundry service.");
        return;
    }

    // Prepare Email Data
    const templateParams = {
        customer_name: name,
        customer_email: email,
        customer_phone: phone,
        customer_address: address,
        services: cart.map(item => item.name).join(", "),
        total_price: totalPrice.innerText
    };

    // Send Email
    emailjs.send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        templateParams
    )
    .then(function () {

        thankYouMessage.innerHTML =
            "<h3 style='color:green;'>Thank you for booking the service. We will get back to you soon!</h3>";

        bookingForm.reset();

        cart = [];

        updateCart();

    })
    .catch(function (error) {

        console.log(error);

        alert("Booking completed, but email could not be sent. Please check your EmailJS settings.");

    });

});

// =========================
// Newsletter
// =========================

const newsletterForm = document.getElementById("newsletterForm");

newsletterForm.addEventListener("submit", function (e) {

    e.preventDefault();

    alert("Thank you for subscribing to our newsletter!");

    newsletterForm.reset();

});
