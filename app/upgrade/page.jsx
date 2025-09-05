import { PricingTable } from '@clerk/nextjs'
import React from 'react'
import Header from '../dashboard/_components/Header';

function page() {
  return (
    <div>
      <Header />
      <div
        style={{ maxWidth: "800px", margin: "0 auto", padding: "0 1rem" }}
        className="flex items-center justify-between flex-col"
      >
        <h2 className="font-bold mt-15 mb-10 text-4xl">Upgrade to UpSkill!!</h2>
        <PricingTable />
      </div>
    </div>
  );
}

export default page
