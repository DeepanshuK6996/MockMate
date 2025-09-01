import { Button } from '@/components/ui/button';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react';

function RecordAnswerSection() {

    const [userAnswer, setUserAnswer] = useState('');
    const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

    // useEffect(() => {
    //  results.map((result) => (
    //     setUserAnswer(prevAns => prevAns + result.transcript)
    //  ))
    // }, [results])
    useEffect(() => {
      if (results.length > 0) {
        const lastResult = results[results.length - 1].transcript;
        setUserAnswer((prevAns) => prevAns + " " + lastResult);
      }
    }, [results]);

    

  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

  return (
    <div className='flex flex-col justify-between '>
      <div className="flex flex-col mt-20 justify-center items-center bg-secondary rounded-lg p-5">
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

      <Button className="my-10 cursor-pointer mx-50"
            onClick={isRecording ? stopSpeechToText : startSpeechToText} >
            {isRecording ? 
                <h2 className='flex text-center items-center text-red-600'>
                    <Mic/>  Recording....
                </h2>
                :
                'Record Answer'
            }
            
      </Button>

      {/* <h1>Recording: {isRecording.toString()}</h1>
      <button onClick={isRecording ? stopSpeechToText : startSpeechToText}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      <ul>
        {results.map((result) => (
          <li key={result.timestamp}>{result.transcript}</li>
        ))}
        {interimResult && <li>{interimResult}</li>}
      </ul> */}
    </div>
  );
}

export default RecordAnswerSection
