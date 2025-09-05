import Link from 'next/link'
export default function Breadcrumbs({ items = [] }){
  return (
    <nav className="breadcrumbs">
      {items.map((it, idx) => (
        <span key={idx}>
          {it.href ? <Link href={it.href}><a>{it.label}</a></Link> : <span>{it.label}</span>}
          {idx < items.length -1 ? ' › ' : ''}
        </span>
      ))}
    </nav>
  )
}
