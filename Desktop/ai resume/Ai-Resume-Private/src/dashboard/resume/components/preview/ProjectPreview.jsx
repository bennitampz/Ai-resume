function ProjectPreview(resumeInfo) {
  console.log('Preview Project Data:', resumeInfo?.project);
  return (
    <div className='my-6'>
      <h2
        className='text-center font-bold text-sm mb-2'
        style={{
          color: resumeInfo?.themeColor
        }}>
        Project Experience
      </h2>
      <hr   style={{
        borderColor: resumeInfo?.themeColor
      }}/>
      {resumeInfo?.project?.map((project,index) => (
        <div key={index} className='my-5'>
          <h2 className='text-sm font-bold' style={{ 
            color:resumeInfo?.themeColor
          }}></h2>
          <div className='text-xs flex justify-between'>
            <h2 style={{ 
            color:resumeInfo?.themeColor
          }}  className='text-center text-sm font-medium'>{project?.projectName}</h2>
            <span>{project?.startDate} - {project?.endDate}</span>
          </div>
          <div className='text-xs my-2'>
            {project?.projectSummery}
            <div className='text-start font-normal text-xs my-1'>
              {project?.Utilizes && (
                <>
                  <strong>Utilizes = </strong>
                  {project?.Utilizes}
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProjectPreview;