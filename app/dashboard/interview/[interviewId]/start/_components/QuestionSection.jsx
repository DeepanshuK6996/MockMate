import { Lightbulb, Volume, Volume1, Volume1Icon, Volume2, Volume2Icon } from 'lucide-react'
import React from 'react'
import useSpeechToText from 'react-hook-speech-to-text';

function QuestionSection({mockInterviewQuestions, activeQuestion}) {

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
  
    if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;


    const textToSpeech = (text) => {
      if('speechSynthesis' in window){
        const speech = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(speech);
      }
      else{
        alert('Sorry, your browser doesnt support text to speech')
      }
    }
  

  return (
    mockInterviewQuestions && (
      <div className="p-5 border rounded-lg my-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {mockInterviewQuestions?.map((question, index) => (
            <h2
              className={`cursor-pointer text-center p-2 rounded-full text-xs md:text-sm
              ${
                activeQuestion == index
                  ? "bg-blue-900 text-white"
                  : "bg-secondary"
              }`}
              key={index}
            >
              Question #{index + 1}
            </h2>
          ))}
        </div> 

        <h2 className="m-5 text-md md:text-lg mt-10">
          {mockInterviewQuestions[activeQuestion]?.question}
        </h2>

        <Volume2Icon 
          className='cursor-pointer m-5 -mt-4'
          onClick={() => textToSpeech(mockInterviewQuestions[activeQuestion]?.question)}
        />
        

        {/* Recorded answer to be shown here */}
        <div className="border mt-0.5 w-full min-h-[100px] p-2 rounded border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white">
          <ul>
            {results.map((result) => (
              <li key={result.timestamp}>{result.transcript}</li>
            ))}
            {interimResult && <li>{interimResult}</li>}
          </ul>
        </div>

        <div className="rounded-2xl border p-5 bg-blue-100 text-blue-900 mt-20">
          <h2 className="flex gap-2 items-center">
            <Lightbulb />
            <strong>Note:</strong>
          </h2>
          <h2 className="text-sm my-2">
            Click on "Record Answer" when you want to answer the question. At
            the end of interview, feedback will be provided with correct answers
            for comparitive analysis!
          </h2>
        </div>
      </div>
    )
  );
}

export default QuestionSection
