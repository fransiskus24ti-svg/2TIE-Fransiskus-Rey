import React from 'react';

export default function DebugRouteText({ text = 'DEBUG OK' }) {
  return (
    <div style={{ padding: 24, color: '#000', background: '#ffd54f', fontWeight: 800 }}>
      {text}
    </div>
  );
}

