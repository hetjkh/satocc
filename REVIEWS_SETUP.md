# Dynamic Reviews System

This system allows administrators to manage customer reviews dynamically through an admin panel. Reviews can have three types: text only, image with text, or video with text.

## Features

- **Three Review Types**:
  - **Text Only**: Customer review with optional profile image
  - **Image with Text**: Review featuring a main image with caption
  - **Video with Text**: Review with embedded video (YouTube, etc.)

- **Admin Panel**: Full CRUD operations for reviews
- **Image Upload**: Integrated Cloudinary upload for images
- **Active/Inactive Status**: Toggle review visibility
- **Order Management**: Control display order of reviews
- **Real-time Updates**: Frontend automatically fetches latest reviews

## API Endpoints

### Backend (satocii-backend/index.js)

```
GET    /api/reviews           - Get all active reviews (public)
GET    /api/reviews/all       - Get all reviews including inactive (admin)
POST   /api/reviews           - Create a new review
PUT    /api/reviews/:id       - Update a review
DELETE /api/reviews/:id       - Delete a review
PATCH  /api/reviews/:id/toggle - Toggle active status
```

## Admin Panel

Access the admin panel at: `/admin/reviews`

### Creating a Review

1. Click "Add Review" button
2. Fill in the required fields:
   - **Customer Name** (required)
   - **Role/Title** (required)
   - **Review Content** (required)
   - **Review Type** (required): Choose from text, image, or video
   - **Display Order** (optional): Lower numbers appear first
   
3. Upload images (optional):
   - **Profile Image**: Customer's profile picture
   - **Media Image**: Main review image (for image type)
   - **Video URL**: YouTube embed URL (for video type)

4. Click "Create Review"

### Managing Reviews

- **Edit**: Click the edit icon to modify a review
- **Toggle Active/Inactive**: Click the eye icon to show/hide reviews
- **Delete**: Click the trash icon to permanently delete a review

## Frontend Display

The reviews appear on the home page in the "What Our Customers Say" section. The component automatically:

- Fetches active reviews from the API
- Displays them in a horizontal scrollable carousel
- Applies GSAP animations for smooth appearance
- Renders different layouts based on review type

## Database Schema

```javascript
{
  name: String (required),
  role: String (required),
  content: String (required),
  type: String (required, enum: ['text', 'image', 'video']),
  mediaUrl: String (Cloudinary URL or video URL),
  imageUrl: String (Profile image URL),
  order: Number (default: 0),
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

## Setup Instructions

1. **Start Backend Server**:
   ```bash
   cd satocii-backend
   npm start
   ```
   Backend runs on: http://localhost:5000

2. **Start Frontend**:
   ```bash
   npm run dev
   ```
   Frontend runs on: http://localhost:3000

3. **Access Admin Panel**:
   Navigate to: http://localhost:3000/admin/reviews

4. **Add Your First Review**:
   - Click "Add Review"
   - Fill in the form
   - Upload images if needed
   - Submit

5. **View on Homepage**:
   Visit the homepage to see your reviews in the "What Our Customers Say" section

## Image Upload

Images are uploaded to Cloudinary and automatically handled:
- Profile images: Customer avatars
- Media images: Main review images
- Video URLs: Direct embed URLs (e.g., YouTube embed links)

For video reviews, use YouTube embed URLs in the format:
```
https://www.youtube.com/embed/VIDEO_ID
```

## Notes

- Backend must be running for the admin panel and frontend to work
- All images are stored in Cloudinary
- Reviews are automatically sorted by order (ascending) and creation date
- Only active reviews appear on the public-facing website
- The system supports unlimited reviews with horizontal scrolling

