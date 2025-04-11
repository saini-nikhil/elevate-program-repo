import axios from 'axios';
import React, { useEffect, useState } from 'react';
  let url = "https://jsonplaceholder.typicode.com/todos"
const Q2 = () => {
  const [todos , setTodos] = useState([])

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get(url)
        console.log(res.data)
        setTodos(res.data)
      } catch (error) {
        console.log("error in fetching" , error)
      }
    }
fetchdata()
  },[])
    
  return (
    <div>
      <table border="1">
        <thead>
          <tr>
            <th>Task</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
{todos.map((elem) => (
  <tr key={elem.id}>
    <td>{elem.title}</td>
    <td>{elem.completed ? "Yes" : "No"}</td>
  </tr>
))}
        </tbody>
      </table>
      
    </div>
  );
}

export default Q2;
