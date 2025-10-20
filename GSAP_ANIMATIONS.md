# GSAP Animations Documentation

This document describes all the GSAP animations and scroll effects implemented across the Satocci home page.

## Overview

The home page now features comprehensive GSAP (GreenSock Animation Platform) animations with scroll triggers, providing a dynamic and engaging user experience. All animations are optimized for performance and use GSAP's ScrollTrigger plugin.

## Animations by Component

### 1. Hero Section (`app/page.tsx`)

**Initial Load Animations:**
- **Hero Title**: Fades in and slides up from bottom (100px offset) with a smooth power4 easing
- **Hero Description**: Fades in and slides up (50px offset) with slight delay
- **Action Buttons**: Fade in and scale up with staggered timing and elastic bounce effect

**Micro-interactions:**
- All buttons have `hover:scale-110` for scale-up effect
- Icon buttons have additional `hover:rotate-12` for playful rotation

### 2. Navigation Bar (`components/Home/NavBar.tsx`)

**Initial Load Animations:**
- **Navbar Container**: Slides down from top (-100px) with fade-in
- **Logo**: Fades in from left with horizontal slide
- **Menu Items**: Staggered fade-in and slide-down effect (each item 0.1s apart)
- **Action Buttons**: Scale up with staggered bounce effect

**Micro-interactions:**
- Language button: `hover:scale-110` with rotation
- CTA buttons: `hover:scale-105` with shadow glow effects

### 3. App Showcase Section (`components/Home/AppShowcaseSection.tsx`)

**Scroll Trigger Animations:**
- **Title**: Fades in and slides from left (-100px) when entering viewport
- **Description**: Fades in and slides from left with 0.2s delay
- **CTA Button**: Scales up with elastic bounce when visible
- **Phone Image**: 
  - Parallax scroll effect (moves vertically with scroll)
  - Continuous floating animation (up and down, 2s cycle)
  - Initial fade-in with scale effect

**Micro-interactions:**
- Button: `hover:scale-105` with shadow glow

### 4. Features Section (`components/Home/FeaturesSection.tsx`)

**Scroll Trigger Animations:**
- **Header Title**: Fades in and slides up (60px) on scroll
- **Header Description**: Fades in from right (80px offset)
- **Main Feature Card**: Slides in from left (-100px) with scale effect (0.9 to 1.0)
- **Secondary Feature Card**: Slides in from right (100px) with scale effect (0.8 to 1.0)

**Micro-interactions:**
- **Main Card**: 
  - Mouse enter: Moves up 10px with smooth transition
  - Mouse leave: Returns to original position
- **Cards**: `hover:scale-105` with enhanced shadow

### 5. Product Features Section (`components/Home/ProductSection.tsx`)

**Scroll Trigger Animations:**
Each feature section (4 total) has unique animations:

**Feature 1 & 3** (Left-aligned content):
- Content slides in from left (-100px)
- Image slides in from right (100px) with scale effect
- Bullet points appear with staggered effect (0.1s apart)

**Feature 2 & 4** (Right-aligned content):
- Image slides in from left (-100px) with scale effect
- Content slides in from right (100px)
- Bullet points appear with staggered effect

**Micro-interactions:**
- All feature cards: `hover:scale-105` with shadow enhancement
- Buttons: `hover:scale-105` with glow effects

### 6. Reviews Section (`components/Home/ReviewsSection.tsx`)

**Scroll Trigger Animations:**
- **Header**: Same pattern as other sections (title from bottom, description from right)
- **Testimonial Cards**: 
  - Staggered fade-in and slide-up (80px, 0.15s stagger)
  - Scale effect from 0.9 to 1.0
- **Auto Scroll**: Carousel shifts left (-200px) as user scrolls through section

**Micro-interactions:**
- **Card Hover**: 
  - Moves up 10px
  - Scales to 1.05
  - Smooth power2 easing

### 7. Newsroom Section (`components/Home/NewsroomSection.tsx`)

**Scroll Trigger Animations:**
- **Header**: Standard fade-in animations
- **News Cards**: 
  - Fade-in with vertical slide (100px)
  - 3D rotation effect (rotationX: -15deg to 0)
  - Staggered timing (0.12s between cards)
- **Parallax Scroll**: Carousel shifts left (-150px) during scroll

**Micro-interactions:**
- **Card Hover**:
  - Moves up 15px
  - Scales to 1.05
  - Alternating 3D rotation (±5deg on Y-axis based on card index)

### 8. FAQ Section (`components/Home/FAQSection.tsx`)

**Scroll Trigger Animations:**
- **Header**: Standard fade-in pattern
- **FAQ Container**: Fades in with vertical slide (80px) and subtle scale (0.95 to 1.0)
- **FAQ Items**: Staggered fade-in from left (-50px, 0.1s stagger)

## Animation Patterns

### Scroll Trigger Configuration
Most animations use these ScrollTrigger settings:
```javascript
scrollTrigger: {
  trigger: element,
  start: "top 80%",      // Animation starts when element is 80% down viewport
  toggleActions: "play none none reverse",  // Play on enter, reverse on leave
}
```

### Common Easing Functions
- **power3.out**: Smooth deceleration for most animations
- **power2.out**: Lighter deceleration for smaller elements
- **back.out(1.7)**: Elastic bounce for buttons and interactive elements
- **power1.inOut**: Smooth continuous animations (floating effects)

### Stagger Patterns
- **Menu items**: 0.1s stagger
- **Cards**: 0.12-0.15s stagger
- **Bullet points**: 0.1s stagger

## Performance Optimizations

1. **gsap.context()**: All animations wrapped in contexts for proper cleanup
2. **Cleanup Function**: `return () => ctx.revert()` prevents memory leaks
3. **Null Checks**: TypeScript types ensure ref safety
4. **Scrub Animations**: Used for parallax effects to sync with scroll position

## Micro-interactions Summary

All interactive elements include:
- **Scale transformations** on hover (1.05-1.10)
- **Smooth transitions** (300-400ms duration)
- **Shadow enhancements** for depth
- **Rotation effects** on icon buttons
- **Vertical lift** on cards (10-15px)

## Browser Compatibility

GSAP provides excellent cross-browser support. All animations work on:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

Potential additions:
1. Loading screen with animated logo
2. Page transition animations
3. Magnetic cursor effects for buttons
4. Text reveal animations with SplitText
5. Custom scroll progress indicators
6. Lottie animation integration

