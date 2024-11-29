import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function EnterOtp() {
  const navigate = useNavigate();
    const [otp, setOtp] = useState({
    a: "",
    b: "",
    c: "",
    d: "",
    e: "",
    f: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value.length > 0 && /^[0-9]$/.test(value)) {
      setOtp((prevOtp) => ({
        ...prevOtp,
        [name]: value,
      }));
    }
  };

  const isOtpComplete = Object.values(otp).every((digit) => digit.length === 1);

  const otpString = Object.values(otp).join("");

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if (!isOtpComplete) {
      return;
    }

    try {
        const dat = JSON.parse(localStorage.getItem('userData'))
        const val = {
            email : dat.email,
            otp : otpString
        }
      const response = await axios.post("http://localhost:8000/api/auth/verify_otp", val, {
        headers : {
        "Content-Type": "application/json",
      }});

      if (response.data.success) {
        navigate("/login");
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("An error occurred. Please try again.", error);
    }
  };

  return (
    <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Mobile Phone Verification</h1>
        <p className="text-[15px] text-slate-500">
          Enter the 6-digit verification code that was sent to your phone number.
        </p>
      </header>
      <form id="otp-form" onSubmit={handleSubmit}>
        <div className="flex items-center justify-center gap-3">
          {["a", "b", "c", "d", "e", "f"].map((digit, index) => (
            <input
              key={digit}
              type="text"
              name={digit}
              value={otp[digit]}
              onChange={handleChange}
              className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              maxLength="1"
            />
          ))}
        </div>
        <div className="max-w-[260px] mx-auto mt-4">
          <button
            type="submit"
            className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
            disabled={!isOtpComplete} // Disable button if OTP is incomplete
          >
            Verify Account
          </button>
        </div>
      </form>
      <div className="text-sm text-slate-500 mt-4">
        Didn't receive the code?{" "}
        <a className="font-medium text-indigo-500 hover:text-indigo-600" href="#0">
          Resend
        </a>
      </div>
    </div>
  );
}

export default EnterOtp;
