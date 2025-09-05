import Layout from '../components/Layout'

export default function About(){
  return (
    <Layout title="About — Nakshatra Baby Names" description="How this tool works and why astrology naming is traditional.">
      <h1>About Nakshatra Baby Names</h1>
      <p style={{color:'#555'}}>This tool presents the traditional Sanskrit syllables assigned to each Nakshatra pada, and curated Indian name suggestions that start with those syllables.</p>

      <h3 style={{marginTop:18}}>Educational notes</h3>
      <p style={{color:'#555'}}>Nakshatras are 27 equal divisions of the ecliptic. The Moon's longitude determines the Nakshatra and the pada selects the specific syllable. We provide this as educational reference — for final naming please verify with a precise ephemeris-based calculation if exact timing is crucial.</p>

      <p className="note">We respect cultural traditions and our curated lists are suggestions only.</p>
    </Layout>
  )
}
