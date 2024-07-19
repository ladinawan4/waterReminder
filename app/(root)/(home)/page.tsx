"use client";

import { useEffect, useState } from "react";
import { useAuth } from '@clerk/clerk-react';
import Image from "next/image";
import "../../../styles/styles.scss";
 

const Home = () => {
  const [runningTotal, setRunningTotal] = useState(0);
  const [averageIntake, setAverageIntake] = useState(0);

  const { getToken } = useAuth();
  const fetchData = async () => {
    const token = await getToken(); 
    const res = await fetch(`/api/schedule`, {
      headers: {
        'Authorization': `Bearer ${token}`,  
      },
    });
    const data = await res.json();
    if (data.success) {
      setRunningTotal(data.totalAmountMl);
      setAverageIntake(data.averageDailyIntake);
    } else {
      console.error("Failed to fetch schedule:", data.error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div>
        <div className="grid lg:grid-cols-5 md:grid-cols-5  sm:grid-cols-1 gap-3 bg-f7f9fd rounded-lg p-8 items-center">
          <div className="flex items-center">
            <Image
              src="/assets/images/sun icon.png"
              width={50}
              id="sunicon"
              height={50}
              alt="sunicon"
            />
            <h5 className="ml-2">
              <b>26°C</b>
            </h5>
          </div>
          <div className="text-center col-span-2 border-right-8f8e8e57">
            It’s a <b>Sunny Day</b> today!
          </div>
          <div className="text-center col-span-2 text-8E8F8F">
            <p>Don’t forget to take your water bottle with you.</p>
          </div>
        </div>
        <div className="mx-auto bg-white rounded-lg mt-4">
          <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-4 mb-8">
            <div className="bg-green-100 p-4 rounded-lg text-center">
              <div className="c100 p90 blue text-green-600">
                <span className="text-green-600">90%</span>
                <div className="slice">
                  <div className="bar"></div>
                  <div className="fill"></div>
                </div>
              </div>
              <div className="text-xl mt-12 text-green-600">Daily Intake</div>
              <div className="text-xl text-green-600 font-bold">5000 ml</div>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg text-center">
              <div className="c101 p90 blue text-green-600">
                <span className="text-green-600">75%</span>
                <div className="slice">
                  <div className="bar"></div>
                  <div className="fill"></div>
                </div>
              </div>
              <div className="text-xl mt-12 text-purple-600">Average Intake</div>
              <div className="text-xl text-purple-600 font-bold"> {averageIntake.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              ml</div>
            </div>
            <div className="bg-orange-100 p-4 rounded-lg text-center">
              <div className="c102 p90 blue text-green-600">
                <span className="text-green-600">65%</span>
                <div className="slice">
                  <div className="bar"></div>
                  <div className="fill"></div>
                </div>
              </div>
              <div className="text-xl mt-12 text-orange-600">Total Intake</div>
              <div className="text-xl text-orange-600 font-bold">{runningTotal} ml</div>
            </div>
          </div>
        </div>
        <div className="border p-F2EEEE rounded-lg">
          <h2 className="text-494949">Hydration Tips</h2>
          <p className="text-7B81A6">
            Consuming fruit juices keeps up the hydration level.
          </p>
          <div className="mx-auto bg-white rounded-lg mt-4">
            <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-4 mb-8">
              <div className="bg-EDFFEF-100 p-6 rounded-lg text-center">
                <div className="image">
                  <Image
                    src="/assets/images/Group 108.png"
                    width={50}
                    id="groupicon"
                    height={50}
                    alt="sunicon"
                  />
                </div>
                <div className="text-xl text-left text-black">Watermelon</div>
                <div className="text-7B81A6">
                  <p>
                    It contains 97% water in it.
                    <br /> A good choice to stay <br />
                    hydrated.
                  </p>
                </div>
              </div>
              <div className="bg-FFF2EC-100 p-6 rounded-lg text-center">
                <div className="image">
                  <Image
                    src="/assets/images/image 63.png"
                    width={50}
                    id="groupicon"
                    height={50}
                    alt="sunicon"
                  />
                </div>
                <div className="text-xl text-left text-black">Oranges</div>
                <div className="text-7B81A6">
                  <p>
                    It contains 72% water in it.
                    <br /> It’s tangy nature helps
                    <br /> with skin care.
                  </p>
                </div>
              </div>
              <div className="bg-F4F2FF p-6 rounded-lg text-center">
                <div className="image">
                  <Image
                    src="/assets/images/Group 104.png"
                    width={50}
                    id="groupicon"
                    height={50}
                    alt="sunicon"
                  />
                </div>
                <div className="text-xl text-left text-black">Grapes</div>
                <div className="text-7B81A6">
                  <p>
                    It contains vitamin ‘C’ <br />
                    which helps with <br />
                    retaining water.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;