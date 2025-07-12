# 🚀 Development Setup Guide

## Prerequisites

Before you start, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git** for version control
- A code editor (VS Code recommended)

## 🎯 Quick Start

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd klea-dev
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Start Development Server
```bash
npm run dev
# or
yarn dev
```

### 4. Open Your Browser
Navigate to `http://localhost:3000` to see your fabulous portfolio! 💖

## 📁 Project Structure

```
klea-dev/
├── app/                          # Next.js app directory
│   ├── components/               # React components
│   ├── data/                     # Static data files
│   ├── api/                      # API routes
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Homepage
├── docs/                         # Documentation
├── public/                       # Static assets
├── next.config.ts               # Next.js configuration
├── package.json                 # Dependencies
└── tailwind.config.js          # Tailwind CSS config
```

## 🔧 Configuration Files

### Next.js Configuration
```typescript
// next.config.ts
const nextConfig = {
  images: {
    domains: ['your-image-domain.com'],
  },
  experimental: {
    appDir: true,
  },
};
```

### Tailwind CSS Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Custom colors and animations
    },
  },
  plugins: [],
};
```

## 🎨 Development Workflow

### 1. Component Development
```bash
# Create a new component
touch app/components/MyNewComponent.tsx
```

### 2. Data Management
```bash
# Update project data
nano app/data/projects.ts
# Update research data
nano app/data/research.ts
```

### 3. Styling
```bash
# Global styles
nano app/globals.css
# Component-specific styles (if needed)
nano app/components/MyComponent.module.css
```

## 🧪 Testing

### Run TypeScript Check
```bash
npx tsc --noEmit
```

### Run Linting
```bash
npm run lint
# or
yarn lint
```

### Build for Production
```bash
npm run build
# or
yarn build
```

## 🐛 Common Setup Issues

### Issue: Port 3000 already in use
**Solution**: Use a different port
```bash
npm run dev -- -p 3001
```

### Issue: TypeScript errors
**Solution**: Check your Node.js version and reinstall dependencies
```bash
node --version  # Should be 18+
rm -rf node_modules package-lock.json
npm install
```

### Issue: Tailwind CSS not working
**Solution**: Rebuild CSS
```bash
npm run build
npm run dev
```

## 🔄 Development Commands

### Available Scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  }
}
```

### Useful Commands
```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run ESLint

# Type checking
npm run type-check      # Check TypeScript types

# Package management
npm install             # Install dependencies
npm update              # Update dependencies
npm audit fix           # Fix security vulnerabilities
```

## 🎯 Environment Variables

Create a `.env.local` file for local development:

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_CONTACT_EMAIL=your-email@example.com
```

## 📱 Mobile Development

### Testing on Mobile
1. Start the development server
2. Find your local IP address: `ip addr show`
3. Access from mobile: `http://YOUR_IP:3000`

### Responsive Testing
- Use browser dev tools to test different screen sizes
- Test on actual devices when possible
- Check touch interactions on mobile

## 🔧 VS Code Setup

### Recommended Extensions
- **ES7+ React/Redux/React-Native snippets**
- **Tailwind CSS IntelliSense**
- **TypeScript Importer**
- **Prettier - Code formatter**
- **ESLint**

### Settings
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect Next.js
3. Deploy with one click!

### Other Platforms
- **Netlify**: Use `npm run build` and `npm run start`
- **Railway**: Automatic deployment from GitHub
- **DigitalOcean App Platform**: Easy deployment

## 🎨 Customization

### Adding New Components
1. Create component in `app/components/`
2. Add to appropriate page
3. Update documentation in `docs/components/`

### Adding New Pages
1. Create directory in `app/`
2. Add `page.tsx` and `layout.tsx`
3. Update navigation in `Navigation.tsx`

### Styling Changes
1. Modify `app/globals.css` for global styles
2. Use Tailwind classes for component-specific styles
3. Add custom CSS variables for consistent theming

## 🔮 Next Steps

1. **Read the Documentation**: Start with [COMPONENT_ARCHITECTURE.md](../components/COMPONENT_ARCHITECTURE.md)
2. **Explore Components**: Check out individual component docs in `docs/components/`
3. **Customize Content**: Update data files in `app/data/`
4. **Add Features**: Follow the component interaction patterns

## 💖 Need Help?

- Check the [Troubleshooting Guide](./TROUBLESHOOTING.md)
- Review component documentation
- Look at existing code examples
- Ask questions in the project issues

---

*Happy coding, beautiful developer!* ✨💖 