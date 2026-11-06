// Fungsi interaktif mengganti nama label kolom berdasarkan pilihan bentuk
function sesuaikanFormulir() {
    const bentuk = document.getElementById("bentukBeton").value;
    const labelLebar = document.getElementById("labelLebar");
    const inputLebar = document.getElementById("lebar");

    if (bentuk === "silinder") {
        labelLebar.innerText = "Diameter (meter)";
        inputLebar.placeholder = "Masukkan diameter tiang silinder";
    } else {
        labelLebar.innerText = "Lebar (meter)";
        inputLebar.placeholder = "Masukkan lebar bangunan";
    }
}

// Fungsi reset data instan sekali klik
function resetForm() {
    document.getElementById("panjang").value = "";
    document.getElementById("lebar").value = "";
    document.getElementById("tinggi").value = "";
    document.getElementById("hasilVolume").textContent = "0.000 m³";
    document.getElementById("hasilSemen").textContent = "0 Sak";
    document.getElementById("hasilPasir").textContent = "0.00 m³";
    document.getElementById("hasilKerikil").textContent = "0.00 m³";
}

// Fungsi Utama Perhitungan Rumus Matematika & Material SNI
function hitungvolume() {
    const panjang = parseFloat(document.getElementById("panjang").value) || 0;
    const lebar = parseFloat(document.getElementById("lebar").value) || 0;
    const tinggi = parseFloat(document.getElementById("tinggi").value) || 0;
    const bentuk = document.getElementById("bentukBeton").value;
    const tipeSemen = parseFloat(document.getElementById("kemasanSemen").value);

    let volume = 0;

    // 1. Kalkulasi Kubikasi Dasar
    if (bentuk === "balok" || bentuk === "plat") {
        volume = panjang * lebar * tinggi;
    } else if (bentuk === "silinder") {
        const radius = lebar / 2;
        volume = Math.PI * radius * radius * tinggi;
    }

    // Tampilkan Volume Beton Kasar
    document.getElementById("hasilVolume").textContent = volume.toFixed(3) + " m³";

    // 2. Kalkulasi Koefisien Material Berdasarkan Standar Mutu K-225 KemenPUPR / SNI
    // Per 1 m³ beton K-225 dibutuhkan: Semen = 371 kg, Pasir = 698 kg (±0.5 m³), Kerikil = 1047 kg (±0.77 m³)
    let totalBeratSemen = volume * 371; 
    let totalVolumePasir = volume * 0.52;
    let totalVolumeKerikil = volume * 0.78;

    // Konversi Berat Semen (Kg) ke bentuk satuan Jumlah Sak Komersial di Toko
    let jumlahSakSemen = Math.ceil(totalBeratSemen / tipeSemen);

    // 3. Render Pembaruan Data ke Layar Komputer secara Real-time
    if(volume > 0) {
        document.getElementById("hasilSemen").textContent = jumlahSakSemen + " Sak (" + tipeSemen + "kg)";
        document.getElementById("hasilPasir").textContent = totalVolumePasir.toFixed(2) + " m³";
        document.getElementById("hasilKerikil").textContent = totalVolumeKerikil.toFixed(2) + " m³";
    } else {
        document.getElementById("hasilSemen").textContent = "0 Sak";
        document.getElementById("hasilPasir").textContent = "0.00 m³";
        document.getElementById("hasilKerikil").textContent = "0.00 m³";
    }
}
