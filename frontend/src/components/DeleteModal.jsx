import React from "react";
import "./DeleteModal.css";

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <p>本当に削除しますか？</p>
        <div className="modalButtons">
          <button onClick={onConfirm} className="confirmButton">
            はい
          </button>
          <button onClick={onClose} className="cancelButton">
            キャンセル
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
