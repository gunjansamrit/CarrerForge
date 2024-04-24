import React, { useState } from "react";
import "./StudentDashboard.css";
import StudentDetails from "./StudentDetails";
import JobListing from "./JobListings";
import searchIcon from "../../resources/icons/search-icon.svg";
const Student = () => {
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
    <div className="app">
      <header className="header">
        <h1>Student Dashboard</h1>
      </header>
      <div className="container">
        <div className="profile">
          <StudentDetails
            student={student}
            handleEditProfile={handleEditProfile}
            handleProfileChange={handleProfileChange}
          />
          {student.isEditMode && (
            <div className="add-skill">
              <input
                type="text"
                placeholder="Add a new skill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
              />
              <button onClick={handleAddSkill}>Add Skill</button>
            </div>
          )}
        </div>
        <div className="job-listings">
          <div className="search-bar">
            <img src={searchIcon} alt="Search" className="search-icon" />
            <input
              type="text"
              placeholder="Search job listings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <h2>Job Listings</h2>
          {filteredJobListings.map((job) => (
            <JobListing
              key={job.id}
              title={job.title}
              company={job.company}
              location={job.location}
              applyHandler={() => handleApply(job.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Student;
