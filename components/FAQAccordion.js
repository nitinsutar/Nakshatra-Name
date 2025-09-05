import { useState } from 'react'

export default function FAQAccordion({ items = [] }){
  return (
    <div className="accordion">
      {items.map((it,idx)=>(
        <AccordionItem key={idx} q={it.q} a={it.a} />
      ))}
    </div>
  )
}

function AccordionItem({ q, a }){
  const [open, setOpen] = useState(false)
  return (
    <div className={open? 'accordion-item accordion-open' : 'accordion-item'}>
      <div className="accordion-question" onClick={()=>setOpen(!open)}>
        <div>{q}</div>
        <div style={{opacity:0.7}}>{open? '−' : '+'}</div>
      </div>
      <div className="accordion-answer">{a}</div>
    </div>
  )
}
