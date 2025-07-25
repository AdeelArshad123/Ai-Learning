# 🎨 Hero Sections Guide

Your AI CodeLearner platform now includes **5 stunning animated hero sections** with a sleek icon-based selector!

## 🚀 Available Hero Styles

### 1. **Glassmorphism Hero** (Default)
- **Style**: Modern glassmorphism with floating orbs
- **Features**: 
  - Floating animated orbs with blur effects
  - Gradient backgrounds (indigo → purple → pink)
  - Glassmorphism button design
  - Smooth scale and movement animations
- **Best For**: Modern, premium feel

### 2. **Particle Animation Hero**
- **Style**: Animated particles with code brackets
- **Features**:
  - 50+ floating particles with random animations
  - Rotating code brackets `< >`
  - Grid pattern background
  - Floating tech icons (Code, Rocket, Lightbulb, Cogs)
  - Wave animation at bottom
- **Best For**: Tech-focused, dynamic feel

### 3. **Geometric Shapes Hero**
- **Style**: Minimalist design with geometric animations
- **Features**:
  - Rotating circles of different sizes
  - Floating triangles and hexagons
  - Clean, minimal design
  - Stats counter animation
  - Badge with online indicator
- **Best For**: Clean, professional look

### 4. **Gradient Wave Hero**
- **Style**: Flowing gradient waves with floating stars
- **Features**:
  - Animated SVG wave layers
  - Floating star particles
  - Purple/pink/violet gradients
  - Glowing badge with pulse effect
  - Feature icons with hover animations
- **Best For**: Creative, artistic feel

### 5. **Neon Glow Hero**
- **Style**: Cyberpunk neon glow with grid patterns
- **Features**:
  - Neon grid background
  - Glowing circular elements
  - Cyberpunk color scheme (cyan/pink/green)
  - Scan line effects
  - Neon-styled buttons and cards
- **Best For**: Tech/gaming audience, futuristic theme

## 🔧 How to Switch Hero Styles

### Method 1: Using the Icon Selector (Development)
1. Look for the **floating icons** in the top-right corner
2. Click on any icon to switch hero styles instantly
3. Hover over icons to see tooltips with style names
4. Active style has a glowing border indicator

### Method 2: Configuration File (Production)
Edit `src/config/heroConfig.ts`:

```typescript
export const heroConfig = {
  // Change this value to switch hero styles:
  activeHero: 'glassmorphism', // 'particle' | 'geometric' | 'gradientwave' | 'neonglow'

  // Hide selector in production
  showSelector: false,
}
```

### Method 3: Direct Component Usage
Import and use any hero directly:

```tsx
import ParticleHero from '@/components/HeroSections/ParticleHero'
import GeometricHero from '@/components/HeroSections/GeometricHero'
import TerminalHero from '@/components/HeroSections/TerminalHero'

// Use in your page
<ParticleHero />
```

## 🎯 Customization Options

### Typewriter Component
Enhanced with new features:

```tsx
<Typewriter 
  text="Your Text"
  speed={100}           // Typing speed (ms per character)
  delay={500}           // Delay before starting
  loop={true}           // Loop the animation
  showCursor={true}     // Show/hide cursor
  cursorChar="|"        // Cursor character
  onComplete={() => {}} // Callback when complete
/>
```

### Animation Settings
Modify animations in `heroConfig.ts`:

```typescript
animations: {
  duration: 0.8,    // Animation duration
  stagger: 0.2,     // Stagger delay between elements
  easing: 'easeInOut' // Animation easing
}
```

## 🎨 Color Schemes

### Glassmorphism
- **Primary**: Indigo (600-900)
- **Secondary**: Purple (500-900)
- **Accent**: Pink (500-900)
- **Background**: Gradient blur effects

### Particle Animation
- **Primary**: Slate (800-900)
- **Secondary**: Purple (400-600)
- **Accent**: Blue (400-500)
- **Background**: Dark with particles

### Geometric
- **Primary**: Gray (800-900)
- **Secondary**: Blue (400-600)
- **Accent**: Purple (400-600)
- **Background**: Clean gradients

### Terminal
- **Primary**: Gray (800-900)
- **Secondary**: Green (400-500)
- **Accent**: Blue/Yellow (400-500)
- **Background**: Terminal dark theme

## 📱 Responsive Design

All hero sections are fully responsive:

- **Mobile**: Single column, adjusted font sizes
- **Tablet**: Optimized spacing and animations
- **Desktop**: Full layout with all animations
- **Large Screens**: Enhanced visual effects

## ⚡ Performance Optimizations

### Animations
- Uses `framer-motion` for smooth 60fps animations
- GPU-accelerated transforms
- Optimized re-renders with `AnimatePresence`

### Loading
- Lazy loading for heavy animations
- Reduced motion support for accessibility
- Efficient particle systems

## 🛠️ Technical Details

### File Structure
```
src/components/HeroSections/
├── HeroSelector.tsx      # Main selector component
├── ParticleHero.tsx      # Particle animation hero
├── GeometricHero.tsx     # Geometric shapes hero
├── TerminalHero.tsx      # Terminal interface hero
└── README.md            # This guide

src/config/
└── heroConfig.ts        # Configuration file
```

### Dependencies
- `framer-motion`: Animations
- `react-icons`: Icon components
- `tailwindcss`: Styling

## 🎭 Animation Details

### Glassmorphism Animations
- **Orbs**: Floating with scale and position changes
- **Text**: Staggered fade-in with slide-up
- **Button**: Hover scale and glow effects
- **Background**: Continuous gradient shifts

### Particle Animations
- **Particles**: Random floating with opacity changes
- **Brackets**: 3D rotation effects
- **Icons**: Orbital movement patterns
- **Wave**: SVG path morphing

### Geometric Animations
- **Circles**: Continuous rotation at different speeds
- **Shapes**: Scale and rotation combinations
- **Stats**: Number counting animation
- **Badge**: Pulse and glow effects

### Terminal Animations
- **Typing**: Character-by-character reveal
- **Cursor**: Blinking animation
- **Scan Line**: Vertical movement
- **Matrix**: Falling characters effect

## 🚀 Quick Start

1. **Choose your hero style** using the selector or config
2. **Customize colors** in the component files
3. **Adjust animations** in the heroConfig
4. **Test responsiveness** on different devices
5. **Deploy** with your preferred style

## 💡 Pro Tips

### Performance
- Disable selector in production (`showSelector: false`)
- Use `will-change: transform` for heavy animations
- Consider reduced motion preferences

### Customization
- Modify gradient colors for brand consistency
- Adjust animation speeds for your audience
- Add your own floating elements or particles

### Accessibility
- All animations respect `prefers-reduced-motion`
- Proper ARIA labels on interactive elements
- Keyboard navigation support

## 🎯 Best Practices

1. **Choose based on audience**:
   - Glassmorphism: Modern/Premium users
   - Particle: Tech enthusiasts
   - Geometric: Professional/Corporate
   - Terminal: Developers/Coders

2. **Performance considerations**:
   - Test on mobile devices
   - Monitor animation performance
   - Use appropriate animation complexity

3. **Brand consistency**:
   - Match colors to your brand
   - Adjust messaging and CTAs
   - Maintain consistent tone

## 🔄 Updates & Maintenance

To add new hero styles:

1. Create new component in `HeroSections/`
2. Add to `heroOptions` in `HeroSelector.tsx`
3. Update `heroConfig.ts` with new style
4. Test responsiveness and performance

Your hero section is now ready to impress visitors with stunning animations! 🎉
