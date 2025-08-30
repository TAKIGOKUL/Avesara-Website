# Google Sheets Integration Setup

## Overview
This application integrates with Google Sheets to automatically fetch and display opportunities. The data structure follows the format from your Google Sheet: [Opportunities (Responses)](https://docs.google.com/spreadsheets/d/13FuxfcVk0Y29SgZ5K7FD9HI23q_MDzceO2DgutofbAY/edit?resourcekey=&gid=1689398108#gid=1689398108)

## Data Structure
The application expects the following columns in your Google Sheet:

| Column | Description | Example |
|--------|-------------|---------|
| Timestamp | When the opportunity was added | 30/08/2025 17:01:30 |
| Company/ Event name | Company or event name | Google, Microsoft, Tech Conference 2025 |
| Description | Opportunity description | Software Engineer Position - Full Stack Development |
| URL | Application or registration link | https://careers.google.com |
| Image | Image URL or Google Drive link | https://drive.google.com/open?id=... |
| Registeration fee | Cost to register (0 for free) | 0, 50, 25 |
| category | Type of opportunity | Job, Internship, Event |
| LPA | Salary range (for jobs/internships) | 15-25, 8-12 |

## Setup Instructions

### Option 1: Use Mock Data (Default)
The application will work immediately with built-in mock data that matches your sheet structure.

### Option 2: Connect to Real Google Sheets

1. **Enable Google Sheets API:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable the Google Sheets API

2. **Create API Credentials:**
   - Go to APIs & Services > Credentials
   - Click "Create Credentials" > "API Key"
   - Copy your API key

3. **Set Environment Variable:**
   - Create a `.env` file in the project root
   - Add: `REACT_APP_GOOGLE_SHEETS_API_KEY=your_api_key_here`
   - Restart the development server

4. **Share Your Sheet:**
   - Make sure your Google Sheet is publicly accessible (anyone with link can view)
   - Or set up proper authentication for production use

## Features

### Automatic Data Sync
- Opportunities are automatically loaded from Google Sheets
- Real-time filtering by type (Jobs, Internships, Events)
- Search functionality across all fields
- Manual refresh button to update data

### Smart Data Processing
- Automatic deadline calculation (30 days from timestamp)
- Image fallbacks for broken links
- Type-based categorization
- Registration fee and salary display

### Responsive Design
- Works on all device sizes
- Beautiful cream and orange color scheme
- Dark/light theme toggle
- Smooth animations and transitions

## Troubleshooting

### Common Issues

1. **"Cannot find module" errors:**
   - Run `npm install` to install dependencies
   - Make sure all component files exist in `src/components/`

2. **Google Sheets not loading:**
   - Check if your sheet is publicly accessible
   - Verify API key is correct
   - Check browser console for error messages

3. **Images not displaying:**
   - Ensure image URLs are accessible
   - Check if Google Drive links are properly shared
   - Fallback icons will display if images fail to load

### Performance Tips

- The app caches data locally for better performance
- Use the refresh button to get latest data
- Filter by specific types to reduce search time
- Search is case-insensitive and searches across all fields

## Customization

### Adding New Fields
To add new fields to opportunities:

1. Update the `ProcessedOpportunity` interface in `src/services/googleSheetsService.ts`
2. Add the field to the `processSheetData` method
3. Display the field in the `Opportunities.tsx` component
4. Style the field in `Opportunities.css`

### Modifying Colors
The color scheme is defined in `src/App.css` using CSS variables:
- Light theme: Cream colors
- Dark theme: Orange accents
- All colors can be easily modified in one place

## Support

If you encounter any issues:
1. Check the browser console for error messages
2. Verify your Google Sheet structure matches the expected format
3. Ensure all dependencies are installed (`npm install`)
4. Try building the project (`npm run build`) to check for compilation errors
