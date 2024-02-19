import React from 'react'
type TProfileProps = {
    children: React.ReactNode
}
const ProfileComponent = ({children}: TProfileProps) => {
  return (
    <>
    {children}
    </>
  )
}

export default ProfileComponent