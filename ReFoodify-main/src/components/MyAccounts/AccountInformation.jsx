import { useState } from "react";
import useUser from "@/hooks/useUser";
import PropTypes from "prop-types";

import Avatar from "@/assets/genericAvatar.png";
import MailIcon from "@/assets/mail.png";
import Reward from "@/assets/reward.png";

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
  const { user } = useUser();
  const [editingField, setEditingField] = useState(null);
  const [updatedUserInfo, setUpdatedUserInfo] = useState({
    username: user?.username || "Mahnoor Fatima",
    email: user?.email || "mahnoor.fatima@email.com",
    social: user?.social || "mahnoorf",
    points: user?.points || "5200 points",
  });

  const [avatar, setAvatar] = useState(Avatar);

  const handleEditClick = (field) => {
    setEditingField(field);
  };

  const handleDoneClick = (field, newValue) => {
    setUpdatedUserInfo((prevInfo) => ({
      ...prevInfo,
      [field]: newValue,
    }));
    setEditingField(null);
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
              </div>
            </div>
            <button className="action-button-small-responsive">Redeem</button>
          </div>
        </div>

        {/* Log Out Button */}
        <hr className="my-6 border-t-2 border-[#D9D9D9]" />
        <div className="flex justify-center">
          <button className="logout-button-responsive">Log Out</button>
        </div>
      </div>
    </div>
  );
};

export default AccountInformation;
