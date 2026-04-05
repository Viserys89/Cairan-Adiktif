
// 1. FUNGSI UNTUK TOGGLE SIDEBAR (MOBILE
function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    sidebar.classList.toggle('show');
  }
}
// 2. FUNGSI UNTUK PINDAH HALAMAN (SPA
async function loadPage(namaFile, elemenMenu) {
  try {
    const respons = await fetch(namaFile);
    
    if (!respons.ok) {
      throw new Error('Halaman tidak ditemukan!');
    }
    
    const htmlKonten = await respons.text();
    document.getElementById('main-content').innerHTML = htmlKonten;

    document.querySelectorAll('.nav-item').forEach(menu => {
      menu.classList.remove('active');
    });

    if (elemenMenu) {
      elemenMenu.classList.add('active');
    }
    const sidebar = document.querySelector('.sidebar');
    if (sidebar && window.innerWidth <= 768 && sidebar.classList.contains('show')) {
      sidebar.classList.remove('show');
    }

  } catch (error) {
    console.error("Gagal memuat halaman:", error);
    document.getElementById('main-content').innerHTML = `<h2>Error: ${error.message}</h2>`;
  }
}
// 3. JALANKAN SAAT WEBSITE PERTAMA DIBUK
window.onload = () => {
  const menuPertama = document.querySelector('.nav-item');
  loadPage('beranda.html', menuPertama);
};