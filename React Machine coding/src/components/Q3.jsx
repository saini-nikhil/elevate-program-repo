import React, { useEffect, useRef, useState } from 'react';

const Q3 = () => {
    const [inputValue , setInputValue] = useState("")
    const inputRef = useRef(null)
    useEffect(() => {
        if(inputRef.current){
            inputRef.current.focus()
        }
    }, [])
    
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Form submitted with input:', inputValue);
    // Maintain focus on the input field after submission
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setInputValue("")
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="inputField">Input:</label>
          <input
            id="inputField"
            type="text"
            ref={inputRef} // Attach the ref to the input field
            value={inputValue}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Q3;
