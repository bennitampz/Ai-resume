import React from 'react';

function CertificatePreview(resumeInfo) {
    return (
        <div className='my-6'>
            <h2
                className='text-center font-bold text-sm mb-2'
                style={{
                    color: resumeInfo
                        ?.themeColor
                }}>Certificate</h2>
            <hr
                style={{
                    borderColor: resumeInfo
                        ?.themeColor
                }}/><div className=' mt-1'>
                    {resumeInfo
                ?.certificate
                ?.map((certificate, index) => (
                    <div key={index} className='flex flex-wrap items-center gap-4 mb-2 justify-between  '> 
                        <div className='font-bold text-xs '>
                        <h2>
                            {certificate?.name}
                        </h2>
                        </div>
                        <div className='text-xs overflow-wrap break-words max-w-[600px]'>
                        <h2>
                            {certificate?.publishingOrganization}
                        </h2>
                        </div>
                        <div className='text-xs'>
                        <h2>
                            {certificate?.issueDate}
                        </h2>
                        </div>
                    </div>
                ))
            }
                </div>
            
        </div>
    );
}
export default CertificatePreview;
