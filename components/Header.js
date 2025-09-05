import Link from 'next/link'

export default function Header(){ 
  return (
    <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:24}}>
      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <div style={{width:48,height:48,background:'#0b74de',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700}}>NH</div>
        <div>
          <Link href='/'><a style={{fontSize:20,fontWeight:700,color:'#07203a',textDecoration:'none'}}>Nakshatra Name Tool</a></Link>
          <div style={{fontSize:12,color:'#6b7280'}}>Find syllables & curated Indian names</div>
        </div>
      </div>

      <nav style={{display:'flex',gap:12,alignItems:'center'}}>
        <Link href='/'><a style={{padding:'8px 12px',borderRadius:8}}>Home</a></Link>
        <Link href='/about'><a style={{padding:'8px 12px',borderRadius:8}}>About</a></Link>
        <a href='#' style={{padding:'8px 12px',borderRadius:8}}>Contact</a>
      </nav>
    </header>
  )
}
