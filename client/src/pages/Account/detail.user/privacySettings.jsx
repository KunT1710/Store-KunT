import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./privacySettings.scss";
import { deleteAccount } from "../../../reduxs/auth.thunk";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../../components/alert";



function PrivacySettings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);
  const { showAlert, showError } = useAlert();

  const handleDeleteAccount = async () => {
    if (window.confirm('Bạn chắc muốn xóa tài khoản?')) {
      // console.log(user);
      const result = await dispatch(deleteAccount(user._id, navigate));
      if (result.success) {
        showAlert("Xóa tài khoản thành công");
      } else {
        showError("Xóa tài khoản không thành công");
      }
    }
    // console.log("Xóa Tài khoản");
  }
  return (
    <>
      <div className="container-privacy">
        <div className="header-privacy">
          <h2>Thiếp lập riêng tư</h2>
        </div>

        <div className="delete-account">
          <button className="btn-delete-account" onClick={handleDeleteAccount}>
            <FontAwesomeIcon icon={faTrash} />
            <span>Yêu cầu xóa tài khoản</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default PrivacySettings;
