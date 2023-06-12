import { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import Select from 'react-select';
import { Link, NavLink, useLocation } from 'react-router-dom';

const paymentOptions = [
  { value: 'Cash', label: 'Cash' },
  { value: 'Debit/Credit', label: 'Debit/Credit' },
  { value: 'On-account', label: 'On-Account' },
  { value: 'Passes', label: 'Passes' },
];

const transactionTypeOptions = [
  { value: 'In', label: 'In' },
  { value: 'Out', label: 'Out' }
];

const vehicles = [
    { value: 1, label: "12345, Toyota, Alan Green" },
    { value: 2, label: "23456, Kia, Linda Nelson" },
    { value: 3, label: "34567, Nissan, Lila Perry" }
];

const Transactions = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Transactions'));
    });
    const [addTransactionModal, setAddTransactionModal] = useState<any>(false);

    const [defaultParams] = useState({
        id: null,
        transactionname: '',
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
    const [transactionList] = useState<any>([
        {
            id: 1,
            material: "material 1",
            transaction_type: "In",
            in_weight: 15,
            out_weight: 25,
            net_weight: 10,
            amount: 156,
            payment_method: "Cash",
            po_number: 19,
            vehicle: "12345, Toyota, Alan Green"
        },
        {
            id: 2,
            material: "material 2",
            transaction_type: "Out",
            in_weight: 15,
            out_weight: 25,
            net_weight: 10,
            amount: 156,
            payment_method: "Debit/Credit",
            po_number: 22,
            vehicle: "23456, Kia, Linda Nelson"
        },
        {
            id: 3,
            material: "material 3",
            transaction_type: "In",
            in_weight: 15,
            out_weight: 25,
            net_weight: 10,
            amount: 156,
            payment_method: "Passes",
            po_number: 378,
            vehicle: "34567, Nissan, Lila Perry"
        }
    ]);

    const [filteredItems, setFilteredItems] = useState<any>(transactionList);

    useEffect(() => {
        setFilteredItems(() => {
            return transactionList.filter((item: any) => {
                return item.material.toLowerCase().includes(search.toLowerCase());
            });
        });
    }, [search, transactionList]);

    const saveTransaction = () => {
        if (!params.account_name) {
            showMessage('Account Name is required.', 'error');
            return true;
        }
        if (!params.account_type) {
            showMessage('Account Type is required.', 'error');
            return true;
        }
        if (!params.account_owner) {
            showMessage('Account Owner is required.', 'error');
            return true;
        }

        if (params.id) {
            //update transaction
            let transaction: any = filteredItems.find((d: any) => d.id === params.id);
            transaction.account_number = params.account_number;
            transaction.account_name = params.account_name;
            transaction.account_type = params.account_type;
            transaction.account_owner = params.account_owner;
        } else {
            //add transaction
            let maxTransactionId = filteredItems.length ? filteredItems.reduce((max: any, character: any) => (character.id > max ? character.id : max), filteredItems[0].id) : 0;

            let transaction = {
                id: maxTransactionId + 1,
                account_number: params.account_number,
                account_name: params.account_name,
                account_type: params.account_type,
                account_owner: params.account_owner
            };

            filteredItems.splice(0, 0, transaction);
            //   searchContacts();
        }

        showMessage('Transaction has been saved successfully.');
        setAddTransactionModal(false);
    };

    const editTransaction = (transaction: any = null) => {
        const json = JSON.parse(JSON.stringify(defaultParams));
        setParams(json);
        if (transaction) {
            let json1 = JSON.parse(JSON.stringify(transaction));
            setParams(json1);
        }
        setAddTransactionModal(true);
    };

    const deleteTransaction = (transaction: any = null) => {
        setFilteredItems(filteredItems.filter((d: any) => d.id !== transaction.id));
        showMessage('Transaction has been deleted successfully.');
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
                <h2 className="text-xl">Transactions</h2>
                <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
                    <div className="flex gap-3">
                        <div>
                            <button type="button" className="btn btn-primary" onClick={() => editTransaction()}>
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
                                Add Transaction
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        <input type="text" placeholder="Search Transactions" className="form-input py-2 ltr:pr-11 rtl:pl-11 peer" value={search} onChange={(e) => setSearch(e.target.value)} />
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
                              <th>Material</th>
                              <th>Transaction Type</th>
                              <th>In-Weight</th>
                              <th>Out-Weight</th>
                              <th>Net-Weight</th>
                              <th>Amount</th>
                              <th>Payment Method</th>
                              <th>PO Number</th>
                              <th>Vehicle</th>
                              <th className="!text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredItems.map((transaction: any) => {
                                return (
                                    <tr key={transaction.id}>
                                        <td>{transaction.id}</td>
                                        <td>{transaction.material}</td>
                                        <td>{transaction.transaction_type}</td>
                                        <td>{transaction.in_weight}</td>
                                        <td>{transaction.out_weight}</td>
                                        <td>{transaction.net_weight}</td>
                                        <td>{transaction.amount}</td>
                                        <td>{transaction.payment_method}</td>
                                        <td>{transaction.po_number}</td>
                                        <td>{transaction.vehicle}</td>
                                        <td>
                                            <div className="flex gap-4 items-center justify-center">
                                                <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => editTransaction(transaction)}>
                                                    Edit
                                                </button>
                                                <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => deleteTransaction(transaction)}>
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
                                <Dialog.Panel className="panel border-0 p-0 rounded-lg w-full max-w-lg text-black dark:text-white-dark">
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
                                        {params.id ? 'Edit Transaction' : 'Add Transaction'}
                                    </div>
                                    <div className="p-5">
                                        <form>
                                            <div className="mb-5">
                                                <label htmlFor="name">Materital</label>
                                                <input id="name" type="text" className="form-input" value={params.material} onChange={(e) => changeValue(e)} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="email">Transaction Type</label>
                                                <Select placeholder="Select a type" options={transactionTypeOptions} isSearchable={true} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="number">In-Weight</label>
                                                <input id="phone" type="text" className="form-input" value={params.in_weight} onChange={(e) => changeValue(e)} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="occupation">Out-Weight</label>
                                                <input id="role" type="text" className="form-input" value={params.out_weight} onChange={(e) => changeValue(e)} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="occupation">Net-Weight</label>
                                                <input id="role" type="text" className="form-input" value={params.net_weight} onChange={(e) => changeValue(e)} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="occupation">Amount</label>
                                                <input id="role" type="text" className="form-input" value={params.amount} onChange={(e) => changeValue(e)} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="occupation">Payment Method</label>
                                                <Select placeholder="Select a method" defaultValue={
                                                  paymentOptions.filter(option => option.value == params.payment_method)
                                                } options={paymentOptions} isSearchable={true} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="occupation">PO Number</label>
                                                <input id="role" type="text" className="form-input" value={params.po_number} onChange={(e) => changeValue(e)} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="email">Vehicle</label>
                                                <Select placeholder="Select a vehicle" defaultValue={
                                                  vehicles.filter(option => option.label == params.vehicle)
                                                } options={vehicles} isSearchable={true} />
                                            </div>

                                            <div className="mb-5">
                                                <label className="cursor-pointer">
                                                    <span className="text-white-dark">
                                                        Vehicle Not Found? {' '}
                                                        <Link to="/" className="dark:hover:text-white text-blue-900">
                                                          Go to Vehicles
                                                        </Link>
                                                    </span>
                                                </label>
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

export default Transactions;
