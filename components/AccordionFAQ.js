import { useState } from 'react'

export default function AccordionFAQ({ items = [] }){
  return (
    <div className="accordion">
      {items.map((it, idx) => <AccordionItem key={idx} q={it.q} a={it.a} />)}
    </div>
  )
}

function AccordionItem({ q, a }){
  const [open, setOpen] = useState(false)
  return (
    <div className="accordion-item">
      <button className="accordion-button" aria-expanded={open} onClick={()=>setOpen(!open)}>
        <span>{q}</span>
        <span>{open ? '−' : '+'}</span>
      </button>
      <div className={`accordion-content ${open ? 'open' : ''}`}>
        {Array.isArray(a) ? a.map((p,i)=>(<p key={i}>{p}</p>)) : <p>{a}</p>}
      </div>
    </div>
  )
}
