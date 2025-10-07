const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
const MONGODB_URI = 'mongodb+srv://hetjani818_db_user:123@cluster0.v1x2mx9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Middleware
app.use(cors());
app.use(bodyParser.json());

// ✅ LinkedIn API Configuration
const LINKEDIN_CONFIG = {
  accessToken: 'AQW7XJBKTyD--kaCNFOIH9xEQkwXMLI5fH7NuSYAmQJOOMXgFawuXNToYnDBl98fZP1RUnNVjiq7MjH5t71X-29XZE2mBLsUeg9nPGMQtkLv-r-YK4HjMjVJSQQQtXDw-408GFRTdKDnvJ-lIm27Ry51-bGa6_5RtVsbnBi3d5ZiqgqCQd_oZI0OZqgtf9xXoAa4RNHTViZrt6yKEROSsHz62GZ3OimKpb09Utg55APCkBMC6Eo7HM6CrWlMyZJPAi25yLTaDsBDj3JnsAXg5gXb6Gf9fIK-V-XctGV6TikOEh4446aWUB8_ip17NFE5IO5E6EsdJvPjMT6caSOdKx7mMSkceA'
};


// ✅ Define Schema & Model for Social Posts
const postSchema = new mongoose.Schema({
  platform: { type: String, required: true },  // e.g. 'linkedin'
  postUrl: { type: String },                    // embed link
  content: { type: String, required: true },    // post content
  title: { type: String },                      // post title
  linkedinPostId: { type: String },            // LinkedIn post ID for tracking
  linkedinUserId: { type: String },             // LinkedIn user ID (sub field)
  mediaType: { type: String, default: 'NONE' }, // NONE, ARTICLE, VIDEO, etc.
  mediaUrl: { type: String },                   // URL for media content
  mediaTitle: { type: String },                 // Title for media content
  mediaDescription: { type: String },           // Description for media content
  mediaThumbnail: { type: String },             // Thumbnail URL for media
  status: { type: String, default: 'pending' } // pending, posted, failed
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

// ✅ LinkedIn API Helper Functions
async function getLinkedInUserInfo() {
  try {
    const response = await axios.get('https://api.linkedin.com/v2/userinfo', {
      headers: {
        'Authorization': `Bearer ${LINKEDIN_CONFIG.accessToken}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching LinkedIn user info:', error.response?.data || error.message);
    throw error;
  }
}

async function postToLinkedIn(content, options = {}) {
  try {
    const { 
      title = '', 
      mediaType = 'NONE', 
      mediaUrl = '', 
      mediaTitle = '', 
      mediaDescription = '', 
      mediaThumbnail = '' 
    } = options;

    // Get user info to get the user ID
    const userInfo = await getLinkedInUserInfo();
    const authorUrn = `urn:li:person:${userInfo.sub}`;

    // Build the post data
    const postData = {
      author: authorUrn,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: {
            text: content
          },
          shareMediaCategory: mediaType
        }
      },
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
      }
    };

    // Add media if provided
    if (mediaType !== 'NONE' && mediaUrl) {
      postData.specificContent['com.linkedin.ugc.ShareContent'].media = [{
        status: 'READY',
        description: {
          text: mediaDescription || content
        },
        originalUrl: mediaUrl,
        title: {
          text: mediaTitle || title
        }
      }];

      // Add thumbnail if provided
      if (mediaThumbnail) {
        postData.specificContent['com.linkedin.ugc.ShareContent'].media[0].thumbnails = [{
          url: mediaThumbnail
        }];
      }
    }

    console.log('Posting to LinkedIn with data:', JSON.stringify(postData, null, 2));

    // Post to LinkedIn using the UGC Posts API
    const response = await axios.post('https://api.linkedin.com/v2/ugcPosts', postData, {
      headers: {
        'Authorization': `Bearer ${LINKEDIN_CONFIG.accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0'
      }
    });

    return {
      ...response.data,
      userInfo: userInfo
    };
  } catch (error) {
    console.error('Error posting to LinkedIn:', error.response?.data || error.message);
    throw error;
  }
}

// ✅ Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwX6sBx2LCfMH_fYgjmXoQY_sswvUptgOA-Jk8JT4rkXhMW6PjGbsqXQ70QlZ4Yf1Vh/exec';


// ✅ API endpoint to submit form data
app.post('/api/submit-form', async (req, res) => {
  try {
    const { fullName, address, email, phone, companyUrl, pos, dailyCustomers } = req.body;

    if (!fullName || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Full name, email, and phone are required fields'
      });
    }

    const formData = new URLSearchParams({
      fullName,
      address: address || '',
      email,
      phone,
      companyUrl: companyUrl || '',
      pos: pos || '',
      dailyCustomers: dailyCustomers || ''
    }).toString();

    const response = await axios.post(GOOGLE_SCRIPT_URL, formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      maxRedirects: 5,
      validateStatus: (status) => status >= 200 && status < 400
    });

    if (response.status === 200) {
      res.json({
        success: true,
        message: 'Data submitted successfully',
        data: response.data
      });
    } else {
      throw new Error(`Unexpected response status: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit form data',
      error: error.message
    });
  }
});



// ✅ API endpoint to get all posts
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: posts
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch posts',
      error: error.message
    });
  }
});


// ✅ Simple test endpoint
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'API is working!',
    timestamp: new Date().toISOString(),
    linkedinConfig: {
      hasAccessToken: !!LINKEDIN_CONFIG.accessToken
    }
  });
});

// ✅ API endpoint to get LinkedIn user info
app.get('/api/linkedin-userinfo', async (req, res) => {
  try {
    const userInfo = await getLinkedInUserInfo();
    res.json({
      success: true,
      data: userInfo
    });
  } catch (error) {
    console.error('Error fetching LinkedIn user info:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch LinkedIn user info',
      error: error.response?.data || error.message
    });
  }
});

// ✅ API endpoint to post to LinkedIn
app.post('/api/post-to-linkedin', async (req, res) => {
  try {
    const { 
      content, 
      title = '', 
      mediaType = 'NONE', 
      mediaUrl = '', 
      mediaTitle = '', 
      mediaDescription = '', 
      mediaThumbnail = '' 
    } = req.body;

    console.log('📝 Received LinkedIn post request:', { 
      content: content.substring(0, 50) + '...', 
      title, 
      mediaType,
      mediaUrl 
    });

    // Validate required fields
    if (!content) {
      return res.status(400).json({
        success: false,
        message: 'Content is required'
      });
    }

    // Create post record in database
    const newPost = new Post({
      platform: 'linkedin',
      content: content,
      title: title,
      mediaType: mediaType,
      mediaUrl: mediaUrl,
      mediaTitle: mediaTitle,
      mediaDescription: mediaDescription,
      mediaThumbnail: mediaThumbnail,
      status: 'pending'
    });

    await newPost.save();
    console.log('💾 Post saved to database with ID:', newPost._id);

    try {
      // Post to LinkedIn
      console.log('🚀 Attempting to post to LinkedIn...');
      const linkedinResponse = await postToLinkedIn(content, {
        title,
        mediaType,
        mediaUrl,
        mediaTitle,
        mediaDescription,
        mediaThumbnail
      });
      
      // Update post record with LinkedIn post ID and user ID
      newPost.linkedinPostId = linkedinResponse.id;
      newPost.linkedinUserId = linkedinResponse.userInfo.sub;
      newPost.status = 'posted';
      await newPost.save();

      console.log('✅ Successfully posted to LinkedIn! Post ID:', linkedinResponse.id);

      res.json({
        success: true,
        message: 'Post successfully created and shared on LinkedIn',
        data: {
          postId: newPost._id,
          linkedinPostId: linkedinResponse.id,
          linkedinUserId: linkedinResponse.userInfo.sub,
          content: content,
          status: 'posted',
          userInfo: linkedinResponse.userInfo
        }
      });

    } catch (linkedinError) {
      // Update post status to failed
      newPost.status = 'failed';
      await newPost.save();

      console.error('❌ LinkedIn posting failed:', linkedinError.response?.data || linkedinError.message);

      res.status(500).json({
        success: false,
        message: 'Failed to post to LinkedIn',
        error: linkedinError.response?.data || linkedinError.message,
        postId: newPost._id
      });
    }

  } catch (error) {
    console.error('Error in post-to-linkedin endpoint:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// ✅ API endpoint to save post without posting to LinkedIn
app.post('/api/save-post', async (req, res) => {
  try {
    const { 
      content, 
      title = '', 
      mediaType = 'NONE', 
      mediaUrl = '', 
      mediaTitle = '', 
      mediaDescription = '', 
      mediaThumbnail = '' 
    } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        message: 'Content is required'
      });
    }

    const newPost = new Post({
      platform: 'linkedin',
      content: content,
      title: title,
      mediaType: mediaType,
      mediaUrl: mediaUrl,
      mediaTitle: mediaTitle,
      mediaDescription: mediaDescription,
      mediaThumbnail: mediaThumbnail,
      status: 'saved'
    });

    await newPost.save();

    res.json({
      success: true,
      message: 'Post saved to database successfully',
      data: {
        postId: newPost._id,
        content: content,
        status: 'saved'
      }
    });

  } catch (error) {
    console.error('Error saving post:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save post',
      error: error.message
    });
  }
});

// ✅ Connect to MongoDB & Start server
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});
