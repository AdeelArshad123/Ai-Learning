// Hero Section Configuration
// Fixed to use only Gradient Wave hero

export type HeroStyle = 'gradientwave'

export const heroConfig = {
  // Fixed to use gradient wave hero only
  activeHero: 'gradientwave' as HeroStyle,

  // Disable the hero selector since we only have one option
  showSelector: false,

  // Animation settings
  animations: {
    duration: 0.8,
    stagger: 0.2,
    easing: 'easeInOut'
  }
}

export const heroStyles = {
  gradientwave: {
    name: 'Gradient Wave',
    description: 'Flowing gradient waves with floating stars',
    colors: ['violet', 'purple', 'fuchsia'],
    features: ['Animated waves', 'Floating stars', 'Gradient effects']
  }
}
