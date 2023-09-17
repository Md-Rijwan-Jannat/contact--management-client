import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "./useAuth";


export const useContacts = () => {
    const {user} = useAuth();
    const { data: contacts = [], refetch } = useQuery(['contacts'], async () => {
        const res = await axios.get(`http://localhost:3000/my-contacts?email=${user?.email}`)
        return res.data;
    })
    return [contacts, refetch]
};