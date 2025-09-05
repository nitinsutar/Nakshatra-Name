import { NAKSHATRAS } from './nakshatra'

// Simple starter name generator dataset: for each syllable, generate 8 example names.
const SUFFIXES = ['an','it','ra','ya','vi','a','esh','in']
const NAMES = {}

NAKSHATRAS.forEach(n => {
  n.syllables.forEach(syl => {
    const list = SUFFIXES.map(s => `${syl}${s}`)
    NAMES[syl] = list
  })
})

export default NAMES
