"use client"
import React from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function InterviewItemCard({ interview }) {
  const { user } = useUser();
  const router = useRouter();

  const onStart = () => {
    router.push("/dashboard/interview/"+interview.mockId);
  }
  const onFeedback = () => {
    router.push("/dashboard/interview/"+interview.mockId+"/feedback");
  }

  return (
    <div className="border shadow-xl rounded-2xl flex flex-col justify-between">

      {/* Top Section with Image + Details */}
      <div className="flex items-center gap-3 p-3">
        {/* Circular Image Placeholder */}
        <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
          <span className="text-gray-500 text-xs">Img</span>
        </div>

        {/* Job Details */}
        <div>
          <h2 className="text-primary font-bold">{interview?.jobPosition}</h2>
          <h2 className="text-sm text-gray-700">
            {interview.jobExperience} Years of Experience
          </h2>
          <h2 className="text-xs text-gray-500">
            Created At: {interview.createdAt}
          </h2>
        </div>
      </div>

      <div className="flex justify-between mx-2 my-2">
        <Button size="sm" variant="outline" className="md:w-25 sm:w-75 cursor-pointer" 
            onClick={onFeedback}
        >
            Feedback
        </Button>
        <Button size="sm" className="md:w-25 sm:w-75 cursor-pointer"
            onClick={onStart}
        >
            ReAttempt
        </Button>
      </div>

      {/* Bottom Status Badge - centered pill */}
      <div className="flex justify-end p-2 -mr-2 -mb-2">
        <span className="inline-flex items-center gap-1 rounded-br-2xl rounded-tl-2xl bg-green-600 px-3 py-1 text-white text-xs font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            />
          </svg>
          Completed!
        </span>
      </div>
    </div>
  );
}

export default InterviewItemCard;
