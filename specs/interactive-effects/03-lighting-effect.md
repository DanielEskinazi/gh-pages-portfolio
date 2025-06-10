# Dynamic Lighting Effect Implementation Plan

## Overview
Create a sophisticated lighting effect where the illumination, shadows, and highlights on the profile image change dynamically based on mouse position, simulating a virtual light source.

## Branch: `lighting-effect`

## Visual Effect Description
- Dynamic light source that follows mouse cursor
- Realistic shadows and highlights on profile image
- Gradient overlays that shift with mouse movement
- Subtle color temperature changes based on position
- Optional: Ambient lighting that affects background elements

## Technical Implementation

### Core Technology Stack
- **CSS Gradients**: Radial and linear gradients for lighting
- **CSS Filters**: `brightness()`, `contrast()`, `hue-rotate()`
- **CSS Variables**: Dynamic value updates via JavaScript
- **Canvas API**: Advanced lighting calculations (optional)
- **WebGL Shaders**: High-performance lighting (advanced option)

### Lighting Physics Concepts
```javascript
// Calculate light intensity based on distance
const calculateLightIntensity = (mouseX, mouseY, elementX, elementY) => {
  const distance = Math.sqrt(
    Math.pow(mouseX - elementX, 2) + Math.pow(mouseY - elementY, 2)
  );
  const maxDistance = Math.sqrt(window.innerWidth² + window.innerHeight²);
  return 1 - (distance / maxDistance);
};

// Convert position to light direction
const getLightDirection = (mouseX, mouseY, centerX, centerY) => {
  const angle = Math.atan2(mouseY - centerY, mouseX - centerX);
  return (angle * 180) / Math.PI;
};
```

## Implementation Steps

### Phase 1: Basic Lighting Setup
1. **Create LightingHero Component**
   ```jsx
   const LightingHero = () => {
     const [lightPos, setLightPos] = useState({ x: 50, y: 50 });
     const [lightIntensity, setLightIntensity] = useState(0.5);
     const heroRef = useRef(null);
   
     const handleMouseMove = (e) => {
       const rect = heroRef.current.getBoundingClientRect();
       const x = ((e.clientX - rect.left) / rect.width) * 100;
       const y = ((e.clientY - rect.top) / rect.height) * 100;
       
       setLightPos({ x, y });
       setLightIntensity(calculateIntensity(x, y));
     };
   ```

### Phase 2: CSS-Based Lighting
1. **Dynamic Gradient Overlays**
   ```css
   .lighting-overlay {
     position: absolute;
     top: 0;
     left: 0;
     width: 100%;
     height: 100%;
     background: radial-gradient(
       circle at var(--light-x, 50%) var(--light-y, 50%),
       rgba(255, 255, 255, var(--light-intensity, 0.3)) 0%,
       rgba(255, 255, 255, 0.1) 30%,
       rgba(0, 0, 0, 0.2) 70%,
       rgba(0, 0, 0, 0.4) 100%
     );
     mix-blend-mode: overlay;
     pointer-events: none;
   }
   ```

2. **Shadow Effects**
   ```css
   .shadow-layer {
     background: linear-gradient(
       calc(var(--light-angle, 0deg) + 180deg),
       transparent 0%,
       rgba(0, 0, 0, 0.3) 50%,
       rgba(0, 0, 0, 0.6) 100%
     );
     mix-blend-mode: multiply;
   }
   ```

### Phase 3: Advanced Lighting Effects
1. **Multi-Layer Lighting**
   - Ambient light layer (global illumination)
   - Direct light layer (mouse-controlled spot)
   - Reflection layer (specular highlights)
   - Shadow layer (depth and dimension)

2. **Color Temperature Variation**
   ```css
   .temperature-filter {
     filter: 
       hue-rotate(var(--temperature, 0deg))
       brightness(var(--brightness, 1))
       contrast(var(--contrast, 1));
   }
   ```

## CSS Implementation

### Base Structure
```css
.lighting-hero {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.profile-image {
  position: relative;
  width: 400px;
  height: 500px;
  margin: 0 auto;
  border-radius: 10px;
  overflow: hidden;
}

.base-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: filter 0.1s ease;
}

/* Lighting Layers */
.lighting-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.ambient-light {
  background: radial-gradient(
    ellipse at center,
    rgba(255, 255, 255, 0.1) 0%,
    transparent 70%
  );
  mix-blend-mode: soft-light;
}

.direct-light {
  background: radial-gradient(
    circle 300px at var(--light-x, 50%) var(--light-y, 50%),
    rgba(255, 255, 255, var(--intensity, 0.4)) 0%,
    rgba(255, 255, 255, 0.1) 40%,
    transparent 70%
  );
  mix-blend-mode: overlay;
}

.shadow-layer {
  background: radial-gradient(
    ellipse 400px 600px at var(--light-x, 50%) var(--light-y, 50%),
    transparent 0%,
    transparent 30%,
    rgba(0, 0, 0, 0.3) 60%,
    rgba(0, 0, 0, 0.5) 100%
  );
  mix-blend-mode: multiply;
}
```

### Dynamic Properties
```css
:root {
  --light-x: 50%;
  --light-y: 50%;
  --light-intensity: 0.3;
  --light-angle: 0deg;
  --temperature: 0deg;
  --brightness: 1;
  --contrast: 1;
}

.lighting-hero[data-light-warm="true"] {
  --temperature: 15deg;
  --brightness: 1.1;
}

.lighting-hero[data-light-cool="true"] {
  --temperature: -15deg;
  --brightness: 0.95;
}
```

## Advanced Features

### Canvas-Based Lighting (Optional)
```javascript
// Enhanced lighting with Canvas API
const drawLighting = (canvas, mouseX, mouseY, intensity) => {
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(
    mouseX, mouseY, 0,
    mouseX, mouseY, 200
  );
  
  gradient.addColorStop(0, `rgba(255, 255, 255, ${intensity})`);
  gradient.addColorStop(0.5, `rgba(255, 255, 255, ${intensity * 0.3})`);
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0.2)');
  
  ctx.globalCompositeOperation = 'overlay';
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};
```

### Environmental Effects
1. **Background Ambient Changes**
   - Particle colors shift with light temperature
   - Background gradients respond to lighting
   - UI elements subtly change with light position

2. **Realistic Material Response**
   - Different areas of the image respond differently
   - Skin highlights vs fabric shadows
   - Metallic vs matte surface simulation

## Performance Considerations

### Optimization Strategies
1. **CSS-First Approach**: Use CSS transforms over JavaScript
2. **Hardware Acceleration**: GPU-optimized blend modes
3. **Debounced Updates**: Limit calculations to 60fps
4. **Layered Complexity**: Start simple, add layers progressively

### Performance Monitoring
```javascript
const usePerformanceMonitor = () => {
  const [fps, setFPS] = useState(60);
  
  useEffect(() => {
    let frames = 0;
    let lastTime = performance.now();
    
    const countFrames = () => {
      frames++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setFPS(frames);
        frames = 0;
        lastTime = now;
      }
      requestAnimationFrame(countFrames);
    };
    
    countFrames();
  }, []);
  
  return fps;
};
```

## User Experience Features

### Adaptive Lighting Zones
```javascript
const getLightingZone = (x, y) => {
  if (x < 30) return 'left-rim';
  if (x > 70) return 'right-rim';
  if (y < 30) return 'top-light';
  if (y > 70) return 'bottom-shadow';
  return 'center-diffuse';
};
```

### Accessibility Considerations
- **Reduced Motion**: Static lighting for sensitive users
- **High Contrast**: Maintain readability in all lighting states
- **Color Blindness**: Ensure effects work without color dependence

## Integration Options

### With Current Particle System
- Particles' colors influenced by lighting temperature
- Light affects particle visibility and opacity
- Seamless blend between lighting and particles

### Text and UI Adaptation
- Text shadows adjust to lighting position
- Button highlights follow light source
- Navigation elements subtly influenced

## Implementation Timeline
- **Basic CSS Lighting**: 3-4 hours
- **Advanced Multi-Layer**: 4-5 hours
- **Performance Optimization**: 2-3 hours
- **Environmental Integration**: 3-4 hours
- **Testing & Refinement**: 2-3 hours

**Total Estimated Time**: 14-19 hours

## Success Criteria
- [ ] Realistic lighting that follows mouse movement
- [ ] Smooth transitions between lighting states
- [ ] Maintains 60fps performance
- [ ] Integrates seamlessly with existing design
- [ ] Accessible with proper fallbacks
- [ ] Enhances rather than distracts from content

## Risk Assessment
- **High**: Performance with complex blend modes
- **Medium**: Browser compatibility for advanced CSS features
- **Low**: Integration with existing particle system

## Extension Possibilities
1. **Time-of-Day Simulation**: Lighting changes based on user's time
2. **Interactive Light Sources**: Multiple light points
3. **Material Property Simulation**: Different surface responses
4. **Photo-realistic Rendering**: Advanced shader-based lighting