// ==========================
// SELECT ELEMENTS
// ==========================

const addButtons = document.querySelectorAll(".add-btn");
const removeButtons = document.querySelectorAll(".remove-btn");

const cartList = document.getElementById("cart-list");
const total = document.getElementById("total");

const cartBtn = document.getElementById("cart-btn");
const bookBtn = document.getElementById("book-btn");

const successMessage = document.getElementById("success-message");

let totalAmount = 0;
let items = [];

// ==========================
// ADD ITEM
// ==========================

addButtons.forEach(button => {

    button.addEventListener("click", () => {

        const name = button.dataset.name;
        const price = parseInt(button.dataset.price);

        if(items.includes(name)){
            alert("Item already added!");
            return;
        }

        items.push(name);

        if(cartList.innerHTML.includes("No Items Added")){
            cartList.innerHTML = "";
        }

        const li = document.createElement("li");

        li.innerHTML = `
            ${name} - $${price}
        `;

        cartList.appendChild(li);

        totalAmount += price;

        total.innerHTML = "$" + totalAmount;

        button.innerHTML = "Added";

        button.disabled = true;

    });

});

// ==========================
// REMOVE CARD
// ==========================

removeButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        const card = button.closest(".service-card");

        card.style.display="none";

    });

});

// ==========================
// ADD TO CART
// ==========================

cartBtn.addEventListener("click",()=>{

    if(totalAmount==0){

        alert("Please Add Service First");

        return;

    }

    alert("Items Added To Cart Successfully");

});

// ==========================
// LOGOUT
// ==========================

document.querySelector(".logout-btn")

.addEventListener("click",()=>{

    alert("Logged Out Successfully");

});
// ==========================
// BOOK NOW
// ==========================

bookBtn.addEventListener("click", () => {

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if (totalAmount === 0) {
        alert("Please Add Service First");
        return;
    }

    if (name === "" || email === "" || phone === "") {
        alert("Please Fill All Fields");
        return;
    }

    // Email Validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        alert("Please Enter Valid Email");
        return;
    }

    // Phone Validation
    if (phone.length < 10) {
        alert("Please Enter Valid Phone Number");
        return;
    }

    successMessage.innerHTML = "✅ Booking Successful!";

    alert("Booking Successful!");

    // Clear Form
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";

});

// ==========================
// NEWSLETTER
// ==========================

const subscribeBtn = document.getElementById("subscribe-btn");

subscribeBtn.addEventListener("click", () => {

    const subscriberName =
        document.getElementById("subscriber-name").value.trim();

    const subscriberEmail =
        document.getElementById("subscriber-email").value.trim();

    if (subscriberName === "" || subscriberEmail === "") {

        alert("Please Enter Name and Email");

        return;

    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(subscriberEmail)) {

        alert("Please Enter Valid Email");

        return;

    }

    alert("Subscribed Successfully!");

    document.getElementById("subscriber-name").value = "";

    document.getElementById("subscriber-email").value = "";

});

// ==========================
// HERO BUTTON
// ==========================

const heroBtn = document.querySelector(".hero-btn");

heroBtn.addEventListener("click", () => {

    document
        .getElementById("services")
        .scrollIntoView({
            behavior: "smooth"
        });

});

// ==========================
// NAVBAR LINKS
// ==========================

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", function (e) {

        e.preventDefault();

        const target = this.getAttribute("href");

        if (target !== "#") {

            document
                .querySelector(target)
                .scrollIntoView({
                    behavior: "smooth"
                });

        }

    });

});


emailjs.init("YOUR_PUBLIC_KEY");

emailjs.send(
    "YOUR_SERVICE_ID",
    "YOUR_TEMPLATE_ID",
    {
        customer_name: name,
        customer_email: email,
        customer_phone: phone,
        total_amount: totalAmount
    }
).then(() => {

    console.log("Email Sent");

}).catch((error) => {

    console.log(error);

});


console.log("Laundry Service Website Loaded Successfully");

