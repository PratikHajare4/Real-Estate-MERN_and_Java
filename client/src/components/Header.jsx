import {React,useState} from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'


export default function Header() {
  const [showBenefitsDropdown, setShowBenefitsDropdown] = useState(false);

  return (
    <header className='bg-sky-600 shadow-md'>
      <div className='flex flex-row justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to="/" >
          <h1 className='font-bold text-sm sm:text-2xl flex flex-wrap'>
            <span className='text-slate-200 text-2xl'>Hom</span>
            <span className='text-slate-700 text-2xl'>Assist</span>
          </h1>
        </Link>
        {/* <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
          <input type="text" placeholder='Search...' className='bg-transparent w-14 sm:w-64 focus:outline-none' />
          <FaSearch className='text-slate-600 sm:outline-none'/>
        </form> */}
        <ul className='flex gap-4 text-white'>
          <Link to="/"><li className='hover:text-black'>Home</li></Link>
          <Link to="/about"><li className='hover:text-black'>About Us</li></Link>
          <li className='relative'
              onMouseEnter={() => setShowBenefitsDropdown(true)}
              onMouseLeave={() => setShowBenefitsDropdown(false)}>
            <ul className='hover:text-black'>Benefits ▼</ul>
            {showBenefitsDropdown && (
              <ul className='absolute bg-gray-600 shadow-md  rounded-lg w-56 whitespace-nowrap z-50'
                  onMouseEnter={() => setShowBenefitsDropdown(true)}
                  onMouseLeave={() => setShowBenefitsDropdown(false)}>
                <li className='px-4 py-2 hover:bg-gray-700 flex items-center justify-center'><Link to="/freeConsultation">Free Consultation</Link></li>
                <li className='px-4 py-2 hover:bg-gray-700 flex items-center justify-center'><Link to="/group">Group Booking Discount</Link></li>
                <li className='px-4 py-2 hover:bg-gray-700 flex items-center justify-center'><Link to="/referral">Referral</Link></li>
              </ul>
            )}
          </li>

   <Link to="/residential">
            <li className='hidden sm:inline  hover:text-black'>Residential</li>
            </Link>
            <Link to="/commercial">
            <li className='hidden sm:inline  hover:text-black'>Commercial</li>
            </Link>
            <Link to="/contact">
            <li className='hidden sm:inline  hover:text-black'>Contact US</li>
            </Link>
           
            {/* <Link to="/sign-in">
            <li className='hidden sm:inline  hover:text-black'>Sign IN</li>
            </Link> */}
        </ul>
        </div>
    </header>
  )
}
