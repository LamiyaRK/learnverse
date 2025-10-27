import Image from 'next/image';
import React from 'react';

const Timeline = ({data}) => {
    const {index,title,year,description,image}=data
    return (
        <div >
            <div className={`flex w-full flex-col ${index%2?"lg:flex-row":"lg:flex-row-reverse"} justify-between items-center gap-2`} >
  <div className="w-full lg:w-[45%]  text-neutral ">
    <p className='text-3xl font-medium mb-4 text-primary' >-{year}</p>
     <p className='text-3xl font-semibold mb-10'>{title}</p>
      <p className='font-medium opacity-80'>{description}</p>
  </div>
  <div className="divider lg:divider-horizontal divider-neutral "><div className="w-16 h-8 lg:w-8 lg:h-16 bg-neutral/40 rounded-[50%] border-4 border-neutral shadow-md"></div>
</div>
  <div className='w-full lg:w-[45%] flex justify-center'>
    <Image src={image} width={500} height={500} alt={title} className='h-[400px] w-full lg:w-[400px] object-cover object-center'></Image>
  </div>
</div>
        </div>
    );
};

export default Timeline;