const { execFile } = require('child_process');
const path = require('path');

// Specify the path to the yt-dlp binary
const ytDlpPath = path.join(__dirname, '../bin/yt-dlp'); // Adjust the path as needed

// Specify the video URL
const videoUrl = 'https://www.dailymotion.com/video/xpihve';

// Use yt-dlp to fetch the media URL
execFile(ytDlpPath, ['-g', videoUrl], (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return;
    }
    // stdout will contain the direct URL of the media file
    console.log(`Media URL: ${stdout}`);
});
