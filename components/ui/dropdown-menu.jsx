import React from 'react'

export const DropdownMenu = ({ children }) => {
  return (
    <div className="relative">
      {/* {children} */}
    </div>
  )
}

export const DropdownMenuTrigger = ({ children }) => {
  return (
    <button className="p-2 bg-gray-200 rounded">
   
    </button>
  )
}

export const DropdownMenuContent = ({ children }) => {
  return (
    <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      {children}
    </div>
  )
}

export const DropdownMenuItem = ({ children }) => {
  return (
    <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
       
    </div>
  )
}