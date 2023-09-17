import { useContext } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../provider/AuthProvider";
import axios from 'axios';

export const SocialLogin = () => {
    const { user, googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate()

    const goggleHandler = () => {
        googleSignIn()
            .then(result => {
                const signInUser = result.user;
                if (signInUser) {
                    // Make the POST request using Axiost
                    const postUserData = { user_name: user?.displayName, user_email: user?.email, user_photo: user?.photoURL }
                    axios.post(`http://localhost:3000/users`, postUserData)
                        .then(response => {
                            // Handle the successful response here
                            console.log('POST request was successful', response.data);
                            if (response.data.insertedId) {
                                toast.dismiss()
                                toast.success('Welcome your account!', {
                                    position: "top-right",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "light",
                                });
                                navigate('/')
                            }
                        })
                        .catch(error => {
                            // Handle any errors that occurred during the POST request
                            console.error('Error making POST request', error);
                        });
                }
            })
            .catch(error => {
                console.log(error)
                toast.dismiss()
                toast.warn('something went wrong!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            });

    }

    return (
        <div className="flex gap-5 items-center justify-center my-5 md:mx-10">
            <div onClick={goggleHandler} className="md:w-[110px] flex items-center justify-between border rounded-md px-2 py-1 bg-gray-200 hover:bg-gray-50">
                <div className="w-[28px]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" x="2px" y="1px" viewBox="0 0 48 48">
                        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                    </svg>
                </div>
                <span className="text-sm uppercase text-gray-500 font-medium">Google</span>
            </div>
        </div>
    )
}