const express = require('express');
const youtubedl = require('youtube-dl-exec');

const app = express();

app.get('/get-url', (req, res) => {
    const videoUrl = req.query.url;

    if (!videoUrl) {
        return res.status(400).send('No video URL provided');
    }

    // Use youtube-dl-exec to get the media URL
    youtubedl(videoUrl, {
        getUrl: true
    }).then(output => {
        res.send({ mediaUrl: output });
    }).catch(err => {
        res.status(500).send(`Error: ${err.message}`);
    });
});

// Start the server (for local testing)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app; // Export for Vercel serverless function
