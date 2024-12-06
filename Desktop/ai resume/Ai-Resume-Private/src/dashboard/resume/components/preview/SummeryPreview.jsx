import React from 'react';


function SummeryPreview(resumeInfo) {
  return (
    <p className='text-xs overflow-wrap break-words max-w-[675px]'>
      {resumeInfo?.summery}
    </p>
  );
}

export default SummeryPreview;
