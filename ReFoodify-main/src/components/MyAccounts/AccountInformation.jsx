import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
// import {
//   setAvatarUrl,
//   setUser,
//   fetchUser,
//   updateUser,
//   setUserInfo,
//   logout,
//   updateUserAvatar,
// } from "@/redux/slices/userSlice";
import {
  fetchUser,
  updateUser,
  logout,
  updateUserAvatar,
} from "@/redux/user/actions";
import Avatar from "@/assets/genericAvatar.png";
// import Avatar from "../../../../Group6-be-api/images/avatar.jpg";
import MailIcon from "@/assets/mail.png";
import Reward from "@/assets/reward.png";
import { useNavigate } from "react-router-dom";

import "./accountInformation.style.css"; // Vanilla CSS

const InfoItem = ({ title, value, editable, onChange, isEditing, onDone }) => {
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="account-info-item">
      <div className="account-info-content">
        <h2 className="account-info-title">{title}</h2>
        {isEditing ? (
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className="account-info-input"
          />
        ) : (
          <p className="account-info-value">{value}</p>
        )}
      </div>
      {editable && (
        <>
          {isEditing ? (
            <button
              onClick={() => onDone(inputValue)}
              className="account-edit-button"
            >
              Done
            </button>
          ) : (
            <button onClick={onChange} className="account-edit-button">
              Edit
            </button>
          )}
        </>
      )}
    </div>
  );
};

InfoItem.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  editable: PropTypes.bool,
  onChange: PropTypes.func,
  isEditing: PropTypes.bool,
  onDone: PropTypes.func,
};

const AccountInformation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);
  const user = useSelector((state) => state.user);
  const [editingField, setEditingField] = useState(null);
  const [updatedUserInfo, setUpdatedUserInfo] = useState({
    username: userInfo?.username || "",
    email: userInfo?.email || "",
    social: userInfo?.username || "mahnoorf",
    points: userInfo?.rewardPoints || 0,
    avatarUrl: userInfo?.avatarUrl,
  });

  const [avatar, setAvatar] = useState(userInfo.avatarUrl || Avatar);

  const fetchData = async () => {
    try {
      const response = await dispatch(fetchUser()).unwrap();
      // console.log("User data fetched successfully:", response);
      // dispatch(setUserInfo(response));
      // dispatch(setAvatarUrl(response.avatarUrl));
    } catch (err) {
      console.log("Fetch user data failed:", err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (userInfo) {
      setUpdatedUserInfo({
        username: userInfo.username,
        email: userInfo.email,
        social: userInfo?.username,
        points: userInfo?.rewardPoints,
        avatarUrl: userInfo?.avatarUrl,
      });
    }
  }, [userInfo]);

  const handleEditClick = (field) => {
    setEditingField(field);
  };

  const handleDoneClick = async (field, newValue) => {
    setUpdatedUserInfo((prevInfo) => ({
      ...prevInfo,
      [field]: newValue,
    }));
    setEditingField(null);

    try {
      const response = await dispatch(
        updateUser({ ...updatedUserInfo, [field]: newValue })
      ).unwrap();
      console.log("Server response:", response);
      console.log("User information updated successfully");
    } catch (err) {
      console.log("Update user information failed:", err.message);
    }
  };

  const handleRemoveAvatar = async () => {
    const defaultAvatarUrl = "../../../public/avatars/avatar.jpg";

    try {
      const response = await dispatch(
        updateUser({ ...userInfo, avatarUrl: defaultAvatarUrl })
      ).unwrap();

      if (response) {
        setAvatar(defaultAvatarUrl);
        setUpdatedUserInfo((prevInfo) => ({
          ...prevInfo,
          avatarUrl: defaultAvatarUrl,
        }));

        dispatch(
          setUserInfo({
            ...userInfo,
            avatarUrl: defaultAvatarUrl,
          })
        );
        dispatch(setAvatarUrl(defaultAvatarUrl));
        // dispatch(setUser({ avatarUrl: defaultAvatarUrl }));

        console.log("Avatar removed successfully");
      }
    } catch (error) {
      console.error("Error removing avatar:", error);
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", userInfo._id);

      try {
        const resultAction = await dispatch(updateUserAvatar(formData));
        if (resultAction) {
          const newAvatarUrl = resultAction.payload.avatarUrl;
          // setAvatar(newAvatarUrl);
          // console.log("New Avatar URL: ", newAvatarUrl);
          // setUpdatedUserInfo((prevInfo) => ({
          //   ...prevInfo,
          //   avatarUrl: newAvatarUrl,
          // }));
          fetchData();
        }
      } catch (error) {
        console.error("Error uploading avatar:", error);
      }
    }
  };

  const handleChangePhotoClick = () => {
    document.getElementById("avatarUpload").click();
  };

  const handleLogout = () => {
    // Dispatch action to clear tokens from Redux store
    dispatch(logout());

    // Navigate to home page
    navigate("/");
  };

  return (
    <div className="account-container-responsive">
      <div className="account-content-responsive">
        {/* Profile Photo and Actions */}
        <div className="profile-photo-section-responsive">
          <img
            // src={avatar}
            src={userInfo.avatarUrl}
            alt={`${updatedUserInfo.username}'s avatar`}
            className="profile-photo-responsive"
          />
          <div className="action-buttons-responsive">
            <button
              onClick={handleRemoveAvatar}
              className="action-button-responsive"
            >
              Remove
            </button>
            <button
              onClick={handleChangePhotoClick}
              className="action-button-responsive"
            >
              Change photo
            </button>
            <input
              type="file"
              name="file"
              id="avatarUpload"
              accept="image/*"
              className="hidden-input-responsive"
              onChange={handleAvatarChange}
            />
          </div>
        </div>

        {/* User Info */}
        <hr className="my-6 border-t-2 border-[#D9D9D9]" />
        <div className="space-y-3">
          <InfoItem
            title="Name"
            value={updatedUserInfo.username}
            editable
            isEditing={editingField === "username"}
            onChange={() => handleEditClick("username")}
            onDone={(newValue) => handleDoneClick("username", newValue)}
          />
          <hr className="my-2 border-t-2 border-[#D9D9D9]" />
          <InfoItem
            title="Email Address"
            value={updatedUserInfo.email}
            editable
            isEditing={editingField === "email"}
            onChange={() => handleEditClick("email")}
            onDone={(newValue) => handleDoneClick("email", newValue)}
          />
          <hr className="my-2 border-t-2 border-[#D9D9D9]" />

          {/* Social Accounts */}
          <div className="social-section-responsive">
            <div className="flex items-center gap-3">
              <img
                className="social-icon-responsive"
                src={MailIcon}
                alt="Google Account"
              />
              <div>
                <h2 className="account-info-title">
                  Connected social accounts
                </h2>
                <p className="account-info-value">{updatedUserInfo.social}</p>
              </div>
            </div>
            <button className="action-button-small-responsive">
              Disconnect
            </button>
          </div>

          {/* Payment Method */}
          <hr className="my-2 border-t-2 border-[#D9D9D9]" />
          <div className="payment-section-responsive">
            <div className="flex items-center gap-3">
              <img
                className="payment-icon-responsive"
                src="/images/visa.png"
                alt="Visa"
              />
              <div>
                <h2 className="account-info-title">Payment Method</h2>
                <p className="account-info-value">**** **** **** 1234</p>
              </div>
            </div>
            <button className="action-button-small-responsive">Edit</button>
          </div>

          {/* Reward Points */}
          <hr className="my-2 border-t-2 border-[#D9D9D9]" />
          <div className="reward-section-responsive">
            <div className="flex items-center gap-3">
              <img
                className="reward-icon-responsive"
                src={Reward}
                alt="Reward Points"
              />
              <div>
                <h2 className="account-info-title">My Reward Points</h2>
                <p className="account-info-value">
                  {userInfo ? `${userInfo.rewardPoints} points` : "Loading..."}
                </p>
              </div>
            </div>
            {/* <button
              className="action-button-small-responsive"
              onClick={handleRedeemPoints}
            >
              Redeem
            </button> */}
          </div>

          {/* Log Out Button */}
          <hr className="my-6 border-t-2 border-[#D9D9D9]" />
          <div className="flex justify-center">
            <button className="logout-button-responsive" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInformation;
