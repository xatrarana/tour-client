import React from 'react'

type TWorkSpaceProps = {
    children: React.ReactNode
}
const WorkSpace = ({children}:TWorkSpaceProps) => {
  return (
      <div className='  flex flex-col gap-y-7 p-2 md:p-5 lg:p-5'>
            {children}
    </div>
  )
}

export default WorkSpace