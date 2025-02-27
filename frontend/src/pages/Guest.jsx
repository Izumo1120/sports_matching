// Guest.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase";

import "./Guest.css";

const Guest = () => {
  const [postList, setPostList] = useState([]);
  const navigate = useNavigate();


  const deletePost = async (id) => {
    await deleteDoc(doc(db, "events", id));
    window.location.href = "/guest";
  };

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(collection(db, "events"));
      console.log(data);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, []);

  // 投稿クリック時に詳細ページへ遷移する関数
  const handlePostClick = (id) => {
    navigate(`/post/${id}`); // 例: 詳細ページへの遷移
  };

  return (
    <div className="homePage">
      {postList.map((post) => {
        return (
          <div
          className="postContents"
          key={post.id}
          onClick={() => handlePostClick(post.id)} // クリック時に遷移
          >
            <div className="postHeader">
              <h1>{post.sport}</h1>
            </div>

            <div className="postTextContainer">{post.postText}</div>
            <div>開催場所：{post.place}</div>
            <div>開催日：{post.date}</div>
            <div>欲しい人数：{post.people}</div>
            <div>レベル：{post.skillLevel}</div>
            <div>性別：{post.gender}</div>
            <div>コメント：{post.comment}</div>

            <div className="nameAndDeleteButton">
              <h3>{post.author.username}</h3>
              {post.author.id === auth.currentUser?.uid && (
                <button onClick={() => deletePost(post.id)}>削除</button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Guest;
