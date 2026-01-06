import React from 'react'
import BookCard from './components/BookCard';

export default async function Books() {
     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/books`);
        const books = await res.json();
        //console.log(books)
  return (
    <div className='my-20'>
            <p className='text-xl text-primary font-bold text-center'>Empower Your Mind</p>
            <h1 className='text-4xl text-center mb-10'>Knowledge that connects minds</h1>
            <div className='grid grid-cols-3 gap-5 max-w-7xl w-11/12 mx-auto'>
              {
                books.map(book=><BookCard key={book._id} book={book}/>)
              }
            </div>
            </div>
  )
}
