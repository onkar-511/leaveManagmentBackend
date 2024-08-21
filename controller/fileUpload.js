const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dpv6py3wf',
    api_key: '336596334956272',
    api_secret: 'CdSvVrlgllYt5f3nAhjeAREBW-k'
    
    // cloud_name: process.env.cloud_name,
    // api_key: process.env.api_key,
    // api_secret: process.env.api_secret
});

const uploadFile = async (req, res, next) => {
    try {
        const files = req.files;
        let resData = []
        if (!files || files.length === 0) {
            return res.status(400).json({ error: 'No files found in request' });
        }

        // Iterate over each file
        for (const file of files) {
            const filePath = file.path;
            const result = await cloudinary.uploader.upload(filePath);
            resData.push(result)
            // cloudinary.uploader.upload(filePath, async (error, result) => {
            //     if (error) {
            //         console.error("Error uploading to Cloudinary:", error);
            //         return res.status(500).json({ error: 'Failed to upload the file to Cloudinary' });
            //     }
            //     console.log(result, "upload result");
            //     resData.push(result)

            //     // Once uploaded successfully, rename the file
            //     // const newFileName = `uploaded_${file.filename}`;
            //     // const newFilePath = path.join('uploads', newFileName);
            //     // fs.rename(filePath, newFilePath, (err) => {
            //     //     if (err) {
            //     //         console.error("Error renaming file:", err);
            //     //         return res.status(500).json({ error: 'Failed to store the file' });
            //     //     }
            //     //     console.log("File renamed successfully");
            //     // });
            // });
        }

        res.json({
            data: resData,
            msg: "Files uploaded and stored successfully"
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { uploadFile };
