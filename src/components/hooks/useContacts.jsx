import { useQuery } from "@tanstack/react-query";
import axios from "axios";


export const useContacts = () => {
    const { data: contacts = [], refetch } = useQuery(['contacts'], async () => {
        const res = await axios.get(`https://contact-management-server-oviv6vv62-md-rijwan-jannat.vercel.app/my-contacts`)
        refetch();
        return res.data;
    })
    return [contacts, refetch]
};

