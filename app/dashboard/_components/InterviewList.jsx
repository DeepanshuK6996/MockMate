"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import InterviewItemCard from './InterviewItemCard';

function InterviewList() {

    const {user} = useUser();
    const [interviewList, setInterviewList] = useState([]);

    const getInterviewList = async () => {
        const result = await db.select()
            .from(MockInterview)
            .where(eq(MockInterview.createdBy, user?.primaryEmailAddress.emailAddress))
            .orderBy(desc(MockInterview.id));

        console.log(result);
        setInterviewList(result);
    }

    useEffect(() => {
        user&& getInterviewList();
    },[user])

  return (
    <div>
      <h2 className='font-medium text-lg mt-10'>
        Previous Mock Interviews
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-2'> 
        {interviewList && interviewList.map((interview,index) => (
            <InterviewItemCard 
                key={index}
                interview={interview}
            />
        ))}
      </div>
    </div>
  )
}

export default InterviewList
