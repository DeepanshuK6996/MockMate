import React from 'react'
import Image from 'next/image'

function EmptyState() {
  return (
    <div className='mt-14 flex flex-col items-center gap-5 bg-gray-100 border-dashed border-gray-400 p-10 rounded-2xl border-4'>
      <Image src='/interview.png' alt='emptyState' width={130} height={130} />
      <h2 className='mt-2 text-lg text-gray-500'>
        You do not have any interview created :(
      </h2>
    </div>
  )
}

export default EmptyState
