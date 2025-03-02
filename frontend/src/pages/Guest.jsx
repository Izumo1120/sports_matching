import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase";
import DeleteModal from "../components/DeleteModal";
import { useNavigate } from "react-router-dom"; // useNavigate を追加
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import "./Guest.css";

const Guest = () => {
  const [postList, setPostList] = useState([]);
  const navigate = useNavigate();

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPostId(null);
  };

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(collection(db, "events"));
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, []);

  // 投稿クリック時に詳細ページへ遷移する関数
  const handlePostClick = (id) => {
    navigate(`/post/${id}`); // 例: 詳細ページへの遷移
  };

  return (
    <>
      <div className="homePage">
        {postList.map((post) => (
          <div
            className="postContents"
            key={post.id}
            onClick={() => handlePostClick(post.id)}
          >
            <div className="postContainer">
              <div className="profile">
                <img
                  className="userImg2"
                  src={post.author?.photoURL}
                  alt="profile"
                />
                <div className="name">@{post.author?.username}</div>
              </div>
              <div className="date">
                <AccessTimeIcon />
                {post.date}
              </div>
              <div className="postContent">
                <div className="sport">{post.sport}</div>
                <div className="moji">
                  <strong>開催場所：</strong>
                  {post.place}
                </div>
                <div className="moji">
                  <strong>欲しい人数：</strong>
                  {post.people}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Guest;
