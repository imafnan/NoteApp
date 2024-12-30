import React, { useState } from 'react'
import { IoIosEyeOff } from "react-icons/io";
import { IoIosEye } from "react-icons/io";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import 'react-toastify/dist/ReactToastify.css';
import { Bounce, toast } from 'react-toastify';
import app from '../../Firebase';
import { Link, useNavigate } from 'react-router-dom';


const Register = () => {

const [email, setEmail] = useState("")
const [emailError, setEmailError] = useState("")

const [name, setName] = useState("")
const [nameError, setNameError] = useState("")

const [showPass, setShowPass] = useState(false)

const [password, setPassword] = useState("")
const [passwordError, setPasswordError] = useState("")

const navigate = useNavigate()
// ---------------------------------------------------//


// ----------------- authentication --------------//

const auth = getAuth();





// ----------------------------------------------------------//

const handelSubmit =()=>{
    if(!name){
        setNameError("Enter your name")
    }
    if(!email){
        setEmailError("Enter your email")
    }
    if(!password){
        setPasswordError("Enter your password")
    }
    else{
      createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    updateProfile(auth.currentUser, {
      displayName: name ,
      photoURL: "https://static.thenounproject.com/png/1820914-512.png"
    }).then(() => {
      sendEmailVerification(auth.currentUser)
      .then(() => {
        navigate('/login')
        toast.info('Register done', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
      });
    })


  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
   if(errorCode == "auth/email-already-in-use"){
    setEmailError("Email has already taken")
   }
   if(errorCode == "auth/weak-password"){
    setPasswordError("weak-password")
   }
  
  });

    }
}

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className="shadow-lg rounded-lg bg-white w-[400px] px-10 py-8">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">Register</h1>

        <div className="mb-4">
          <p className="text-red-500 text-sm">{nameError}</p>
          <input 
            onChange={(e) => { setName(e.target.value); setNameError("") }} 
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="Name" 
            type="text" 
          />
        </div>

        <div className="mb-4">
          <p className="text-red-500 text-sm">{emailError}</p>
          <input 
            onChange={(e) => { setEmail(e.target.value); setEmailError("") }} 
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="Email" 
            type="email" 
          />
        </div>

        <div className="mb-4 relative">
          <p className="text-red-500 text-sm">{passwordError}</p>
          <input 
            onChange={(e) => { setPassword(e.target.value); setPasswordError("") }} 
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="Password" 
            type={showPass ? "text" : "password"} 
          />
          {showPass ? (
            <IoIosEye onClick={() => setShowPass(!showPass)} className='absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-gray-600' />
          ) : (
            <IoIosEyeOff onClick={() => setShowPass(!showPass)} className='absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-gray-600' />
          )}
        </div>

        <button 
          onClick={handelSubmit} 
          className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
        >
          Register
        </button>

        <div className='mt-4 text-center'>
          <p className='text-sm text-gray-600'>Already have an account? 
            <Link className='text-blue-500 ml-1 hover:underline' to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
