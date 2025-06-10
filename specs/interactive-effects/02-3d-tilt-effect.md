# 3D Tilt Effect Implementation Plan

## Overview
Create a 3D card-like tilt effect where the profile image/hero section rotates and transforms based on mouse position, creating depth and interactivity.

## Branch: `3d-tilt-effect`

## Visual Effect Description
- Profile image tilts in 3D space following mouse movement
- Subtle depth shadows and highlights change with tilt
- Smooth, physics-like movement with momentum
- Optional: Layered elements that move at different depths

## Technical Implementation

### Core Technology Stack
- **React + Hooks**: Mouse tracking and state management
- **CSS 3D Transforms**: `transform3d`, `rotateX`, `rotateY`, `perspective`
- **CSS Variables**: Dynamic value updates
- **Intersection Observer**: Trigger effect when in viewport

### Mathematics Behind the Effect
```javascript
// Convert mouse position to rotation angles
const maxTilt = 15; // degrees
const centerX = element.offsetWidth / 2;
const centerY = element.offsetHeight / 2;

const rotateX = ((mouseY - centerY) / centerY) * maxTilt;
const rotateY = ((mouseX - centerX) / centerX) * maxTilt * -1;
```

## Implementation Steps

### Phase 1: Basic Tilt Setup
1. **Create TiltHero Component**
   ```jsx
   const TiltHero = () => {
     const [tilt, setTilt] = useState({ x: 0, y: 0 });
     const [isHovered, setIsHovered] = useState(false);
     const tiltRef = useRef(null);
   
     const handleMouseMove = (e) => {
       if (!tiltRef.current) return;
       
       const rect = tiltRef.current.getBoundingClientRect();
       const centerX = rect.left + rect.width / 2;
       const centerY = rect.top + rect.height / 2;
       
       const rotateX = ((e.clientY - centerY) / rect.height) * 15;
       const rotateY = ((e.clientX - centerX) / rect.width) * 15;
       
       setTilt({ x: rotateX, y: rotateY });
     };
   ```

### Phase 2: Advanced 3D Effects
1. **Layered Depth**
   - Background elements move slower (parallax)
   - Foreground elements move faster
   - Create illusion of depth with multiple layers

2. **Dynamic Lighting**
   ```css
   .tilt-card::before {
     content: '';
     position: absolute;
     top: 0;
     left: 0;
     right: 0;
     bottom: 0;
     background: linear-gradient(
       calc(var(--mouse-x) * 1deg),
       rgba(255,255,255,0.1) 0%,
       transparent 50%,
       rgba(0,0,0,0.1) 100%
     );
     transition: opacity 0.3s ease;
   }
   ```

### Phase 3: Performance & Polish
1. **Smooth Animations**
   - CSS transitions for enter/exit states
   - RequestAnimationFrame for smooth updates
   - Easing functions for natural movement

2. **Reset on Mouse Leave**
   ```jsx
   const handleMouseLeave = () => {
     setTilt({ x: 0, y: 0 });
     setIsHovered(false);
   };
   ```

## CSS Implementation

### Base Structure
```css
.tilt-container {
  perspective: 1000px;
  perspective-origin: center center;
}

.tilt-card {
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.1s ease-out;
  transform: 
    perspective(1000px)
    rotateX(var(--tilt-x, 0deg))
    rotateY(var(--tilt-y, 0deg))
    translateZ(0);
  will-change: transform;
}

.tilt-card:hover {
  transform: 
    perspective(1000px)
    rotateX(var(--tilt-x, 0deg))
    rotateY(var(--tilt-y, 0deg))
    translateZ(20px);
}

/* Layered Elements */
.layer-1 { transform: translateZ(10px); }
.layer-2 { transform: translateZ(20px); }
.layer-3 { transform: translateZ(30px); }
```

### Dynamic Lighting Effect
```css
.tilt-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    rgba(255,255,255,0.2) 0%,
    transparent 50%
  );
  opacity: var(--hover-opacity, 0);
  transition: opacity 0.3s ease;
  pointer-events: none;
}
```

## Component Architecture

### File Structure
```
src/
├── components/
│   ├── TiltHero.jsx
│   ├── TiltCard.jsx        # Reusable tilt component
│   └── TiltHero.css
├── hooks/
│   └── useTilt.js          # Custom hook for tilt logic
└── utils/
    └── tiltCalculations.js # Math utilities
```

### Custom Hook Implementation
```javascript
// hooks/useTilt.js
export const useTilt = (options = {}) => {
  const {
    maxTilt = 15,
    perspective = 1000,
    scale = 1.05,
    speed = 400,
    glare = false
  } = options;

  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  // Implementation details...
  
  return { ref, tilt, isHovered };
};
```

## User Experience Features

### Responsive Behavior
- **Desktop**: Full 3D tilt effect
- **Tablet**: Reduced tilt range (50% intensity)
- **Mobile**: Disabled or gyroscope-based alternative

### Accessibility
```jsx
const respectsReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

if (respectsReducedMotion) {
  return <StaticHero />; // Fallback without animations
}
```

### Performance Optimizations
1. **Throttled Updates**: Limit updates to 60fps
2. **GPU Acceleration**: Use `transform3d` and `will-change`
3. **Intersection Observer**: Only active when visible
4. **Memory Management**: Cleanup event listeners

## Integration with Current Design

### Hero Section Enhancement
- Replace current particle background with 3D tilt card
- Maintain existing content (name, title, CTA button)
- Add subtle depth layers to text elements

### Design Consistency
- Use existing color palette for lighting effects
- Maintain brand colors and typography
- Ensure effect enhances rather than overwhelms

## Performance Metrics
- **Frame Rate**: Consistent 60fps during interaction
- **CPU Usage**: < 3% additional load
- **GPU Usage**: Hardware accelerated transforms
- **Memory**: < 30MB additional usage

## Browser Support
- **Modern Browsers**: Full 3D support
- **Older Browsers**: Graceful degradation to 2D transforms
- **Mobile**: Touch-based alternative or simplified version

## Implementation Timeline
- **Basic Tilt Mechanics**: 2-3 hours
- **Advanced 3D Effects**: 3-4 hours
- **Performance Optimization**: 2-3 hours
- **Responsive Design**: 2-3 hours
- **Testing & Polish**: 2-3 hours

**Total Estimated Time**: 11-16 hours

## Success Criteria
- [ ] Smooth 3D tilt following mouse movement
- [ ] Natural physics-like momentum and easing
- [ ] Maintains 60fps performance
- [ ] Works across desktop and tablet devices
- [ ] Graceful degradation for accessibility
- [ ] Enhances existing design without overwhelming

## Risk Assessment
- **Medium**: Performance on older devices
- **Medium**: Browser compatibility for advanced CSS 3D
- **Low**: Integration with existing particle effects

## Extension Possibilities
1. **Gyroscope Support**: Mobile device orientation tracking
2. **Multi-layer Parallax**: Complex depth effects
3. **Interactive Elements**: Clickable areas that respond to tilt
4. **Custom Cursors**: Change cursor based on tilt state