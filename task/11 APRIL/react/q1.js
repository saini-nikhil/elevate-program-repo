import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Task1 = () => {
    const [data , setData] = useState([])
    const [currentPage, setCurrentPage] = useState(1); 
    const [itemsPerPage] = useState(10);
    
    useEffect(() => {
        async function  fetchData(){
            try {
                const res = await axios.get("https://jsonplaceholder.typicode.com/posts")
                console.log(res.data)
                setData(res.data)
              
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData()
    },[])

    const indexOfLastPost = currentPage * itemsPerPage;
    const indexOfFirstPost = indexOfLastPost - itemsPerPage;
    const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);


    const nextPage = () => setCurrentPage(currentPage + 1);
    const prevPage = () => setCurrentPage(currentPage - 1);

  return (
    <div>
        <ul>
            {currentPosts.map((elem)=> (
                <>
                <li  key={elem.id} >{elem.title}</li>
                <p>{elem.body}</p>
                </>

            ))}
        </ul>
        <div>
                <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <button
                    onClick={nextPage}
                    disabled={currentPage * itemsPerPage >= data.length}
                >
                    Next
                </button>
            </div>
    </div>
  );
}

export default Task1;
