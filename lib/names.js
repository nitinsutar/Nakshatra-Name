import { NAKSHATRAS } from './nakshatra'
import CURATED from './curated_names'

const SUFFIXES = ['an','it','ra','ya','vi','a','esh','in']
const NAMES = {}

NAKSHATRAS.forEach(n => {
  n.syllables.forEach(syl => {
    const curated = CURATED[syl] || []
    if(curated.length){
      NAMES[syl] = curated.map(x => ({ name: x.name, gender: x.gender||'any', style: x.style||'traditional', meaning: x.meaning||'', language: x.language||[], source: x.source||'internal', verified: !!x.verified, popularity: x.popularity||0 }))
    } else {
      NAMES[syl] = SUFFIXES.map(s => ({ name: `${syl}${s}`, gender: 'any', style: 'generated', meaning: '', language: [], source: 'generated', verified: false, popularity: 0 }))
    }
  })
})

export default NAMES
