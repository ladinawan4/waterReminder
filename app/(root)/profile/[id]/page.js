"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const schema = z.object({
  weight: z.number(),
  weightUnit: z.string(),
  age: z.number(),
  gender: z.string(),
  activityLevel: z.string(),
  climate: z.string(),
});

export default function ProfilePage() {
  const [userImage, setuserImage] = useState(null);
  const [result, setResult] = useState(null);
  const [data, setData] = useState([]);
  const [weightUnit, setWeightUnit] = useState("kg");
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  console.log(data,'data');
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (data) {

      setValue("userImage", data.userImage || "");
      setValue("weight", data.weight || 0);
      setValue("weightUnit", data.weightUnit || "");
      setValue("username", data.username || "");
      setValue("email", data.email || "");
      setValue("age", data.age || 0);
      setValue("gender", data.gender || "");
      setValue("activityLevel", data.activityLevel || "");
      setValue("climate", data.climate || "");
    }
  }, [data, setValue]);
  const calculateWaterIntake = ({ weight, weightUnit }) => {
    if (weightUnit === "kg") {
      return weight * 0.033;
    } else if (weightUnit === "lb") {
      return weight * 0.5;
    }
    return 0;
  };
  const onSubmit = async (data) => {
    const weight = data.weight;
    const weightUnit = data.weightUnit;
    const intake = calculateWaterIntake({
      weight: parseFloat(weight),
      weightUnit,
    });
    setResult(intake);
    localStorage.setItem("waterIntake", intake);
    const formData = new FormData();
    formData.append('weight', weight);
    formData.append('weightUnit', weightUnit);
    formData.append('age', data.age);
    formData.append('gender', data.gender);
    formData.append('activityLevel', data.activityLevel);
    formData.append('climate', data.climate);
  
    try {
 
      const userId = localStorage.getItem('userId');
        const token = localStorage.getItem("authToken");
        if (!token) {
        throw new Error('Authentication token is missing');
      }
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, ...data }),  
      });
      if (response.status === 200) {
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      console.error('Error details:', error);
      return res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setuserImage(URL.createObjectURL(file));
  //     setFile(e.target.files[0]);
  //     setValue("userImage", e.target.files);
  //   }
  // };
  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const userId = localStorage.getItem('userId');
      const res = await fetch(`/api/profile?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json();
      
      if (result.success) {
        setData(result.data);
        setLoading(false);
      } else {
        console.error("Failed to fetch schedule:", result.error);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

 
  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-10">
      <div className="bg-white p-4 rounded-lg  w-full max-w-4xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          encType="multipart/form-data"
        >
          {/* <div className="flex flex-col items-center">
            {userImage ? (
              <img
                src={userImage}
                alt="User Image"
                className="w-40 h-40 rounded-full object-cover mb-4 border-4 border-blue-500"
              />
            ) : (
              <div className="w-40 h-40 bg-gray-300 rounded-full flex items-center justify-center mb-4 border-4 border-gray-300">
                <span className="text-gray-600 text-lg font-semibold">
                  Upload Image
                </span>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="file-input"
            />
            <label
              htmlFor="file-input"
              className="text-blue-500 cursor-pointer hover:underline text-lg font-semibold"
            >
              Change Image
            </label>
          </div> */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Weight:
                <input
                  type="number"
                  {...register("weight", { valueAsNumber: true })}
                  className={`mt-1 block w-full px-4 py-2 border ${
                    errors.weight ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.weight && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.weight.message}
                  </p>
                )}
              </label>
              <select
                {...register("weightUnit")}
                className={`mt-1 block w-full px-4 py-2 border ${
                  errors.weightUnit ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="kg">kg</option>
                <option value="lb">lb</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Age:
                <input
                  type="number"
                  {...register("age", { valueAsNumber: true })}
                  className={`mt-1 block w-full px-4 py-2 border ${
                    errors.age ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.age && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.age.message}
                  </p>
                )}
              </label>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Name:
                <input
                  type="text"
                  {...register("username", { valueAsNumber: true })}
                  disabled
                  className={`mt-1 block w-full px-4 py-2 border ${
                    errors.username ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.username.message}
                  </p>
                )}
              </label>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Email:
                <input
                  type="email"
                  {...register("email")}
                  disabled
                  className={`mt-1 block w-full px-4 py-2 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </label>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Gender:
                <select
                  {...register("gender")}
                  className={`mt-1 block w-full px-4 py-2 border ${
                    errors.gender ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.gender.message}
                  </p>
                )}
              </label>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Activity Level:
                <select
                  {...register("activityLevel")}
                  className={`mt-1 block w-full px-4 py-2 border ${
                    errors.activityLevel ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="">Select Activity Level</option>
                  <option value="sedentary">Sedentary</option>
                  <option value="light">Light</option>
                  <option value="moderate">Moderate</option>
                  <option value="active">Active</option>
                  <option value="very active">Very Active</option>
                </select>
                {errors.activityLevel && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.activityLevel.message}
                  </p>
                )}
              </label>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Climate (optional):
                <select
                  {...register("climate")}
                  className={`mt-1 block w-full px-4 py-2 border ${
                    errors.climate ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="">Select Climate</option>
                  <option value="cold">Cold</option>
                  <option value="temperate">Temperate</option>
                  <option value="hot">Hot</option>
                </select>
                {errors.climate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.climate.message}
                  </p>
                )}
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-lg font-semibold"
          >
            Save Profile
          </button>
        </form>
        {result && (
          <div className="mt-6 text-center">
            <h2 className="text-xl font-semibold text-gray-700">
              Required Water Intake
            </h2>
            <p className="text-lg text-gray-900 mt-2">
              {weightUnit === "kg"
                ? `${result.toFixed(2)} liters`
                : `${result.toFixed(2)} ounces`}
            </p>
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
}
