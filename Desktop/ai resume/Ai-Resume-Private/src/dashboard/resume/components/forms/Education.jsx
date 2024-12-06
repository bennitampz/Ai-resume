import {Textarea} from '@/components/ui/textarea';
import {Input} from '@/components/ui/input';
import React, {useContext, useEffect, useState} from 'react';
import {Button} from '@/components/ui/button';
import {ResumeInfoContext} from '@/context/ResumeInfoContext';
import {useParams} from 'react-router-dom';
import global_api from '/service_api/global_api.js';
import {toast} from 'sonner';
import {LoaderCircle} from 'lucide-react';

function Education() {
    const [loading, setLoading] = useState(false);
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);
    const params = useParams();
    const [educationalList, setEducationalList] = useState([
        {
            universityName: '',
            degree: '',
            major: '',
            startDate: '',
            endDate: '',
            description: ''
        }
    ]);
    const handleChange = (event, index) => {
        const newEntries = [...educationalList];
        const {name, value} = event.target;
        newEntries[index] = {
            ...newEntries[index],
            [name]: value
        };
        setEducationalList(newEntries);
    };
    const AddNewEducation = () => {
        setEducationalList([
            ...educationalList, {
                universityName: '',
                degree: '',
                major: '',
                startDate: '',
                endDate: '',
                description: ''
            }
        ])
    };
    useEffect(() => {
        setResumeInfo(() => ({
            ...resumeInfo,
            education: educationalList
        }));
    }, [educationalList])

    useEffect(() => {
        if (resumeInfo?.education?.length > 0) {
            setEducationalList(resumeInfo.education);
        }
    }, []);

    const RemoveEducation = () => {
        setEducationalList(educationalList => educationalList.slice(0, -1))
    };

    const onSave=()=>{
        setLoading(true)
        const data={
            data:{
                education:educationalList.map(({ id, ...rest }) => rest)
            }
        }
    
         console.log(educationalList)
    
        global_api.UpdateResumeDetail(params?.resumeId,data).then(res=>{
            console.log(res);
            setLoading(false);
            toast('Details updated !')
        },(error)=>{
            setLoading(false);
        })
    
    }
    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
                <h2 className='font-bold text-lg'>Education</h2>
                <p>Add your educational details</p>
                <div className='my-5'>
                    {
                        educationalList.map((item, index) => (
                            <div key={index}>
                                <div>
                                    <div className='grid grid-cols-2 gap-2 border p-3 my-5 rounded-lg text-xs'>
                                        <div className='col-span-2'>
                                            <label>University Name</label>
                                            <Input
                                             placeholder='University Name'
                                                name="universityName"
                                                value={item
                                                    ?.universityName}
                                                onChange={(e) => handleChange(e, index)}/>
                                        </div>
                                        <div>
                                            <label>Degree</label>
                                            <Input
                                            placeholder='Degree'
                                                name="degree"
                                                value={item
                                                    ?.degree}
                                                onChange={(e) => handleChange(e, index)}/>
                                        </div>
                                        <div>
                                            <label>Major</label>
                                            <Input
                                            placeholder='Major'
                                                name="major"
                                                value={item
                                                    ?.major}
                                                onChange={(e) => handleChange(e, index)}/>
                                        </div>
                                        <div>
                                            <label>Start Date</label>
                                            <Input
                                            
                                                type='date'
                                                name="startDate"
                                                value={item.startDate}
                                                onChange={(e) => handleChange(e, index)}/>
                                        </div>
                                        <div>
                                            <label>End Date</label>
                                            <Input
                                                type='date'
                                                name="endDate"
                                                value={item.endDate}
                                                onChange={(e) => handleChange(e, index)}/>
                                        </div>
                                        <div className='col-span-2'>
                                            <label>Description</label>
                                            <Textarea
                                                name="description"
                                                value={item.description}
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
                        <Button variant='outline' onClick={AddNewEducation} className='text-primary'>+ Add More Experience</Button>
                        <Button variant='outline' onClick={RemoveEducation} className='text-primary'>- Remove</Button>
                        <Button
                            type="submit"
                            className='flex gap-2'
                            disabled={loading}
                            onClick={() => onSave()}>
                            {
                                loading
                                    ? <LoaderCircle className='animate-spin'/>
                                    : 'Save'
                            }

                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Education;