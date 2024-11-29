import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import DemoCarousel from "./Slider";
function RoomDetails() {
  const [roomDetails, setRoomDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {roomid} = useParams();
  useEffect(() => {
    window.addEventListener("load", function (event) {
      document.querySelector('[data-dropdown-toggle="dropdown"]').click();
    });
    const fetchRoomDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/auth/getallrooms/${roomid}`
        );
        console.log(response.data);
        setRoomDetails(response.data);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error(error);
        setError(error);
        setLoading(false);
      }
    };

    if (roomid) {
      fetchRoomDetails();
    }
  }, [roomid]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading room details</div>;
  }

  return (
    <div>
      {/* Render details for the selected room */}
      <DemoCarousel images_urls={roomDetails.images_urls} />
      <div>
        <section class="text-gray-600 body-font overflow-hidden">
          <div class="container px-5 py-24 mx-auto">
            <div class="lg:w-4/5 mx-auto flex flex-wrap">
              <div class="w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 class="text-sm title-font text-gray-500 tracking-widest"></h2>
                <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">
                  {roomDetails.hostel_name}
                </h1>

                <div class="flex mb-4">
                  <span class="flex items-center">
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-4 h-4 text-indigo-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-4 h-4 text-indigo-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-4 h-4 text-indigo-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-4 h-4 text-indigo-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-4 h-4 text-indigo-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <span class="text-gray-600 ml-3">4 Reviews</span>
                  </span>
                  <span class="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                    <a class="text-gray-500">
                      <svg
                        fill="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        class="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                      </svg>
                    </a>
                    <a class="text-gray-500">
                      <svg
                        fill="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        class="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                      </svg>
                    </a>
                    <a class="text-gray-500">
                      <svg
                        fill="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        class="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                      </svg>
                    </a>
                  </span>
                  <div className="flex pl-[3rem]">
                    <a href={roomDetails.view}>
                      <img
                        src="Images/mapicon.png"
                        className="w-[2rem]"
                        alt=""
                      />
                    </a>
                  </div>
                </div>

                <div>
                  <section class="text-gray-600 body-font">
                    <div class="container">
                      <div class="flex flex-wrap sm:mx-auto sm:mb-2 -mx-2">
                        {roomDetails.washing_machine_availability === "yes" ? (
                          <div class="p-2 sm:w-1/2 w-full">
                            <div class="bg-gray-100 rounded flex p-4 h-full items-center">
                              <svg
                                fill="none"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="3"
                                class="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4"
                                viewBox="0 0 24 24"
                              >
                                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                <path d="M22 4L12 14.01l-3-3"></path>
                              </svg>
                              <span class="title-font font-medium">
                                Washing Machine Availabilty
                              </span>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}

                        {roomDetails.wifi_availability === "yes" ? (
                          <div class="p-2 sm:w-1/2 w-full">
                            <div class="bg-gray-100 rounded flex p-4 h-full items-center">
                              <svg
                                fill="none"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="3"
                                class="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4"
                                viewBox="0 0 24 24"
                              >
                                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                <path d="M22 4L12 14.01l-3-3"></path>
                              </svg>
                              <span class="title-font font-medium">
                                Wifi Availabilty
                              </span>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </section>
                </div>
                <p class="leading-relaxed">{roomDetails.description}</p>
                <div class="flex">
                  <span class="title-font font-medium text-2xl pt-[1rem] text-gray-900">
                    {roomDetails.rent}
                  </span>
                  <button class="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                    Button
                  </button>
                  <button class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                    <svg
                      fill="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* Additional details... */}
    </div>
  );
}

export default RoomDetails;
