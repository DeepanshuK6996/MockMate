"use client"
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDownIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

function Feedback({params}) {

  const { interviewId } = useParams(); 
  const [feedbackList, setFeedbackList] = useState([]);
  const router = useRouter();

  const getFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef , interviewId))
      .orderBy(UserAnswer.id);    
      
      console.log(result);
      setFeedbackList(result);
  } 
  
  useEffect(() => {
    getFeedback();
  }, []);
  

  return (
    <div className='p-10'> 
      <h2 className='text-3xl font-bold text-green-600'> 
        Congratulations!!!
      </h2>
      <h2 className='text-2xl font-bold'>
        Here is your Interiew Feedback
      </h2>
      <h2 className='text-primary text-lg my-3'>
        Your Overall Interview Rating :  <strong>7/10</strong>
      </h2>

      <h2 className='text-sm text-gray-500'>
        Find below interview questions with your answer, correct answer and feedback
      </h2>

      {feedbackList && feedbackList.map((item,index) => (
        <Collapsible key={index} className="mt-3">
          <CollapsibleTrigger className="flex items-center gap-10 p-5 bg-secondary rounded-2xl my-2 text-left cursor-pointer">
            {item.question} <ChevronsUpDownIcon className='h-5 w-5'/>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className='flex flex-col gap-2 border p-3 shadow-xl ml-10 rounded-lg'>
              <h2 className='border rounded-2xl p-2'> 
                <strong>» Rating: </strong>{item.rating}
              </h2>
              <h2 className='border text-red-900 rounded-2xl bg-red-50 p-2'>
                <strong>» Your Answer: </strong>{item.userAns}
              </h2>
              <h2 className='border text-green-600 bg-green-50 rounded-2xl p-2'>
                <strong>» Correct Answer: </strong>{item.correctAns}
              </h2>
              <h2 className='border text-blue-900 bg-blue-50 rounded-2xl p-2'>
                <strong>» Feedback: </strong>{item.feedback}
              </h2>
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}

      
      <Button className="cursor-pointer mt-5"
        onClick={() => router.replace('/dashboard')}>
        Go Home
      </Button>
    </div>
  )
}

export default Feedback
