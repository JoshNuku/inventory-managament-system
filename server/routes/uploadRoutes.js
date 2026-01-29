const express = require('express');
const router = express.Router();
const { upload } = require('../config/cloudinary');
const { protect } = require('../middleware/authMiddleware');

// @desc    Upload image
// @route   POST /api/upload
// @access  Private
router.post('/', protect, (req, res) => {
    upload.single('image')(req, res, function (err) {
        if (err) {
            console.error('Upload error:', err);
            return res.status(500).json({
                message: 'Image upload failed',
                error: err.message
            });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        res.json({
            url: req.file.path,
            public_id: req.file.filename,
        });
    });
});

module.exports = router;
