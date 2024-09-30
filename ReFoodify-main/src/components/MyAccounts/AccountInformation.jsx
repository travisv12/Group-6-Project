import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
  fetchUser,
  updateUser,
  setUserInfo,
  logout,
} from "@/redux/slices/userSlice";
import Avatar from "@/assets/genericAvatar.png";
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
  const [editingField, setEditingField] = useState(null);
  const [updatedUserInfo, setUpdatedUserInfo] = useState({
    username: userInfo?.username || "",
    email: userInfo?.email || "",
    social: userInfo?.username || "mahnoorf",
    points: "5200 points",
  });

  // Handle Redeem Points and return True if successful
  const [redeemMessage, setRedeemMessage] = useState("");
  const handleRedeem = () => {
    const currentPoints = parseInt(updatedUserInfo.points);
    if (currentPoints >= 5000) {
      const remainingPoints = currentPoints - 5000;
      setUpdatedUserInfo((prevInfo) => ({
        ...prevInfo,
        points: `${remainingPoints} points`,
      }));
      setRedeemMessage("Redeem successful");
      console.log("Remaining points:", remainingPoints);
      return true;
    } else {
      setRedeemMessage("Points not enough");
      return false;
    }
  };
  const [avatar, setAvatar] = useState(Avatar);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchUser()).unwrap();
        dispatch(setUserInfo(response));
      } catch (err) {
        console.log("Fetch user data failed:", err.message);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (userInfo) {
      setUpdatedUserInfo({
        username: userInfo.username,
        email: userInfo.email,
        social: userInfo?.username || "mahnoorf",
        points: "5200 points",
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

  const handleRemoveAvatar = () => {
    setAvatar(Avatar);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
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
            src={avatar}
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
                <p className="account-info-value">{updatedUserInfo.points}</p>
                <p className="text-sm text-gray-600 mt-1">
                  Redeem 5000 points to receive -5€ off next purchase
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <button
                className="action-button-small-responsive"
                onClick={handleRedeem}
              >
                Redeem
              </button>
              {redeemMessage && (
                <p
                  className={`text-sm mt-2 ${
                    redeemMessage === "Redeem successful"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {redeemMessage}
                </p>
              )}
            </div>
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
