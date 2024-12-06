import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import global_api from '/service_api/global_api.js';
import { LoaderIcon } from 'lucide-react';
import { toast } from 'sonner';

function PersonalDetail() {
  const {resumeInfo, setResumeInfo}=useContext(ResumeInfoContext)
  const params=useParams();
  const [formData,setFormData]=useState();
  const [loading,setLoading]=useState(false)
  useEffect(()=>{
    console.log(params)
  },[])
  const handleInputChange =(e)=>{
    const {name,value}=e.target;

    setFormData({
      ...formData,
      [name]:value
    })

    setResumeInfo({
      ...resumeInfo,
      [name]:value
    })
  }

  
  
  const onSave=(e)=>{
      e.preventDefault()
      setLoading(true)
      const data={
        data:formData
      }
      global_api.UpdateResumeDetail(params?.resumeId,data).then(resp=>{
        
        setLoading(false)
        toast('Personal Detail Updated Successfully')
      },(error)=>{
        setLoading(false)
        toast('Please Change Something')
      })
      
  }
  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
      <h2 className='font-bold text=lg'>Personal Detail</h2>
      <p>Get Started with the basic information</p>
      <form onSubmit={onSave}>
        <div className='grid grid-cols-2 gap-4 text-xs'>
          <div>
            <label className=''>First Name</label>
            <Input placeholder='First Name' name='firstName' defaultValue={resumeInfo?.firstName} required onChange={handleInputChange}/>
          </div>
          <div>
            <label className=''>Last Name</label>
            <Input placeholder='Last Name' name='lastName' defaultValue={resumeInfo?.lastName} required onChange={handleInputChange}/>
          </div>
          <div className='col-span-2'>
            <label className=''>Job Title</label>
            <Input placeholder='Job Title' name='jobTitle' defaultValue={resumeInfo?.jobTitle} required onChange={handleInputChange}/>
          </div>
          <div className=''>
            <label className=' col-span-2'>Address</label>
            <Input placeholder='Address' name='address' defaultValue={resumeInfo?.address} required onChange={handleInputChange}/>
          </div>
          <div className=''>
            <label className='text-xs'>Phone</label>
            <Input placeholder='0872651xxxxx' name='phone' defaultValue={resumeInfo?.phone} required onChange={handleInputChange}/>
          </div>
          <div className='col-span-2'> 
            <label className=''>Email</label>
            <Input placeholder='example@gmail.com' name='email' defaultValue={resumeInfo?.email} required onChange={handleInputChange}/>
          </div>
        </div>
        <div className='mt-3 flex justify-end'>
          <Button type='submit'
          disabled={loading}>{loading?<LoaderIcon className='animate-spin'/>:'Save'}</Button>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetail;
