import React, { useContext, useEffect } from 'react';
import PersonalDetailPreview from './preview/PersonalDetailPreview';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import SummeryPreview from './preview/SummeryPreview';
import ExperiencePreview from './preview/ExperiencePreview';
import EducationPreview from './preview/EducationPreview';
import SkillPreview from './preview/SkillPreview';
import ProjectPreview from './preview/ProjectPreview';
import CertificatePreview from './preview/CertificatePreview';

function ResumePreview() {
  const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);
  
  // Initialize with dummy data if resumeInfo is empty
  useEffect(() => {
    if (!resumeInfo) {
      setResumeInfo();
    }
  }, []);

  return (
    <div className=' h-full p-14 border-t-[20px]'
    style={{borderColor: resumeInfo?.themeColor }}>
      <PersonalDetailPreview {...resumeInfo} />
      {/* Summary */}
      <SummeryPreview {...resumeInfo} />
      {/* Professional Experience */}
      <ExperiencePreview {...resumeInfo} />
      {/* Project */}
      <ProjectPreview {...resumeInfo} />
      {/* Educational Detail */}
      <EducationPreview {...resumeInfo} />
      {/* Skill */}
      <SkillPreview {...resumeInfo} />
      {/* Certification */}
      <CertificatePreview {...resumeInfo} />
    </div>
  );
}

export default ResumePreview;