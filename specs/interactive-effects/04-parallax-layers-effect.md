# Parallax Layers Effect Implementation Plan

## Overview
Create a sophisticated multi-layer parallax effect where different visual elements move at varying speeds and depths based on mouse position, creating an immersive 3D-like experience.

## Branch: `parallax-layers-effect`

## Visual Effect Description
- Multiple image/content layers moving at different speeds
- Depth-based motion creating 3D illusion
- Smooth, physics-based movement with inertia
- Background, midground, and foreground elements
- Optional: Atmospheric effects (fog, lighting between layers)

## Technical Implementation

### Core Technology Stack
- **React + Hooks**: State management and mouse tracking
- **CSS 3D Transforms**: `translateZ()`, `perspective`, `transform-style: preserve-3d`
- **Intersection Observer**: Performance optimization
- **RequestAnimationFrame**: Smooth 60fps animations
- **CSS Custom Properties**: Dynamic layer positioning

### Parallax Mathematics
```javascript
// Calculate layer movement based on depth
const calculateParallaxOffset = (mouseX, mouseY, layerDepth, maxOffset = 50) => {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  
  const offsetX = ((mouseX - centerX) / centerX) * maxOffset * layerDepth;
  const offsetY = ((mouseY - centerY) / centerY) * maxOffset * layerDepth;
  
  return { x: offsetX, y: offsetY };
};

// Depth-based speed multipliers
const LAYER_DEPTHS = {
  background: 0.1,    // Moves slowly
  midground: 0.3,     // Medium movement
  foreground: 0.6,    // Fast movement
  interactive: 1.0    // Full movement
};
```

## Implementation Steps

### Phase 1: Layer Architecture Setup
1. **Create ParallaxHero Component**
   ```jsx
   const ParallaxHero = () => {
     const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
     const [isActive, setIsActive] = useState(false);
     const containerRef = useRef(null);
   
     const layers = [
       { id: 'bg-mountains', depth: 0.1, zIndex: 1 },
       { id: 'mg-trees', depth: 0.3, zIndex: 2 },
       { id: 'fg-profile', depth: 0.6, zIndex: 3 },
       { id: 'ui-content', depth: 1.0, zIndex: 4 }
     ];
   ```

### Phase 2: Layer Component System
1. **Reusable ParallaxLayer Component**
   ```jsx
   const ParallaxLayer = ({ 
     children, 
     depth, 
     mousePos, 
     maxOffset = 50,
     className 
   }) => {
     const offset = calculateParallaxOffset(
       mousePos.x, 
       mousePos.y, 
       depth, 
       maxOffset
     );
   
     return (
       <div 
         className={`parallax-layer ${className}`}
         style={{
           '--offset-x': `${offset.x}px`,
           '--offset-y': `${offset.y}px`,
           '--depth': depth
         }}
       >
         {children}
       </div>
     );
   };
   ```

### Phase 3: Advanced Effects
1. **Atmospheric Layers**
   - Fog/mist effects between layers
   - Dynamic opacity based on depth
   - Color grading for depth perception

2. **Physics-Based Movement**
   ```javascript
   // Add inertia and easing to layer movement
   const useParallaxPhysics = (targetPos, springConfig = { tension: 100, friction: 10 }) => {
     const [currentPos, setCurrentPos] = useState(targetPos);
     
     useEffect(() => {
       const animate = () => {
         setCurrentPos(prev => ({
           x: prev.x + (targetPos.x - prev.x) * 0.1,
           y: prev.y + (targetPos.y - prev.y) * 0.1
         }));
       };
       
       const animationId = requestAnimationFrame(animate);
       return () => cancelAnimationFrame(animationId);
     }, [targetPos]);
     
     return currentPos;
   };
   ```

## CSS Implementation

### 3D Perspective Container
```css
.parallax-hero {
  position: relative;
  width: 100%;
  height: 100vh;
  perspective: 1000px;
  perspective-origin: center center;
  transform-style: preserve-3d;
  overflow: hidden;
}

.parallax-scene {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
}

.parallax-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: 
    translateX(var(--offset-x, 0px))
    translateY(var(--offset-y, 0px))
    translateZ(calc(var(--depth, 0) * -200px));
  transition: transform 0.1s ease-out;
  will-change: transform;
}

/* Scale compensation for perspective */
.parallax-layer {
  transform: 
    translateX(var(--offset-x, 0px))
    translateY(var(--offset-y, 0px))
    translateZ(calc(var(--depth, 0) * -200px))
    scale(calc(1 + var(--depth, 0) * 0.2));
}
```

### Layer-Specific Styles
```css
.bg-layer {
  --depth: 0.1;
  z-index: 1;
  opacity: 0.8;
  filter: blur(1px);
}

.mg-layer {
  --depth: 0.3;
  z-index: 2;
  opacity: 0.9;
}

.fg-layer {
  --depth: 0.6;
  z-index: 3;
}

.ui-layer {
  --depth: 1.0;
  z-index: 4;
  filter: none;
}

/* Atmospheric effects */
.atmosphere-layer {
  background: linear-gradient(
    to bottom,
    rgba(135, 206, 235, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 50%,
    transparent 100%
  );
  mix-blend-mode: soft-light;
}
```

## Layer Content Strategy

### Background Layers (Depth: 0.1-0.2)
- **Abstract shapes**: Geometric patterns, gradients
- **Particle fields**: Slow-moving particle systems
- **Color overlays**: Atmospheric color washes
- **Texture maps**: Subtle background textures

### Midground Layers (Depth: 0.3-0.5)
- **Decorative elements**: UI ornaments, icons
- **Secondary content**: Company logos, skill badges
- **Environmental effects**: Floating particles, light rays
- **Frame elements**: Borders, corner decorations

### Foreground Layers (Depth: 0.6-0.8)
- **Profile image**: Main portrait photo
- **Key graphics**: Important visual elements
- **Interactive previews**: Project thumbnails
- **Accent elements**: Highlighting shapes

### Interactive Layer (Depth: 1.0)
- **Text content**: Name, title, description
- **Navigation elements**: Buttons, links
- **Call-to-action**: Primary interaction points
- **Floating UI**: Tooltips, modals

## Performance Optimization

### Layer Management
```javascript
const useLayerOptimization = () => {
  const [visibleLayers, setVisibleLayers] = useState(new Set());
  
  const observerCallback = useCallback((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setVisibleLayers(prev => new Set([...prev, entry.target.id]));
      } else {
        setVisibleLayers(prev => {
          const newSet = new Set(prev);
          newSet.delete(entry.target.id);
          return newSet;
        });
      }
    });
  }, []);
  
  return { visibleLayers, observerCallback };
};
```

### GPU Acceleration
```css
.parallax-layer {
  transform: translate3d(var(--offset-x, 0), var(--offset-y, 0), var(--depth-z, 0));
  will-change: transform;
  backface-visibility: hidden;
  transform-style: preserve-3d;
}

/* Force GPU layer creation */
.parallax-layer::before {
  content: '';
  position: absolute;
  transform: translateZ(0);
}
```

## Component Architecture

### File Structure
```
src/
├── components/
│   ├── ParallaxHero.jsx
│   ├── ParallaxLayer.jsx
│   ├── ParallaxScene.jsx
│   └── ParallaxHero.css
├── hooks/
│   ├── useParallax.js
│   ├── useParallaxPhysics.js
│   └── useLayerOptimization.js
├── utils/
│   └── parallaxCalculations.js
└── assets/
    ├── layers/
    │   ├── bg-abstract.svg
    │   ├── mg-elements.png
    │   └── fg-profile.jpg
    └── effects/
        └── atmosphere.png
```

### Custom Hooks
```javascript
// hooks/useParallax.js
export const useParallax = (options = {}) => {
  const {
    sensitivity = 1,
    maxOffset = 50,
    enablePhysics = true,
    disabled = false
  } = options;

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (disabled) return;
    
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    
    setMousePos({ x, y });
  }, [disabled]);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return { mousePos, isActive, setIsActive };
};
```

## Responsive Design

### Device-Specific Behavior
```css
/* Desktop: Full parallax effect */
@media (min-width: 1024px) {
  .parallax-layer {
    transform: 
      translateX(var(--offset-x, 0px))
      translateY(var(--offset-y, 0px))
      translateZ(calc(var(--depth, 0) * -200px));
  }
}

/* Tablet: Reduced effect */
@media (max-width: 1023px) and (min-width: 768px) {
  .parallax-layer {
    transform: 
      translateX(calc(var(--offset-x, 0px) * 0.5))
      translateY(calc(var(--offset-y, 0px) * 0.5))
      translateZ(calc(var(--depth, 0) * -100px));
  }
}

/* Mobile: Minimal or disabled */
@media (max-width: 767px) {
  .parallax-layer {
    transform: none;
  }
  
  .parallax-hero {
    perspective: none;
  }
}
```

### Accessibility Features
```javascript
const useAccessibilitySettings = () => {
  const [reducedMotion, setReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handler = (e) => setReducedMotion(e.matches);
    mediaQuery.addListener(handler);
    
    return () => mediaQuery.removeListener(handler);
  }, []);
  
  return { reducedMotion };
};
```

## Implementation Timeline
- **Layer Architecture Setup**: 3-4 hours
- **Basic Parallax Movement**: 2-3 hours
- **Advanced Physics & Effects**: 4-5 hours
- **Performance Optimization**: 3-4 hours
- **Responsive Design**: 2-3 hours
- **Testing & Polish**: 2-3 hours

**Total Estimated Time**: 16-22 hours

## Success Criteria
- [ ] Smooth multi-layer parallax movement
- [ ] Realistic depth perception
- [ ] Maintains 60fps performance
- [ ] Responsive across all devices
- [ ] Accessible with proper fallbacks
- [ ] Seamless integration with existing content

## Risk Assessment
- **High**: Performance with multiple layers and transforms
- **Medium**: Complexity of layer management and optimization
- **Medium**: Browser compatibility for 3D transforms
- **Low**: Content integration challenges

## Extension Possibilities
1. **Gyroscope Integration**: Mobile device orientation parallax
2. **Scroll-Based Parallax**: Combine with scroll effects
3. **Interactive Layer Elements**: Clickable parallax objects
4. **Procedural Layer Generation**: Dynamic layer creation
5. **WebGL Enhancement**: GPU-accelerated layer rendering