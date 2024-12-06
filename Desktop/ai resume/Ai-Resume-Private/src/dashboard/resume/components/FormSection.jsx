import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from 'lucide-react';
import Summery from './forms/Summery';
import Experience from './forms/Experience';
import Education from './forms/Education';
import Skills from './forms/Skills';
import Project from './forms/Project';
import PersonalDetail from './forms/PersonalDetail';
import Certificate from './forms/Certificate';
import { Link, Navigate, useParams } from 'react-router-dom';
import ThemeColor from './themeColor';

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const {resumeId}=useParams();
  return (
    <div>
  
    <div className='flex justify-between items-center'>
    
    <ThemeColor/>
      
      <div className='flex justify-between items-center'>
      <div className='flex gap-2'>
      <Link to={'/dashboard'}>
      <Button><Home/></Button>
      </Link>
      </div>
      
      </div>
      <div className='flex gap-2'>
      
      {activeFormIndex>1&&<Button size="sm"
      onClick={() => setActiveFormIndex(activeFormIndex - 1)} className=""><ArrowLeft/></Button>
      }
        <Button 
        
        className="flex gap-2"  size="sm" 
        onClick={() => setActiveFormIndex(activeFormIndex + 1)}
        >Next 
        <ArrowRight/></Button>
      </div>
    </div>
      {/* Personal Detail */}
      {activeFormIndex==1?  <PersonalDetail/>
      :activeFormIndex==2? 
      <Summery />
      :activeFormIndex==3?
      <Experience />
      :activeFormIndex==4?
      <Project/>
      :activeFormIndex==5?
      <Education />
      :activeFormIndex==6?
      <Skills/>
      :activeFormIndex==7?
      <Certificate/>
      :activeFormIndex==8?
      <Navigate to={'/my-resume/'+resumeId+"/view"}/>
      :null
      }

      {/* Educational Detail */}
      {/* Skill */}
    </div>
  );
}

export default FormSection;
