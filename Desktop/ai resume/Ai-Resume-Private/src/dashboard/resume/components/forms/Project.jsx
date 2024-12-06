import {Textarea} from '@/components/ui/textarea';
import {Input} from '@/components/ui/input';
import React, {useContext, useEffect, useState} from 'react';
import {ResumeInfoContext} from '@/context/ResumeInfoContext';
import {Button} from '@/components/ui/button';
import {LoaderCircle, LoaderIcon} from 'lucide-react';
import global_api from '/service_api/global_api.js';
import {toast} from 'sonner';
import {useParams} from 'react-router-dom';
import { AIchatSession } from '/service_api/AIModel.js';

const prompt = `"Generate three distinct professional summaries for the project of {projectName} project, using tools {Utilizes} in the formatted in JSON. 
Format the response as:
{
  "summaries": [
    {
      "planning": "Version 1",
      "Summary": "..."
    },
    {
      "planning": "Version 2", 
      "Summary": "..."
    },
    {
      "planning": "Version 3",
      "Summary": "..."
    }
  ]
}`;

function Project() {

    const [loadingAI, setLoadingAI] = useState(false);
    const [loading, setLoading] = useState(false);
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);
    const params = useParams();
    const [summery, setSummery] = useState(resumeInfo?.planning || '');
    const [selectedSummary, setSelectedSummary] = useState(null);
    const [aiGeneratedProjectList, setaiGeneratedProjectList] = useState([]);
    const [projectList, setProjectList] = useState([
        {
            projectName: '',
            Utilizes: '',
            startDate: '',
            endDate: '',
            projectSummery: ''
        }
    ]);
    const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
    
    const generateSummeryFromAI = async () => {
        // Get the current project based on index
        const currentProject = projectList[currentProjectIndex];
        
        if (!currentProject?.projectName) {
            toast.error('Please set a project name first');
            return;
        }

        setLoadingAI(true);
        try {
            const PROMPT = prompt
                .replace('{projectName}', currentProject.projectName)
                .replace('{Utilizes}', currentProject.Utilizes || '');
                
            const result = await AIchatSession.sendMessage(PROMPT);
            const responseText = await result.response.text();
            console.log('AI Response:', responseText);
            
            try {
                const parsedResult = JSON.parse(responseText);
                console.log('Parsed Result:', parsedResult);
                
                if (Array.isArray(parsedResult.summaries)) {
                    setaiGeneratedProjectList(parsedResult.summaries);
                } else {
                    throw new Error('Invalid response format');
                }
            } catch (parseError) {
                console.error('Parsing Error:', parseError);
                toast.error('Failed to parse AI response');
            }
        } catch (error) {
            console.error('AI Error:', error);
            toast.error('Failed to generate summaries');
        } finally {
            setLoadingAI(false);
        }
    };

    const handleSummarySelection = (summary, index) => {
        setSelectedSummary(index);
        
        const updatedProjects = [...projectList];
        updatedProjects[currentProjectIndex] = {
            ...updatedProjects[currentProjectIndex],
            projectSummery: summary.Summary
        };
        
        setProjectList(updatedProjects);
        console.log('Updated Project:', updatedProjects[currentProjectIndex]);
    };
    const handleChange = (event, index) => {
        const newEntries = [...projectList];
        const {name, value} = event.target;
        newEntries[index] = {
            ...newEntries[index],
            [name]: value
        };
        setProjectList(newEntries);

        
    };
    useEffect(() => {
        if(resumeInfo?.project?.length > 0) {
            setProjectList(resumeInfo.project);
        }
    }, []);
    
    useEffect(()=>{
        setResumeInfo({
            ...resumeInfo,
            project:projectList
        });
     
    },[projectList]);

    const AddNewProject = () => {
        setProjectList([
            ...projectList, {
                projectName: '',
                Utilizes: '',
                startDate: '',
                endDate: '',
                projectSummery: ''
            }
        ])
    };
    const onSave=()=>{
        setLoading(true)
        const data={
            data:{
                project:projectList.map(({ id, ...rest }) => rest)
            }
        }

         console.log(projectList)

        global_api.UpdateResumeDetail(params?.resumeId,data).then(res=>{
            console.log(res);
            setLoading(false);
            toast('Details updated !')
        },(error)=>{
            setLoading(false);
        })

    }


    const RemoveProject = () => {
        setProjectList(projectList => projectList.slice(0, -1))
    };
   
    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Project Experience</h2>
            <p>Add your project details</p>
            <div className='flex justify-end items-center'>
            <Button
                        onClick={generateSummeryFromAI}
                        variant='outline'
                        size='sm'
                        className='border-primary text-primary hover:bg-primary/10'
                        disabled={loadingAI}>
                        {loadingAI ? <LoaderIcon className='animate-spin' /> : 'Generate From AI'}
                    </Button>
            </div>
            
            <div className='my-5'>
                {
                    projectList.map((project, index) => (
                        <div key={index}>
                            <div>
                                <div className='grid grid-cols-2 gap-2 border p-3 my-5 rounded-lg text-xs'>
                                    <div className='col-span-2'>
                                        <label>Project Name</label>
                                        <Input
                                        placeholder='Project Name'
                                            name="projectName"
                                            value={project
                                                ?.projectName}
                                            onChange={(e) => handleChange(e, index)}/>
                                    </div>
                                    <div>
                                        <label>Utilizes</label>
                                        <Input
                                        placeholder='Utilizes'
                                            name="Utilizes"
                                            value={project
                                                ?.Utilizes}
                                            onChange={(e) => handleChange(e, index)}/>
                                    </div>
                                    <div>
                                        <label>Start Date</label>
                                        <Input
                                            type="date"
                                            name="startDate"
                                            value={project
                                                ?.startDate}
                                            onChange={(e) => handleChange(e, index)}/>
                                    </div>
                                    <div>
                                        <label>End Date</label>
                                        <Input
                                            type='date'
                                            name="endDate"
                                            value={project.endDate}
                                            onChange={(e) => handleChange(e, index)}/>
                                    </div>
                                    <div className='col-span-2'>
                                        <label>Description</label>
                                        <Textarea
                                            name="projectSummery"
                                            value={project.projectSummery}
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
                    <Button variant='outline' onClick={AddNewProject} className='text-primary'>+ Add More Project</Button>
                    <Button variant='outline' onClick={RemoveProject} className='text-primary'>- Remove</Button>
                    
                    
                </div>
                <div className=''>
                    <Button
                        type="submit"
                        className='flex gap-2 '
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
            {aiGeneratedProjectList.length > 0 && (
                    <div className="mt-4 mb-4">
                        <h3 className="font-bold mb-2">Select a Summary:</h3>
                        <div className="space-y-3">
                            {aiGeneratedProjectList.map((summary, index) => (
                                <div
                                    key={index}
                                    className={`p-3 border rounded-lg transition-all cursor-pointer hover:border-primary/50 ${
                                        selectedSummary === index ? 'border-primary bg-primary/5' : 'border-gray-200'
                                    }`}
                                    onClick={() => handleSummarySelection(summary, index)}
                                >
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm font-medium">
                                            {summary.planning}
                                        </span>
                                    </div>
                                    <p className="text-gray-700">{summary.Summary}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
        </div>
    );
}

export default Project;
