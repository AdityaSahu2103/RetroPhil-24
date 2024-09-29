import React from 'react';
import Carousel from "../Carousel/Carousel";

import './Hero.css';

const Hero = () => {
  return (
    <section>
      {/* Carousel */}
      <Carousel/>
      <hr className="border-t-2 border-gray-300 my-4"/>

      {/* Collection Section */}
      <div className="text-center my-24">
        <p className='hero-discover text-md'>Collect</p>
        <p className='text-3xl md:text-4xl my-2 font-semibold'>Explore our new collection</p>
        <p className='text-md md:text-xl'>Discover rare stamps from around the world</p>
      </div>

      {/* Grid Section with Added Margins */}
      <div className='mx-12 lg:px-12 md:mx-0 grid grid-cols-1 md:grid-cols-2 gap-4 text-center py-3'>
        {/* Card 1 */}
        <div className='border-2 p-4 md:p-6'>
          <p className='text-sm text-gray-500 mb-1'>New</p>
          <p className='text-2xl md:text-4xl font-semibold mb-2 py-2'>Check Out New Arrivals</p>
          <p className='text-sm md:text-lg text-gray-700 mb-4'>Stay updated with our latest stamp releases and special editions.</p>
          
          <div className='buttons flex space-x-2 md:space-x-4 justify-center mb-20'>
            <button className='border-2 rounded-lg text-white bg-red-800 hover:bg-red-900 px-4 py-2 md:px-7 md:py-2 font-medium'>Shop</button>
            <button className='border-2 rounded-lg bg-zinc-200 hover:bg-zinc-400 text-black px-4 py-2 md:px-7 md:py-2 font-medium'>Browse</button>
          </div>

          <img src="Hero1.webp" alt='Stamp' className='w-full mt-4 md:mt-6 rounded' />
        </div>

        {/* Card 2 */}
        <div className='border-2 p-4 md:p-6'>
          <p className='text-sm text-gray-500 mb-1'>Rare</p>
          <p className='text-2xl md:text-4xl font-semibold mb-2 py-2'>Discover Unique Stamp Treasures</p>
          <p className='text-sm md:text-lg text-gray-700 mb-4'>Find one-of-a-kind stamps to enhance your collection</p>
          
          <div className='buttons flex space-x-2 md:space-x-4 justify-center mb-20'>
            <button className='border-2 rounded-lg bg-zinc-200 hover:bg-zinc-400 text-black px-4 py-2 md:px-7 md:py-2 font-medium'>Find</button>
          </div>

          <img src="Hero1.webp" alt='Stamp' className='w-full mt-4 md:mt-6 rounded' />
        </div>

        {/* Card 3 */}
        <div className='px-4 gap-4 flex flex-col sm:flex-row space-x-0 sm:space-x-4 lg:max-h-96'>
          <div className='w-full py-14 sm:w-1/2 p-4 border-2 rounded-lg'>
            <p className='text-xl md:text-3xl font-semibold'>Your Guide to Collecting</p>
            <p className='text-sm md:text-base'>Essential tips for every stamp enthusiast.</p>
            <button className='border-2 rounded-lg hover:bg-zinc-400  bg-zinc-200 text-black px-4 py-2 md:px-7 md:py-2 font-medium'>Learn {' >'}</button>
          </div>
          <div className='w-full py-14 sm:w-1/2 p-4 border-2 rounded-lg'>
            <p className='text-xl md:text-3xl font-semibold'>Join Our Collector Community</p>
            <p className='text-sm md:text-base'>Connect with fellow stamp lovers and share insights.</p>
            <button className='border-2 rounded-lg hover:bg-zinc-400  bg-zinc-200 text-black px-4 py-2 md:px-7 md:py-2 font-medium'>Connect {' >'}</button>
          </div>
        </div>

        {/* Card 4 */}
        <div className='border-2 rounded-lg p-4 md:p-7 flex flex-col text-center' style={{ height: '520px' }}>
          <p className='text-sm md:text-base font-medium'>Guide</p>
          <p className='text-2xl md:text-4xl font-bold py-3'>Master the Art of Collecting</p>
          <p className='text-sm md:text-base'>Utilize our resources to build a valuable and meaningful stamp collection.</p>
          <div className='buttons flex space-x-4 my-4 justify-center mb-12'>
            <button className='border-2 rounded-lg text-white bg-red-800 hover:bg-red-900 px-4 py-2 md:px-7 md:py-2 font-medium'>Start</button>
            <button className='border-2 rounded-lg hover:bg-zinc-400  bg-zinc-200 text-black px-4 py-2 md:px-7 md:py-2 font-medium'>Join {' >'}</button>
          </div>
          <div className='relative flex-grow'>
            <img src="royalPost.png" alt='Stamp' className='absolute inset-0 w-full h-full object-cover rounded' />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
