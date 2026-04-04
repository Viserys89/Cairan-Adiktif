// ==========================================
// 1. FUNGSI HEADBAR DAN SIDEBAR
// ==========================================
function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    sidebar.classList.toggle('show');
  }
}

// Fungsi untuk membuka/menutup dropdown
  function toggleDropdown(event) {
    event.stopPropagation(); // Mencegah klik menyebar ke elemen lain
    const dropdown = document.getElementById('profileDropdown');
    dropdown.classList.toggle('show');
  }

  // Fungsi untuk menutup dropdown otomatis jika user mengklik sembarang tempat di luar menu
  window.onclick = function(event) {
    if (!event.target.closest('.profile-section')) {
      const dropdowns = document.getElementsByClassName("dropdown-menu");
      for (let i = 0; i < dropdowns.length; i++) {
        let openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
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

// ==========================================
// 4. FUNGSI UNTUK MODAL LAPORAN
// ==========================================

// Fungsi membuka modal
function openModal() {
  const modal = document.getElementById('laporanModal');
  if (modal) {
    modal.classList.add('show');
  }
}

// Fungsi menutup modal
function closeModal() {
  const modal = document.getElementById('laporanModal');
  if (modal) {
    modal.classList.remove('show');
  }
}

// Menutup modal jika area gelap (overlay) di luar kotak form di-klik
window.addEventListener('click', (event) => {
  const modal = document.getElementById('laporanModal');
  if (event.target === modal) {
    closeModal();
  }
});

// ==========================================
// 5. VALIDASI & SUBMIT FORM LAPORAN
// ==========================================

// Fungsi membatasi maksimal 5 foto
function checkFiles(input) {
  const helpText = document.getElementById('fileHelpText');
  
  if (input.files.length > 5) {
    // Jika lebih dari 5, munculkan error dan kosongkan pilihan
    helpText.textContent = `Peringatan: Anda memilih ${input.files.length} file. Maksimal hanya 5 foto!`;
    helpText.classList.add('file-error');
    input.value = ''; // Reset input file
  } else if (input.files.length > 0) {
    // Jika aman, tampilkan jumlah file yang dipilih
    helpText.textContent = `${input.files.length} foto berhasil dipilih.`;
    helpText.classList.remove('file-error');
  } else {
    // Jika batal memilih
    helpText.textContent = 'Format: JPG, PNG. Maksimal 5 file foto.';
    helpText.classList.remove('file-error');
  }
}

// Fungsi simulasi kirim laporan
function submitLaporan(event) {
  event.preventDefault(); // Mencegah halaman refresh
  
  // (Nantinya kode API kirim data ke database ditaruh di sini)
  
  // 1. Tutup modal form dan reset isinya
  closeModal();
  document.getElementById('formLaporan').reset();
  document.getElementById('fileHelpText').textContent = 'Format: JPG, PNG. Maksimal 5 file foto.';
  document.getElementById('fileHelpText').classList.remove('file-error');

  // 2. Tampilkan Modal Berhasil
  const successModal = document.getElementById('successModal');
  if (successModal) {
    successModal.classList.add('show');
  }
}

// Fungsi menutup modal berhasil
function closeSuccessModal() {
  const successModal = document.getElementById('successModal');
  if (successModal) {
    successModal.classList.remove('show');
  }
}

// Menutup modal jika area gelap (overlay) di luar kotak di-klik
window.addEventListener('click', (event) => {
  const modalLaporan = document.getElementById('laporanModal');
  const modalSuccess = document.getElementById('successModal');
  
  // Cek modal mana yang sedang di-klik overlay-nya
  if (event.target === modalLaporan) {
    closeModal();
  } else if (event.target === modalSuccess) {
    closeSuccessModal();
  }
});

