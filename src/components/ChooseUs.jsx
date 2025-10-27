import Image from 'next/image';
import React from 'react'

export default function ChooseUs() {
    const whyChooseUsData = [
  {
    id: 1,
    heading: "Expert-Led Courses",
    paragraph: "Learn from industry professionals with years of experience. Our courses are designed to provide practical knowledge that you can apply immediately in real-world scenarios.",
    buttonText: "Explore Courses",
    image: "https://i.ibb.co.com/1yt2RRP/timur-shakerzianov-Lpi-BFfvyqgg-unsplash.webp"
  },
  {
    id: 2,
    heading: "Personalized Learning Paths",
    paragraph: "Everyone learns differently. We offer tailored learning paths to match your pace and goals, ensuring you gain the skills you need efficiently and effectively.",
    buttonText: "Start Your Journey",
    image: "https://i.ibb.co.com/FqJ9sRGT/premium-photo-1706189732178-a3b7eae819bb.webp"
  },
  {
    id: 3,
    heading: "Career-Focused Support",
    paragraph: "We don’t just teach—you grow. Get mentorship, career advice, and exclusive opportunities to connect with top companies in your field.",
    buttonText: "Join Now",
    image: "https://i.ibb.co.com/PZ0pdpyB/premium-photo-1677572452827-899002f7ca12.webp"
  }
];

  return (
    <div className='max-w-7xl w-11/12 mx-auto'>
    <p className='text-xl text-primary font-bold text-center'>Discover Mission</p>
    <h1 className='text-4xl text-center mb-10'>Why Our Platform is Better</h1>
  <div>
    {whyChooseUsData.map((data) => (
      <div key={data.id} className='grid grid-cols-2 gap-8 items-center mb-16'>
        {/* If ID is odd, image on left */}
        {data.id % 2 == 0 && (
          <Image
            src={data.image}
            height={600}
            width={400}
            alt={data.heading}
            className='h-[500px] w-full object-center object-cover rounded-lg'
          />
        )}

        {/* Text */}
        <div>
          <h1 className='text-4xl mb-10'>{data.heading}</h1>
          <p className='opacity-80 mb-10'>{data.paragraph}</p>
          <button className='btn btn-primary text-white'>{data.buttonText}</button>
        </div>

        {/* If ID is even, image on right */}
        {data.id % 2 !== 0 && (
          <Image
            src={data.image}
            height={600}
            width={400}
            alt={data.heading}
            className='h-[500px] w-full object-center object-cover rounded-lg'
          />
        )}
      </div>
    ))}
  </div>
</div>

  )
}
