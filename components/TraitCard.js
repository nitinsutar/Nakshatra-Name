export default function TraitCard({ label, value }){
  return (
    <div className="trait-card">
      <strong>{label}</strong>
      <span>{value}</span>
    </div>
  )
}
