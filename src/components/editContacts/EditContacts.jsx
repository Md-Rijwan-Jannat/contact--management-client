import axios from 'axios'
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';


export const EditContacts = ({ isOpenModal, closeModal, row ,_id, refetch}) => {
    const { name, email, date, number, spoc } = row
    const { register, handleSubmit, } = useForm();

    // login submit handler
    const onSubmit = data => {
        toast.loading('Loading..')
        const updateContactData = {_id:_id, name: data?.name, email: data?.email, spoc: data?.spoc, date: data?.date, number: data?.number }
        axios.post(`https://contact-management-server-oviv6vv62-md-rijwan-jannat.vercel.app/my-contacts`, updateContactData)
            .then(response => {
                // Handle the successful response here
                console.log('POST request was successful', response.data);
                if (response.data.modifiedCount) {
                    toast.dismiss()
                    refetch();
                    toast.success('successfully update!', {
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
                                Edit Contacts
                            </h3>

                            <form className="mt-4" action="#">
                                <label className="block mt-3">
                                    <input
                                        {...register("name")}
                                        type="name" name="name" defaultValue={name} id="name" placeholder="name" className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                                </label>
                                <label className="block mt-3">
                                    <input
                                        {...register("email")}
                                        type="email" name="email" defaultValue={email} id="email" placeholder="user@email.xyz" className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                                </label>
                                <label className="block mt-3">
                                    <input
                                        {...register("spoc")}
                                        type="spoc" name="spoc" id="spoc" defaultValue={spoc} placeholder="spoc" className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                                </label>
                                <label className="block mt-3">
                                    <input
                                        {...register("number")}
                                        type="number" name="number" defaultValue={number} id="number" placeholder="phone" className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                                </label>
                                <label className="block mt-3">
                                    <input
                                        {...register("date")}
                                        type="date" name="date" defaultValue={date} id="date" placeholder="date" className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                                </label>

                                <div className="mt-4 sm:flex sm:items-center sm:-mx-2">
                                    <Link
                                        to="#"
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
                                        Confirm
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


