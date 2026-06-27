import React from 'react';

export default function DebugAlwaysRender() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 99999,
        background: '#ffd54f',
        color: '#000',
        padding: '8px 12px',
        fontWeight: 900,
        fontFamily: 'monospace',
      }}
    >
      APP RENDERED
    </div>
  );
}

