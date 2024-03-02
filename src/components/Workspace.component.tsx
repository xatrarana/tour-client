import React from 'react'

type TWorkSpaceProps = {
    children: React.ReactNode
}
const WorkSpace = ({children}:TWorkSpaceProps) => {
  return (
      <div className='  flex flex-col gap-y-7 mb-3 p-2 md:p-5 lg:p-2'>
            {children}
    </div>
  )
}

export default WorkSpace