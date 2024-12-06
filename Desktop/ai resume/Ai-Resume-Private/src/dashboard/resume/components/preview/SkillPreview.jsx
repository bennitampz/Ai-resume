import React from 'react';

function SkillPreview({ skills, themeColor }) {
    return (
        <div className='my-6'>
            <h2
                className='text-center font-bold text-sm mb-2'
                style={{
                    color: themeColor
                }}>
                Skill
            </h2>
            <hr
                style={{
                    borderColor: themeColor
                }}/>    
                <div className='grid grid-cols-1 gap-2 my-4'>
                    {skills?.map((skill,index)=>(
                           <div key={index} className='flex items-center justify-between'>
                            <h2 className='text-xs'>
                            <span className='mr-2'>•</span>
                                {skill.name}
                            </h2>
                           </div> 
                    ))}
                </div>
        </div>
    );
}
export default SkillPreview;
