# Avesara - Opportunity Platform

A professional and elegant website for listing jobs, internships, and technical events with a modern design using the color palette: **Black**, **Vibrant Green**, and **Light Green/Off-White**.


## 🎨 Design Features

- **Elegant Color Scheme**: Uses the sophisticated color palette from the image
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Responsive Design**: Fully responsive across all devices
- **Dark/Light Theme**: Toggle between themes with persistent storage
- **Smooth Animations**: Subtle hover effects and transitions

## ✨ Key Features

### 🏠 Home Section
- Hero section with animated floating cards
- Call-to-action buttons for browsing and joining community
- Professional typography and layout

### 🔍 Opportunity Management
- **Filter by Type**: Jobs, Internships, Events
- **Search Functionality**: Search across titles, companies, and descriptions
- **Dynamic Cards**: Rich opportunity cards with images, metadata, and actions

### 📱 Opportunity Cards Include
- **Visual Elements**: Emoji-based images for each opportunity type
- **Rich Metadata**: Company, location, deadline, description
- **Action Buttons**: Apply/Register and Set Alert functionality
- **Deadline Tracking**: Color-coded deadlines (urgent, warning, normal)

### 🔔 Alert System
- **Deadline Alerts**: Get notified before opportunity deadlines
- **Smart Notifications**: Toast-style notifications with animations
- **Community Posting**: Post new opportunities through modal form

### 🌐 Navigation & Social
- **Fixed Navigation**: Sticky navbar with smooth scrolling
- **Social Links**: Twitter, LinkedIn, GitHub integration
- **Theme Toggle**: Sun/Moon icon for dark/light mode switching

### 📱 Responsive Features
- Mobile-first design approach
- Adaptive grid layouts
- Touch-friendly interactions
- Optimized for all screen sizes

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools required - pure HTML, CSS, and JavaScript

### Installation
1. Clone or download the project files
2. Open `index.html` in your web browser
3. That's it! The website is ready to use

### File Structure
```
Avesara/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and animations
├── script.js           # JavaScript functionality
└── README.md           # Project documentation
```

## 🎯 Usage Guide

### Browsing Opportunities
1. Use the filter tabs to view specific types (Jobs, Internships, Events)
2. Use the search bar to find specific opportunities
3. Click on opportunity cards to view details

### Setting Alerts
1. Click the "Alert" button on any opportunity card
2. You'll receive a notification confirming the alert is set
3. Get reminded 1 day before the deadline

### Posting New Opportunities
1. Click the "Post Alert" button in the navigation
2. Fill out the form with opportunity details
3. Submit to add it to the platform

### Theme Switching
- Click the theme toggle button (moon/sun icon) in the navigation
- Your preference is automatically saved for future visits

## 🎨 Color Palette

The website uses the exact color scheme from the provided image:

- **Black (#000000)**: Primary text and dark elements
- **Vibrant Green (#00ff88)**: Accent color, buttons, and highlights
- **Light Green (#f0f8f0)**: Backgrounds and subtle elements
- **White (#ffffff)**: Card backgrounds and light elements
- **Gray (#666666)**: Secondary text and borders

## 🔧 Customization

### Adding New Opportunities
Edit the `opportunities` array in `script.js` to add more sample data:

```javascript
const opportunities = [
    {
        id: 7,
        type: 'job',
        title: 'Your Job Title',
        company: 'Company Name',
        description: 'Job description...',
        deadline: '2024-03-15',
        location: 'Location',
        image: '💼',
        link: 'https://example.com'
    }
    // ... more opportunities
];
```

### Modifying Colors
Update the CSS variables in `styles.css`:

```css
:root {
    --black: #your-black-color;
    --vibrant-green: #your-green-color;
    --light-green: #your-light-green-color;
    /* ... other colors */
}
```

### Adding New Opportunity Types
1. Add new filter tab in HTML
2. Update JavaScript filtering logic
3. Add corresponding emoji in `getImageForType()` function

## 🌟 Features in Detail

### Smart Filtering
- Real-time search and filtering
- Multiple filter criteria
- Dynamic result updates

### Notification System
- Toast-style notifications
- Automatic timeout
- Smooth slide animations

### Form Handling
- Modal-based form submission
- Form validation
- Dynamic content updates

### Performance Optimizations
- Efficient DOM manipulation
- Smooth scrolling
- Optimized animations

## 📱 Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 🤝 Contributing

Feel free to contribute to this project by:
- Reporting bugs
- Suggesting new features
- Improving the design
- Adding new functionality

## 📄 License

This project is open source and available under the MIT License.

## 🎉 Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- Modern CSS features for animations
- Community feedback and suggestions

---

**Avesara** - Your gateway to amazing opportunities! 🚀
