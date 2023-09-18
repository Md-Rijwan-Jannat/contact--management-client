import { BsWhatsapp } from "react-icons/bs";
import { FaPhone, FaRegEdit, FaTrash } from "react-icons/fa";
import { TbMessageDots } from "react-icons/tb";
import { FiMail } from "react-icons/fi";
import { useState } from 'react'
import Swal from "sweetalert2";
import { EditContacts } from "../../components/editContacts/EditContacts";

export const TableRows = ({ row, refetch }) => {
    console.log(row);
    const { _id, name, email, image, date, number, spoc } = row
    const [isOpen, setIsOpen] = useState();

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


    //  deleteHandler
    const deleteHandler = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://contact-management-server-oviv6vv62-md-rijwan-jannat.vercel.app/my-contacts/delete?id=${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Your user has been deleted.',
                                'success'
                            )
                        }
                    })

            }
        })


    }
    
    return (
        <tr className="hover">
            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                <div className="inline-flex items-center gap-x-3">
                    <input type="checkbox" className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />

                    <div className="flex items-center gap-x-2">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-gray-800">
                            <img className="rounded-md" src={image} alt="" />
                        </div>

                        <div>
                            <h2 className="font-normal text-gray-800 dark:text-white ">{name}</h2>
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-4 py-4 text-sm whitespace-nowrap flex items-center justify-center">
                <button onClick={openDrop} className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                    </svg>
                    {isOpen && (
                        <div onClick={closeDrop} className="absolute z-[10] w-48 py-2 mt-2 origin-top-right bg-white rounded-md shadow-xl">
                            <div
                                onClick={() => deleteHandler(_id)}
                                className="flex items-center gap-2 px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                <FaTrash /> Delete
                            </div>
                            <div
                            onClick={openModal}
                                className="flex items-center gap-2 px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                <FaRegEdit /> Edit
                            </div>
                        </div>
                    )}
                </button>

            </td>
            <td className="px-4 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
                <span className="flex flex-row items-center gap-3 justify-between">
                    <div className="bg-gray-100 w-8 h-7 rounded-full p-2 hover:bg-gray-200 text-blue-300">
                        <FaPhone className="text-lg" />
                    </div>
                    <div className="bg-gray-100 w-8 h-7 rounded-full p-2 hover:bg-gray-200 text-blue-300">
                        <TbMessageDots className="text-lg" />
                    </div>
                    <div className="bg-gray-100 w-8 h-7 rounded-full p-2 hover:bg-gray-200 text-blue-300">
                        <FiMail className="text-lg" />
                    </div>
                    <div className="bg-gray-100 w-8 h-7 rounded-full p-2 hover:bg-gray-200 text-blue-300">
                        <BsWhatsapp className="text-lg" />
                    </div>
                </span>
            </td>
            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap text-center">{spoc}</td>
            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap text-center">{number}</td>
            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap text-center">{email}</td>
            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap text-center">{date}</td>
            <EditContacts isOpenModal={isOpenModal} closeModal={closeModal} _id={_id} row={row} refetch={refetch}/>
        </tr>
    )
}
