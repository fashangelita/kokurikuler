// Database Sederhana
const motifData = [
    {
        nama: "Mega Mendung",
        asal: "Cirebon",
        makna: "Melambangkan awan yang membawa hujan sebagai simbol kesuburan dan pemberi kehidupan."
    },
    {
        nama: "Parang Kusumo",
        asal: "Solo/Yogya",
        makna: "Berasal dari kata 'kusumo' (bunga), melambangkan hidup harus dilandasi perjuangan mencari keharuman lahir batin."
    },
    {
        nama: "Kawung",
        asal: "Yogyakarta",
        makna: "Melambangkan kesucian, kemurnian, dan harapan agar manusia selalu berguna bagi sesamanya."
    }
];

const video = document.getElementById('webcam');
const btnCapture = document.getElementById('capture-btn');
const resultPanel = document.getElementById('result-panel');
const startScanBtn = document.getElementById('start-scan-btn');
const homepage = document.getElementById('homepage');
const cameraSection = document.querySelector('.camera-section');
const backToHomeBtn = document.getElementById('back-to-home-btn');
const backToHomeBtnResult = document.getElementById('back-to-home-btn-result');

// 1. Mengaktifkan Kamera
async function setupCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
    } catch (err) {
        alert("Mohon izinkan akses kamera untuk menggunakan aplikasi ini.");
    }
}

// 2. Simulasi "AI Scanning"
btnCapture.addEventListener('click', () => {
    btnCapture.innerText = "Menganalisis Pola...";
    btnCapture.disabled = true;

    // Simulasi loading AI selama 2 detik
    setTimeout(() => {
        // Pilih hasil acak dari database (Hanya simulasi untuk prototype)
        const randomResult = motifData[Math.floor(Math.random() * motifData.length)];

        displayResult(randomResult);
        btnCapture.innerText = "Pindai Kain Sekarang";
        btnCapture.disabled = false;
    }, 2000);
});

// 3. Menampilkan Hasil ke Layar
function displayResult(data) {
    document.getElementById('motif-name').innerText = data.nama;
    document.getElementById('origin-tag').innerText = data.asal;
    document.getElementById('philosophy-text').innerText = data.makna;
    
    resultPanel.classList.remove('hidden');
    resultPanel.scrollIntoView({ behavior: 'smooth' });
}

// Reset Scan
document.getElementById('reset-btn').addEventListener('click', () => {
    resultPanel.classList.add('hidden');
});

// Event listener untuk tombol mulai pindai
startScanBtn.addEventListener('click', () => {
    homepage.classList.add('hidden');
    cameraSection.classList.remove('hidden');
    setupCamera();
});

// Event listener untuk tombol kembali ke beranda dari kamera
backToHomeBtn.addEventListener('click', () => {
    cameraSection.classList.add('hidden');
    resultPanel.classList.add('hidden');
    homepage.classList.remove('hidden');

    // Stop camera stream
    if (video.srcObject) {
        const stream = video.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        video.srcObject = null;
    }
});

// Event listener untuk tombol kembali ke beranda dari hasil
backToHomeBtnResult.addEventListener('click', () => {
    resultPanel.classList.add('hidden');
    homepage.classList.remove('hidden');

    // Stop camera stream
    if (video.srcObject) {
        const stream = video.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        video.srcObject = null;
    }
});

// Mulai Kamera saat Load (dihapus karena sekarang dipanggil saat tombol diklik)
