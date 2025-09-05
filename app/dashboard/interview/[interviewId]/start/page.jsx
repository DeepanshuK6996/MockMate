"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import QuestionSection from './_components/QuestionSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import useSpeechToText from 'react-hook-speech-to-text';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function page() {

    const { interviewId } = useParams(); 
    const [interviewData, setInterviewData] = useState(null);
    const [mockInterviewQuestions, setMockInterviewQuestions] = useState();
    const [activeQuestion, setActiveQuestion] = useState(0);

     const {
       error,
       interimResult,
       isRecording,
       results,
       startSpeechToText,
       stopSpeechToText,
       setResults,
     } = useSpeechToText({
       continuous: true,
       useLegacyResults: false,
     });
  
    const getInterviewDetails = async () => {
      if (!interviewId) return;

      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, interviewId));

      const jsonMockResp = JSON.parse(result[0].jsonMockResp);
      console.log(jsonMockResp);
      setMockInterviewQuestions(jsonMockResp);
      setInterviewData(result[0]);
    };   

    useEffect(() => {
        getInterviewDetails();
    }, [interviewId]);
      
    
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        {/* questions */}
        <QuestionSection 
          mockInterviewQuestions={mockInterviewQuestions} 
          activeQuestion={activeQuestion} 
          results={results}
          interimResult={interimResult}
        />

        {/* video/audio */}
        <RecordAnswerSection
          mockInterviewQuestions={mockInterviewQuestions} 
          activeQuestion={activeQuestion} 
          interviewData={interviewData}
          
          isRecording={isRecording}
          startSpeechToText={startSpeechToText}
          stopSpeechToText={stopSpeechToText}
          error={error}
          results={results}          // ✅ pass results
          interimResult={interimResult}
          setResults={setResults}
        />

      </div>

      <div className='flex justify-end gap-6'>
        {activeQuestion > 0 && 
          <Button className="cursor-pointer"
            onClick={() => setActiveQuestion(activeQuestion - 1)}
          >
            Previous Question
          </Button>
        }

        {activeQuestion != mockInterviewQuestions?.length - 1 && 
          <Button className="cursor-pointer"
            onClick={() => setActiveQuestion(activeQuestion + 1)}
          >
            Next Question
          </Button>
        }

        {activeQuestion == mockInterviewQuestions?.length - 1 && 
          <Link href={'/dashboard/interview/'+interviewData?.mockId+'/feedback'}>
            <Button className="cursor-pointer">
              End Interview
            </Button>
          </Link>
          
        }

      </div>
    </div>
  )
}

export default page
