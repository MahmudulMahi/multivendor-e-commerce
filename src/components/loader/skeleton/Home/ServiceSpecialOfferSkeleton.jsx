import Image from 'next/image';
import React from 'react';

const ServiceSpecialOfferSkeleton = () => {
    const data=[
        {logo:'Authentic.svg', title:"100% Authentic",comment:"Brand and products"},
        {logo:'Map.svg', title:"All Bangladesh",comment:"Delivery to your door"},
        {logo:'money-back.svg', title:"45 Day Return",comment:"Easy Return policy"},
        {logo:'Returns.svg', title:"Cash Back policy",comment:"Guaranteed Cover Up"},
    ]
  return (
    <div className='   gap-4 hidden md:gap-3 lg:gap-5 mt-10 grid-cols-1 md:grid lg:grid-cols-4  md:grid-cols-2  '>
      {
        data.map(item=><div key={item?.logo} className='flex gap-4 items-center rounded-xl justify-center py-5 shadow-custom'>
            <Image height={40} width={40} src={item?.logo} alt="authentic" />
            <div>
                <p className='text-base font-semibold'>{item?.title}</p>
                <p className='text-xs'>{item?.comment}</p>
            </div>
          </div>)
      }
    </div>
  );
};

export default ServiceSpecialOfferSkeleton;