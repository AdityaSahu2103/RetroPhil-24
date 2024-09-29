import React from 'react';
import OrderStatus from './OrderStatus';

const Shipping = () => {
  return (
    <div>
      <div className='flex flex-col sm:flex-row h-auto bg-red-100 w-full my-4'>
        <div className='w-full sm:w-1/2 p-4 sm:p-6'>
          <h1 className='font-bold text-2xl'>Delivery Address</h1>
          <h2 className='font-semibold text-lg pt-1'>Suraj Gunjal</h2>
          <p className='font-medium text-sm text-zinc-500 leading-3 py-3'>
            S.No 59/1/1/13 Sukhsagar Nagar, in front of Mahalaxmi Niwas Pune - 411048, Maharashtra
          </p>
          <span className='font-semibold'>Phone Number :</span>
          <span className='pl-2 font-medium text-sm text-zinc-800 leading-3 pt-2'>9999999999</span>
        </div>
        <div className='w-full sm:w-1/2 text-zinc-800 p-4 sm:p-6'>
          <p className='text-lg font-semibold'>Additional Info</p>
          <p className='font-medium text-sm text-zinc-500'>You can add more information here.</p>
        </div>
      </div>
      
      <div className='lg:flex lg:flex-row h-auto w-full my-4 gap-4'>
        <div className='p-6 w-full md:w-1/3 border flex justify-center items-center bg-zinc-200 rounded-lg'>
          <div className='w-1/3'>
            <img src='letters.png' alt="Stamp Cover" />
          </div>
          <div className='w-2/3 px-10 py-4'>
            <p className='pt-2 text-lg font-bold'>Stamp letter cover</p>
            <p className='pt-2 text-sm'><span className='text-md font-bold'>Description:</span> Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <p className='pt-2 font-medium text-sm text-zinc-500'>Quantity: 2</p>
            <p className='font-medium text-sm text-zinc-500'>Seller: Aditya</p>
            <h1 className='pt-2 text-md font-mono'> ₹358</h1>
          </div>
        </div>
        <div className='p-6 w-full md:w-2/3 border  bg-zinc-200 rounded-lg'>
          <OrderStatus />
        </div>
      </div>
    </div>
  );
};

export default Shipping;
