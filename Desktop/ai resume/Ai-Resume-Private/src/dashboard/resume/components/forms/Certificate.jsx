import { Button } from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {ResumeInfoContext} from '@/context/ResumeInfoContext';
import { LoaderCircle } from 'lucide-react';
import React, {useContext, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import global_api from '/service_api/global_api.js';
import { toast } from 'sonner';

function Certificate() {
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const [certificateList, setCertificateList] = useState([
        {
            name: '',
            publishingOrganization: '',
            issueDate: ''
        }
    ]);
  const RemoveCertificate = () => {
      setCertificateList(certificateList => certificateList.slice(0, -1))
  };
  const AddNewCertificate = () => {
    setCertificateList([
        ...certificateList, {
            name: '',
            publishingOrganization: '',
            issueDate: '',
        }
    ])
};
const onSave=()=>{
  
  setLoading(true)
  const data={
      data:{
          certificate:certificateList.map(({ id, ...rest }) => rest)
      }
  }

   console.log(certificateList)

  global_api.UpdateResumeDetail(params?.resumeId,data).then(res=>{
      console.log(res);
      setLoading(false);
      toast('Details updated !')
  },(error)=>{
      setLoading(false);
  })

}
useEffect(() => {
  setResumeInfo(() => ({
      ...resumeInfo,
      certificate: certificateList
  }));
}, [certificateList])


useEffect(() => {
  if (resumeInfo?.certificate?.length > 0) {
      setCertificateList(resumeInfo.certificate);
  }
}, []);

const handleChange = (event, index) => {
  const newEntries = [...certificateList];
  const {name, value} = event.target;
  newEntries[index] = {
      ...newEntries[index],
      [name]: value
  };
  setCertificateList(newEntries);
};
    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Certificate</h2>
            <p>Add your certificate details</p>
            <div className='my-5'>
                {
                    certificateList.map((certificate, index) => (
                        <div key={index}>
                            <div>
                                <div className='grid grid-cols-2 gap-2 border p-3 my-5 rounded-lg text-sm'>
                                    <div className='col-span-2 text-xs'>
                                        <label>Nama</label>
                                        <Input
                                            name="name"
                                            value={certificate
                                                ?.name}
                                            onChange={(e) => handleChange(e, index)}/>
                                    </div>
                                    <div>
                                        <label>Organization Publishing</label>
                                        <Input
                                            name="publishingOrganization"
                                            value={certificate
                                                ?.publishingOrganization}
                                            onChange={(e) => handleChange(e, index)}/>
                                    </div>
                                    <div>
                                        <label>Issue Date</label>
                                        <Input
                                            type='date'
                                            name="issueDate"
                                            value={certificate
                                                ?.issueDate}
                                            onChange={(e) => handleChange(e, index)}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className='flex justify-between'>
                <div className='flex gap-2'>
                <Button variant='outline' onClick={AddNewCertificate} className='text-primary' >+ Add More Certificate</Button>
                <Button variant='outline' onClick={RemoveCertificate} className='text-primary' >- Remove</Button>
                <Button type='submit' className='flex gap-2' disabled={loading} onClick={() => onSave()}>
                {
                  loading ? <LoaderCircle className='animate-spin' /> : 'Save'
                }

                </Button>
                </div>
            </div>
        </div>
    );
}

export default Certificate;
