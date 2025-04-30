export interface Transaction {
  _id: string;
  createdBy: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;
  category: string;
}
