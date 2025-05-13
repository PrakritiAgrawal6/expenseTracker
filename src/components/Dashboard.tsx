/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Transaction } from '../interfaces/transaction';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard: React.FC = () => {
  // State to store transactions
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  // State to store chart data
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [
      {
        label: 'Income',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      },
      {
        label: 'Expenses',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }
    ]
  });
  // State to store total income and expenses
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  // Fetch transactions when the component mounts
  useEffect(() => {
    fetchTransactions();
  }, []);

  // Function to fetch transactions from the API
  const fetchTransactions = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/transactions', {
        method: 'GET',
      });
      const data = await response.json();
      setTransactions(data.data);
      prepareChartData(data.data);
      console.log(transactions);
    } catch (error: any) {
      toast.error('Error fetching transactions', error);
    }
  };

  // Function to prepare chart data from the transactions
  const prepareChartData = (transactions: Transaction[]) => {
    const incomeCategories: { [key: string]: number } = transactions.filter(t => t.type === 'income').reduce((acc: any, transaction) => {
      acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
      return acc;
    }, {});

    const expenseCategories: { [key: string]: number } = transactions.filter(t => t.type === 'expense').reduce((acc: any, transaction) => {
      acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
      return acc;
    }, {});

    const totalIncome = Object.values(incomeCategories).reduce((acc: number, amount: number) => acc + amount, 0 as number);
    const totalExpenses = Object.values(expenseCategories).reduce((acc: number, amount: number) => acc + amount, 0 as number);

    setTotalIncome(totalIncome);
    setTotalExpenses(totalExpenses);

    const combinedCategories = Array.from(new Set([...Object.keys(incomeCategories), ...Object.keys(expenseCategories)]));

    const combinedData = {
      labels: combinedCategories,
      datasets: [
        {
          label: 'Income',
          data: combinedCategories.map(category => incomeCategories[category] || 0),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        },
        {
          label: 'Expenses',
          data: combinedCategories.map(category => expenseCategories[category] || 0),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }
      ]
    };

    setChartData(combinedData);
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="flex flex-col md:flex-row justify-center gap-4">
        <div className="w-full md:w-2/3">
          {chartData.labels.length > 0 ? (
            <Bar 
              data={chartData} 
              options={{ 
                responsive: true, 
                plugins: { 
                  legend: { position: 'top' }, 
                  title: { display: true, text: 'Income and Expenses by Category' },
                  tooltip: {
                    callbacks: {
                      label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                          label += ': ';
                        }
                        label += `₹${context.raw}`;
                        return label;
                      }
                    }
                  }
                } 
              }} 
            />
          ) : (
            <p>Loading chart data...</p>
          )}
        </div>
        <div className="w-full md:w-1/3 flex flex-col justify-center">
          <h2 className="text-xl font-semibold mb-2">Summary</h2>
          <p className="mb-2"><strong>Total Income:</strong> ₹{totalIncome}</p>
          <p className="mb-4"><strong>Total Expenses:</strong> ₹{totalExpenses}</p>
          <h2 className="text-xl font-semibold mb-2">Income</h2>
          <ul>
            {chartData.labels.map((label: string, index: number) => (
              chartData.datasets[0].data[index] > 0 && (
                <li key={index} className="flex justify-between">
                  <span>{label}</span>
                  <span>₹{chartData?.datasets[0]?.data[index]}</span>
                </li>
              )
            ))}
          </ul>
          <h2 className="text-xl font-semibold mt-4 mb-2">Expenses</h2>
          <ul>
            {chartData.labels.map((label: string, index: number) => (
              chartData.datasets[1].data[index] > 0 && (
                <li key={index} className="flex justify-between">
                  <span>{label}</span>
                  <span>₹{chartData?.datasets[1]?.data[index]}</span>
                </li>
              )
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
