// API Configuration
const API_CONFIG = {
  // Base URLs from environment variables
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://spc-backend-two.vercel.app',
  AUTH_URL: import.meta.env.VITE_API_AUTH_URL || 'https://spc-backend-two.vercel.app',
  
  // API Endpoints
  ENDPOINTS: {
    // Authentication
    AUTH: {
      LOGIN: '/api/auth/login',
      SIGNUP: '/api/auth/signup',
      VERIFY: '/api/auth/verify'
    },
    
    // Hackathons
    HACKATHONS: {
      BASE: '/api/hackathons',
      USER: '/api/hackathons/user',
      FEATURED: '/api/hackathons/featured',
      DRAFT: '/api/hackathons/draft',
      BY_ID: (id) => `/api/hackathons/${id}`,
      PUBLISH: (id) => `/api/hackathons/${id}/publish`,
      STATS: (id) => `/api/hackathons/${id}/stats`,
      REGISTER: (id) => `/api/hackathons/${id}/register`,
      REGISTRATIONS: (id) => `/api/hackathons/${id}/registrations`
    },
    
    // Registrations
    REGISTRATIONS: {
      MY: '/api/hackathons/registrations/my',
      BY_ID: (id) => `/api/hackathons/registrations/${id}`,
      CANCEL: (id) => `/api/hackathons/registrations/${id}/cancel`,
      CHECKIN: (id) => `/api/hackathons/registrations/${id}/checkin`,
      SUBMIT: (id) => `/api/hackathons/registrations/${id}/submit`
    },
    
    // Videos
    VIDEOS: {
      BASE: '/api/videos',
      BY_ID: (id) => `/api/videos/${id}`
    }
  }
};

// Helper functions to build full URLs
export const getApiUrl = (endpoint, useAuthUrl = false) => {
  const baseUrl = useAuthUrl ? API_CONFIG.AUTH_URL : API_CONFIG.BASE_URL;
  return `${baseUrl}${endpoint}`;
};

export const getAuthUrl = (endpoint) => {
  return getApiUrl(endpoint, true);
};

export const getHackathonUrl = (endpoint) => {
  return getApiUrl(endpoint);
};

export default API_CONFIG;
