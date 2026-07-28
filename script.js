let services = [
  { name: "Washing", price: 100 },
  { name: "Ironing", price: 50 },
  { name: "Dry Cleaning", price: 200 },
  { name: "Premium Wash", price: 300 }
];

let cart = [];

let container = document.getElementById("serviceContainer");

services.forEach((s, i) => {
  let div = document.createElement("div");
  div.className = "service-card";
  div.innerHTML = `
    ${s.name} - ₹${s.price}
    <button onclick="add(${i})">Add</button>
  `;
  container.appendChild(div);
});

function add(i) {
  cart.push(services[i]);
  updateCart();
}

function removeItem(i) {
  cart.splice(i, 1);
  updateCart();
}

function updateCart() {
  let cartDiv = document.getElementById("cartItems");
  let total = 0;

  if (cart.length === 0) {
    cartDiv.innerHTML = "No items added";
    document.getElementById("total").innerText = 0;
    return;
  }

  cartDiv.innerHTML = "";

  cart.forEach((item, i) => {
    total += item.price;
    cartDiv.innerHTML += `
      ${item.name} - ₹${item.price}
      <button onclick="removeItem(${i})">Remove</button><br>
    `;
  });

  document.getElementById("total").innerText = total;
}

function bookNow() {
  document.getElementById("msg").innerText =
    "Thank you For Booking the Service We will get back to you soon!";
}

function scrollToBooking() {
  document.getElementById("booking").scrollIntoView({ behavior: "smooth" });
}
