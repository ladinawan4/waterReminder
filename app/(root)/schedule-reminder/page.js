"use client";

import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
 
export default function Schedulereminder() {
 
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/schedule", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    console.log(data,'data');
    if (data.success) {
      toast.success("Schedule created successfully!");
      setFormData({ date: "", amountMl: "" });
    } else {
      toast.error(`${data.message}`);
    }
  };

  return (
    <div>
      <h1 className="h1-bold" id="hEading">
        Schedule Reminder
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
