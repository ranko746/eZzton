import { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';

const Drivers = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Drivers'));
    });
    const [addDriverModal, setAddDriverModal] = useState<any>(false);

    const [defaultParams] = useState({
        id: null,
        name: '',
        email: '',
        phone: ''
    });

    const [params, setParams] = useState<any>(JSON.parse(JSON.stringify(defaultParams)));

    const changeValue = (e: any) => {
        const { value, id } = e.target;
        setParams({ ...params, [id]: value });
    };

    const [search, setSearch] = useState<any>('');
    const [driverList] = useState<any>([
        {
          id: 1,
          name: 'alangreen',
          email: 'alan@mail.com',
          phone: '12345678'
        },
        {
          id: 2,
          name: 'alangreen',
          email: 'alan@mail.com',
          phone: '12345678'
        },
        {
          id: 3,
          name: 'alangreen',
          email: 'alan@mail.com',
          phone: '12345678'
        },
        {
          id: 4,
          name: 'alangreen',
          email: 'alan@mail.com',
          phone: '12345678'
        }
    ]);

    const [filteredItems, setFilteredItems] = useState<any>(driverList);

    useEffect(() => {
        setFilteredItems(() => {
            return driverList.filter((item: any) => {
                return item.name.toLowerCase().includes(search.toLowerCase());
            });
        });
    }, [search, driverList]);

    const saveDriver = () => {
        if (!params.name) {
            showMessage('Name is required.', 'error');
            return true;
        }
        if (!params.email) {
            showMessage('Email is required.', 'error');
            return true;
        }
        if (!params.phone) {
            showMessage('Phone is required.', 'error');
            return true;
        }

        if (params.id) {
            //update driver
            let driver: any = filteredItems.find((d: any) => d.id === params.id);
            driver.drivername = params.drivername;
            driver.email = params.email;
            driver.first_name = params.first_name;
            driver.last_name = params.last_name;
        } else {
            //add driver
            let maxDriverId = filteredItems.length ? filteredItems.reduce((max: any, character: any) => (character.id > max ? character.id : max), filteredItems[0].id) : 0;

            let driver = {
                id: maxDriverId + 1,                
                name: params.name,
                email: params.email,
                phone: params.phone
            };
            filteredItems.splice(0, 0, driver);
            //   searchContacts();
        }

        showMessage('Driver has been saved successfully.');
        setAddDriverModal(false);
    };

    const editDriver = (driver: any = null) => {
        const json = JSON.parse(JSON.stringify(defaultParams));
        setParams(json);
        if (driver) {
            let json1 = JSON.parse(JSON.stringify(driver));
            setParams(json1);
        }
        setAddDriverModal(true);
    };

    const deleteDriver = (driver: any = null) => {
        setFilteredItems(filteredItems.filter((d: any) => d.id !== driver.id));
        showMessage('Driver has been deleted successfully.');
    };

    const showMessage = (msg = '', type = 'success') => {
        const toast: any = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            customClass: { container: 'toast' },
        });
        toast.fire({
            icon: type,
            title: msg,
            padding: '10px 20px',
        });
    };

    return (
        <div>
            <div className="flex items-center justify-between flex-wrap gap-4">
                <h2 className="text-xl">Drivers</h2>
                <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
                    <div className="flex gap-3">
                        <div>
                            <button type="button" className="btn btn-primary" onClick={() => editDriver()}>
                                <svg className="ltr:mr-2 rtl:ml-2" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="10" cy="6" r="4" stroke="currentColor" strokeWidth="1.5" />
                                    <path
                                        opacity="0.5"
                                        d="M18 17.5C18 19.9853 18 22 10 22C2 22 2 19.9853 2 17.5C2 15.0147 5.58172 13 10 13C14.4183 13 18 15.0147 18 17.5Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    />
                                    <path d="M21 10H19M19 10H17M19 10L19 8M19 10L19 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                                Add Driver
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        <input type="text" placeholder="Search Drivers" className="form-input py-2 ltr:pr-11 rtl:pl-11 peer" value={search} onChange={(e) => setSearch(e.target.value)} />
                        <button type="button" className="absolute ltr:right-[11px] rtl:left-[11px] top-1/2 -translate-y-1/2 peer-focus:text-primary">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="11.5" cy="11.5" r="9.5" stroke="currentColor" strokeWidth="1.5" opacity="0.5"></circle>
                                <path d="M18.5 18.5L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-5 panel p-0 border-0 overflow-hidden">
                <div className="table-responsive">
                    <table className="table-striped table-hover">
                        <thead>
                            <tr>
                              <th>ID</th> 
                              <th>Name</th>
                              <th>Email</th>
                              <th>Phone</th>
                              <th className="!text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredItems.map((driver: any) => {
                                return (
                                    <tr key={driver.id}>
                                        <td>{driver.id}</td>
                                        <td>{driver.name}</td>
                                        <td>{driver.email}</td>
                                        <td>{driver.phone}</td>
                                        <td>
                                            <div className="flex gap-4 items-center justify-center">
                                                <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => editDriver(driver)}>
                                                    Edit
                                                </button>
                                                <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => deleteDriver(driver)}>
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <Transition appear show={addDriverModal} as={Fragment}>
                <Dialog as="div" open={addDriverModal} onClose={() => setAddDriverModal(false)} className="relative z-50">
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-[black]/60" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center px-4 py-8">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                                    <button
                                        type="button"
                                        onClick={() => setAddDriverModal(false)}
                                        className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                        </svg>
                                    </button>
                                    <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                        {params.id ? 'Edit Driver' : 'Add Driver'}
                                    </div>
                                    <div className="p-5">
                                        <form>
                                            <div className="mb-5">
                                                <label htmlFor="name">Name</label>
                                                <input id="name" type="text" placeholder="Enter name" className="form-input" value={params.name} onChange={(e) => changeValue(e)} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="email">Email</label>
                                                <input id="email" type="email" placeholder="Enter email" className="form-input" value={params.email} onChange={(e) => changeValue(e)} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="number">Phone</label>
                                                <input id="text" type="text" placeholder="Enter phone" className="form-input" value={params.phone} onChange={(e) => changeValue(e)} />
                                            </div>
                                            
                                            <div className="flex justify-end items-center mt-8">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => setAddDriverModal(false)}>
                                                    Cancel
                                                </button>
                                                <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={saveDriver}>
                                                    {params.id ? 'Update' : 'Add'}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default Drivers;
