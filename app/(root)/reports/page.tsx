"use client";

import { useEffect, useState } from "react";

export default function Reports() {
  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  const fetchData = async (page) => {
    setLoading(true);
    const res = await fetch(`/api/schedule?page=${page}&limit=${limit}`);
    const data = await res.json();
    if (data.success) {
      setData(data.data);
      setTotal(data.total);
    } else {
      console.error("Failed to fetch schedule:", data.error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  if (loading) {
    return <p>Loading...</p>;
  }
  const totalPages = Math.ceil(total / limit);

  return (
    <div>
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
            </tr>
          </thead>
          <tbody>
            {Data.map((item, index) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={item._id}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {index + 1}
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {new Date(item.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </th>
                <td className="px-6 py-4">{item.amountMl + " ml"}</td>
              </tr>
            ))}
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
    </div>
  );
}
