// 1. FUNGSI HEADBAR DAN SIDEBAR
function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    sidebar.classList.toggle('show');
  }
}

// Fungsi untuk membuka/menutup dropdown
  function toggleDropdown(event) {
    event.stopPropagation(); // Mencegah klik \nyebar
    const dropdown = document.getElementById('profileDropdown');
    dropdown.classList.toggle('show');
  }

  // Tutup dropdown
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

// 2. FUNGSI UNTUK PINDAH HALAMAN
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

window.onload = () => {
  const menuPertama = document.querySelector('.nav-item');
  loadPage('beranda.html', menuPertama);
};

// 3. FUNGSI MODAL LAPORAN

function openModal() {
  const modal = document.getElementById('laporanModal');
  if (modal) {
    modal.classList.add('show');
  }
}

function closeModal() {
  const modal = document.getElementById('laporanModal');
  if (modal) {
    modal.classList.remove('show');
  }
}

window.addEventListener('click', (event) => {
  const modal = document.getElementById('laporanModal');
  if (event.target === modal) {
    closeModal();
  }
});

// 4. FORM LAPORAN

function checkFiles(input) {
  const helpText = document.getElementById('fileHelpText');
  
  if (input.files.length > 5) {
    helpText.textContent = `Peringatan: Anda memilih ${input.files.length} file. Maksimal hanya 5 foto!`;
    helpText.classList.add('file-error');
    input.value = ''; // Reset input file
  } else if (input.files.length > 0) {
    helpText.textContent = `${input.files.length} foto berhasil dipilih.`;
    helpText.classList.remove('file-error');
  } else {
    helpText.textContent = 'Format: JPG, PNG. Maksimal 5 file foto.';
    helpText.classList.remove('file-error');
  }
}

function submitLaporan(event) {
  event.preventDefault();
  closeModal();
  document.getElementById('formLaporan').reset();
  document.getElementById('fileHelpText').textContent = 'Format: JPG, PNG. Maksimal 5 file foto.';
  document.getElementById('fileHelpText').classList.remove('file-error');
  const successModal = document.getElementById('successModal');
  if (successModal) {
    successModal.classList.add('show');
  }
}

function closeSuccessModal() {
  const successModal = document.getElementById('successModal');
  if (successModal) {
    successModal.classList.remove('show');
  }
}

window.addEventListener('click', (event) => {
  const modalLaporan = document.getElementById('laporanModal');
  const modalSuccess = document.getElementById('successModal');
  if (event.target === modalLaporan) {
    closeModal();
  } else if (event.target === modalSuccess) {
    closeSuccessModal();
  }
});

