import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [comments, setComments] = useState([]);
  const [filteredComments, setFilteredComments] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [postIdFilter, setPostIdFilter] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments?_limit=100")
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  const handleFilterChange = (postId) => {
    setPostIdFilter(postId);
    if (postId === "") {
      setFilteredComments(comments);
    } else {
      const filtered = comments.filter(
        (comment) => comment.postId.toString() === postId
      );
      setFilteredComments(filtered);
    }
  };

  const handlePostClick = (postId) => {
    setSelectedPost(postId);
  };
  return (
    <>
      <div className="App">
        <div className="left-side">
          <input
            type="text"
            placeholder="Filter by Post ID"
            value={postIdFilter}
            onChange={(e) => handleFilterChange(e.target.value)}
          />
          {filteredComments.map((comment) => (
            <div
              key={comment.id}
              className={`post ${
                selectedPost === comment.postId ? "active" : ""
              }`}
              onClick={() => handlePostClick(comment.postId)}
            >
              <h2>{comment.name}</h2>
              <p>{comment.body}</p>
            </div>
          ))}
        </div>
        <div className="right-side">
          {selectedPost && (
            <>
              <h2>Comments for Post {selectedPost}</h2>
              <ul>
                {comments
                  .filter((comment) => comment.postId === selectedPost)
                  .map((comment) => (
                    <li key={comment.id}>{comment.body}</li>
                  ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
