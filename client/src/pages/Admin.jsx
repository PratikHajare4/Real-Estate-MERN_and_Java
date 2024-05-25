import React from 'react'
import { Link } from 'react-router-dom'

export default function Admin() {
  return (
    <div>
   
        <ul className='m-3 gap-4 flex'>
      <Link to="/sign-up">
            <li className='bg-rose-200  hover:text-rose-700 border p-3 rounded-lg'>Sign Up</li>
            </Link>
            <Link to="/sign-in">
            <li className='bg-rose-200  hover:text-rose-700 border p-3 rounded-lg '>Sign IN</li>
            </Link>
        </ul>
    </div>
  )
}
