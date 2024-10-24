// Import the youtube-dl-exec package
const youtubedl = require('youtube-dl-exec');

// Create a handler for the serverless function
module.exports = async (req, res) => {
    const videoUrl = req.query.url; // Get the video URL from the query string

    if (!videoUrl) {
        return res.status(400).json({ error: 'Missing video URL' });
    }

    try {
        // Execute youtube-dl to get the media URL
        const output = await youtubedl(videoUrl, {
            dumpSingleJson: true, // Get the JSON output
            noWarnings: true, // Suppress warnings
        });

        // Extract the media URL
        const mediaUrl = output.url;

        // Send the media URL back in the response
        res.json({ mediaUrl });
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ error: 'Failed to fetch media URL' });
    }
};
