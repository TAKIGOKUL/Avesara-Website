# GitHub Pages Deployment Guide

## Prerequisites
- Your React app is pushed to a GitHub repository
- GitHub Pages is enabled in your repository settings

## Setup Steps

### 1. Update Repository Settings
1. Go to your GitHub repository
2. Click on "Settings" tab
3. Scroll down to "Pages" section
4. Under "Source", select "GitHub Actions"

### 2. Update Homepage URL
In `package.json`, replace `[your-github-username]` with your actual GitHub username:
```json
"homepage": "https://your-actual-username.github.io/Avesara-Website"
```

### 3. Deploy Your App

#### Option A: Manual Deployment
```bash
npm run deploy
```

#### Option B: Automatic Deployment (Recommended)
1. Push your code to the main branch
2. GitHub Actions will automatically build and deploy your app
3. Check the "Actions" tab in your repository to monitor the deployment

### 4. Verify Deployment
- Wait a few minutes for the deployment to complete
- Visit `https://your-username.github.io/Avesara-Website`
- Your React app should now be displayed instead of the README

## Troubleshooting

### If you still see only the README:
1. Check that GitHub Pages is set to "GitHub Actions" source
2. Verify the Actions tab shows successful deployment
3. Wait 5-10 minutes for changes to propagate
4. Clear your browser cache

### If the app loads but assets are missing:
1. Check that the homepage URL in package.json is correct
2. Ensure all image paths use relative URLs or %PUBLIC_URL%

## Important Notes
- The app will be deployed to the `gh-pages` branch automatically
- Each push to main will trigger a new deployment
- The first deployment may take several minutes
- Make sure your repository is public or you have GitHub Pro for private repos
