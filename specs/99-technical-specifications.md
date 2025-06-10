# Technical Specifications & Configuration

## Development Environment
- **Node.js**: 16+
- **Package Manager**: Yarn (preferred)
- **React Version**: 17
- **Build Tool**: Create React App toolchain

## Dependencies Analysis

### Core Dependencies (Keep)
- **React 17**: Core framework
- **Framer Motion**: Animation library for Projects section
- **TSParticles**: Interactive particle background system
- **Formspree**: Contact form handling service
- **Semantic UI React**: UI component library

### Dependencies to Review
- **Semantic UI**: Consider bundle size impact
- **Additional Tools**: Accessibility testing tools if needed

## Deployment Configuration

### GitHub Pages Setup
- **Repository**: DanielEskinazi/DanielEskinazi.github.io
- **Deploy Branch**: `gh-pages` (auto-generated)
- **Source Branch**: `main`
- **Homepage URL**: http://DanielEskinazi.github.io

### Build Process
```bash
# Development
yarn start          # Local development server

# Testing
yarn test           # Run test suite

# Production Build
yarn build          # Create optimized build

# Deployment
yarn deploy         # Build and deploy to GitHub Pages
```

### Package.json Configuration
```json
{
  "homepage": "http://DanielEskinazi.github.io",
  "scripts": {
    "predeploy": "yarn build",
    "deploy": "gh-pages -d build"
  }
}
```

## Architecture Overview

### Component Structure
```
src/
├── App.js                 # Main app component
├── components/
│   ├── Intro.jsx         # Hero section with particles
│   ├── Header.jsx        # Navigation header
│   ├── About.jsx         # About section
│   ├── Projects.jsx      # Projects showcase
│   ├── Skills.jsx        # Skills section (needs completion)
│   ├── Contact.jsx       # Contact wrapper (needs creation)
│   ├── ContactForm.jsx   # Formspree form
│   └── Footer.jsx        # Footer component
├── styles/
│   ├── global.css        # Global styles
│   └── components.css    # Component-specific styles
└── styles.js             # Inline style objects
```

### Styling Architecture
- **Component CSS**: Individual `.css` files per component
- **Global Styles**: `styles.css` and `styles/global.css`
- **Semantic UI**: Base component styling
- **Inline Styles**: `styles.js` for dynamic styling

### Key Features Implementation
- **Particle System**: TSParticles with "links" preset
- **Scroll Navigation**: Fixed header appears after intro
- **Smooth Scrolling**: CSS scroll-behavior and JavaScript
- **Form Handling**: Formspree integration with validation
- **Animations**: Framer Motion for project cards

## Performance Considerations

### Bundle Size Optimization
- Current dependencies relatively lightweight
- Semantic UI largest dependency - monitor impact
- Consider tree-shaking for unused components

### Runtime Performance
- Particle effects most performance-intensive feature
- Mobile device optimization critical
- Memory leak prevention for scroll listeners

### Loading Strategy
- Critical CSS inlined
- Non-critical resources lazy-loaded where beneficial
- Particle effects initialized after page load

## Security Considerations

### Formspree Integration
- No sensitive data stored locally
- Form submission handled by external service
- Email validation on frontend and backend

### GitHub Pages
- Static site deployment (no server-side vulnerabilities)
- HTTPS enforced by GitHub Pages
- No database or user authentication required

## Browser Compatibility

### Target Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Progressive Enhancement
- Core functionality works without JavaScript
- Particle effects gracefully degrade
- Form submission has fallback options