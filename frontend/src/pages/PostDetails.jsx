// PostDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // useParamsをインポート
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; // Firebaseの設定
import "./PostDetail.css";

const PostDetail = () => {
  const { id } = useParams(); // URLのパラメータから投稿IDを取得
  const [post, setPost] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getPostDetail = async () => {
      const postRef = doc(db, "events", id); // Firebaseの特定の投稿を参照
      const postSnap = await getDoc(postRef);

      if (postSnap.exists()) {
        setPost(postSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    getPostDetail();
  }, [id]); // idが変更されたときに再度実行されるようにする

  const handleApplyClick = (id) => {
    navigate(`/post/${id}/apply`);
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

  if (!post) {
    return <div>Loading...</div>; // 投稿情報がまだ取得されていない場合
  }

  return (
    <div className="postDetail">
      <div className="postCard">
        <div className="mediaAndCent">
          <div className="centenses">
            <div className="contents">
              <h1>募集概要</h1>
              <p>
                <strong>スポーツ種目:</strong>
                {post.sport}
              </p>
              <p>
                <strong>開催場所:</strong>
                {post.place}
              </p>
              <p>
                <strong>開催日:</strong>
                {post.date}
              </p>
              <p>
                <strong>欲しい人数:</strong>
                {post.people}
              </p>
            </div>
            <hr />
            <div className="contents">
              <h1>コメント</h1>
              <p>{post.comment}</p>
            </div>
            <hr />
            <div className="contents">
              <h1>募集者詳細</h1>
              <div className="userContainer">
                <img
                  className="userImg"
                  src={post.author?.photoURL}
                  alt="profile"
                />
                <div className="userInfo">
                  <p className="userName">@{post.author?.username}</p>
                  <p className="infoRow">
                    <span className="label">競技レベル:</span>
                    <span className="value">{post.skillLevel}</span>
                  </p>
                  <p className="infoRow">
                    <span className="label">年齢:</span>
                    <span className="value">{post.ageGroup}</span>
                  </p>
                  <p className="infoRow">
                    <span className="label">性別:</span>
                    <span className="value">{post.gender}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          className="applyButton"
          onClick={(e) => {
            e.stopPropagation();
            handleApplyClick();
          }}
        >
          申し込む
        </button>
      </div>
    </div>
  );
};

export default PostDetail;
