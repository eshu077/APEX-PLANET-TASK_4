// ✅ Contact Form Submission
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  document.getElementById("formStatus").textContent = "Thanks! I'll get back to you soon.";
  this.reset();
});

// 🖼️ Photo Upload Preview
document.getElementById("photoUpload").addEventListener("change", function () {
  const file = this.files[0];
  const preview = document.getElementById("photoPreview");
  preview.innerHTML = "";

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.createElement("img");
      img.src = e.target.result;
      preview.appendChild(img);
    };
    reader.readAsDataURL(file);
  }
});

// 📝 To-Do List with localStorage
function addTask() {
  const input = document.getElementById("taskInput");
  const task = input.value.trim();
  if (task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
    input.value = "";
  }
}

function displayTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    // Task text
    const span = document.createElement("span");
    span.textContent = task;
    span.style.flex = "1";

    // Edit button
    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.title = "Edit Task";
    editBtn.style.marginRight = "0.5rem";
    editBtn.onclick = () => {
      const newTask = prompt("Edit your task:", task);
      if (newTask !== null && newTask.trim() !== "") {
        tasks[index] = newTask.trim();
        localStorage.setItem("tasks", JSON.stringify(tasks));
        displayTasks();
      }
    };

    // Delete button
    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.title = "Delete Task";
    delBtn.onclick = () => {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      displayTasks();
    };

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

displayTasks();

// 🛍️ Product Listing with Search, Filter, and Sort
const products = [
  { name: "Smartphone", category: "electronics", price: 15000, rating: 4.5 },
  { name: "Jeans", category: "fashion", price: 1200, rating: 4.0 },
  { name: "Headphones", category: "electronics", price: 2500, rating: 4.2 },
];

function renderProducts(filtered = products) {
  const container = document.getElementById("productContainer");
  container.innerHTML = "";

  filtered.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <h4>${product.name}</h4>
      <p>₹${product.price}</p>
      <p>Rating: ${product.rating}</p>
      <p>Category: ${product.category}</p>
    `;
    container.appendChild(card);
  });
}

function applyFilters() {
  const category = document.getElementById("filterCategory").value;
  const sortOrder = document.getElementById("sortPrice").value;
  const searchQuery = document.getElementById("searchProduct").value.toLowerCase();

  let filtered = products.filter(p =>
    (category === "all" || p.category === category) &&
    (p.name.toLowerCase().includes(searchQuery) || p.category.toLowerCase().includes(searchQuery))
  );

  if (sortOrder === "asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else {
    filtered.sort((a, b) => b.price - a.price);
  }

  renderProducts(filtered);
}

// Event Listeners
document.getElementById("filterCategory").addEventListener("change", applyFilters);
document.getElementById("sortPrice").addEventListener("change", applyFilters);
document.getElementById("searchProduct").addEventListener("input", applyFilters);

// Initial render
renderProducts();
