import React, { useState } from "react";
import editIcon from "../../resources/icons/edit-icon.svg";
const StudentDetails = ({
  student,
  handleEditProfile,
  handleProfileChange,
}) => (
  <div className="profile-card">
    <div className="profile-header">
      {/* <img src={student.profileImage} className="profile-image" /> */}
      {/* <box-icon name="user"></box-icon> */}
      {/* <i class="bx bx-user"></i> */}
      <img
        className="profile-image"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAmFJREFUSEvl1knIjVEcx/HPS+aNcWVnYSND5lKmiNgQC2RFyZBMCymlWFjItEBSNkRKSUJIFBtTkSHWZCEkRZHp+b+dt+77vPfe57n3vvUunN29zzm/7/kP53dOmx4abT3E1Qy4N8ZhStr0QzzH70aCaBS8DEcxMgd5i824XBbeCPgwthYIH8KOMvCy4Pm4mQQfYReepN+TsL8i9XNxpwheFnwL81ItJ+NnTrgvHmMsrmNRd4B74Rv6YxOO1xDdiGP4mvXBEPypBy8TcXTwsySyGNdqCEaUV9O3MXjVKjg6+F0SWYXzNQRX4lz6FmvetwqO9Z8wFPW69mCW5u34mKV8RHfUODT2YXcyiaW4khNegovZvDCXPdjbXeBorJcYlQTvpy7ukzp5Zvr/TXK1fNd32UeZ5upYFE12NoGqBRS2GXWODRaORsAhFkdrAxZgepb+XynyOLsni45Q5W4aBRdGUnZCWfAwzMhcaRrCufrlAD9S5A8yh4v6fy7aQBF4MA5gLaWv0L8p7TuTi1XdQz3wcpzA8IqV35OLVfPq8RhYMfcD1uNSNXItcFzykbaO76dxBC+ycxoR1dKKS2IL1qQJMXdqKkOnNdXAcdPE0RiNiHAh7hXVLPd9VvL0yMDrLOrIRqcsVQOHLW5LQuuy18apBqEd0yPNUaoYXay2GjiiHIAbKdomue3LbiMeBqE5qN45jmMTJh9jBS60QsVqnEkacUd/6dDLRzyx4kkTtY2oWxmVd3RYbvRO+8iDZ1e8l+bgbivUbH1NvTw4DGNCgj2tTE2TG6ipV+RcTfKKl/1/4H9Qfmkf+jdIxwAAAABJRU5ErkJggg=="
      />
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
