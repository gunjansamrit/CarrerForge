import React, { useState } from "react";
import editIcon from "../../resources/icons/edit-icon.svg";
const StudentDetails = ({
  student,
  handleEditProfile,
  handleProfileChange,
}) => (
  <div className="profile-card">
    <div className="profile-header">
      <img src={student.profileImage} className="profile-image" />
      <div>
        <h3>
          {student.name.firstName +
            " " +
            student.name.middleName +
            " " +
            student.name.lastName}
        </h3>
        <p>{student.highestEducation}</p>
      </div>
      <button className="edit-btn" onClick={handleEditProfile}>
        <img src={editIcon} alt="Edit" className="edit-icon" />
      </button>
    </div>
    {!student.isEditMode ? (
      <div className="profile-details">
        <p>
          <strong>Email:</strong> {student.email}
        </p>
        {/* <p>
          <strong>Skills:</strong> {student.skills.join(", ")}
        </p> */}
      </div>
    ) : (
      <div className="profile-edit">
        <input
          type="text"
          placeholder="Name"
          value={student.name}
          onChange={(e) => handleProfileChange("name", e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={student.email}
          onChange={(e) => handleProfileChange("email", e.target.value)}
        />
        <input
          type="text"
          placeholder="Degree"
          value={student.degree}
          onChange={(e) => handleProfileChange("degree", e.target.value)}
        />
        <button className="save-btn" onClick={handleEditProfile}>
          Save Changes
        </button>
      </div>
    )}
  </div>
);
export default StudentDetails;
