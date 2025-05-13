/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import { Transaction } from '../interfaces/transaction';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTrash } from 'react-icons/fa';
import { transactionValidationSchema } from '../schemas/transactionSchema';
import FormField from '../core/Formfield';
import Paginator from '../core/Paginator';

// Transaction page for adding and showing expenses
const TransactionsPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [page, setPage] = useState(1);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const limit = 5;
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Function to fetch all transactions
  const fetchTransactions = async () => {
    try {
      const response = await fetch(`${apiUrl}/transactions`, {
        method: 'GET',
      });
      const data = await response.json();
      setTransactions(data?.data);
      setTotalTransactions(data?.data.length);
    } catch (error: any) {
      toast.error('Error fetching transactions', error);
    }
  };

  // Function to add transaction
  const addTransaction = async (transaction: Omit<Transaction, '_id'>) => {
    try {
      await fetch(`${apiUrl}/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction),
      });
      fetchTransactions(); // Refresh the transactions list after adding a new transaction
      toast.success('Transaction added successfully!');
    } catch (error: any) {
      toast.error('Error adding transaction', error);
    }
  };

  // Function to delete transaction
  const deleteTransaction = async (id: string, title: string) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete the transaction for "${title}"?`);

    if (!isConfirmed) return;
    try {
      const response = await fetch(`${apiUrl}/transactions/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchTransactions(); // Refresh the transactions list after deleting a transaction
        toast.success('Transaction deleted successfully!');
      } else {
        toast.error('Error deleting transaction');
      }
    } catch (error: any) {
      toast.error('Error deleting transaction', error);
    }
  };

  // To get the current date and time of transaction
  const getCurrentDateTime = (): string => {
    const now = new Date();
    return now.toISOString().slice(0, 16);
  };

  const totalPages = Math.ceil(totalTransactions / limit);

  // Handle pagination
  const handlePagination = (page: number) => {
    setPage(page);
  };

  // Get transactions for the current page
  const paginatedTransactions = transactions.slice((page - 1) * limit, page * limit);

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
              type: '',
              date: '',
              category: ''
            }}
            validationSchema={transactionValidationSchema}
            onSubmit={(values: any, { resetForm }) => {
              addTransaction(values);
              resetForm();
            }}
          >
            <Form className="mb-4">
              <FormField label="Title" name="title" type="text" />
              <FormField label="Amount(₹)" name="amount" type="number" step="0.01" />
              <FormField label="Type" name="type" as="select" options={[
                { value: '', label: 'Select' },
                { value: 'income', label: 'Income' },
                { value: 'expense', label: 'Expense' }
              ]} />
              <FormField label="Date and Time" name="date" type="datetime-local" max={getCurrentDateTime()} />
              <FormField label="Category" name="category" type="text" />
              <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">
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
              {paginatedTransactions.map((transaction) => (
                <tr key={transaction._id}>
                  <td className="py-2 px-4 border-b">{transaction.title}</td>
                  <td className="py-2 px-4 border-b">₹{transaction.amount}</td>
                  <td className="py-2 px-4 border-b">{transaction.type}</td>
                  <td className="py-2 px-4 border-b">{new Date(transaction.date).toLocaleString()}</td>
                  <td className="py-2 px-4 border-b">{transaction.category}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => deleteTransaction(transaction._id, transaction.title)}
                      className="px-2 py-1 bg-red-500 text-white rounded-md"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <Paginator
            currentPage={page}
            totalPages={totalPages}
            handlePagination={handlePagination}
          />
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
