import { useEffect, useState } from 'react'

export default function BackToTop(){
  const [show, setShow] = useState(false)
  useEffect(()=>{
    function onScroll(){ setShow(window.scrollY > 300) }
    window.addEventListener('scroll', onScroll)
    onScroll()
    return ()=> window.removeEventListener('scroll', onScroll)
  },[])
  if(!show) return null
  return (
    <button className="back-to-top" title="Back to top" onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>
      ↑
    </button>
  )
}
