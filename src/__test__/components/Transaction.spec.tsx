import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TransactionsPage from '../../components/Transactions';

describe('TransactionsPage', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('renders the TransactionsPage component', async () => {
    render(<TransactionsPage />);

    expect(screen.getByText('Add Transactions')).toBeInTheDocument();
    expect(screen.getByText('Transaction List')).toBeInTheDocument();
  });

  test('fetches and displays transactions', async () => {
    render(<TransactionsPage />);

    await waitFor(() => {
      expect(screen.getByText('Salary')).toBeInTheDocument();
      expect(screen.getByText('Groceries')).toBeInTheDocument();
    });
  });

  test('adds a new transaction', async () => {
    render(<TransactionsPage />);

    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Test Transaction' } });
    fireEvent.change(screen.getByLabelText(/Amount/i), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText(/Type/i), { target: { value: 'expense' } });
    fireEvent.change(screen.getByLabelText(/Date and Time/i), { target: { value: '2025-04-25T10:00' } });
    fireEvent.change(screen.getByLabelText(/Category/i), { target: { value: 'Test Category' } });

    fireEvent.click(screen.getByText(/Add Transaction/i));

    await waitFor(() => {
      expect(screen.getByText('Test Transaction')).toBeInTheDocument();
      expect(screen.getByText('100')).toBeInTheDocument();
      expect(screen.getByText('expense')).toBeInTheDocument();
      expect(screen.getByText('Test Category')).toBeInTheDocument();
    });
  });
});
