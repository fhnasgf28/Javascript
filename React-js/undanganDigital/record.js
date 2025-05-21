const puppeteer = require("puppeteer");
const { PuppeteerScreenRecorder } = require("puppeteer-screen-recorder");
const { exec } = require("child_process");
const path = require("path");

(async () => {
  const videoOutput = path.resolve(__dirname, 'output/undangan.mp4');
  const finalOutput = path.resolve(__dirname, 'output/undangan_with_music.mp4');
  const musicPath = path.resolve(__dirname, 'backsound.mp3');

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 390,
      height: 844,
      deviceScaleFactor: 2
    },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  const recorder = new PuppeteerScreenRecorder(page, {
    followNewTab: true,
    fps: 30,
    videoFrame: {
      width: 390,
      height: 844
    },
    aspectRatio: "9:16"
  });

  const url = "https://cahayamomentum.com/reni-and-panji?to=Tamu%20Undangan";
  await page.goto(url, { waitUntil: "networkidle2" });

  // Auto klik "Buka Undangan"
  await page.waitForTimeout(2000); // tunggu animasi
  await page.evaluate(() => {
    const btn = [...document.querySelectorAll("*")].find(el => el.innerText.includes("Open Invitation"));
    if (btn) btn.click();
  });

  await recorder.start(videoOutput);

  await page.waitForTimeout(70000); // rekam selama 60 detik

  await recorder.stop();
  await browser.close();

  // Tambahkan musik dengan ffmpeg
  const ffmpegCmd = `ffmpeg -y -i "${videoOutput}" -i "${musicPath}" -shortest -c:v copy -c:a aac "${finalOutput}"`;
  exec(ffmpegCmd, (err, stdout, stderr) => {
    if (err) {
      console.error("❌ Gagal menambahkan musik:", err.message);
    } else {
      console.log("✅ Video dengan musik berhasil dibuat:", finalOutput);
    }
  });
})();
