export default function NameSuggestions({ syllable }){
  if(!syllable) return null
  const base = [`${syllable}an`, `${syllable}it`, `${syllable}ra`, `${syllable}vi`, `${syllable}ya`, `${syllable}a`]
  return (
    <div>
      <h3>Example names starting with {syllable}</h3>
      <ul>
        {base.map((n,i) => <li key={i}>{n}</li>)}
      </ul>
    </div>
  )
}
