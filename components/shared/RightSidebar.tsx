"use client";

import { useRef } from 'react';
import Image from 'next/image';

const items = [
  { amount: '250 ml', time: '8:00 am' },
  { amount: '200 ml', time: '9:30 am' },
  { amount: '500 ml', time: '11:00 am' },
  { amount: '200 ml', time: '1:00 pm' },
  { amount: '250 ml', time: '3:00 pm' },
];

const RightSidebar = () => {
  const scrollRef = useRef(null);

  const scrollDown = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        top: 100,  
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <section className="sticky right-0 top-0 flex h-screen flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden w-[350px] custom-scrollbar" id="RightSidebar">
        <div className="image-background mt-12">
          <div className="grid grid-cols-4 gap-3 rounded-lg p-8 items-center">
            <div className="flex items-center">
              <Image
                src="/assets/images/water bottle.png"
                width={55}
                id="botelicon"
                height={60}
                alt="sunicon"
              />
            </div>
            <div className="text-left col-span-2">
              <p className="text-white text-xl ml-6">
                Stay <br />
                Hydrated<br />
                and beat<br />
                heat
              </p>
            </div>
          </div>
        </div>
        <div className="image-background-blue mt-6">
          <div className="rounded-lg p-6 items-center">
            <div className="text-center items-center">
              <h2 className="text-white text-xl ml-0 text-center mb-2">Intake Goal</h2>
              <p className="text-white">18000 ml / 25000 ml</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center h-screen">
          <div className="p-6 w-80 bg-f7f9fd mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-blue-700">Drink Log</h2>
              <button className="text-gray-400 hover:text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12h12M6 6h12M6 18h12" />
                </svg>
              </button>
            </div>
            <div className="relative w-full max-w-md mx-auto">
              <ul ref={scrollRef} className="overflow-y-auto h-48 custom-scrollbar">  
                {items.map((item, index) => (
                  <li key={index} className="flex justify-between items-center mb-3" id="border-stylyes">
                    <div className="flex items-center">
                      <Image
                        src="/assets/images/Vector (1).png"
                        alt="sunicon"
                        width={12}
                        height={12}
                        className="mr-2"
                      />
                      <span className="text-blue-700 font-medium">{item.amount}</span>
                    </div>
                    <span className="text-gray-500">{item.time}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={scrollDown}
                className="absolute bottom-0 transform translate-y-1/2  text-gray font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                id='MUring'
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RightSidebar;
