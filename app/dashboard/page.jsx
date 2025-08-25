"use client"
import React, { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import AddNewInterview from './_components/AddNewInterview';
import EmptyState from './_components/EmptyState';

function Dashboard() {
  const {user} = useUser();
  const [interviewList, setInterviewList] = useState([]);

  return (
    // <div className='p-10'>
    //   <h2 className='font-bold text-2xl'>Dashboard</h2>
    // </div>
    <div className='py-20 px-10 md:px-28 lg:px-44 xl:px-56'>
    
        <div className="flex justify-between items-center">
            <div>
                <h2 className='text-lg text-gray-500'>
                    My Dashboard!!
                </h2>
                <h2 className='text-3xl font-bold'>
                    Welcome, {user?.fullName}
                </h2>
            </div> 
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
          <AddNewInterview/>
        </div>

        {interviewList.length == 0 &&
            <EmptyState/>
        }
    </div>
  )
}

export default Dashboard
