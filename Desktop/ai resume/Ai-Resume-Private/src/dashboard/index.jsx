import React, { useEffect } from 'react'
import AddResume from './components/AddResume'
import global_api from '/service_api/global_api.js';
import { useUser } from '@clerk/clerk-react';
import { useState } from 'react';
import ResumeCardItems from './components/resumeCardItems';

function Dashboard() {
  const { user } = useUser();

  const [resumeList, setResumeList] = useState([]);

  useEffect(() => {
    user && GetResumesList();
  }, [user]);


  /**Use For Get Resume List */
  const GetResumesList = () => {
    global_api.GetUserResumes(user?.primaryEmailAddress?.emailAddress)
      .then(resp => {
        setResumeList(resp.data.data);
      });
  };
  return (
    <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='text-center font-bold text-3xl'>Welcome to your private Ai Resume</h2>
      <h2 className="font-bold text-2xl mt-10 mb-4">My Resume List</h2>
      <p>Start Creating AI resume for your Job &#10024;</p>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5'>
        <AddResume />
        {resumeList.length > 0 && resumeList.map((resume, index) => (
          <ResumeCardItems resume={resume} key={index} refreshData={GetResumesList} />
        ))}


      </div>
    </div>

  );
}

export default Dashboard
