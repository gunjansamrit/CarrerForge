// import React, { useState } from "react";
// import "./App.css";

// const ProfileCard = ({ name, email, degree, skills }) => (
//   <div className="profile-card">
//     <h3>{name}</h3>
//     <p>Email: {email}</p>
//     <p>Degree: {degree}</p>
//     <p>Skills: {skills.join(", ")}</p>
//   </div>
// );

// const JobListing = ({ title, company, location, applyHandler }) => (
//   <div className="job-listing">
//     <h4>{title}</h4>
//     <p>Company: {company}</p>
//     <p>Location: {location}</p>
//     <button onClick={applyHandler}>Apply</button>
//   </div>
// );

// const App = () => {
//   const [student, setStudent] = useState({
//     name: "John Doe",
//     email: "john.doe@example.com",
//     degree: "Bachelor of Science in Computer Science",
//     skills: ["React", "JavaScript", "Node.js", "Python"],
//   });

//   const [jobListings, setJobListings] = useState([
//     {
//       id: 1,
//       title: "Software Engineer",
//       company: "ABC Tech",
//       location: "San Francisco, CA",
//     },
//     {
//       id: 2,
//       title: "Front-End Developer",
//       company: "XYZ Corp",
//       location: "New York, NY",
//     },
//     {
//       id: 3,
//       title: "Full-Stack Developer",
//       company: "Acme Inc.",
//       location: "Seattle, WA",
//     },
//   ]);

//   const handleApply = (jobId) => {
//     console.log(`Applying for job ${jobId}`);
//     // Add logic to apply for the job
//   };

//   return (
//     <div className="app">
//       <header className="header">
//         <h1>Student Dashboard</h1>
//       </header>
//       <div className="container">
//         <div className="profile">
//           <ProfileCard
//             name={student.name}
//             email={student.email}
//             degree={student.degree}
//             skills={student.skills}
//           />
//         </div>
//         <div className="job-listings">
//           <h2>Job Listings</h2>
//           {jobListings.map((job) => (
//             <JobListing
//               key={job.id}
//               title={job.title}
//               company={job.company}
//               location={job.location}
//               applyHandler={() => handleApply(job.id)}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;

// import React, { useState } from "react";
// import "./App.css";

// // Reusable components
// const ProfileCard = ({
//   name,
//   email,
//   degree,
//   skills,
//   profileImage,
//   handleEditProfile,
// }) => (
//   <div className="profile-card">
//     <img src={profileImage} alt="Profile" className="profile-image" />
//     <h3>{name}</h3>
//     <p>Email: {email}</p>
//     <p>Degree: {degree}</p>
//     <p>Skills: {skills.join(", ")}</p>
//     <button onClick={handleEditProfile}>Edit Profile</button>
//   </div>
// );

// const JobListing = ({ title, company, location, applyHandler }) => (
//   <div className="job-listing">
//     <h4>{title}</h4>
//     <p>Company: {company}</p>
//     <p>Location: {location}</p>
//     <button onClick={applyHandler}>Apply</button>
//   </div>
// );

// const App = () => {
//   const [student, setStudent] = useState({
//     name: "John Doe",
//     email: "john.doe@example.com",
//     degree: "Bachelor of Science in Computer Science",
//     skills: ["React", "JavaScript", "Node.js", "Python"],
//     profileImage: "https://via.placeholder.com/150", // Replace with your profile image URL
//   });

//   const [jobListings, setJobListings] = useState([
//     {
//       id: 1,
//       title: "Software Engineer",
//       company: "ABC Tech",
//       location: "San Francisco, CA",
//     },
//     {
//       id: 2,
//       title: "Front-End Developer",
//       company: "XYZ Corp",
//       location: "New York, NY",
//     },
//     {
//       id: 3,
//       title: "Full-Stack Developer",
//       company: "Acme Inc.",
//       location: "Seattle, WA",
//     },
//   ]);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [newSkill, setNewSkill] = useState("");

//   const handleApply = (jobId) => {
//     console.log(`Applying for job ${jobId}`);
//     // Add logic to apply for the job
//   };

//   const handleEditProfile = () => {
//     setIsEditMode(true);
//   };

//   const handleAddSkill = () => {
//     if (newSkill.trim()) {
//       setStudent((prevStudent) => ({
//         ...prevStudent,
//         skills: [...prevStudent.skills, newSkill.trim()],
//       }));
//       setNewSkill("");
//     }
//   };

//   const filteredJobListings = jobListings.filter(
//     (job) =>
//       job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       job.company.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="app">
//       <header className="header">
//         <h1>Student Dashboard</h1>
//         <div className="search-bar">
//           <input
//             type="text"
//             placeholder="Search job listings..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//       </header>
//       <div className="container">
//         <div className="profile">
//           <ProfileCard
//             name={student.name}
//             email={student.email}
//             degree={student.degree}
//             skills={student.skills}
//             profileImage={student.profileImage}
//             handleEditProfile={handleEditProfile}
//           />
//           {isEditMode && (
//             <div className="add-skill">
//               <input
//                 type="text"
//                 placeholder="Add a new skill"
//                 value={newSkill}
//                 onChange={(e) => setNewSkill(e.target.value)}
//               />
//               <button onClick={handleAddSkill}>Add Skill</button>
//             </div>
//           )}
//         </div>
//         <div className="job-listings">
//           <h2>Job Listings</h2>
//           {filteredJobListings.map((job) => (
//             <JobListing
//               key={job.id}
//               title={job.title}
//               company={job.company}
//               location={job.location}
//               applyHandler={() => handleApply(job.id)}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;

import React, { useState } from "react";
import "./App.css";
import editIcon from "./edit-icon.svg"; // Import the edit icon
import searchIcon from "./search-icon.svg"; // Import the search icon
import Company from "./components/CompanyDashboard/CompanyDashboard";
import Login from "./components/LoginAndSignUp/Login";

// Reusable components
const ProfileCard = ({ student, handleEditProfile, handleProfileChange }) => (
  <div className="profile-card">
    <div className="profile-header">
      <img src={student.profileImage} alt="Profile" className="profile-image" />
      <div>
        <h3>{student.name}</h3>
        <p>{student.degree}</p>
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
        <p>
          <strong>Skills:</strong> {student.skills.join(", ")}
        </p>
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

const JobListing = ({ title, company, location, applyHandler }) => (
  <div className="job-listing">
    <h4>{title}</h4>
    <p>Company: {company}</p>
    <p>Location: {location}</p>
    <button onClick={applyHandler}>Apply</button>
  </div>
);

const App = () => {
  const [student, setStudent] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    degree: "Bachelor of Science in Computer Science",
    skills: ["React", "JavaScript", "Node.js", "Python"],
    profileImage: "https://via.placeholder.com/150",
    isEditMode: false,
  });

  const [jobListings, setJobListings] = useState([
    {
      id: 1,
      title: "Software Engineer",
      company: "ABC Tech",
      location: "San Francisco, CA",
    },
    {
      id: 2,
      title: "Front-End Developer",
      company: "XYZ Corp",
      location: "New York, NY",
    },
    {
      id: 3,
      title: "Full-Stack Developer",
      company: "Acme Inc.",
      location: "Seattle, WA",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [newSkill, setNewSkill] = useState("");

  const handleApply = (jobId) => {
    console.log(`Applying for job ${jobId}`);
    // Add logic to apply for the job
  };

  const handleEditProfile = () => {
    setStudent((prevStudent) => ({
      ...prevStudent,
      isEditMode: !prevStudent.isEditMode,
    }));
  };

  const handleProfileChange = (field, value) => {
    setStudent((prevStudent) => ({
      ...prevStudent,
      [field]: value,
    }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setStudent((prevStudent) => ({
        ...prevStudent,
        skills: [...prevStudent.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const filteredJobListings = jobListings.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    // <div className="app">
    //   <header className="header">
    //     <h1>Student Dashboard</h1>
    //   </header>
    //   <div className="container">
    //     <div className="profile">
    //       <ProfileCard
    //         student={student}
    //         handleEditProfile={handleEditProfile}
    //         handleProfileChange={handleProfileChange}
    //       />
    //       {student.isEditMode && (
    //         <div className="add-skill">
    //           <input
    //             type="text"
    //             placeholder="Add a new skill"
    //             value={newSkill}
    //             onChange={(e) => setNewSkill(e.target.value)}
    //           />
    //           <button onClick={handleAddSkill}>Add Skill</button>
    //         </div>
    //       )}
    //     </div>
    //     <div className="job-listings">
    //       <div className="search-bar">
    //         <img src={searchIcon} alt="Search" className="search-icon" />
    //         <input
    //           type="text"
    //           placeholder="Search job listings..."
    //           value={searchTerm}
    //           onChange={(e) => setSearchTerm(e.target.value)}
    //         />
    //       </div>
    //       <h2>Job Listings</h2>
    //       {filteredJobListings.map((job) => (
    //         <JobListing
    //           key={job.id}
    //           title={job.title}
    //           company={job.company}
    //           location={job.location}
    //           applyHandler={() => handleApply(job.id)}
    //         />
    //       ))}
    //     </div>
    //   </div>
    // </div>
    //change view appllicants to mumber eligible,number applied,change cgpa
    <Company></Company>
    // <Login></Login>
  );
};

export default App;
