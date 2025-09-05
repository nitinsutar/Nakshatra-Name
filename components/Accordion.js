import { useState } from 'react'

export default function Accordion({ items = [] }){
  return (
    <div className="accordion">
      {items.map((it, idx) => <AccordionItem key={idx} item={it} />)}
    </div>
  )
}

function AccordionItem({ item }){
  const [open, setOpen] = useState(false)
  return (
    <div className="accordion-item">
      <div className="accordion-header" onClick={() => setOpen(!open)}>
        <div>{item.q}</div>
        <div>{open ? '−' : '+'}</div>
      </div>
      {open && <div className="accordion-body">{item.a}</div>}
    </div>
  )
}
