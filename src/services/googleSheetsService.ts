export interface GoogleSheetsOpportunity {
  timestamp: string;
  companyEventName: string;
  description: string;
  url: string;
  image: string;
  registrationFee: string;
  category: 'Job' | 'Internship' | 'Event';
  lpa: string;
  role: string;
  date: string;
}

export interface ProcessedOpportunity {
  id: string;
  type: 'job' | 'internship' | 'event';
  title: string;
  company: string;
  description: string;
  deadline: string;
  location: string;
  image: string;
  link: string;
  registrationFee?: string;
  lpa?: string;
  role?: string;
  eventDate?: string;
}

class GoogleSheetsService {
  private readonly SHEET_ID = '13FuxfcVk0Y29SgZ5K7FD9HI23q_MDzceO2DgutofbAY';
  private readonly SHEET_NAME = 'oppertunities (Responses)'; // This should match exactly
  private readonly API_KEY = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY;

  private async fetchSheetData(): Promise<any[][]> {
    try {
      if (!this.API_KEY) {
        console.warn('Google Sheets API key not found. Using mock data.');
        return this.getMockData();
      }

      // Use the correct sheet name "Form responses 1"
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.SHEET_ID}/values/'Form responses 1'!A1:Z1000?key=${this.API_KEY}`;
      console.log('Fetching from URL:', url);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Raw Google Sheets data:', data);
      return data.values || [];
    } catch (error) {
      console.error('Error fetching Google Sheets data:', error);
      console.log('Falling back to mock data...');
      return this.getMockData();
    }
  }

  private getMockData(): any[][] {
    return [
      ['Timestamp', 'Company/ Event name', 'Description', 'URL', 'Image', 'Registeration fee', 'category', 'LPA', 'Role', 'Date'],
      ['30/08/2025 17:01:30', 'Google', 'Software Engineer Position - Full Stack Development', 'https://careers.google.com', 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=200&fit=crop', '0', 'Job', '15-25', 'Software Engineer', '2025-09-30'],
      ['30/08/2025 17:02:00', 'Microsoft', 'Summer Internship Program 2025', 'https://careers.microsoft.com', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop', '0', 'Internship', '8-12', 'Software Engineering Intern', '2025-10-30'],
      ['30/08/2025 17:03:00', 'Tech Conference 2025', 'Annual Technology Innovation Summit', 'https://techconf2025.com', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop', '50', 'Event', '', 'Attendee', '2025-12-01'],
      ['30/08/2025 17:04:00', 'Amazon', 'Cloud Solutions Architect', 'https://amazon.jobs', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop', '0', 'Job', '20-35', 'Cloud Architect', '2025-10-30'],
      ['30/08/2025 17:05:00', 'Meta', 'AI Research Intern', 'https://careers.meta.com', 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop', '0', 'Internship', '10-15', 'AI Research Intern', '2025-11-30'],
      ['30/08/2025 17:06:00', 'Startup Weekend', '54-Hour Startup Competition', 'https://startupweekend.org', 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=200&fit=crop', '25', 'Event', '', 'Participant', '2025-11-15'],
      ['30/08/2025 17:07:00', 'Netflix', 'Frontend Developer', 'https://jobs.netflix.com', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=200&fit=crop', '0', 'Job', '18-30', 'Frontend Developer', '2025-10-15'],
      ['30/08/2025 17:08:00', 'Apple', 'iOS Development Intern', 'https://jobs.apple.com', 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop', '0', 'Internship', '12-18', 'iOS Developer Intern', '2025-11-15'],
      ['30/08/2025 17:09:00', 'Hackathon 2025', '24-Hour Coding Challenge', 'https://hackathon2025.com', 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=200&fit=crop', '15', 'Event', '', 'Participant', '2025-10-20'],
      ['30/08/2025 17:10:00', 'Tesla', 'Autonomous Vehicle Engineer', 'https://www.tesla.com/careers', 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=200&fit=crop', '0', 'Job', '25-40', 'Autonomous Engineer', '2025-12-30']
    ];
  }

  private processSheetData(rawData: any[][]): ProcessedOpportunity[] {
    if (rawData.length < 2) return [];

    console.log('Processing raw data:', rawData);
    const opportunities: ProcessedOpportunity[] = [];

    for (let i = 1; i < rawData.length; i++) {
      const row = rawData[i];
      
      // Skip rows with insufficient data (need at least company name and description)
      if (row.length < 2) continue;

      const timestamp = row[0] || '';
      const companyEventName = row[1] || '';
      const description = row[2] || '';
      const url = row[3] || '';
      const image = row[4] || '';
      const registrationFee = row[5] || '';
      const category = row[6] || '';
      const lpa = row[7] || '';
      const role = row[8] || '';
      const date = row[9] || '';

      console.log(`Row ${i}:`, {
        timestamp,
        companyEventName,
        description,
        url,
        image,
        registrationFee,
        category,
        lpa,
        role,
        date
      });

      // Skip empty rows
      if (!companyEventName || !description) continue;

      // Map category to our internal types - handle various spellings and typos
      let type: 'job' | 'internship' | 'event';
      const categoryLower = category.toLowerCase().trim();
      switch (categoryLower) {
        case 'job':
        case 'jobs':
          type = 'job';
          break;
        case 'internship':
        case 'internships':
        case 'intership': // Handle the typo in your form
        case 'interships':
          type = 'internship';
          break;
        case 'event':
        case 'events':
          type = 'event';
          break;
        default:
          console.warn(`Unknown category: "${category}" for row ${i}, defaulting to job`);
          type = 'job'; // Default to job if category is unclear
      }

      // Generate a unique ID
      const id = `opp_${i}_${Date.now()}`;

      // Use provided date if available, otherwise calculate from timestamp
      let deadline: string;
      if (date && date.trim()) {
        try {
          const dateObj = new Date(date);
          if (!isNaN(dateObj.getTime())) {
            deadline = dateObj.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            });
          } else {
            // Fallback to timestamp calculation
            const deadlineDate = new Date(timestamp);
            deadlineDate.setDate(deadlineDate.getDate() + 30);
            deadline = deadlineDate.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            });
          }
        } catch {
          // Fallback to timestamp calculation
          const deadlineDate = new Date(timestamp);
          deadlineDate.setDate(deadlineDate.getDate() + 30);
          deadline = deadlineDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          });
        }
      } else {
        // Calculate deadline from timestamp (add 30 days)
        const deadlineDate = new Date(timestamp);
        deadlineDate.setDate(deadlineDate.getDate() + 30);
        deadline = deadlineDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
      }

      // Process image URL - handle Google Drive links and other formats
      let processedImage = image;
      if (image && image.includes('drive.google.com')) {
        // Convert Google Drive sharing link to direct image link
        const fileId = this.extractGoogleDriveFileId(image);
        if (fileId) {
          // Use the modern Google Drive image serving method
          processedImage = `https://drive.google.com/thumbnail?id=${fileId}&sz=w400-h200`;
        }
      }

      // If no image or invalid image, use default based on type
      if (!processedImage || processedImage.trim() === '') {
        processedImage = this.getDefaultImageForType(type);
      }

      // Process URL - add protocol if missing
      let processedUrl = url;
      if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
        processedUrl = `https://${url}`;
      }

      opportunities.push({
        id,
        type,
        title: role || description.length > 50 ? description.substring(0, 50) + '...' : description,
        company: companyEventName,
        description,
        deadline,
        location: 'Remote/On-site', // Default location
        image: processedImage,
        link: processedUrl,
        registrationFee: registrationFee !== '0' && registrationFee.trim() !== '' ? `$${registrationFee}` : undefined,
        lpa: lpa && lpa.trim() !== '' ? `${lpa} LPA` : undefined,
        role: role && role.trim() !== '' ? role : undefined,
        eventDate: date && date.trim() !== '' ? date : undefined
      });
    }

    return opportunities;
  }

  private extractGoogleDriveFileId(url: string): string | null {
    // Handle different Google Drive URL formats
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

  private getDefaultImageForType(type: 'job' | 'internship' | 'event'): string {
    switch (type) {
      case 'job':
        return 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=200&fit=crop';
      case 'internship':
        return 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop';
      case 'event':
        return 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop';
      default:
        return 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=200&fit=crop';
    }
  }

  public async getOpportunities(): Promise<ProcessedOpportunity[]> {
    try {
      const rawData = await this.fetchSheetData();
      return this.processSheetData(rawData);
    } catch (error) {
      console.error('Error getting opportunities:', error);
      return [];
    }
  }

  public async refreshOpportunities(): Promise<ProcessedOpportunity[]> {
    console.log('Refreshing opportunities from Google Sheets...');
    return this.getOpportunities();
  }

  // Test method to debug API access
  public async testApiAccess(): Promise<void> {
    try {
      if (!this.API_KEY) {
        console.error('No API key found');
        return;
      }

      const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.SHEET_ID}?key=${this.API_KEY}`;
      console.log('Testing API access to:', url);
      
      const response = await fetch(url);
      const data = await response.json();
      
      console.log('Sheet metadata:', data);
      
      if (data.sheets) {
        console.log('Available sheets:', data.sheets.map((sheet: any) => sheet.properties.title));
      }
    } catch (error) {
      console.error('API test failed:', error);
    }
  }

  // Test method to validate image URLs
  public async testImageUrls(): Promise<void> {
    try {
      const rawData = await this.fetchSheetData();
      if (rawData.length < 2) return;

      console.log('Testing image URLs from Google Sheets...');
      
      for (let i = 1; i < rawData.length; i++) {
        const row = rawData[i];
        if (row.length < 5) continue;

        const imageUrl = row[4];
        const companyName = row[1];
        
        if (imageUrl && imageUrl.includes('drive.google.com')) {
          const fileId = this.extractGoogleDriveFileId(imageUrl);
          if (fileId) {
            const processedUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=w400-h200`;
            console.log(`\nCompany: ${companyName}`);
            console.log(`Original URL: ${imageUrl}`);
            console.log(`File ID: ${fileId}`);
            console.log(`Processed URL: ${processedUrl}`);
            
            // Test if the image is accessible
            try {
              const response = await fetch(processedUrl, { method: 'HEAD' });
              console.log(`Image accessible: ${response.ok ? 'YES' : 'NO'} (Status: ${response.status})`);
            } catch (error) {
              console.log(`Image test failed: ${error instanceof Error ? error.message : String(error)}`);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error testing image URLs:', error);
    }
  }
}

export const googleSheetsService = new GoogleSheetsService();
export default googleSheetsService;
