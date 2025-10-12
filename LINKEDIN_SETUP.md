# LinkedIn Integration Setup Guide

This guide explains how to use the LinkedIn posting functionality in the Satocci application.

## 🚀 Features

- **LinkedIn User Info**: Fetch and display LinkedIn profile information
- **Text Posts**: Create simple text-only posts on LinkedIn
- **Media Posts**: Share articles and videos with thumbnails
- **Post Management**: Save drafts and view posting history
- **Real-time Status**: Track post status (pending, posted, failed)

## 📋 API Endpoints

### Backend Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/linkedin-userinfo` | GET | Fetch LinkedIn user information |
| `/api/post-to-linkedin` | POST | Post content to LinkedIn |
| `/api/save-post` | POST | Save post without posting |
| `/api/posts` | GET | Fetch all posts |
| `/api/test` | GET | Test API connection |

### Frontend Pages

| Page | Route | Description |
|------|-------|-------------|
| LinkedIn Manager | `/linkedin` | Main LinkedIn posting interface |

## 🛠️ Setup Instructions

### 1. Backend Setup

1. **Start the backend server**:
   ```bash
   cd satocii-backend
   npm install
   npm start
   ```

2. **Verify backend is running**:
   - Visit `http://localhost:5000/api/test`
   - Should return: `{"success": true, "message": "API is working!"}`

### 2. Frontend Setup

1. **Start the frontend**:
   ```bash
   npm install
   npm run dev
   ```

2. **Access LinkedIn Manager**:
   - Visit `http://localhost:3000/linkedin`
   - Or click "LINKEDIN" in the navigation menu

## 📝 Usage Guide

### Creating Posts

#### 1. **Text Posts**
- Enter your content in the "Post Content" field
- Optionally add a title
- Select "Text Only" for media type
- Click "Post to LinkedIn" or "Save Draft"

#### 2. **Media Posts (Articles/Videos)**
- Enter your content and title
- Select "Article" or "Video" for media type
- Fill in media details:
  - **Media URL**: Link to the article/video
  - **Media Title**: Title for the media content
  - **Media Description**: Description of the media
  - **Thumbnail URL**: Image thumbnail (optional)

### Post Management

#### **User Info Tab**
- View your LinkedIn profile information
- See your LinkedIn user ID
- Check connection status

#### **Posts History Tab**
- View all your posts
- See post status (posted, failed, pending, saved)
- View LinkedIn post IDs
- Check creation timestamps

## 🔧 API Request Examples

### Post to LinkedIn
```bash
POST /api/post-to-linkedin
Content-Type: application/json

{
  "content": "This is my automated API post",
  "title": "My Post Title",
  "mediaType": "NONE"
}
```

### Media Post
```bash
POST /api/post-to-linkedin
Content-Type: application/json

{
  "content": "Check out this amazing article!",
  "title": "Article Share",
  "mediaType": "ARTICLE",
  "mediaUrl": "https://example.com/article",
  "mediaTitle": "Amazing Article",
  "mediaDescription": "This article explains everything",
  "mediaThumbnail": "https://example.com/thumb.jpg"
}
```

### Save Draft
```bash
POST /api/save-post
Content-Type: application/json

{
  "content": "This is a draft post",
  "title": "Draft Title",
  "mediaType": "NONE"
}
```

## 🗄️ Database Schema

The `Post` collection stores:

```javascript
{
  _id: ObjectId,
  platform: "linkedin",
  content: String,
  title: String,
  linkedinPostId: String,      // LinkedIn post ID
  linkedinUserId: String,       // LinkedIn user ID (sub field)
  mediaType: String,           // NONE, ARTICLE, VIDEO
  mediaUrl: String,            // Media URL
  mediaTitle: String,           // Media title
  mediaDescription: String,     // Media description
  mediaThumbnail: String,       // Thumbnail URL
  status: String,              // pending, posted, failed, saved
  createdAt: Date,
  updatedAt: Date
}
```

## 🔐 LinkedIn API Configuration

The backend uses the following LinkedIn API endpoints:

- **User Info**: `https://api.linkedin.com/v2/userinfo`
- **UGC Posts**: `https://api.linkedin.com/v2/ugcPosts`

### Required Headers
```javascript
{
  'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
  'Content-Type': 'application/json',
  'X-Restli-Protocol-Version': '2.0.0'
}
```

## 🚨 Troubleshooting

### Common Issues

1. **"Failed to connect to LinkedIn API"**
   - Check if backend server is running
   - Verify API_BASE_URL in frontend
   - Check network connectivity

2. **"Failed to fetch user info"**
   - Verify LinkedIn access token is valid
   - Check LinkedIn API permissions
   - Ensure token hasn't expired

3. **"Failed to post to LinkedIn"**
   - Check LinkedIn API rate limits
   - Verify post content meets LinkedIn requirements
   - Check media URLs are accessible

### Debug Steps

1. **Test API Connection**:
   ```bash
   curl http://localhost:5000/api/test
   ```

2. **Check LinkedIn User Info**:
   ```bash
   curl http://localhost:5000/api/linkedin-userinfo
   ```

3. **View Backend Logs**:
   - Check console output for error messages
   - Look for LinkedIn API response details

## 📊 Status Codes

| Status | Description |
|--------|-------------|
| `pending` | Post is being processed |
| `posted` | Successfully posted to LinkedIn |
| `failed` | Post failed to publish |
| `saved` | Post saved as draft |

## 🔄 Data Flow

1. **User creates post** → Frontend form
2. **Post data sent** → Backend API
3. **Post saved** → MongoDB database
4. **LinkedIn API called** → LinkedIn platform
5. **Status updated** → Database and frontend
6. **User notified** → Success/error message

## 🎯 Best Practices

1. **Content Guidelines**:
   - Keep posts professional
   - Use relevant hashtags
   - Include engaging media

2. **Media Optimization**:
   - Use high-quality thumbnails
   - Ensure media URLs are accessible
   - Test media links before posting

3. **Rate Limiting**:
   - Don't spam LinkedIn API
   - Space out posts appropriately
   - Monitor API usage

## 📈 Future Enhancements

- [ ] Scheduled posting
- [ ] Post analytics
- [ ] Multiple LinkedIn accounts
- [ ] Post templates
- [ ] Bulk posting
- [ ] Post performance metrics

## 🆘 Support

For issues or questions:
1. Check the troubleshooting section
2. Review backend logs
3. Test API endpoints individually
4. Verify LinkedIn API access token

---

**Note**: Make sure your LinkedIn access token has the necessary permissions for posting content.
