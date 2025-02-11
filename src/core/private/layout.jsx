import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='flex mx-auto'>
        {/* sidebar here */}

        <Outlet/>
    </div>
  )
}

export default Layout