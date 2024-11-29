import React, { useEffect, useState } from "react";

function Filter({setWifi, wifi, setWashing, washing}) {
    
  const handleDropdownClick = () => {
    const dropdown = document.getElementById("dropdown");
    dropdown.classList.toggle("hidden"); // Toggle the 'hidden' class
  };

  
  const handleClick1=()=>{
    return setWifi((prev) => {return !prev})
  }

  const handleClick2=()=>{
    return setWashing((prev) => {return !prev})
  }
  return (
    <div>
        <div class="flex flex-col items-center justify-center p-4">
        <button
          id="dropdownDefault"
          data-dropdown-toggle="dropdown"
          class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          type="button"
          onClick={handleDropdownClick}
        >
          Filter by category
          <svg
            class="w-4 h-4 ml-2"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>
        <div
          id="dropdown"
          class="z-10 hidden w-56 p-3 bg-white rounded-lg shadow dark:bg-gray-700"
        >
          <h6 class="mb-3 text-sm font-medium text-gray-900 dark:text-white">
            Category
          </h6>
          <ul class="space-y-2 text-sm" aria-labelledby="dropdownDefault">
            <li class="flex items-center">
              <input
                id="wifi"
                type="checkbox"
                value={wifi}
                onChange={handleClick1}
                class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />

              <label
                for="wifi"
                class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
              >
                Wifi Available
              </label>
            </li>

            <li class="flex items-center">
              <input
                id="washing"
                type="checkbox"
                value={washing}
                onChange={handleClick2}
                class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />

              <label
                for="washing"
                class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
              >
                Washing Machine Available
              </label>
            </li>
            
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Filter;
