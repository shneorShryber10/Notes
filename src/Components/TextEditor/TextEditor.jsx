import React, { useState } from 'react';

const TextEditor = () => {
  const [fontSize, setFontSize] = useState(16);
  const [textFormat, setTextFormat] = useState('normal');

  const handleFontSizeChange = (event) => {
    setFontSize(Number(event.target.value));
  };

  const handleTextFormatChange = (event) => {
    setTextFormat(event.target.value);
  };

  const textStyle = {
    fontSize: `${fontSize}px`,
    fontWeight: textFormat === 'bold' ? 'bold' : 'normal',
    fontStyle: textFormat === 'italic' ? 'italic' : 'normal',
    textDecoration: textFormat === 'underline' ? 'underline' : 'none',
  };

  return (
    <div>
      <div>
        <label htmlFor="fontSize">Font Size: </label>
        <input
          type="number"
          id="fontSize"
          value={fontSize}
          onChange={handleFontSizeChange}
        />
      </div>

      <div>
        <label htmlFor="textFormat">Text Format: </label>
        <select id="textFormat" value={textFormat} onChange={handleTextFormatChange}>
          <option value="normal">Normal</option>
          <option value="bold">Bold</option>
          <option value="italic">Italic</option>
          <option value="underline">Underline</option>
        </select>
      </div>

      <div style={textStyle}>
        Sample Text
      </div>
    </div>
  );
};

export default TextEditor;