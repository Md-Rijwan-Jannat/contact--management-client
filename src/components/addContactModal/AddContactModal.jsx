import axios from 'axios'
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';


const img_token = import.meta.env.VITE_image_hosting_token;
export const AddContactModal = ({ isOpenModal, closeModal }) => {
    const {user} = useAuth();
    const { register, handleSubmit, } = useForm();

    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_token}`

    // login submit handler
    const onSubmit = data => {
        toast.loading('Loading..')

        const formData = new FormData();
        formData.append('image', data.image[0])
        fetch(img_hosting_url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imageRes => {
                if (imageRes.success) {
                    const imgUrl = imageRes.data.display_url;
                    console.log(imgUrl)
                    const postContactData = { name: data?.name, email: data?.email, user_email:user?.email, image: imgUrl, spoc: data?.spoc, date: data?.date, number: data?.number }
                    axios.post(`https://contact-management-server-oviv6vv62-md-rijwan-jannat.vercel.app/contacts`, postContactData)
                        .then(response => {
                            // Handle the successful response here
                            console.log('POST request was successful', response.data);
                            if (response.data.insertedId) {
                                toast.dismiss()
                                toast.success('Welcome your account!', {
                                    position: "top-right",
                                    autoClose: 7000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "light",
                                });
                            }
                        })
                        .catch(error => {
                            // Handle any errors that occurred during the POST request
                            console.error('Error making POST request', error);
                        });
                }
            })
    };

    return (
        <div className="relative flex justify-center">

            {isOpenModal && (
                <div
                    className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-50"
                    aria-labelledby="modal-title"
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                        <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
                            &#8203;
                        </span>

                        <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
                            <h3 className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">
                                Add Your and your colleague contacts
                            </h3>

                            <form className="mt-4" action="#">
                                <label className="block mt-3">
                                    <input
                                        {...register("name", { required: true })}
                                        type="name" name="name" id="name" placeholder="name" className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                                </label>
                                <label className="block mt-3">
                                    <input
                                        {...register("email", { required: true })}
                                        type="email" name="email" id="email" placeholder="user@email.xyz" className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                                </label>
                                <label className="block mt-3">
                                    <input
                                        {...register("spoc", { required: true })}
                                        type="spoc" name="spoc" id="spoc" placeholder="spoc" className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                                </label>
                                <label className="block mt-3">
                                    <input
                                        {...register("number", { required: true })}
                                        type="number" name="number" id="number" placeholder="phone" className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                                </label>
                                <label className="block mt-3">
                                    <input
                                        {...register("date", { required: true })}
                                        type="date" name="date" id="date" placeholder="date" className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                                </label>

                                <div>
                                    <label className="block text-sm text-gray-500 dark:text-gray-300">
                                        <input {...register("image", { required: true })} type="file" className="block w-full px-3 py-2 my-3 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300" />
                                    </label>
                                </div>

                                <div className="mt-4 sm:flex sm:items-center sm:-mx-2">
                                    <Link
                                        to="/"
                                        className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                                        onClick={closeModal}
                                    >
                                        Cancel
                                    </Link>

                                    <button
                                        onClick={handleSubmit(onSubmit)}
                                        type="button"
                                        className="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                                    >
                                        Add Contact
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div >
            )
            }
        </div >
    );
};
