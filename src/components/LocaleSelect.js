import React from "react";

export default function LocaleSelect({ value, onChange }) {
  const handleChange = (e) => onChange(e.target.value);
  return (
    <select value={value} onChange={handleChange}>
      <option value='ko'>한국어</option>
      <option value='en'>English</option>
    </select>
  );
}
