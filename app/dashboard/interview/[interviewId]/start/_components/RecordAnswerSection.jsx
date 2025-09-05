import { Button } from '@/components/ui/button';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
//import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react';
import { toast } from 'sonner';
import { evaluateAnswer } from '@/utils/GeminiAnswerEvaluator';
import { UserAnswer } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { db } from '@/utils/db';

function RecordAnswerSection({mockInterviewQuestions, activeQuestion, interviewData, isRecording, startSpeechToText, stopSpeechToText, error, results, interimResult, setResults}) {

    const [userAnswer, setUserAnswer] = useState('');
    const {user} = useUser();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      if (results.length > 0) {
        const lastResult = results[results.length - 1].transcript;
        setUserAnswer((prevAns) => prevAns + " " + lastResult);
      }
    }, [results]);

    const saveUserAnswer = async () => {
      if(isRecording){
        setLoading(true)
        stopSpeechToText()

        const result = await evaluateAnswer({
          question: mockInterviewQuestions[activeQuestion]?.question, 
          userAnswer: userAnswer});
          
          //console.log(result);
          //console.log(JSON.parse(result)); // This will log the JSON string returned by Gemini
          const jsonFeedback = JSON.parse(result);

          const resp = await db.insert(UserAnswer).values({
            mockIdRef : interviewData?.mockId,
            question : mockInterviewQuestions[activeQuestion]?.question, 
            correctAns : mockInterviewQuestions[activeQuestion]?.answer,
            userAns : userAnswer,
            feedback : jsonFeedback?.feedback,
            rating: jsonFeedback?.rating,
            userEmail : user?.primaryEmailAddress.emailAddress, 
            createdAt: new Date().toISOString().split("T")[0],
          })

          if(resp){
            toast("User Answer recorded successfully")
            setUserAnswer('');
            setLoading(false);
            setResults([]);
          }
      }else{
        startSpeechToText()
      }
    }

  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

  return (
    <div className='flex flex-col items-center'>
      <div className="flex flex-col mt-20 justify-center w-full items-center bg-secondary rounded-lg p-5">
        <Image
          src={"/webIcon.png"}
          height={200}
          width={200}
          alt="webcam icon"
          className="absolute rounded-full "
        />
        <Webcam
          className="rounded-3xl"
          mirrored={true}
          style={{
            height: 300,
            width: "100%",
            zIndex: 10,
          }}
        />
      </div>

      <Button 
            disabled={loading}
            className="my-10 cursor-pointer mx-50"
            onClick={saveUserAnswer} >
            {isRecording ? 
                <h2 className='flex text-center items-center text-red-600'>
                    <Mic/>  Recording....
                </h2>
                :
                'Record Answer'
            }
            
      </Button>

      {/* <Button onClick={() => console.log(userAnswer)}>
        Show User Ans
      </Button> */}
    </div>
  );
}

export default RecordAnswerSection
