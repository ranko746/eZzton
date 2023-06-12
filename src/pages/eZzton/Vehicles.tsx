import { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { Field, Form, Formik } from 'formik';
import Select from 'react-select';

const clientOptions = [
    { value: 'individual', label: 'Individual' },
    { value: 'business', label: 'Business' },
    { value: 'organization', label: 'Organization' },
];  

const paymentOptions = [
    { value: 'cash', label: 'Cash' },
    { value: 'debit/credit', label: 'Debit/Credit' },
    { value: 'on-account', label: 'On Account' },
    { value: 'passes', label: 'Passes' },
];

const transactionTypeOptions = [
    { value: 'in', label: 'In' },
    { value: 'out', label: 'Out' }
];

const clients = [
    { value: 1, label: 'Alan Green, Individual' },
    { value: 2, label: "Linda Nelson, Business" },
    { value: 3, label: "Lila Perry, Organization" },
    { value: 4, label: 'Alan Green, Individual' },
    { value: 5, label: "Linda Nelson, Business" },
    { value: 6, label: "Lila Perry, Organization" },
    { value: 7, label: 'Alan Green, Individual' },
    { value: 8, label: "Linda Nelson, Business" },
    { value: 9, label: "Lila Perry, Organization" }
];

const Vehicles = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('vehicles'));
    });
    const [addVehicleModal, setAddVehicleModal] = useState<any>(false);
    const [addUserModal, setAddUserModal] = useState<any>(false);
    const [addTransactionModal, setAddTransactionModal] = useState<any>(false);

    const [value, setValue] = useState<any>('list');
    const [defaultParams] = useState({
        id: null,
        name: '',
        email: '',
        phone: '',
        role: '',
        location: '',
    });

    const [params, setParams] = useState<any>(JSON.parse(JSON.stringify(defaultParams)));

    const changeValue = (e: any) => {
        const { value, id } = e.target;
        setParams({ ...params, [id]: value });
    };

    const [search, setSearch] = useState<any>('');
    const [vehicleList] = useState<any>([
        {
            id: 1,
            license_plate: "123456",
            vehicle_type: "Truck",
            vehicle_make: "Toyota",
            vehicle_model: "A3",
            account_name: "Alan Green",
            account_type: "individual",
            account_owner: "Alan Green"
        },
        {
            id: 2,
            license_plate: "123456",
            vehicle_type: "Truck",
            vehicle_make: "Kia",
            vehicle_model: "A3",
            account_name: "Linda Nelson",
            account_type: "business",
            account_owner: "Linda Nelson"
        },
        {
            id: 3,
            license_plate: "123456",
            vehicle_type: "Truck",
            vehicle_make: "Nissan",
            vehicle_model: "A-Class",
            account_name: "Lila Perry",
            account_type: "organization",
            account_owner: "Linda Nelson"
        }
    ]);

    const [filteredItems, setFilteredItems] = useState<any>(vehicleList);

    useEffect(() => {
        setFilteredItems(() => {
            return vehicleList.filter((item: any) => {
                return item.license_plate.toLowerCase().includes(search.toLowerCase());
            });
        });
    }, [search, vehicleList]);

    const saveUser = () => {
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
        if (!params.role) {
            showMessage('Occupation is required.', 'error');
            return true;
        }

        if (params.id) {
            //update user
            let user: any = filteredItems.find((d: any) => d.id === params.id);
            user.name = params.name;
            user.email = params.email;
            user.phone = params.phone;
            user.role = params.role;
            user.location = params.location;
        } else {
            //add user
            let maxUserId = filteredItems.length ? filteredItems.reduce((max: any, character: any) => (character.id > max ? character.id : max), filteredItems[0].id) : 0;

            let user = {
                id: maxUserId + 1,
                path: 'profile-35.png',
                name: params.name,
                email: params.email,
                phone: params.phone,
                role: params.role,
                location: params.location,
                posts: 20,
                followers: '5K',
                following: 500,
            };
            filteredItems.splice(0, 0, user);
            //   searchvehicles();
        }

        showMessage('User has been saved successfully.');
        setAddVehicleModal(false);
    };

    const editUser = (user: any = null) => {
        const json = JSON.parse(JSON.stringify(defaultParams));
        setParams(json);
        if (user) {
            let json1 = JSON.parse(JSON.stringify(user));
            setParams(json1);
        }
        setAddUserModal(true);
    };

    const editVehicle = (user: any = null) => {
        const json = JSON.parse(JSON.stringify(defaultParams));
        setParams(json);
        if (user) {
            let json1 = JSON.parse(JSON.stringify(user));
            setParams(json1);
        }
        setAddVehicleModal(true);
    };

    const saveVehicle = () => {
        if (!params.license_plate) {
            showMessage('License plate is required.', 'error');
            return true;
        }
        if (!params.vehicle_type) {
            showMessage('Vehicle type is required.', 'error');
            return true;
        }
        if (!params.vehicle_make) {
            showMessage('Vehicle make is required.', 'error');
            return true;
        }
        if (!params.vehicle_model) {
            showMessage('Vehicle model is required.', 'error');
            return true;
        }

        if (params.id) {
            //update user
            let vehicle: any = filteredItems.find((d: any) => d.id === params.id);
            vehicle.license_plate = params.license_plate;
            vehicle.vehicle_type = params.vehicle_type;
            vehicle.vehicle_make = params.vehicle_make;
            vehicle.vehicle_model = params.vehicle_model;
        } else {
            //add user
            let maxVehicleId = filteredItems.length ? filteredItems.reduce((max: any, character: any) => (character.id > max ? character.id : max), filteredItems[0].id) : 0;

            let vehicle = {
                id: maxVehicleId + 1,                
                license_plate: params.license_plate,
                vehicle_type: params.vehicle_type,
                vehicle_make: params.vehicle_make,
                vehicle_model: params.vehicle_model,
                              
            };
            filteredItems.splice(0, 0, vehicle);
            //   searchContacts();
        }

        showMessage('Vehicle has been saved successfully.');
        setAddVehicleModal(false);
    };

    const editTransaction = (transaction: any = null) => {
        console.log(transaction);
        setAddTransactionModal(true);
    }

    const saveTransaction = () => {
        
    }

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
            <div>
                <h2 className="text-xl p-2">Vehicles</h2>
                <form className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-black">
                    <div className="flex flex-col sm:flex-row">
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-4 gap-5">
                            <div>
                                <label htmlFor="license_plate">License Plate</label>
                                <input id="license_plate" type="text" placeholder="" className="form-input" />
                            </div>
                            <div>
                                <label htmlFor="vehicle_make">Vehicle Type</label>
                                <input id="vehicle_make" type="text" placeholder="" className="form-input" />
                            </div>
                            <div>
                                <label htmlFor="vehicle_make">Vehicle Make</label>
                                <input id="vehicle_make" type="text" placeholder="" className="form-input" />
                            </div>
                            <div>
                                <label htmlFor="vehicle_model">Vehicle Model</label>
                                <input id="vehicle_model" type="text" placeholder="" className="form-input" />
                            </div>
                            <div>
                                <label htmlFor="account_number">Account Number</label>
                                <input id="account_number" type="text" placeholder="" className="form-input" />
                            </div>
                            <div>
                                <label htmlFor="account_name">Account Name</label>
                                <input id="account_name" type="text" placeholder="" className="form-input" />
                            </div>
                            <div>
                                <label htmlFor="account_type">Account Type</label>
                                <input id="account_type" type="text" placeholder="" className="form-input" />
                            </div>
                            <div>
                                <label htmlFor="account_owner">Account Owner</label>
                                <input id="account_owner" type="text" placeholder="" className="form-input" />
                            </div>
                            <div className="mt-3">
                                <button type="button" className="btn btn-primary w-full">
                                    Search
                                </button>
                            </div>
                            <div className="mt-3">
                                <button type="button" className="btn btn-primary w-full" onClick={() => editVehicle()}>
                                    <svg className="ltr:mr-2 rtl:ml-2" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            opacity={0.9}
                                            d="M12 2C8.22876 2 6.34315 2 5.17157 3.17157C4.10848 4.23467 4.01004 5.8857 4.00093 9H3C2.44772 9 2 9.44772 2 10V11C2 11.3148 2.14819 11.6111 2.4 11.8L4 13C4.00911 16.1143 4.10848 17.7653 5.17157 18.8284C5.41375 19.0706 5.68645 19.2627 6 19.4151V20.9999C6 21.5522 6.44772 21.9999 7 21.9999H8.5C9.05228 21.9999 9.5 21.5522 9.5 20.9999V19.9815C10.2271 20 11.0542 20 12 20C12.9458 20 13.7729 20 14.5 19.9815V20.9999C14.5 21.5522 14.9477 21.9999 15.5 21.9999H17C17.5523 21.9999 18 21.5522 18 20.9999V19.4151C18.3136 19.2627 18.5862 19.0706 18.8284 18.8284C19.8915 17.7653 19.9909 16.1143 20 13L21.6 11.8C21.8518 11.6111 22 11.3148 22 11V10C22 9.44772 21.5523 9 21 9H19.9991C19.99 5.8857 19.8915 4.23467 18.8284 3.17157C17.6569 2 15.7712 2 12 2ZM5.5 9.5C5.5 10.9142 5.5 11.6213 5.93934 12.0607C6.37868 12.5 7.08579 12.5 8.5 12.5H12H15.5C16.9142 12.5 17.6213 12.5 18.0607 12.0607C18.5 11.6213 18.5 10.9142 18.5 9.5V7C18.5 5.58579 18.5 4.87868 18.0607 4.43934C17.6213 4 16.9142 4 15.5 4H12H8.5C7.08579 4 6.37868 4 5.93934 4.43934C5.5 4.87868 5.5 5.58579 5.5 7V9.5ZM6.25 16C6.25 15.5858 6.58579 15.25 7 15.25H8.5C8.91421 15.25 9.25 15.5858 9.25 16C9.25 16.4142 8.91421 16.75 8.5 16.75H7C6.58579 16.75 6.25 16.4142 6.25 16ZM17.75 16C17.75 15.5858 17.4142 15.25 17 15.25H15.5C15.0858 15.25 14.75 15.5858 14.75 16C14.75 16.4142 15.0858 16.75 15.5 16.75H17C17.4142 16.75 17.75 16.4142 17.75 16Z"
                                            stroke="currentColor"
                                            strokeWidth="1.2"
                                        />
                                    </svg>
                                    Add Vehicle
                                </button>
                            </div>
                            <div className="mt-3">
                                <button type="button" className="btn btn-primary w-full" onClick={() => editUser()}>
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
                                    Add Client
                                </button>
                            </div>
                        </div>                        
                    </div>
                </form>
            </div>
            <div className="mt-5 panel p-0 border-0 overflow-hidden">
                <div className="table-responsive">
                    <table className="table-striped table-hover">
                        <thead>
                            <tr>
                                <th>License Plate</th>
                                <th>Vehicle Type</th>
                                <th>Vehicle Make</th>
                                <th>Vehicle Model</th>
                                <th>Client Name</th>
                                <th>Client Type</th>
                                <th>Client Owner</th>
                                <th className="!text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredItems.map((vehicle: any) => {
                                return (
                                    <tr key={vehicle.id}>
                                        <td>{vehicle.license_plate}</td>
                                        <td>{vehicle.vehicle_type}</td>
                                        <td className="whitespace-nowrap">{vehicle.vehicle_make}</td>
                                        <td className="whitespace-nowrap">{vehicle.vehicle_model}</td>
                                        <td className="whitespace-nowrap">{vehicle.account_name}</td>
                                        <td className="whitespace-nowrap">{vehicle.account_type}</td>
                                        <td className="whitespace-nowrap">{vehicle.account_owner}</td>
                                        <td>
                                            <div className="flex gap-4 items-center justify-center">
                                                <button type="button" className="btn btn-sm btn btn-outline-success" onClick={() => editVehicle(vehicle)}>
                                                    Edit
                                                </button>
                                                <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => editTransaction(vehicle)}>
                                                    Create Transaction
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
            <Transition appear show={addVehicleModal} as={Fragment}>
                <Dialog as="div" open={addVehicleModal} onClose={() => setAddVehicleModal(false)} className="relative z-50">
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
                                <Dialog.Panel className="panel border-0 p-0 rounded-lg w-full max-w-lg text-black dark:text-white-dark">
                                    <button
                                        type="button"
                                        onClick={() => setAddVehicleModal(false)}
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
                                        {params.id ? 'Edit Vehicle' : 'Add Vehicle'}
                                    </div>
                                    <div className="p-5">
                                        <form>
                                            <div className="mb-5">
                                                <label htmlFor="name">License Plate</label>
                                                <input id="name" type="text" placeholder="Enter license plate" className="form-input" value={params.license_plate} onChange={(e) => changeValue(e)} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="email">Vehicle Type</label>
                                                <input id="email" type="email" placeholder="Enter vehicle type" className="form-input" value={params.vehicle_type} onChange={(e) => changeValue(e)} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="number">Vehicle Make</label>
                                                <input id="text" type="text" placeholder="Enter vehicle make" className="form-input" value={params.vehicle_make} onChange={(e) => changeValue(e)} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="number">Vehicle Model</label>
                                                <input id="text" type="text" placeholder="Enter vehicle model" className="form-input" value={params.vehicle_model} onChange={(e) => changeValue(e)} />
                                            </div>

                                            <div className="mb-5">
                                                <label htmlFor="email">Client</label>
                                                <Select placeholder="Select a client" options={clients} isSearchable={true} />
                                            </div>

                                            <div className="mb-5">
                                                <label className="cursor-pointer">
                                                    <span className="text-white-dark">
                                                        Client Not Found? {' '}
                                                        <button type="button" className="text-primary hover:underline" 
                                                            onClick={() => { 
                                                                setAddVehicleModal(false);
                                                                setAddUserModal(true);
                                                            }}
                                                        >
                                                            Create New Client
                                                        </button>
                                                    </span>
                                                </label>
                                            </div>
                                            
                                            <div className="flex justify-end items-center mt-8">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => setAddVehicleModal(false)}>
                                                    Cancel
                                                </button>
                                                <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={saveVehicle}>
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
            <Transition appear show={addUserModal} as={Fragment}>
                <Dialog as="div" open={addUserModal} onClose={() => setAddUserModal(false)} className="relative z-50">
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
                                        onClick={() => setAddUserModal(false)}
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
                                        {params.id ? 'Edit Client' : 'Add Client'}
                                    </div>
                                    <div className="p-5">
                                        <form>
                                            <div className="mb-5">
                                                <label htmlFor="name">Account Number</label>
                                                <input id="name" type="text" placeholder="Enter account number" className="form-input" value={params.account_number} onChange={(e) => changeValue(e)} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="email">Account Name</label>
                                                <input id="email" type="text" placeholder="Enter account name" className="form-input" value={params.account_name} onChange={(e) => changeValue(e)} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="number">Account Type</label>
                                                <Select placeholder="Select a role" defaultValue={
                                                  clientOptions.filter(option => option.value == params.account_type)
                                                } options={clientOptions} isSearchable={true} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="occupation">Account Owner</label>
                                                <input id="role" type="text" placeholder="Enter account owner" className="form-input" value={params.owner} onChange={(e) => changeValue(e)} />
                                            </div>
                                            <div className="flex justify-end items-center mt-8">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => setAddUserModal(false)}>
                                                    Cancel
                                                </button>
                                                <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={saveUser}>
                                                    Add
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
            <Transition appear show={addTransactionModal} as={Fragment}>
                <Dialog as="div" open={addTransactionModal} onClose={() => setAddTransactionModal(false)} className="relative z-50">
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
                                        onClick={() => setAddTransactionModal(false)}
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
                                        {params.id ? 'New Transaction' : 'Add Transaction'}
                                    </div>
                                    <div className="p-5">
                                        <form>
                                            <div className="mb-5">
                                                <label htmlFor="name">Materital</label>
                                                <input id="name" type="text" className="form-input" value={params.name} onChange={(e) => changeValue(e)} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="email">Transaction Type</label>
                                                <Select placeholder="Select a type" options={transactionTypeOptions} isSearchable={true} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="number">In-Weight</label>
                                                <input id="phone" type="text" className="form-input" value={params.phone} onChange={(e) => changeValue(e)} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="occupation">Out-Weight</label>
                                                <input id="role" type="text" className="form-input" value={params.role} onChange={(e) => changeValue(e)} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="occupation">Net-Weight</label>
                                                <input id="role" type="text" className="form-input" value={params.role} onChange={(e) => changeValue(e)} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="occupation">Amount</label>
                                                <input id="role" type="text" className="form-input" value={params.role} onChange={(e) => changeValue(e)} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="occupation">Payment Method</label>
                                                <Select placeholder="Select a method" options={paymentOptions} isSearchable={true} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="occupation">PO Number</label>
                                                <input id="role" type="text" className="form-input" value={params.role} onChange={(e) => changeValue(e)} />
                                            </div>
                                            <div className="flex justify-end items-center mt-8">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => setAddTransactionModal(false)}>
                                                    Cancel
                                                </button>
                                                <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={saveTransaction}>
                                                    Add
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

export default Vehicles;
