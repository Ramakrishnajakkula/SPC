# Environment Configuration

This project uses environment variables to configure API endpoints. This makes it easy to switch between development, testing, and production environments.

## Setup

1. Copy the `.env.example` file to `.env`:

   ```bash
   cp .env.example .env
   ```

2. Edit `.env` with your actual API URLs:
   ```
   VITE_API_BASE_URL=http://localhost:5000
   VITE_API_AUTH_URL=https://your-auth-backend-url.com
   ```

## Environment Files

- `.env` - Default environment variables (for development)
- `.env.production` - Production environment variables
- `.env.example` - Template file with example values

## API Configuration

The project uses a centralized API configuration in `src/config/api.js` that:

- Reads environment variables using `import.meta.env`
- Provides helper functions for building URLs
- Centralizes all API endpoints

## Available Environment Variables

- `VITE_API_BASE_URL` - Base URL for main API endpoints (hackathons, videos, etc.)
- `VITE_API_AUTH_URL` - Base URL for authentication endpoints

## Development vs Production

### Development

```
VITE_API_BASE_URL=http://localhost:5000
VITE_API_AUTH_URL=https://spc-backend-two.vercel.app
```

### Production

```
VITE_API_BASE_URL=https://spc-backend-two.vercel.app
VITE_API_AUTH_URL=https://spc-backend-two.vercel.app
```

## Usage in Components

Instead of hardcoding URLs, import and use the API configuration:

```javascript
import { getHackathonUrl, getAuthUrl } from "../config/api";
import API_CONFIG from "../config/api";

// For hackathon endpoints
const response = await axios.get(
  getHackathonUrl(API_CONFIG.ENDPOINTS.HACKATHONS.BASE)
);

// For auth endpoints
const response = await axios.post(
  getAuthUrl(API_CONFIG.ENDPOINTS.AUTH.LOGIN),
  data
);
```

## Security

- Environment files are added to `.gitignore` to prevent committing sensitive URLs
- Use `.env.example` to document required variables without exposing actual values
- Different environments can use different backend URLs for security and testing
