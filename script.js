// Contact Form
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();
  document.getElementById("formStatus").textContent = "Thanks! I'll get back to you soon.";
  this.reset();
});

// Photo Upload Preview
document.getElementById("photoUpload").addEventListener("change", function() {
  const file = this.files[0];
  const preview = document.getElementById("photoPreview");
  preview.innerHTML = "";

  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = document.createElement("img");
      img.src = e.target.result;
      preview.appendChild(img);
    };
    reader.readAsDataURL(file);
  }
});
