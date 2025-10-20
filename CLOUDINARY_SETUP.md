# Cloudinary Setup Guide for LinkedIn Integration

## Overview
This guide will help you set up Cloudinary for image uploads in your LinkedIn post manager. Users can now upload images directly from their computer, which are stored on Cloudinary, and optionally choose to NOT post to LinkedIn (data will only be stored in the database).

---

## Features Added

### ✅ Backend Features
1. **Cloudinary Integration** - Images are uploaded to Cloudinary cloud storage
2. **Image Upload Endpoint** - `/api/upload-image` handles file uploads
3. **Post to LinkedIn Option** - New `postToLinkedIn` field in the database
4. **Image Storage** - `uploadedImages` array stores multiple Cloudinary URLs per post
5. **Validation** - 10MB file size limit and image-only file type validation

### ✅ Frontend Features
1. **Image Upload UI** - Clean interface to upload images from computer
2. **Image Preview** - Grid view of uploaded images with delete option
3. **Checkbox Option** - Toggle to NOT post to LinkedIn
4. **Dynamic Button Text** - Changes based on whether posting to LinkedIn or just saving
5. **Posts History** - Shows uploaded images and "Saved Only" badge for non-posted content

---

## Setup Instructions

### Step 1: Create a Cloudinary Account

1. Go to [https://cloudinary.com](https://cloudinary.com)
2. Click "Sign Up for Free"
3. Create your account (you can use Google/GitHub sign-in)
4. Verify your email address

### Step 2: Get Your Cloudinary Credentials

1. After logging in, you'll be on the Dashboard
2. Find the **Account Details** section
3. Copy these three values:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

### Step 3: Configure Backend

1. Open `satocii-backend/index.js`
2. Find lines 13-17 (Cloudinary Configuration section)
3. Replace the placeholders with your actual credentials:

```javascript
// Cloudinary Configuration
cloudinary.config({
  cloud_name: 'YOUR_CLOUD_NAME',     // Replace with your cloud name
  api_key: 'YOUR_API_KEY',           // Replace with your API key
  api_secret: 'YOUR_API_SECRET'      // Replace with your API secret
});
```

**Example:**
```javascript
cloudinary.config({
  cloud_name: 'myawesomeapp',
  api_key: '123456789012345',
  api_secret: 'abcdefghijklmnopqrstuvwxyz1234'
});
```

### Step 4: Install Dependencies (If Not Already Done)

Navigate to the backend directory and install packages:

```bash
cd satocii-backend
npm install
```

This will install:
- `cloudinary` - Cloudinary SDK
- `multer` - File upload middleware

### Step 5: Start the Backend Server

```bash
cd satocii-backend
node index.js
```

You should see:
```
Connected to MongoDB
Server is running on http://localhost:5000
```

### Step 6: Test the Integration

1. Open your browser and go to your LinkedIn page (http://localhost:3000/linkedin)
2. Try uploading an image:
   - Click "Choose Image" button
   - Select an image from your computer
   - Wait for upload confirmation
   - Image should appear in the preview grid

---

## How It Works

### Image Upload Flow

1. **User selects image** → Frontend validates file (type & size)
2. **Frontend sends to backend** → `/api/upload-image` endpoint receives file
3. **Backend uploads to Cloudinary** → Image stored in `linkedin-posts` folder
4. **Cloudinary returns URL** → Secure HTTPS URL sent back to frontend
5. **Frontend stores URL** → URL added to `uploadedImages` array
6. **User creates post** → URLs saved to MongoDB with post data

### Post to LinkedIn Option

#### Checkbox Checked (Default)
- Post is created on LinkedIn
- Data is saved to MongoDB
- Status: `posted` or `failed`
- `postToLinkedIn: true`

#### Checkbox Unchecked
- Post is NOT created on LinkedIn
- Data is ONLY saved to MongoDB
- Status: `saved`
- `postToLinkedIn: false`

---

## Database Schema Changes

### New Fields Added to Post Model

```javascript
{
  uploadedImages: [String],           // Array of Cloudinary image URLs
  postToLinkedIn: Boolean,            // Whether to post to LinkedIn (default: true)
  // ... existing fields
}
```

---

## API Endpoints

### 1. Upload Image
**POST** `/api/upload-image`

**Request:**
- Content-Type: `multipart/form-data`
- Body: `image` (file)

**Response:**
```json
{
  "success": true,
  "message": "Image uploaded successfully",
  "data": {
    "url": "https://res.cloudinary.com/xxx/image/upload/v123/linkedin-posts/abc123.jpg",
    "publicId": "linkedin-posts/abc123",
    "format": "jpg",
    "width": 1920,
    "height": 1080,
    "size": 245678
  }
}
```

### 2. Post to LinkedIn (or Save)
**POST** `/api/post-to-linkedin`

**Request Body:**
```json
{
  "content": "Post content here",
  "title": "Optional title",
  "uploadedImages": [
    "https://res.cloudinary.com/xxx/image/upload/v123/linkedin-posts/abc123.jpg"
  ],
  "postToLinkedIn": true,  // true = post to LinkedIn, false = save only
  "mediaType": "NONE",
  "mediaUrl": "",
  "mediaTitle": "",
  "mediaDescription": "",
  "mediaThumbnail": ""
}
```

**Response (when postToLinkedIn = true):**
```json
{
  "success": true,
  "message": "Post successfully created and shared on LinkedIn",
  "data": {
    "postId": "507f1f77bcf86cd799439011",
    "linkedinPostId": "urn:li:share:123456789",
    "content": "Post content",
    "status": "posted",
    "uploadedImages": ["..."]
  }
}
```

**Response (when postToLinkedIn = false):**
```json
{
  "success": true,
  "message": "Post saved successfully without posting to LinkedIn",
  "data": {
    "postId": "507f1f77bcf86cd799439011",
    "content": "Post content",
    "status": "saved",
    "uploadedImages": ["..."]
  }
}
```

---

## Frontend Components

### Image Upload Section
Located in the "Create Post" tab, features:
- File input (hidden)
- "Choose Image" button
- Upload progress indicator
- Image preview grid (2 columns on mobile, 3 on desktop)
- Delete button for each image (shown on hover)
- File size and type information

### Post to LinkedIn Checkbox
Located above action buttons:
- Checkbox control
- Dynamic description text
- Explains what will happen based on selection

### Action Buttons
- **Primary Button**: Changes text/icon based on checkbox
  - Checked: "Post to LinkedIn" (Send icon)
  - Unchecked: "Save Without Posting" (Save icon)
- **Secondary Button**: "Save Draft" (always saves without posting)

---

## File Upload Limits

### Backend Validation
- **Max File Size:** 10MB
- **Allowed Types:** Images only (MIME type: `image/*`)
- **Storage:** Cloudinary with automatic optimization

### Frontend Validation
- File size check before upload
- File type validation
- User-friendly error messages

---

## Cloudinary Folder Structure

All uploaded images are stored in:
```
cloudinary.com/your-cloud-name/
└── linkedin-posts/
    ├── image1.jpg
    ├── image2.png
    └── image3.webp
```

---

## Troubleshooting

### Issue: "Failed to upload image to Cloudinary"

**Solutions:**
1. Check Cloudinary credentials in `satocii-backend/index.js`
2. Verify Cloudinary account is active
3. Check internet connection
4. Look at backend console for detailed error

### Issue: Images not showing in preview

**Solutions:**
1. Check browser console for errors
2. Verify Cloudinary URL is valid (HTTPS)
3. Check if images array is populated in formData
4. Ensure Image component is properly imported from Next.js

### Issue: "Post saved" but not showing in LinkedIn

**Solutions:**
1. Check if `postToLinkedIn` checkbox was checked
2. Look at post status in Posts History tab
3. If status is "saved" instead of "posted", the checkbox was unchecked
4. This is expected behavior - data is only in database, not on LinkedIn

### Issue: Backend not starting

**Solutions:**
1. Run `npm install` in `satocii-backend` directory
2. Check if MongoDB connection string is valid
3. Verify port 5000 is not in use
4. Check Node.js version (requires v14+)

---

## Security Notes

⚠️ **Important Security Considerations:**

1. **API Credentials**: Never commit Cloudinary credentials to version control
   - Use environment variables in production
   - Add `.env` file to `.gitignore`

2. **File Upload Security**:
   - Backend validates file types
   - File size is limited to 10MB
   - Multer prevents malicious uploads

3. **Image URLs**: Cloudinary URLs are public
   - Anyone with the URL can view the image
   - Don't upload sensitive information

---

## Production Deployment

For production, use environment variables:

### 1. Create `.env` file in `satocii-backend`:
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

### 2. Update `index.js`:
```javascript
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
```

### 3. Install dotenv:
```bash
npm install dotenv
```

---

## Additional Features You Can Add

### Future Enhancements:
1. **Multiple images upload** - Allow dragging multiple files
2. **Image cropping** - Add crop functionality before upload
3. **Video support** - Extend to support video uploads
4. **Image compression** - Compress before uploading
5. **Progress bar** - Show upload progress percentage
6. **Cloudinary transformations** - Resize, filter, or optimize images

---

## Support

If you encounter issues:
1. Check the Cloudinary documentation: https://cloudinary.com/documentation
2. Review backend console logs
3. Check browser console for frontend errors
4. Verify all credentials are correct

---

## Summary

You now have a fully functional LinkedIn post manager with:
- ✅ Cloudinary image uploads
- ✅ Image preview and management
- ✅ Option to save without posting to LinkedIn
- ✅ Complete data storage in MongoDB
- ✅ Beautiful, user-friendly interface

Enjoy your enhanced LinkedIn integration! 🚀

