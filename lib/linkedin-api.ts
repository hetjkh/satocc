// LinkedIn API utility functions
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-production-backend-url.com' 
  : 'http://localhost:5000';

export interface LinkedInUser {
  sub: string;
  name: string;
  email: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: {
    country: string;
    language: string;
  };
}

export interface Post {
  _id: string;
  content: string;
  title: string;
  platform: string;
  status: string;
  linkedinPostId?: string;
  linkedinUserId?: string;
  mediaType: string;
  mediaUrl?: string;
  mediaTitle?: string;
  mediaDescription?: string;
  mediaThumbnail?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostData {
  content: string;
  title?: string;
  mediaType?: 'NONE' | 'ARTICLE' | 'VIDEO';
  mediaUrl?: string;
  mediaTitle?: string;
  mediaDescription?: string;
  mediaThumbnail?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

// Fetch LinkedIn user information
export async function fetchLinkedInUserInfo(): Promise<ApiResponse<LinkedInUser>> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/linkedin-userinfo`);
    return await response.json();
  } catch (error) {
    return {
      success: false,
      message: 'Failed to connect to LinkedIn API',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Post to LinkedIn
export async function postToLinkedIn(postData: PostData): Promise<ApiResponse<any>> { // eslint-disable-line @typescript-eslint/no-explicit-any
  try {
    const response = await fetch(`${API_BASE_URL}/api/post-to-linkedin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
    return await response.json();
  } catch (error) {
    return {
      success: false,
      message: 'Failed to post to LinkedIn',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Save post without posting to LinkedIn
export async function savePost(postData: PostData): Promise<ApiResponse<any>> { // eslint-disable-line @typescript-eslint/no-explicit-any
  try {
    const response = await fetch(`${API_BASE_URL}/api/save-post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
    return await response.json();
  } catch (error) {
    return {
      success: false,
      message: 'Failed to save post',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Fetch all posts
export async function fetchPosts(): Promise<ApiResponse<Post[]>> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/posts`);
    return await response.json();
  } catch (error) {
    return {
      success: false,
      message: 'Failed to fetch posts',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Test API connection
export async function testApiConnection(): Promise<ApiResponse<any>> { // eslint-disable-line @typescript-eslint/no-explicit-any
  try {
    const response = await fetch(`${API_BASE_URL}/api/test`);
    return await response.json();
  } catch (error) {
    return {
      success: false,
      message: 'Failed to connect to API',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
