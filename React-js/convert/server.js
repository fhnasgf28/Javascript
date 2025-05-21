const express = require('express');
const puppeteer = require('puppeteer');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/convert', async (req, res) => {
  const url = req.body.url;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForTimeout(5000); // tunggu 5 detik untuk memastikan konten telah dimuat

  const video = await page.screenshot({
    path: 'video.mp4',
    type: 'mp4',
    quality: 100,
    clip: { x: 0, y: 0, width: 360, height: 640 }
  });

  await browser.close();

  res.json({ video_url: 'video.mp4' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});