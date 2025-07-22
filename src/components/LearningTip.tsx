import React from 'react';
import { FaRegLightbulb } from 'react-icons/fa';

const LearningTip = () => (
  <div style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: '1px solid #e5e7eb', padding: 16, maxWidth: 400, margin: '16px auto', display: 'flex', alignItems: 'center', gap: 12 }}>
    <span style={{ color: '#facc15', fontSize: 24 }}>
      <FaRegLightbulb />
    </span>
    <div>
      <div style={{ color: '#222', fontWeight: 700, fontSize: '1rem', marginBottom: 4 }}>Learning Tip</div>
      <div style={{ color: '#444', fontSize: '1rem', fontStyle: 'italic', fontWeight: 500 }}>
        "Break down complex topics into smaller, manageable chunks. This helps with retention and makes learning more enjoyable."
      </div>
    </div>
  </div>
);

export default LearningTip; 