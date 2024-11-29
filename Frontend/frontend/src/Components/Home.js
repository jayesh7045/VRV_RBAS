import React, { useEffect, useState } from "react";
import Signup from "./Signup";
import Login from "./Login";
import UserDev from "./UserDev";
function Home() {
  const [hasAccount, createAccount] = useState(false);
  useEffect(()=>{
    localStorage.setItem('hasacc', false);
  }, [])
  return (
    <div>
      <div className="flex flex-row justify-between w-full ">
        <div className="w-1/2 pt-44">
          {" "}
          <UserDev></UserDev>
        </div>
        <img src="Images/hostelmainpage.jpg" alt="" />
      </div>
    </div>
  );
}

export default Home;
