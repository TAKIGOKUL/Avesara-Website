// Test script to verify Google Drive image processing
const API_KEY = 'AIzaSyBabBDF_yCwZI14pef1ut53DuYGjlB4F0w';
const SHEET_ID = '13FuxfcVk0Y29SgZ5K7FD9HI23q_MDzceO2DgutofbAY';

function extractGoogleDriveFileId(url) {
  const patterns = [
    /\/d\/([a-zA-Z0-9-_]+)/, // /d/fileId
    /id=([a-zA-Z0-9-_]+)/,   // ?id=fileId
    /\/open\?id=([a-zA-Z0-9-_]+)/, // /open?id=fileId
    /\/file\/d\/([a-zA-Z0-9-_]+)/  // /file/d/fileId
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }
  return null;
}

async function testImageUrls() {
  try {
    console.log('Testing Google Drive image URLs...\n');
    
    // Test the specific images from your folder
    const testUrls = [
      'https://drive.google.com/open?id=1XZ7jRPjEkHkjLMzrBtP3MU2weSwYsyU_',
      'https://drive.google.com/open?id=1kdt84c98ddassC5UVV-B7Bhcgcj48d4k',
      'https://drive.google.com/open?id=1ipuB7oKVENhGMeIfkLEPC2CikfgL4AO8'
    ];

    for (const url of testUrls) {
      console.log(`Testing URL: ${url}`);
      
      const fileId = extractGoogleDriveFileId(url);
      if (fileId) {
        console.log(`  File ID: ${fileId}`);
        
        // Test different image serving methods
        const methods = [
          `https://drive.google.com/thumbnail?id=${fileId}&sz=w400-h200`,
          `https://drive.google.com/uc?export=view&id=${fileId}`,
          `https://drive.google.com/file/d/${fileId}/preview`
        ];
        
        for (const method of methods) {
          console.log(`  Testing method: ${method}`);
          try {
            const response = await fetch(method, { method: 'HEAD' });
            console.log(`    Status: ${response.status} - ${response.ok ? 'SUCCESS' : 'FAILED'}`);
            if (response.ok) {
              console.log(`    ✅ This method works!`);
            }
          } catch (error) {
            console.log(`    ❌ Error: ${error.message}`);
          }
        }
      } else {
        console.log('  ❌ Could not extract file ID');
      }
      console.log('');
    }
    
  } catch (error) {
    console.error('Error testing images:', error);
  }
}

testImageUrls();
