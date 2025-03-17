import axios from 'axios';
import React, { useEffect, useState } from 'react';

let url = "https://jsonplaceholder.typicode.com/posts";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState("");
  const [sortByTitle, setSortByTitle] = useState("asc");
  const [sortById, setSortById] = useState("asc");

  useEffect(() => {
    setLoading(true);
    async function getPosts() {
      try {
        const res = await axios.get(url);
        setPosts(res.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
    getPosts();
  }, []);

 
  const filterPost = posts.filter(post =>
    post.title.toLowerCase().includes(searching.toLowerCase())
  );


  const sortedByTitle = [...filterPost].sort((a, b) => {
    if (sortByTitle === "asc") {
      return a.title.toLowerCase() - b.title.toLowerCase() 
    } else {
      return b.title.toLowerCase() < a.title.toLowerCase() 
    }
  });


  const sortedById = [...sortedByTitle].sort((a, b) => {
    if (sortById === "asc") {
      return a.id - b.id;
    } else {
      return b.id - a.id;
    }
  });

  if (loading) return <h1>Loading.....</h1>;

  return (
    <div>
      <h1>Posts</h1>
      <input
        type="text"
        placeholder="Search by title"
        value={searching}
        onChange={(e) => setSearching(e.target.value)} 
      />
      <div>
        <label>Sort by Title:</label>
        <select value={sortByTitle} onChange={(e) => setSortByTitle(e.target.value)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        
        <label>Sort by ID:</label>
        <select value={sortById} onChange={(e) => setSortById(e.target.value)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <div id="mainCont">
        {sortedById.map((elem) => (
          <div key={elem.id} id="cont">
            <h1>{elem.userId}</h1>
            <h1>Id : {elem.id}</h1>
            <h2>Title : {elem.title}</h2>
            <p>Body : {elem.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Post;
