"use client";

import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from 'next/navigation';

function Page({ params }) {
  const { id } = params;
  const router = useRouter();
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    date: "",
    amountMl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`/api/schedules/${id}`, {
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,  
          }
      });
        const data = await response.json();
        if (data.success) {
          setSchedule(data.data);
        } else {
          setError(data.error);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [id]);

  useEffect(() => {
    if (schedule) {
      const formattedDate = new Date(schedule.date).toISOString().split('T')[0];
      setFormData({
        date: formattedDate,
        amountMl: schedule.amountMl || "",
      });
    }
  }, [schedule]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`/api/schedules/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,  
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Schedule updated successfully!");
        setTimeout(() => {
          router.push(`/reports`); 
        }, 2000);
      } else {
        toast.error(data.error);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1 className="h1-bold" id="hEading">
        Edit Schedule Reminder
      </h1>
      <form className="max-w-sm mx-auto mt-24" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="date"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Date:
          </label>
          <input
            type="date"
            id="date"
            name="date"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder=" "
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="amountMl"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Amount (ml):
          </label>
          <input
            type="text"
            id="amountMl"
            name="amountMl"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder=" "
            value={formData.amountMl}
            onChange={handleChange}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          id="bittonsubmit"
          type="submit"
        >
          Submit
        </button>
      </form>
      <Toaster />
    </div>
  );
}

export default Page;
