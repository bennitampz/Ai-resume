import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {useContext, useEffect, useState} from 'react';
import RichTextEditor from './RichTextEditor';
import {ResumeInfoContext} from '@/context/ResumeInfoContext';
import { LoaderIcon } from 'lucide-react';
import global_api from '/service_api/global_api.js';
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';

const formField = {
    title: '',
    companyName: '',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
    workSummery: ''
}

function Experience() {
    const [experienceList, setExperienceList] = useState([formField]);
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);
    const [loading, setLoading] = useState(false);
    const params = useParams();

    const handleChange=(index,event)=>{
        const newEntries=experienceList.slice();
        const {name,value}=event.target;
        newEntries[index][name]=value;
        setExperienceList(newEntries);
    }
    useEffect(()=>{
        setResumeInfo({
            ...resumeInfo,
            experience:experienceList
        });
    },[experienceList]);
    const AddNewExperience = () => {
        setExperienceList([
            ...experienceList, {
                ...formField
            }
        ])
    }
    const RemoveExperience = () => {
        setExperienceList(experienceList => experienceList.slice(0, -1))
    }

    const handleRichTextEditor = (e, name, index) => {
        const newEntries = [...experienceList];
        newEntries[index] = {
            ...newEntries[index],
            [name]: e.target.value.replace(/\n/g, '<br>') // Ensure line breaks are preserved
        };
        setExperienceList(newEntries);
    }
    const onSave=()=>{
        setLoading(true)
        const data={
            data:{
                experience:experienceList.map(({ id, ...rest }) => rest)
            }
        }

         console.log(experienceList)

        global_api.UpdateResumeDetail(params?.resumeId,data).then(res=>{
            console.log(res);
            setLoading(false);
            toast('Details updated !')
        },(error)=>{
            setLoading(false);
        })

    }
    useEffect(() => {
        if(resumeInfo?.experience?.length > 0) {
            setExperienceList(resumeInfo.experience);
        }
    }, []);
    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
                <h2 className='font-bold text-lg'>Professional Experience</h2>
                <p>Add Your previous Job experience</p>
                <div>
                    {
                        experienceList.map((experience, index) => (
                            <div key={index}>
                                <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                                    <div>
                                        <label className='text-xs'>Position Title</label>
                                        <Input
                                            placeholder='Position Title'
                                            name="title"
                                            onChange={(event) => handleChange(index, event)}
                                            value={experience.title}/>
                                    </div>
                                    <div>
                                        <label className='text-xs'>Company Name</label>
                                        <Input
                                            placeholder='Company Name'
                                            name="companyName"
                                            onChange={(event) => handleChange(index, event)}
                                            value={experience.companyName}/>
                                    </div>
                                    <div>
                                        <label className='text-xs'>City</label>
                                        <Input
                                            placeholder='City'
                                            name="city"
                                            onChange={(event) => handleChange(index, event)}
                                            value={experience.city}/>
                                    </div>
                                    <div>
                                        <label className='text-xs'>State</label>
                                        <Input
                                            placeholder='State'
                                            name="state"
                                            onChange={(event) => handleChange(index, event)}
                                            value={experience.state}/>
                                    </div>
                                    <div>
                                        <label className='text-xs'>Start Date</label>
                                        <Input
                                            type='date'
                                            name="startDate"
                                            onChange={(event) => handleChange(index, event)}
                                            value={experience.startDate}/>
                                    </div>
                                    <div>
                                        <label className='text-xs'>End Date</label>
                                        <Input
                                            type='date'
                                            name="endDate"
                                            onChange={(event) => handleChange(index, event)}
                                            value={experience.endDate}/>
                                    </div>
                                    <div className='col-span-2'>
                                        {/* Work Experience */}
                                        <RichTextEditor
                                            index={index}
                                            onRichTextEditorChange={(event) => handleRichTextEditor(event, 'workSummery', index)}/>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className='flex justify-between'>
                    <div className='flex gap-2'>
                        <Button variant='outline' onClick={AddNewExperience} className='text-primary'>+ Add More Experience</Button>
                        <Button variant='outline' onClick={RemoveExperience} className='text-primary'>- Remove</Button>
                        <Button type="submit" className='flex gap-2' disabled={loading} onClick={() => onSave()}>
                        
                            {
                                loading
                                    ? <LoaderIcon className='animate-spin'/>
                                    : 'Save'
                            }

                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Experience;

const updateExperienceFromAI = (aiResponse) => {
    const newExperience = {
        title: aiResponse.title || '',
        companyName: aiResponse.companyName || '',
        city: aiResponse.city || '',
        state: aiResponse.state || '',
        startDate: aiResponse.startDate || '',
        endDate: aiResponse.endDate || '',
        workSummery: aiResponse.workSummery || ''
    };

    setExperience([newExperience]);
    setResumeInfo((prevResumeInfo) => ({
        ...prevResumeInfo,
        experience: [newExperience]
    }));

};

const handleAIGenerate = async () => {
    try {
        const response = await fetch('/api/generate-experience', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({prompt: "Generate professional experience"})
        });

        const aiResponse = await response.json();
        updateExperienceFromAI(aiResponse);
    } catch (error) {
        console.error('Error generating experience:', error);
    }
}
