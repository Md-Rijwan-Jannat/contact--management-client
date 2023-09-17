import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { BiSearch } from "react-icons/bi";
import { HiArrowDownTray, HiArrowUpTray, HiPlus } from "react-icons/hi2";
import { FaUser } from "react-icons/fa";
import useAuth from '../hooks/useAuth';
import { toast } from 'react-toastify';
import { AddContactModal } from '../addContactModal/AddContactModal';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const openDrop = () => {
    setIsOpen(!isOpen);
  };

  const closeDrop = () => {
    setIsOpen(false);
  };

// Modasl
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  const { user, logOut } = useAuth();
  const logoutHandler = () => {
    logOut()
      .then(result => {
        const signInUser = result.user;
        if (signInUser) {
          toast.dismiss()
          toast.success('successfully log out your account!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
          });
          navigate('/login')
        }
      })
      .catch(error => {
        console.log(error)
      });
  }
  return (
    <div className="flex flex-col">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6">
        <div className="inline-block min-w-full py-2 align-middle md:px-6">
          <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
            <div className="min-w-full divide-y bg-gray-700 py-3 px-4 md:px-10 lg:px-16 xl:px-10 divide-gray-200 dark:divide-gray-700">
              <div className="flex items-center flex-row justify-between">
                <div className="text-sm mg:text-lg lg:text-xl text-gray-200 font-medium">Contacts</div>
                <div className="flex items-center gap-2">
                  <div className="relative w-[150px] md:w-[200px] h-6 md:h-10">
                    <input className="w-full h-full px-2 bg-gray-50 text-gray-400 placeholder:text-gray-400 rounded focus:outline-none focus:outline-gray-300 border-2 text-sm md:text-lg" name="" placeholder="Contacts info" id="" />
                    <span className="absolute right-2 top-[7px] md:top-[14px]"><BiSearch className="text-gray-400" /></span>
                  </div>
                  <div className="bg-gray-50 rounded w-6 md:w-10 h-6 md:h-10 flex items-center justify-center text-gray-500"> <span className="w-full h-full p-2"><HiArrowDownTray className="md:text-[20px] text-[10px] lg:text-[25px]" /></span></div>
                  <div className="bg-gray-50 rounded w-6 md:w-10 h-6 md:h-10 flex items-center justify-center text-gray-500">  <span className="w-full h-full p-2"> <HiArrowUpTray className="md:text-[20px] text-[10px] lg:text-[25px]" /> </span></div>
                  <div  onClick={openModal} className="bg-gray-50 rounded w-6 md:w-10 h-6 md:h-10 flex items-center justify-center text-gray-500">  <span className="w-full h-full p-2"> <HiPlus className="md:text-[20px] text-[10px] lg:text-[25px]" /> </span></div>
                  <div className="bg-gray-50 rounded w-6 md:w-10 h-6 md:h-10 flex items-center justify-center text-gray-500">
                    {
                      user?.photoURL ? <img className="w-full h-full p-2" src={user?.photoURL} alt="" /> : <FaUser className="text-6 md:text-10 text-6 md:text-10" />
                    }
                  </div>
                  <div className="relative inline-block" >
                    {/* Dropdown toggle button */}
                    <button
                      onClick={openDrop}
                      className="relative z-10 block p-2 text-gray-700 bg-white border border-transparent rounded-md focus:border-blue-500 focus:ring-opacity-40 focus:ring-blue-300 w-6 md:w-10 h-6 md:h-10 focus:outline-none"
                    >
                      <svg
                        className="w-5 h-5 text-gray-800"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Dropdown menu */}
      {isOpen && (
        <div onClick={closeDrop} className="absolute top-[80px] right-5 z-[999999] w-48 py-2 mt-2 origin-top-right bg-white rounded-md shadow-xl">
          <Link
            to="#"
            className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            your profile
          </Link>
          <Link
            to="#"
            className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Help
          </Link>
          {
            user?.email ? <Link
              onClick={logoutHandler}
              to="/login"
              className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Sign Out
            </Link> : <Link
              onClick={logoutHandler}
              to="/SignUp"
              className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Login
            </Link>
          }
        </div>
      )}
      <AddContactModal isOpenModal={isOpenModal} closeModal={closeModal} />
    </div>
  )
}

