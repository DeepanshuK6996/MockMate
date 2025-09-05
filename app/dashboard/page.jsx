"use client"
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import AddNewInterview from './_components/AddNewInterview';
import EmptyState from './_components/EmptyState';
import InterviewList from './_components/InterviewList';
import { db } from '@/utils/db';
import { desc, eq } from 'drizzle-orm';
import { MockInterview } from '@/utils/schema';

function Dashboard() {
  const {user} = useUser();
  const [interviewList, setInterviewList] = useState([]);

  const getInterviewList = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(
        eq(MockInterview.createdBy, user?.primaryEmailAddress.emailAddress)
      )
      .orderBy(desc(MockInterview.id));

    console.log(result);
    setInterviewList(result);
  };

  useEffect(() => {
    user && getInterviewList();
  }, [user]);

  return (
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

        {/* Previous inyerviews Listed */}
        <InterviewList />

        {interviewList.length == 0 &&
            <EmptyState/>
        }
    </div>
  )
}

export default Dashboard
