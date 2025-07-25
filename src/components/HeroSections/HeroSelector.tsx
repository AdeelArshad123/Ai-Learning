'use client'

import React from 'react'
import GradientWaveHero from './GradientWaveHero'
import { heroConfig } from '../../config/heroConfig'

const HeroSelector = () => {
  // Always use GradientWaveHero since it's the only option
  return <GradientWaveHero />
}

export default HeroSelector
