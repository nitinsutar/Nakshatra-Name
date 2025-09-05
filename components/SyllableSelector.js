import React from 'react'

export default function SyllableSelector({ syllables = [], selected, onSelect }) {
  return (
    <div style={{ display:'flex', gap:10, flexWrap:'wrap', marginTop:12 }}>
      {syllables.map((s) => {
        const active = s === selected
        return (
          <button
            key={s}
            onClick={() => onSelect(s)}
            aria-pressed={active}
            style={{
              cursor:'pointer',
              border: active ? '2px solid #0b74de' : '1px solid rgba(11,116,222,0.08)',
              background: active ? '#0b74de' : '#f7fbff',
              color: active ? '#fff' : '#0b74de',
              padding: '8px 12px',
              borderRadius: 999,
              fontWeight: 700,
              fontSize: 13
            }}
          >
            {s}
          </button>
        )
      })}
    </div>
  )
}
