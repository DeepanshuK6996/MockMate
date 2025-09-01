"use client"
import React from "react";
import Webcam from "react-webcam";
import { MockInterview } from '@/utils/schema';
import { useParams } from 'next/navigation';
import { db } from '@/utils/db';
import { eq } from 'drizzle-orm';
import { useEffect, useState } from 'react';
import { WebcamIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Lightbulb } from 'lucide-react';
import Link from "next/link";

export default function Interview() {
  const { interviewId } = useParams(); 
  const [interviewData, setInterviewData] = useState(null);
    const [webCamEnabled, setWebCamEnabled] = useState(false);
  
  const getInterviewDetails = async () => {
    if (!interviewId) return;

    const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, interviewId ));
    console.log(result);
    setInterviewData(result[0]);
  }

  useEffect(() => {
    getInterviewDetails();
  }, [interviewId]);
  

  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl mb-4">Let's get started</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">

        <div className="flex flex-col my-5 gap w-full">
          <div className="flex flex-col my-5 gap-3 p-5 border rounded-2xl">
            <h2 className="text-lg">
              <strong>Job Role / Job Position : </strong>{" "}
              {interviewData?.jobPosition}
            </h2>
            <h2 className="text-lg">
              <strong>Job Description / TechStack : </strong>{" "}
              {interviewData?.jobDescription}
            </h2>
            <h2 className="text-lg">
              <strong>Years of Experience : </strong>{" "}
              {interviewData?.jobExperience}
            </h2>
          </div>
          <div className="p-5 border rounded-lg border-yellow-400 bg-yellow-200">
            <h2 className="text-lg flex gap-2 items-center text-yellow-700">
              <Lightbulb /><strong>Information</strong>
            </h2>
            <h2 className="text-yellow-600">
              Enable Video Web Cam and Microphone to Start your Ai Generated Mock Interview. Answer all the questions and at the end you will get the feeback report and rating computed against your reponses.
            </h2>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center w-full -ml-7">
          {webCamEnabled ? (
            <div className="relative border-2 size-7 bg-muted rounded-2xl shadow-lg overflow-hidden ">
              <Webcam
                className="rounded-2xl"
                onUserMedia={() => setWebCamEnabled(true)}
                onUserMediaError={() => setWebCamEnabled(false)}
                style={{ width: 320, height: 240 }}
                mirrored={true}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4">
              <WebcamIcon className="h-72 w-72  bg-muted rounded-2xl p-20 border shadow-sm" />
              <Button
                variant="ghost"
                onClick={() => setWebCamEnabled(true)}
                className="cursor-pointer border-lg bg-secondary"
              >
                Enable Web Cam and Mic
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-end items-end">
        <Link href={'/dashboard/interview/'+interviewId+'/start'}>
          <Button className="">Start Interview</Button>
        </Link>
      </div>
    </div>
  );
}

