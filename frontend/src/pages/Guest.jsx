import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase";
import DeleteModal from "../components/DeleteModal";
import { useNavigate } from "react-router-dom"; // useNavigate を追加

import "./Guest.css";

const Guest = () => {
  const [postList, setPostList] = useState([]);
  const navigate = useNavigate();
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = (link) => {
    navigate(link);
  };

  const openModal = (id) => {
    setSelectedPostId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPostId(null);
  };

  const confirmDelete = async () => {
    if (selectedPostId) {
      await deleteDoc(doc(db, "events", selectedPostId));
      setPostList(postList.filter((post) => post.id !== selectedPostId));
      closeModal();
      alert("削除しました"); //これいらんかも
    }
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
              {post.author.id === auth.currentUser?.uid ? (
                <button
                  className="deleteButton"
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(post.id);
                  }}
                >
                  削除
                </button>
              ) : (
                <button
                  className="applyButton"
                  onClick={(e) => {
                    e.stopPropagation(); // クリックイベントのバブリングを防ぐ
                    handleButtonClick("/apply");
                  }}
                >
                  応募
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <DeleteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default Guest;
