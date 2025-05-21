const puppeteer = require('puppeteer');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf'); // Untuk menghapus folder secara rekursif

// --- Konfigurasi ---
const INVITATION_URL = 'https://cahayamomentum.com/reni-and-panji?to=Tamu%20Undangan'; // Link undangan digital Anda
const OUTPUT_VIDEO_FILENAME = 'undangan_reni_panji_smartphone.mp4';
const MUSIC_PATH = path.join(__dirname, 'assets', 'backsound.mp3'); // Path ke file musik latar
const FRAMES_DIR = path.join(__dirname, 'temp_frames'); // Folder sementara untuk menyimpan screenshot

// Pengaturan video output
const VIDEO_WIDTH = 1080;  // Lebar standar smartphone (vertikal)
const VIDEO_HEIGHT = 1920; // Tinggi standar smartphone (vertikal)
const FRAME_RATE = 25;    // Frame per detik (25 atau 30 adalah standar)
const VIDEO_DURATION_SECONDS = 30; // Durasi total video yang diinginkan (detik)

// Hitungan internal
const TOTAL_FRAMES = VIDEO_DURATION_SECONDS * FRAME_RATE;
const FRAME_CAPTURE_INTERVAL_MS = 1000 / FRAME_RATE; // Interval waktu antar pengambilan screenshot

// --- Set FFmpeg Path (menggunakan ffmpeg-static) ---
ffmpeg.setFfmpegPath(require('ffmpeg-static'));

// --- Fungsi Utama ---
async function generateVideoFromInvitation() {
    console.log('Memulai proses konversi undangan ke video...');

    // 1. Persiapan Direktori Frames
    if (fs.existsSync(FRAMES_DIR)) {
        console.log(`Menghapus direktori lama: ${FRAMES_DIR}`);
        rimraf.sync(FRAMES_DIR); // Menghapus folder jika sudah ada
    }
    fs.mkdirSync(FRAMES_DIR);
    console.log(`Direktori frame sementara dibuat: ${FRAMES_DIR}`);

    // 2. Luncurkan Puppeteer
    console.log('Meluncurkan browser headless Puppeteer...');
    const browser = await puppeteer.launch({
        headless: true, // true untuk mode headless (tanpa GUI browser)
        args: [
            '--no-sandbox', // Penting untuk beberapa lingkungan server
            '--disable-setuid-sandbox'
        ]
    });
    const page = await browser.newPage();

    // Atur viewport sesuai ukuran smartphone
    await page.setViewport({
        width: VIDEO_WIDTH,
        height: VIDEO_HEIGHT,
        deviceScaleFactor: 1 // Skala pixel (1 = 1:1)
    });

    // Navigasi ke URL undangan
    console.log(`Mengunjungi URL: ${INVITATION_URL}`);
    await page.goto(INVITATION_URL, {
        waitUntil: 'networkidle0', // Menunggu hingga tidak ada lagi permintaan jaringan yang aktif
        timeout: 60000 // Timeout 60 detik
    });
    console.log('Halaman undangan berhasil dimuat.');

    // 3. Gulir halaman untuk memastikan semua konten termuat (jika ada scroll)
    // Undangan ini memiliki konten panjang, jadi kita perlu menggulir
    console.log('Menggulir halaman untuk memastikan semua konten terekam...');
    const bodyHandle = await page.$('body');
    const boundingBox = await bodyHandle.boundingBox();
    const scrollHeight = await page.evaluate(() => document.body.scrollHeight);

    // Ambil screenshot per bagian scroll
    const scrollSteps = Math.ceil(scrollHeight / VIDEO_HEIGHT); // Jumlah 'layar' yang perlu diambil
    const scrollPerFrame = (scrollHeight - VIDEO_HEIGHT) / TOTAL_FRAMES; // Jarak scroll per frame

    let currentScroll = 0;
    console.log(`Total scrollable height: ${scrollHeight}px`);
    console.log(`Mengambil ${TOTAL_FRAMES} screenshot untuk video ${VIDEO_DURATION_SECONDS} detik...`);

    for (let i = 0; i < TOTAL_FRAMES; i++) {
        const framePath = path.join(FRAMES_DIR, `frame_${String(i).padStart(4, '0')}.png`);

        // Gulir halaman secara bertahap
        await page.evaluate((scroll) => {
            window.scrollTo(0, scroll);
        }, currentScroll);

        // Ambil screenshot
        await page.screenshot({
            path: framePath,
            clip: { // Hanya ambil bagian viewport yang terlihat
                x: 0,
                y: currentScroll, // Mulai dari posisi scroll saat ini
                width: VIDEO_WIDTH,
                height: VIDEO_HEIGHT
            }
        });

        console.log(`Screenshot ${i + 1}/${TOTAL_FRAMES} diambil (${framePath}). Scroll Y: ${Math.round(currentScroll)}px`);

        // Increment scroll position
        currentScroll += scrollPerFrame;
        if (currentScroll > (scrollHeight - VIDEO_HEIGHT)) {
            currentScroll = (scrollHeight - VIDEO_HEIGHT); // Jangan scroll terlalu jauh
        }

        // Delay untuk simulasi animasi dan waktu frame
        await new Promise(resolve => setTimeout(resolve, FRAME_CAPTURE_INTERVAL_MS));
    }

    await browser.close();
    console.log('Semua screenshot berhasil diambil. Menutup browser.');

    // 4. Buat Video Menggunakan FFmpeg
    const outputVideoPath = path.join(__dirname, OUTPUT_VIDEO_FILENAME);
    console.log(`Memulai rendering video ke: ${outputVideoPath}`);

    return new Promise((resolve, reject) => {
        let command = ffmpeg()
            .input(path.join(FRAMES_DIR, 'frame_%04d.png')) // Input gambar
            .inputFPS(FRAME_RATE) // Atur frame rate
            .outputOptions([
                '-c:v libx264',    // Codec video
                '-pix_fmt yuv420p',// Pixel format untuk kompatibilitas luas
                '-preset medium',  // Kecepatan encoding vs kualitas (ultrafast, superfast, fast, medium, slow, slower, veryslow)
                '-crf 23',         // Constant Rate Factor (kualitas, 0-51, makin kecil makin bagus tapi ukuran file besar, 23 adalah default bagus)
                '-vf', `scale=${VIDEO_WIDTH}:${VIDEO_HEIGHT}` // Pastikan ukuran video sesuai
            ]);

        // Tambahkan musik jika path musik ada dan file ada
        if (fs.existsSync(MUSIC_PATH)) {
            console.log(`Menambahkan musik latar dari: ${MUSIC_PATH}`);
            command.input(MUSIC_PATH)
                   .outputOptions([
                       '-c:a aac',    // Codec audio
                       '-b:a 192k',   // Bitrate audio
                       '-shortest'    // Potong video/audio jika salah satu lebih pendek
                   ]);
        } else {
            console.warn(`File musik tidak ditemukan di ${MUSIC_PATH}. Video akan tanpa musik.`);
        }

        command.output(outputVideoPath)
            .on('end', async () => {
                console.log('Video berhasil dibuat!');
                // 5. Hapus Direktori Frames Sementara
                console.log(`Menghapus direktori temporary: ${FRAMES_DIR}`);
                rimraf.sync(FRAMES_DIR);
                resolve(outputVideoPath);
            })
            .on('error', (err, stdout, stderr) => {
                console.error('Terjadi error saat membuat video:', err.message);
                console.error('FFmpeg stdout:', stdout);
                console.error('FFmpeg stderr:', stderr);
                // 5. Hapus Direktori Frames Sementara bahkan jika ada error
                console.log(`Menghapus direktori temporary karena error: ${FRAMES_DIR}`);
                rimraf.sync(FRAMES_DIR);
                reject(err);
            })
            .run();
    });
}

// --- Jalankan Proses ---
generateVideoFromInvitation()
    .then(outputPath => {
        console.log(`Video final tersedia di: ${outputPath}`);
    })
    .catch(error => {
        console.error('Proses pembuatan video gagal:', error);
    });