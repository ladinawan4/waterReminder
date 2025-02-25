"use client";

import { Toaster, toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Reports() {
  const router = useRouter();
  const [Data, setData] = useState([]);
  const [dailyGoalMl, setdailyGoal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [actionType, setActionType] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  const fetchData = async (page) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(`/api/schedule?page=${page}&limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json();
      if (result.success) {
        setData(result.data);
        setTotal(result.total);
        setLoading(false);
      } else {
        console.error("Failed to fetch schedule:", result.error);
        toast.error("Failed to fetch schedule.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("An error occurred while fetching data.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("waterIntake")) || [];
    setdailyGoal(storedData);
  }, []);
  const handleEdit = (id) => {
    setActionType("edit");
    setConfirmAction(id);
  };
  const handleDelete = (id) => {
    setActionType("delete");
    setConfirmAction(id);
  };
  const confirmActionHandler = async () => {
    if (actionType === "edit") {
      console.log(confirmAction, "edit");
      router.push(`/schedule-reminder/${confirmAction}`);
    } else if (actionType === "delete") {
      setIsDeleting(true);

      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(`/api/schedules/${confirmAction}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
        if (response.ok) {
          toast.success("Record deleted successfully");
        }
        setTimeout(() => {
          fetchData(page);
        }, 2000);
      } catch (error) {
        toast.error(`Error deleting record: ${error.message}`);
      } finally {
        setIsDeleting(false);
      }
    }

    setConfirmAction(null);
  };
  const cancelActionHandler = () => {
    setConfirmAction(null);
  };
  const calculateLiter = (amountMl) => amountMl / 1000;
  const calculatePercentage = (amountMl) => {
    const liter = calculateLiter(amountMl);
    return (liter / dailyGoalMl) * 100;
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  const totalPages = Math.ceil(total / limit);
  return (
    <div className="pt-36">
      <h1 className="h1-bold" id="hEading">
        Reports.
      </h1>

      <div className="relative overflow-x-auto mb-8">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Water Amount Ml
              </th>
              <th scope="col" className="px-6 py-3">
                Daily Goal Compeleted
              </th>
              <th scope="col" className="px-6 py-3">
                Progress Tracking
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
          {Data.length === 0 ? (
            <tr>
              <td colSpan="6" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                No data found
              </td>
            </tr>
          ) : (
            Data.map((item, index) => (
              <tr
                key={item._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {index + 1 + (page - 1) * limit}
                </th>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                  {new Date(item.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>
                <td className="px-6 py-4 text-gray-900 dark:text-gray-100">
                  <div className="flex flex-col space-y-2">
                      <div className="flex items-center justify-between bg-green-100 text-green-800 px-4 py-2 rounded-lg shadow-md dark:bg-green-800 dark:text-green-300">
                        <span className="font-medium">Daily Goal:</span>
                        <span className="font-semibold">{dailyGoalMl.toFixed(2)} L</span>
                      </div>
                      <div className="flex items-center justify-between bg-blue-100 text-blue-800 px-4 py-2 rounded-lg shadow-md dark:bg-blue-800 dark:text-blue-300">
                        <span className="font-medium">Consumed:</span>
                        <span className="font-semibold">{item.amountMl.toFixed(2)} ml</span>
                      </div>
                      <div className="flex items-center justify-between bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg shadow-md dark:bg-yellow-800 dark:text-yellow-300">
                        <span className="font-medium">Remaining:</span>
                        <span className="font-semibold">
                        {Math.max((dailyGoalMl * 1000 - item.amountMl) / 1000, 0).toFixed(2)} L
                        </span>
                      </div>
                    </div>
                  </td>
                <td className="px-6 py-4 text-gray-900 dark:text-gray-100">
                  {calculatePercentage(item.amountMl).toFixed(2)} %
                </td>
                <td className="px-6 py-4">
                  <div className="relative pt-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                        Progress
                      </span>
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                        {calculatePercentage(item.amountMl).toFixed(2)}%
                      </span>
                    </div>
                    <div className="relative w-full h-2 bg-gray-200 rounded-lg dark:bg-gray-700">
                      <div
                        className={`h-full rounded-lg transition-all duration-500 ease-in-out ${
                          calculatePercentage(item.amountMl) >= 100
                            ? "bg-gradient-to-r from-green-400 to-green-600"
                            : "bg-blue-500"
                        }`}
                        style={{
                          width: `${calculatePercentage(item.amountMl).toFixed(
                            2
                          )}%`,
                        }}
                      >
                        {calculatePercentage(item.amountMl) >= 100 && (
                          <span className="absolute right-0 top-1/2 transform -translate-y-1/2 text-xs font-semibold text-white px-2 bg-green-700 rounded-r-lg">
                            Complete
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                  <button
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 mr-2 dark:hover:text-blue-300 transition duration-200"
                    onClick={() => handleEdit(item._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800 dark:text-red-400 ml-2 dark:hover:text-red-300 transition duration-200"
                    data-modal-target="popup-modal"
                    data-modal-toggle="popup-modal"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          )
        )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`mx-1 px-3 py-1 border rounded ${
              i + 1 === page
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      {confirmAction && (
        <div className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto overflow-x-hidden bg-black bg-opacity-50">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={cancelActionHandler}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <svg
                  className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to {actionType} this item?
                </h3>
                <button
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                  onClick={confirmActionHandler}
                >
                  Yes, I'm sure
                </button>
                <button
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  onClick={cancelActionHandler}
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Toaster />
    </div>
  );
}
