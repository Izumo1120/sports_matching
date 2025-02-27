// PostDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // useParamsをインポート
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; // Firebaseの設定
//import "./PostDetail.css"; // 必要に応じてスタイルを追加

const PostDetail = () => {
  const { id } = useParams(); // URLのパラメータから投稿IDを取得
  const [post, setPost] = useState(null);

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

  if (!post) {
    return <div>Loading...</div>; // 投稿情報がまだ取得されていない場合
  }

  return (
    <div className="postDetail">
      <h1>{post.sport} - 詳細</h1>
      <p><strong>開催場所:</strong> {post.place}</p>
      <p><strong>開催日:</strong> {post.date}</p>
      <p><strong>欲しい人数:</strong> {post.people}</p>
      <p><strong>レベル:</strong> {post.skillLevel}</p>
      <p><strong>年齢別:</strong> {post.ageGroup}</p>
      <p><strong>性別:</strong> {post.gender}</p>
      <p><strong>コメント:</strong> {post.comment}</p>
      <p><strong>投稿者:</strong> {post.author?.username}</p>
    </div>
  );
};

export default PostDetail;
