const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const emailInput = document.getElementById("email").value.toLowerCase();
  if (emailInput === "host") {
    window.location.href = "../host/index.html";
  } else if (emailInput === "admin") {
    window.location.href = "../admin/index.html";
  } else if (emailInput === "finance") {
    window.location.href = "../finance/index.html";
  } else {
    alert("Email tidak dikenali! Silakan masukkan: host, admin, atau finance.");
  }
});
