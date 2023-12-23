import React from 'react'
import { Link } from 'react-router-dom'

export const Navigation = () => {
  return (
    <div className='navigation'>
      <Link to='/'>Chat</Link>
      <Link to='/feedbacks'>Feedbacks</Link>
    </div>
  )
}
