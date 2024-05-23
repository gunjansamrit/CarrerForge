import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import "./Login.css";
import { QuestionContext } from './QuestionContext';

const Login = ({setIsAuthenticated}) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        job: '',
        company: '',
        role:'Student'
    });
    const [companyOptions, setCompanyOptions] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [selectedCompanyId, setSelectedCompanyId] = useState(null);
    const [jobOptions, setJobOptions] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

   



    useEffect(() => {
        const fetchCompanyOptions = async () => {
            try {
                const response = await axios.get('http://localhost:3003/student/getCompanyIdsAndNames');
                const options = response.data.map(company => ({ value: company._id, label: company.companyName }));
                setCompanyOptions(options);
            } catch (error) {
                console.error('Error fetching companies:', error);
            }
        };

        fetchCompanyOptions();
    }, []);

    useEffect(() => {
        const fetchJobOptions = async () => {
            if (selectedCompany) {
                try {
                    const response = await axios.post(`http://localhost:3003/student/getJobProfilesByCompanyId` ,
                     {selectedCompanyId:selectedCompanyId,
                     });
                    const options = response.data.map(job => ({ value: job._id, label: job.jobTitle }));
                    setJobOptions(options);
                } catch (error) {
                    console.error('Error fetching job profiles:', error);
                }
            } else {
                setJobOptions([]);
            }
        };

        fetchJobOptions();
    }, [selectedCompany]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleCompanyChange = (selectedOption) => {
        setSelectedCompany(selectedOption);
        setSelectedCompanyId(selectedOption.value);
        console.log(selectedCompanyId)
        setFormData(prevFormData => ({
            ...prevFormData,
            company: selectedOption ? selectedOption.label : ''
        }));
        setSelectedJob(null);  // Reset job selection when company changes
    };

    const handleJobChange = (selectedOption) => {
        setSelectedJob(selectedOption);
        
        localStorage.setItem("jobId",selectedJob.value );

        
        setFormData(prevFormData => ({
            ...prevFormData,
            job: selectedOption ? selectedOption.label : ''
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Clear any previous error message
    
        try {
            const response = await axios.post('http://localhost:3003/student/checkEligibility', {
                ...formData,
                company: selectedCompany ? selectedCompany.value : '',
                job: selectedJob ? selectedJob.value : ''
            });
    
           
    
   
            if (response && response.data) {
                console.log('Student ID:', response.data.studentId);
                localStorage.setItem("studentId",response.data.studentId);
                setIsAuthenticated(true);
                
              
                
            } else {
                throw new Error('Response data is undefined');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setErrorMessage(error.response.data.message || 'An error occurred during login');
        }
    };

    return (
        <div className="login-container">
            <h2><b> CareerForge Login</b></h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                < input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />

                <label htmlFor="company">Company Name:</label>
                <Select
                    id="company"
                    name="company"
                    options={companyOptions}
                    value={selectedCompany}
                    onChange={handleCompanyChange}
                    placeholder="Select Company"
                    isClearable
                    required
                    styles={{  // Custom styles for Select component
                        option: (provided, state) => ({
                            ...provided,
                            color: 'black',  // Set text color to black for options
                        }),
                        singleValue: (provided, state) => ({
                            ...provided,
                            color: 'black',  // Set text color to black for single selected value
                        }),
                    }}
                />

                <label htmlFor="job">Job Profile:</label>
                <Select
                    id="job"
                    name="job"
                    options={jobOptions}
                    value={selectedJob}
                    onChange={handleJobChange}
                    placeholder="Select Job Profile"
                    isClearable
                    required
                    styles={{  // Custom styles for Select component
                        option: (provided, state) => ({
                            ...provided,
                            color: 'black',  // Set text color to black for options
                        }),
                        singleValue: (provided, state) => ({
                            ...provided,
                            color: 'black',  // Set text color to black for single selected value
                        }),
                    }}
                />

                <button type="submit">Login</button>
            </form>
            {errorMessage && (
  <div style={{ color: 'red', fontWeight: 'bold' }} className="error-message">
    {errorMessage}
  </div>
)}
        </div>
    );
};

export default Login;
