# Deployment Guide

This guide covers deploying the Avesara app to both GitHub Pages and Netlify.

## GitHub Pages Deployment

### Prerequisites
- Repository is public or you have GitHub Pro
- GitHub Pages is enabled in repository settings
- GitHub Actions permissions are properly configured

### Setup
1. Go to your repository Settings > Pages
2. Set Source to "GitHub Actions"
3. Ensure the repository has the following permissions:
   - `contents: read`
   - `pages: write`
   - `id-token: write`

### Automatic Deployment
The app automatically deploys to GitHub Pages when you push to the `main` branch. The workflow:
1. Builds the React app
2. Uploads build artifacts
3. Deploys to GitHub Pages

### Manual Deployment
You can also trigger deployment manually:
1. Go to Actions tab in your repository
2. Select "Deploy to GitHub Pages" workflow
3. Click "Run workflow"

## Netlify Deployment

### Option 1: Drag & Drop (Quick)
1. Build your app: `npm run build`
2. Go to [netlify.com](https://netlify.com)
3. Drag and drop the `build` folder to deploy

### Option 2: Git Integration (Recommended)
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Deploy automatically on every push

### Netlify Configuration
The `netlify.toml` file handles:
- Build settings
- Routing for React Router
- Security headers
- Caching optimization

## Environment Variables

### For Production
Create `.env.production` file:
```env
REACT_APP_API_URL=your_production_api_url
REACT_APP_GOOGLE_SHEETS_ID=your_sheets_id
```

### For Development
Create `.env.local` file:
```env
REACT_APP_API_URL=your_development_api_url
REACT_APP_GOOGLE_SHEETS_ID=your_sheets_id
```

## Troubleshooting

### GitHub Pages Issues
- Check Actions tab for build errors
- Verify repository permissions
- Ensure GitHub Pages is enabled

### Netlify Issues
- Check build logs in Netlify dashboard
- Verify build command and publish directory
- Check for environment variable issues

### Common Build Issues
- Node version compatibility (use Node 18+)
- Missing dependencies
- Environment variable configuration

## Performance Optimization

### Build Optimization
- Use production build: `npm run build`
- Enable gzip compression
- Optimize images and assets

### Caching
- Static assets are cached for 1 year
- HTML files are cached appropriately
- API responses use proper cache headers

## Security

### Headers
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin

### Environment Variables
- Never commit sensitive data
- Use environment variables for configuration
- Validate all user inputs
