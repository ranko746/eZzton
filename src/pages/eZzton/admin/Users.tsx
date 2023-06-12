import { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import Select from 'react-select';

const roles = [
  { value: 'user', label: 'User' },
  { value: 'supervisor', label: 'Supervisor' },
  { value: 'admin', label: 'Admin' },
]

const Users = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Users'));
    });
    const [addUserModal, setAddUserModal] = useState<any>(false);

    const [defaultParams] = useState({
        id: null,
        username: '',
        email: '',
        first_name: '',
        last_name: ''
    });

    const [params, setParams] = useState<any>(JSON.parse(JSON.stringify(defaultParams)));

    const changeValue = (e: any) => {
        const { value, id } = e.target;
        setParams({ ...params, [id]: value });
    };

    const [search, setSearch] = useState<any>('');
    const [userList] = useState<any>([
        {
          id: 1,
          username: 'alangreen',
          first_name: 'Ranko',
          last_name: 'Green',
          email: 'alan@mail.com',
          role: 'user'
        },
        {
          id: 2,
          username: 'alangreen',
          first_name: 'Alan',
          last_name: 'Green',
          email: 'alan@mail.com',
          role: 'supervisor'
        },
        {
          id: 3,
          username: 'alangreen',
          first_name: 'Alan',
          last_name: 'Green',
          email: 'alan@mail.com',
          role: 'admin'
        },
        {
          id: 4,
          username: 'alangreen',
          first_name: 'Alan',
          last_name: 'Green',
          email: 'alan@mail.com',
          role: 'user'
        }
    ]);

    const [filteredItems, setFilteredItems] = useState<any>(userList);

    useEffect(() => {
        setFilteredItems(() => {
            return userList.filter((item: any) => {
                return item.username.toLowerCase().includes(search.toLowerCase());
            });
        });
    }, [search, userList]);

    const saveUser = () => {
        if (!params.username) {
            showMessage('Username is required.', 'error');
            return true;
        }
        if (!params.email) {
            showMessage('Email is required.', 'error');
            return true;
        }
        if (!params.first_name) {
            showMessage('First name is required.', 'error');
            return true;
        }
        if (!params.last_name) {
            showMessage('Last name is required.', 'error');
            return true;
        }

        if (params.id) {
            //update user
            let user: any = filteredItems.find((d: any) => d.id === params.id);
            user.username = params.username;
            user.email = params.email;
            user.first_name = params.first_name;
            user.last_name = params.last_name;
        } else {
            //add user
            let maxUserId = filteredItems.length ? filteredItems.reduce((max: any, character: any) => (character.id > max ? character.id : max), filteredItems[0].id) : 0;

            let user = {
                id: maxUserId + 1,                
                username: params.username,
                email: params.email,
                first_name: params.first_name,
                last_name: params.last_name                
            };
            filteredItems.splice(0, 0, user);
            //   searchContacts();
        }

        showMessage('User has been saved successfully.');
        setAddUserModal(false);
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

    const deleteUser = (user: any = null) => {
        setFilteredItems(filteredItems.filter((d: any) => d.id !== user.id));
        showMessage('User has been deleted successfully.');
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
                <h2 className="text-xl">Users</h2>
                <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
                    <div className="flex gap-3">
                        <div>
                            <button type="button" className="btn btn-primary" onClick={() => editUser()}>
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
                                Add User
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        <input type="text" placeholder="Search Users" className="form-input py-2 ltr:pr-11 rtl:pl-11 peer" value={search} onChange={(e) => setSearch(e.target.value)} />
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
                              <th>UserName</th>
                              <th>First Name</th>
                              <th>Last Name</th>
                              <th>Email</th>
                              <th>Role</th>
                              <th className="!text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredItems.map((user: any) => {
                                return (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.username}</td>
                                        <td>{user.first_name}</td>
                                        <td>{user.last_name}</td>
                                        <td className="whitespace-nowrap">{user.email}</td>
                                        <td>{user.role}</td>
                                        <td>
                                            <div className="flex gap-4 items-center justify-center">
                                                <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => editUser(user)}>
                                                    Edit
                                                </button>
                                                <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => deleteUser(user)}>
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
                                <Dialog.Panel className="panel border-0 p-0 rounded-lg w-full max-w-lg text-black dark:text-white-dark">
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
                                        {params.id ? 'Edit User' : 'Add User'}
                                    </div>
                                    <div className="p-5">
                                        <form>
                                            <div className="mb-5">
                                                <label htmlFor="name">Username</label>
                                                <input id="name" type="text" placeholder="Enter username" className="form-input" value={params.username} onChange={(e) => changeValue(e)} />
                                            </div>                                            
                                            <div className="mb-5">
                                                <label htmlFor="number">First Name</label>
                                                <input id="text" type="text" placeholder="Enter firstname" className="form-input" value={params.first_name} onChange={(e) => changeValue(e)} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="number">Last Name</label>
                                                <input id="text" type="text" placeholder="Enter lastname" className="form-input" value={params.last_name} onChange={(e) => changeValue(e)} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="email">Email</label>
                                                <input id="email" type="email" placeholder="Enter Email" className="form-input" value={params.email} onChange={(e) => changeValue(e)} />
                                            </div>

                                            <div className="mb-5">
                                                <label htmlFor="email">Role {params.role}</label>
                                                <Select placeholder="Select a role" defaultValue={
                                                  roles.filter(option => option.value == params.role)
                                                } options={roles} isSearchable={true} />
                                            </div>
                                            
                                            <div className="flex justify-end items-center mt-8">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => setAddUserModal(false)}>
                                                    Cancel
                                                </button>
                                                <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={saveUser}>
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

export default Users;
