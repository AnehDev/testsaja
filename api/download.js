// Import the required package
const youtubedl = require('youtube-dl-exec');

// Create a handler for the serverless function
module.exports = async (req, res) => {
    const videoUrl = req.query.url; // Get the video URL from the query string

    if (!videoUrl) {
        return res.status(400).json({ error: 'Missing video URL' });
    }

    try {
        // Use youtube-dl-exec to fetch the media URL
        const output = await youtubedl(videoUrl, {
            dumpSingleJson: true,
            noWarnings: true,
            // Add verbosity for debugging
            verbose: true,
        });

        // Check if the output contains a valid media URL
        if (!output || !output.url) {
            throw new Error('No media URL found in output.');
        }

        // Send the media URL back in the response
        res.json({ mediaUrl: output.url });
    } catch (error) {
        console.error(`Error: ${error.message}`);
        console.error(error); // Log the full error for debugging
        res.status(500).json({ error: 'Failed to fetch media URL', details: error.message });
    }
};
