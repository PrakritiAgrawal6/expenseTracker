/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Transaction } from '../interfaces/transaction';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTrash } from 'react-icons/fa';

const TransactionsPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalTransactions, setTotalTransactions] = useState(0);

  useEffect(() => {
    fetchTransactions(page, limit);
  }, [page]);

  const fetchTransactions = async (page: number, limit: number) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/transactions?page=${page}&limit=${limit}`, {
        method: 'GET',
      });
      const data = await response.json();
      setTransactions(data.data);
      console.log('transactions', transactions[0].category)
      setTotalTransactions(data.data.length);
    } catch (error: any) {
      toast.error('Error fetching transactions', error);
    }
  };

  const addTransaction = async (transaction: Omit<Transaction, '_id'>) => {
    try {
      await fetch('http://localhost:8080/api/v1/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction),
      });
      fetchTransactions(page, limit); // Refresh the transactions list after adding a new transaction
      toast.success('Transaction added successfully!');
    } catch (error: any) {
      toast.error('Error adding transaction', error);
    }
  };

  const deleteTransaction = async (id: string) => {
    const deletecategory = transactions[0].category
  const isConfirmed = window.confirm(`Are you sure you want to delete the transaction for "${deletecategory}"?`);

    if(!isConfirmed) return;
    try {
      const response = await fetch(`http://localhost:8080/api/v1/transactions/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {

        fetchTransactions(page, limit); // Refresh the transactions list after deleting a transaction
        toast.success('Transaction deleted successfully!');
      } else {
        toast.error('Error deleting transaction');
      }
    } catch (error: any) {
      toast.error('Error deleting transaction', error);
    }
  };

  const getCurrentDateTime = (): string => {
    const now = new Date();
    return now.toISOString().slice(0, 16);
  };

  const totalPages = Math.ceil(totalTransactions / limit);

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Add Transactions</h1>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 md:pr-4 mb-4 md:mb-0">
          <Formik
            initialValues={{
              createdBy: '680b6120e99aa38d880cba7f',
              title: '',
              amount: 0,
              type: 'income',
              date: '',
              category: ''
            }}
            validationSchema={Yup.object({
              title: Yup.string().required('Title is Required'),
              amount: Yup.number().required('Amount is Required').positive('Must be positive'),
              type: Yup.string().oneOf(['income', 'expense']).required('Required'),
              date: Yup.date().required('Date is Required'),
              category: Yup.string().required('Category is Required')
            })}
            onSubmit={(values: any, { resetForm }) => {
              addTransaction(values);
              resetForm();
            }}
          >
            <Form className="mb-4">
              <div className="mb-2">
                <label className="block text-sm font-medium">Title<span className="text-red-500">*</span></label>
                <Field
                  name="title"
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium">Amount(₹)<span className="text-red-500">*</span></label>
                <Field
                  name="amount"
                  type="number"
                  step="0.01"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage name="amount" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium">Type<span className="text-red-500">*</span></label>
                <Field
                  name="type"
                  as="select"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </Field>
                <ErrorMessage name="type" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium">Date and Time<span className="text-red-500">*</span></label>
                <Field
                  name="date"
                  type="datetime-local"
                  max={getCurrentDateTime()}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage name="date" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium">Category<span className="text-red-500">*</span></label>
                <Field
                  name="category"
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage name="category" component="div" className="text-red-500 text-sm" />
              </div>
              <button
                type="submit"
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Add Transaction
              </button>
            </Form>
          </Formik>
        </div>
        <div className="w-full md:w-1/2 md:pl-4">
          <h2 className="text-xl font-bold mb-2">Transaction List</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Title</th>
                <th className="py-2 px-4 border-b">Amount</th>
                <th className="py-2 px-4 border-b">Type</th>
                <th className="py-2 px-4 border-b">Date and Time</th>
                <th className="py-2 px-4 border-b">Category</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction._id}>
                  <td className="py-2 px-4 border-b">{transaction.title}</td>
                  <td className="py-2 px-4 border-b">₹{transaction.amount}</td>
                  <td className="py-2 px-4 border-b">{transaction.type}</td>
                  <td className="py-2 px-4 border-b">{new Date(transaction.date).toLocaleString()}</td>
                  <td className="py-2 px-4 border-b">{transaction.category}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => deleteTransaction(transaction._id)}
                      className="px-2 py-1 bg-red-500 text-white rounded-md"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
            >
              Previous
            </button>
            <span>Page {page} of {totalPages}</span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={transactions.length < limit}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
