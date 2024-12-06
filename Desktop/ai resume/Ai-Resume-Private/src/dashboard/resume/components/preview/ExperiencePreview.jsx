import React from 'react';

function ExperiencePreview({experience, themeColor}) {
    return (
        <div className='my-6'>
            <h2
                className='text-center font-bold text-sm mb-2'
                style={{
                    color: themeColor
                }}>
                Professional Experience
            </h2>
            <hr style={{
                    borderColor: themeColor
                }}/> 
            {experience?.map((exp, index) => (
                <div key={index} className='my-5'>
                    <h2
                        className='text-sm font-bold'
                        style={{
                            color: themeColor
                        }}>
                        {exp?.title}
                    </h2>
                    <h2 className='text-xs flex justify-between'>
                        <span>
                            {exp?.companyName}
                            {exp?.city && exp?.companyName && ', '}
                            {exp?.city}
                            {exp?.state && exp?.city && ', '}
                            {exp?.state}
                        </span>
                        <span>
                            {exp?.startDate}
                            {exp?.startDate && (exp?.currentlyWorking || exp?.endDate) && ' to '}
                            {exp?.currentlyWorking ? 'Present' : exp?.endDate}
                        </span>
                    </h2>
                    <div 
                        className='text-xs my-2 [&>ul]:list-disc [&>ul]:ml-4 [&>ul>li]:my-1'
                        dangerouslySetInnerHTML={{
                            __html: exp?.workSummery
                        }}
                    />
                </div>
            ))}
        </div>
    );
}

export default ExperiencePreview;
