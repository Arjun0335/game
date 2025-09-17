# Romantic Website Builder

A simple React + Tailwind based website builder to create romantic-themed pages with live preview.

## 🚀 Features
- Hero section editor with customizable title, subtitle, and CTA
- Dynamic section management (add/remove sections)
- Multiple template themes (Classic Romantic, Moody & Elegant)
- Live preview with real-time updates
- Draft auto-save to localStorage
- Responsive design with Tailwind CSS

## 📦 Setup

### Local Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

## 🌐 Deployment

### Vercel Deployment
This project is optimized for Vercel deployment with the included `vercel.json` configuration.

**Automatic Deployment:**
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the Vite framework
3. Deploy using the pre-configured settings

**Manual Deployment:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables
This project currently uses no server-side environment variables. All configuration is handled client-side through the UI.

## 🛠️ Project Structure
```
src/
├── components/
│   ├── Editor.jsx          # Main editor panel
│   ├── Preview.jsx         # Live preview component
│   └── SectionsEditor.jsx  # Section management
├── App.jsx                 # Main application component
├── index.jsx              # Application entry point
└── styles.css             # Global styles with Tailwind imports
```

## 🎨 Customization
The application includes two pre-built themes:
- **Classic Romantic**: Pink gradient with elegant styling
- **Moody & Elegant**: Dark gradient from violet to purple to pink

Additional themes can be added by modifying the `defaultTemplates` array in `App.jsx`.

## 📱 Browser Support
- Modern browsers with ES2015+ support
- Mobile responsive design
- Optimized for performance with Vite bundling
