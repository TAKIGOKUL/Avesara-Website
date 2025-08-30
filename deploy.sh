#!/bin/bash

# Avesara App Deployment Script

echo "🚀 Starting Avesara App Deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Run tests
echo "🧪 Running tests..."
npm test -- --watchAll=false

# Build the app
echo "🔨 Building the app..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📁 Build files created in ./build directory"
    echo ""
    echo "🌐 To deploy to GitHub Pages:"
    echo "   - Push to main branch (GitHub Actions will auto-deploy)"
    echo ""
    echo "🌐 To deploy to Netlify:"
    echo "   - Drag and drop the ./build folder to netlify.com"
    echo "   - Or connect your GitHub repo to Netlify for auto-deployment"
    echo ""
    echo "📋 Next steps:"
    echo "   1. Check .github/workflows/deploy.yml for GitHub Pages setup"
    echo "   2. Check netlify.toml for Netlify configuration"
    echo "   3. Review DEPLOYMENT.md for detailed instructions"
else
    echo "❌ Build failed!"
    exit 1
fi
