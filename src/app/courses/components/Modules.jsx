import React from 'react'

export default async function Modules({id}) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/modules/${id}`);
    const module= await res.json();
    const {modules}=module
    
  return (
    <div  className=' overflow-y-auto h-[500px] p-4'>{
        modules.map((module,i)=><div key={i}>
            <p className='p-3 border-primary text-lg border-1 mb-2 rounded-lg '>{module}</p>
        </div>)
    }</div>
  )
}
