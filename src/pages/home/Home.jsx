
import { Navbar } from "../../components/Navbar/Navbar";
import { useContacts } from "../../components/hooks/useContacts";
import { TableRows } from "./TableRows";

export const Home = () => {
  const [contacts, refetch] = useContacts();
  return (

    <>
      <Navbar />
      <div className="mt-10">
        <section className="container px-4 mx-auto">

          <div className="flex flex-col mt-6">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6">
              <div className="inline-block min-w-full py-2 align-middle md:px-6">
                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-700 dark:bg-gray-800 font-sans">
                      <tr>
                        <th scope="col" className="py-5  px-4 text-sm font-medium rtl:text-right text-gray-200 dark:text-gray-400">
                          <div className="flex items-center gap-x-3">
                            <input type="checkbox" className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                            <span>Contacts</span>
                          </div>
                        </th>

                        <th scope="col" className="px-12 py-5 text-center text-sm font-medium rtl:text-right text-gray-200 dark:text-gray-400">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                          </svg>
                        </th>

                        <th scope="col" className="px-4 py-5 text-center text-sm font-medium rtl:text-right text-gray-200 dark:text-gray-400">
                          CTA
                        </th>

                        <th scope="col" className="px-4 py-5 text-center text-sm font-medium rtl:text-right text-gray-200 dark:text-gray-400">
                          SPOC
                        </th>

                        <th scope="col" className="px-4 py-5 text-center text-sm font-medium rtl:text-right text-gray-200 dark:text-gray-400">
                          Mobile
                        </th>

                        <th scope="col" className="px-4 py-5 text-center text-sm font-medium rtl:text-right text-gray-200 dark:text-gray-400">
                          Email
                        </th>

                        <th scope="col" className="px-4 py-5 text-center text-sm font-medium rtl:text-right text-gray-200 dark:text-gray-400">
                          Created Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      {
                        contacts.map(row => <TableRows
                          key={row._id}
                          row={row}
                          refetch={refetch}>
                        </TableRows>
                        )
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
