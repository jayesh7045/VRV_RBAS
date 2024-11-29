import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Filter from "./Filter";
function Rooms() {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const {name} = useParams();
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [wifi, setWifi] = useState(false);
  const [washing, setWashing] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [tempRooms, setTempRooms] = useState([]);

  useEffect(() => {
    setUser(name || "");
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/auth/getallrooms"
        );
        if (!response) {
          setLoading(true);
        }
        const data = await response.data;
        console.log(data);
        setRooms(data);
        setTempRooms(data);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filteredRooms = rooms;

    if (wifi) {
      filteredRooms = filteredRooms.filter(
        (r) => r.wifi_availability === "yes"
      );
    }

    if (washing) {
      filteredRooms = filteredRooms.filter(
        (r) => r.washing_machine_availability === "yes"
      );
    }

    setTempRooms(filteredRooms);
  }, [wifi, washing, rooms]);

  return (
    <div>
      <div className="text-green-600  font-bold text-[1.8rem] flex justify-center">
        {user && `Welcome ${user}`}
      </div>
      <div className="flex pt-[1rem] justify-center space-x-8 items-center"></div>
      <div className="flex justify-center pt-[1rem] pl-[2rem]"></div>

      <div className="flex flex-row w-full space-x-5">
        {console.log(rooms)}
        <Filter
          setWashing={setWashing}
          setWifi={setWifi}
          wifi={wifi}
          washing={washing}
        ></Filter>
        <div className="w-[3/4]">
          {tempRooms.map((room, index) => (
            <section className="text-gray-600 body-font">
              <div className="container mx-auto flex px-5 py-12 md:flex-row flex-col items-center">
                <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                  <img
                    className="object-cover object-center rounded"
                    alt="hero"
                    src={room.images_urls[0]}
                  />
                </div>
                <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                  <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                    {room.hostel_name}
                  </h1>
                  <p className="mb-8 leading-relaxed">{room.description}</p>
                  <div className="flex flex-row gap-5 justify-center">
                    <a href={`/rooms/${user}/${room._id}`}>
                      <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                        Explore
                      </button>
                    </a>
                    <a href={`/owner/${room.owner_id}`}>
                      <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        Contact Us
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Rooms;
