import { BiSearch } from "react-icons/bi";
import { HiArrowDownTray, HiArrowUpTray, HiPlus } from "react-icons/hi2";

export const Navbar = () => {
  return (
    <div className="w-full px-5 py-2 bg-blue-400">
      <div className="flex items-center flex-row justify-between">
        <div className="text-sm mg:text-lg lg:text-xl text-gray-200 font-medium">Contacts</div>
        <div className="flex items-center gap-2">
          <div className="relative w-[150px] md:w-[200px] h-6 md:h-10">
            <input className="w-full h-full px-2 bg-gray-50 text-gray-400 placeholder:text-gray-400 rounded focus:outline-none focus:outline-gray-300 text-sm md:text-lg" name="" placeholder="Contacts info" id="" /> 
            <span className="absolute right-2 top-[7px] md:top-[14px]"><BiSearch className="text-gray-400"/></span>
            </div>
          <div className="bg-gray-50 rounded w-6 md:w-10 h-6 md:h-10 flex items-center justify-center text-gray-500"> <span className="w-full h-full p-2"><HiArrowDownTray className="md:text-[20px] text-[10px] lg:text-[25px]"/></span></div>
          <div className="bg-gray-50 rounded w-6 md:w-10 h-6 md:h-10 flex items-center justify-center text-gray-500">  <span className="w-full h-full p-2"> <HiArrowUpTray className="md:text-[20px] text-[10px] lg:text-[25px]"/> </span></div>
          <div className="bg-gray-50 rounded w-6 md:w-10 h-6 md:h-10 flex items-center justify-center text-gray-500">  <span className="w-full h-full p-2"> <HiPlus className="md:text-[20px] text-[10px] lg:text-[25px]"/> </span></div>
        </div>
      </div>
    </div>
  )
}
