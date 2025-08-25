"use client"
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { generateInterviewQuestions } from '@/utils/GeminiAiModel2';
import { LoaderCircle } from 'lucide-react';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';

function AddNewInterview() {
    
    const [openDailog, setOpenDailog] = useState(false);
    const [jobPosition, setJobPosition] = useState();
    const [jobDescription, setJobDescription] = useState();
    const [jobExperience, setJobExperience] = useState(0);
    const [loading, setLoading] = useState(false);
    const [quesJsonResponse, setQuesJsonResponse] = useState([]);
    const {user} = useUser();

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(jobPosition, jobDescription, jobExperience);
        
        try {
          const result = await generateInterviewQuestions({ jobPosition, jobDescription, jobExperience });
          console.log(JSON.parse(result)); // This will log the JSON string returned by Gemini
          setQuesJsonResponse(result);

          if(result){
            const reponse = await db.insert(MockInterview).values({
              mockId: uuidv4(),
              jsonMockResp: result,
              jobPosition: jobPosition,
              jobDescription: jobDescription,
              jobExperience: jobExperience,
              createdBy: user?.primaryEmailAddress?.emailAddress,
              createdAt: new Date().toISOString().split("T")[0],
            }).returning({mockId: MockInterview.mockId});
            
            console.log("Inserted ID: ",reponse);
          }
          
        } catch (err) {
          console.error("Error generating questions:", err);
        }
        setLoading(false);
    }

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary 
            hover:scale-105 cursor-pointer transition-all "
        onClick={() => setOpenDailog(true)}
      >
        <h2 className="text-lg text-center">+ Add New Interview</h2>
      </div>

      <Dialog open={openDailog} onOpenChange={setOpenDailog}>
        <DialogContent className="!max-w-2xl">
          <form onSubmit={onSubmit}>
            <DialogHeader>
              <DialogTitle className="text-2xl">
                Tell us about your Job Interview
              </DialogTitle>
              <DialogDescription>
                <div>
                  <h2>
                    Add Details about your Job Position/Role, Job Description
                    and Years of Experience
                  </h2>

                  <div className="mt-7 my-3">
                    <label>Job Role / Job Position</label>
                    <Input placeholder="Ex. Full Stack Developer" required 
                    onChange={(ev) => setJobPosition(ev.target.value)}/>
                  </div>
                  <div className="mt-7 my-2">
                    <label>Job Description / Tech Stack</label>
                    <Textarea placeholder="Enter job description" required 
                    onChange={(ev) => setJobDescription(ev.target.value)}/>
                  </div>
                  <div className="mt-7 my-2">
                    <label>Years of Experience</label>
                    <Input placeholder="Ex. 2" type="number" min="0" max="20" required 
                    onChange={(ev) => setJobExperience(ev.target.value)}/>
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-6">
              <DialogClose>
                <Button type="button" variant={"ghost"}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={loading}>
                {loading ? <><LoaderCircle className='animate-spin'/> "Generating with AI :)"</> : "Start Interview"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview
