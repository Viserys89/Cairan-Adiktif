// ==========================================
// 1. FUNGSI UNTUK TOGGLE SIDEBAR (MOBILE)
// ==========================================
function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    sidebar.classList.toggle('show');
  }
}

// ==========================================
// 2. FUNGSI UNTUK PINDAH HALAMAN (SPA)
// ==========================================
async function loadPage(namaFile, elemenMenu) {
  try {
    // Ambil file HTML yang diminta
    const respons = await fetch(namaFile);
    
    if (!respons.ok) {
      throw new Error('Halaman tidak ditemukan!');
    }
    
    // Ubah file menjadi teks HTML
    const htmlKonten = await respons.text();
    
    // Masukkan HTML tadi ke dalam <main id="main-content">
    document.getElementById('main-content').innerHTML = htmlKonten;

    // Hapus warna oren dari semua menu
    document.querySelectorAll('.nav-item').forEach(menu => {
      menu.classList.remove('active');
    });

    // Tambahkan warna oren ke menu yang sedang diklik
    if (elemenMenu) {
      elemenMenu.classList.add('active');
    }

    // --- FITUR RESPONSIVE ---
    // Tutup sidebar otomatis di mobile setelah berhasil pindah halaman
    const sidebar = document.querySelector('.sidebar');
    if (sidebar && window.innerWidth <= 768 && sidebar.classList.contains('show')) {
      sidebar.classList.remove('show');
    }

  } catch (error) {
    // Munculkan error di console (untuk debugging) dan di layar
    console.error("Gagal memuat halaman:", error);
    document.getElementById('main-content').innerHTML = `<h2>Error: ${error.message}</h2>`;
  }
}

// ==========================================
// 3. JALANKAN SAAT WEBSITE PERTAMA DIBUKA
// ==========================================
window.onload = () => {
  const menuPertama = document.querySelector('.nav-item');
  // Otomatis load beranda.html saat refresh/buka web
  loadPage('beranda.html', menuPertama);
};