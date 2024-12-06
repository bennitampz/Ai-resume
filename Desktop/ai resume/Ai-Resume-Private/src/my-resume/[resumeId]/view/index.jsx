import {Button} from '@/components/ui/button'
import Header from '@/components/ui/custom/Header'
import {ResumeInfoContext} from '@/context/ResumeInfoContext'
import ResumePreview from '@/dashboard/resume/components/ResumePreview'
import React, {useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import global_api from '/service_api/global_api.js'
import {RWebShare} from 'react-web-share'

function ViewResume() {
    const [resumeInfo, setResumeInfo] = useState();
    const {resumeId} = useParams();

    useEffect(() => {
        GetResumeInfo();
    }, [])
    const GetResumeInfo = () => {
        global_api
            .GetResumeById(resumeId)
            .then(resp => {
                setResumeInfo(resp.data.data)
                console.log(resp.data.data)
            })
    }
    const HandleDownload = () => {
        window.print();
    }

    return (
        <div>
            <ResumeInfoContext.Provider
                value={{
                    resumeInfo,
                    setResumeInfo
                }}>
                <div id='no-print'>
                    <Header/>

                    <div className='my-10'>

                        <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
                            <h2 className='text-center text-2xl font-medium'>Congrats! Your Ultimate AI generates Resume is ready !</h2>
                            <p className='text-center text-gray-400'>Now you are ready to download your
                                resume and you can share resume url with your friends and family</p>
                        </div>
                        <div className='flex justify-center gap-20 my-10'>
                            <Button onClick={HandleDownload}>
                                Download
                            </Button>
                            <RWebShare
                                data={{
                                    text: "Hello Everyone! This is my resume please open url to see it",
                                    url: import.meta.env.VITE_APP_URL ,
                                    title: resumeInfo?.firstName+""+resumeInfo?.lastName+" resume"
                                }}
                                onClick={() => console.log("shared successfully!")}>
                               <Button>
                                Share
                            </Button>
                            </RWebShare>
                            
                        </div>
                    </div>

                </div>
                <div className='mx-auto max-w-[21cm] my-2'>
                    <div id='print-area' className='p-8 bg-white'>
                        <ResumePreview/>
                    </div>
                </div>
            </ResumeInfoContext.Provider>
        </div>
    )
}

export default ViewResume
