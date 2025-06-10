# Eye-Tracking Effect Implementation Plan

## Overview
Create an interactive effect where the subject's eyes in a profile photo follow the user's mouse cursor, creating an engaging and memorable user experience.

## Branch: `eye-tracking-effect`

## Visual Effect Description
- Profile photo with eyes that track mouse movement
- Smooth, natural eye movement within realistic bounds
- Subtle animation to avoid uncanny valley effect
- Responsive to mouse position across entire viewport

## Technical Implementation

### Required Assets
- **Base Image**: High-quality portrait photo with clear, forward-facing eyes
- **Eye Overlay**: Separate transparent PNG of just the pupils/irises
- **Eye Mask**: Defines the boundaries for eye movement

### Core Technology Stack
- **React + Hooks**: `useState`, `useEffect`, `useRef` for mouse tracking
- **CSS Transforms**: `transform: translate()` for eye movement
- **Mouse Events**: `onMouseMove` on document or container
- **Animation**: CSS transitions for smooth movement

### File Structure
```
src/
├── components/
│   ├── EyeTrackingHero.jsx     # Main component
│   └── EyeTrackingHero.css     # Styling
├── assets/
│   ├── profile-base.png        # Portrait without pupils
│   ├── left-eye-pupil.png      # Left pupil overlay
│   └── right-eye-pupil.png     # Right pupil overlay
```

## Implementation Steps

### Phase 1: Component Setup
1. **Create EyeTrackingHero Component**
   - Replace current Intro component
   - Set up mouse tracking state management
   - Implement viewport-relative coordinates

2. **Mouse Position Calculation**
   ```jsx
   const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
   
   useEffect(() => {
     const handleMouseMove = (e) => {
       setMousePos({
         x: (e.clientX / window.innerWidth) * 100,
         y: (e.clientY / window.innerHeight) * 100
       });
     };
     
     document.addEventListener('mousemove', handleMouseMove);
     return () => document.removeEventListener('mousemove', handleMouseMove);
   }, []);
   ```

### Phase 2: Eye Movement Logic
1. **Eye Boundaries**
   - Define maximum movement range for each eye
   - Calculate relative position within eye socket
   - Apply movement limits to prevent unrealistic positions

2. **Smooth Animation**
   ```css
   .eye-pupil {
     transition: transform 0.1s ease-out;
     transform: translate(var(--eye-x), var(--eye-y));
   }
   ```

### Phase 3: Visual Polish
1. **Realistic Movement**
   - Implement slight delay between left and right eye
   - Add subtle parallax depth effect
   - Include micro-movements for liveliness

2. **Performance Optimization**
   - Throttle mouse events (60fps max)
   - Use `transform` instead of position changes
   - Implement `will-change` CSS property

## CSS Implementation

### Container Structure
```css
.eye-tracking-hero {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.portrait-container {
  position: relative;
  width: 300px;
  height: 400px;
}

.base-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.eye-overlay {
  position: absolute;
  pointer-events: none;
}

.left-eye {
  top: 28%;
  left: 38%;
  width: 8%;
  height: 4%;
}

.right-eye {
  top: 28%;
  right: 38%;
  width: 8%;
  height: 4%;
}
```

## User Experience Considerations

### Accessibility
- **Reduced Motion**: Respect `prefers-reduced-motion` setting
- **Performance**: Disable on mobile devices if needed
- **Fallback**: Static image if JavaScript disabled

### Design Integration
- Subtle effect that enhances rather than distracts
- Maintains professional appearance
- Works with existing particle background
- Complements current color scheme

## Performance Metrics
- **Frame Rate**: Maintain 60fps during interaction
- **CPU Usage**: < 5% additional load
- **Memory**: < 50MB additional usage
- **Load Time**: < 200ms additional delay

## Browser Compatibility
- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## Implementation Timeline
- **Setup & Basic Tracking**: 2-3 hours
- **Eye Movement Logic**: 3-4 hours
- **Visual Polish & Animation**: 2-3 hours
- **Performance Optimization**: 1-2 hours
- **Testing & Refinement**: 2-3 hours

**Total Estimated Time**: 10-15 hours

## Success Criteria
- [ ] Eyes smoothly follow mouse cursor
- [ ] Natural, realistic eye movement boundaries
- [ ] Maintains 60fps performance
- [ ] Works across all target browsers
- [ ] Respects accessibility preferences
- [ ] Integrates seamlessly with existing design

## Risk Assessment
- **High**: Creating realistic eye movement without uncanny valley
- **Medium**: Performance optimization on lower-end devices
- **Low**: Browser compatibility for CSS transforms

## Alternative Approaches
1. **Canvas-based**: Use HTML5 Canvas for more complex effects
2. **WebGL**: 3D eye movement with Three.js
3. **CSS-only**: Pure CSS solution with hover states
4. **Library Integration**: Use existing eye-tracking libraries