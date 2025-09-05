import { NAKSHATRAS } from './nakshatra'
import CURATED from './curated_names'

const SUFFIXES = ['an','it','ra','ya','vi','a','esh','in']
const NAMES = {}

NAKSHATRAS.forEach(n => {
  n.syllables.forEach(syl => {
    if (CURATED[syl] && CURATED[syl].length) {
      NAMES[syl] = CURATED[syl].map(x => ({ name: x.name, gender: x.gender || 'any', style: x.style || 'traditional', meaning: x.meaning || '' }))
    } else {
      NAMES[syl] = SUFFIXES.map(s => ({ name: `${syl}${s}`, gender: 'any', style: 'generated', meaning: '' }))
    }
  })
})

export default NAMES
