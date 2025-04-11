import React , {useState} from 'react';

const q1 = () => {
    const [count , setCount] = useState(0)
  return (
    <div>
      <p><strong>Count : </strong> {count}</p>
      <button onClick={() => setCount(count +1)}>inc</button>
      <button onClick={() => setCount(count - 1)}>dec</button>
      <button onClick={() => setCount(0)} >reset</button>
    </div>
  );
}

export default q1;
