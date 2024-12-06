import React, {useContext, useEffect, useState} from 'react'
import '@smastrom/react-rating/style.css'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import {LoaderIcon} from 'lucide-react'
import {ResumeInfoContext} from '@/context/ResumeInfoContext'
import global_api from '/service_api/global_api.js'
import {toast} from 'sonner'
import {useParams} from 'react-router-dom'

function Skills() {
    const [skillsList, setSkillsList] = useState([
        {
            name: '',
        }
    ])
    const handleChange = (index, name, value) => {
        const newEntries = skillsList.slice();
        newEntries[index][name] = value;
        setSkillsList(newEntries);
    }
    const params = useParams();
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext)
    const [loading, setLoading] = useState(false);
    const AddNewSkills = () => {
        setSkillsList([
            ...skillsList, {
                name: '',
            }
        ])
    }
    const RemoveSkills = () => {
        setSkillsList(skillsList => skillsList.slice(0, -1))
    }

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            skills: skillsList
        })
    }, [skillsList])
    useEffect(() => {
        if (resumeInfo?.skills) {
            setSkillsList(resumeInfo.skills)
        } else {
            setSkillsList([{ name: '' }]) // Provide default value
        }
    }, [])
    
    const onSave = () => {

        setLoading(true);
        const data = {
            data: {
                skills: skillsList.map(({
                    id,
                    ...rest
                }) => rest)
            }
        }

        global_api
            .UpdateResumeDetail(
                params
                    ?.resumeId,
                data
            )
            .then(resp => {
                console.log(resp);
                setLoading(false);
                toast('Details updated !')
            }, (error) => {
                setLoading(false);
                toast('Server Error, Try again!')
            })
    }
    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Skills</h2>
            <p>Add your skills</p>
            <div >
                {
                    (skillsList || []).map((item, index) => (
                        <div key={index} className=' text-xs border rounded-lg p-3 py-2 mb-5'>
                            <div className=''>
                                <label className='text-xs'>
                                    Name
                                </label>
                                <Input
                                    className='w-full mt-1'
                                    placeholder='Programming language :   Python, C#, C++... etc'
                                    value={item.name}
                                    onChange={(e) => handleChange(index, 'name', e.target.value)}/>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    <Button variant='outline' onClick={AddNewSkills} className='text-primary'>+ Add More Skills</Button>
                    <Button variant='outline' onClick={RemoveSkills} className='text-primary'>- Remove</Button>
                    <Button
                        type="submit"
                        className='flex gap-2'
                        disabled={loading}
                        onClick={() => onSave()}>

                        {
                            loading
                                ? <LoaderIcon className='animate-spin'/>
                                : 'Save'
                        }

                    </Button>
                </div>
            </div>
        </div>

    )
}

export default Skills
