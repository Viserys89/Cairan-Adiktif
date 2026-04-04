const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const emailInput = document.getElementById("email").value.toLowerCase();
  // Logika pengecekan email dan arah redirect
  if (emailInput === "host") {
    // Ganti URL ini sesuai dengan path/lokasi file host kamu
    window.location.href = "../host/index.html";
  } else if (emailInput === "admin") {
    // Ganti URL ini sesuai dengan path/lokasi file admin kamu
    window.location.href = "../admin/index.html";
  } else if (emailInput === "finance") {
    // Ganti URL ini sesuai dengan path/lokasi file finance kamu
    window.location.href = "../finance/index.html";
  } else {
    // Jika input selain host/admin/finance
    alert("Email tidak dikenali! Silakan masukkan: host, admin, atau finance.");
  }
});
