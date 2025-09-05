export default function Footer(){ 
  return (
    <footer style={{marginTop:48,paddingTop:24,borderTop:'1px solid #eef4ff',display:'flex',justifyContent:'space-between',alignItems:'center',gap:12}}>
      <div style={{color:'#6b7280'}}>© {new Date().getFullYear()} Nakshatra Name Tool</div>
      <div style={{color:'#6b7280'}}>Made with care • Privacy-first</div>
    </footer>
  )
}
