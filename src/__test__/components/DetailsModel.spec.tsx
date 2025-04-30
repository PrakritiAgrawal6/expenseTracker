import { render, screen, fireEvent } from '@testing-library/react';
import DetailsModel from '../../components/DetailsModel';

const selectedMedicine = {
    name: 'Paracetamol',
    description: 'Pain reliever and a fever reducer',
    price: '$5',
    doses: '500mg',
    sideEffect: 'Nausea',
    stock: 20,
    manufactured_date: '2023-01-01',
    expire_date: '2025-01-01',
    manufactured_by: 'Pharma Inc.'
};

describe('DetailsModel', () => {
    it('renders medicine details correctly', () => {
        render(<DetailsModel selectedMedicine={selectedMedicine} setShowModal={() => { }} />);

        expect(screen.getByText('Medicine Details')).toBeInTheDocument();
        expect(screen.getByText('Name:')).toBeInTheDocument();
        expect(screen.getByText('Paracetamol')).toBeInTheDocument();
        expect(screen.getByText('Description:')).toBeInTheDocument();
        expect(screen.getByText('Pain reliever and a fever reducer')).toBeInTheDocument();
        expect(screen.getByText('Price:')).toBeInTheDocument();
        expect(screen.getByText('$5')).toBeInTheDocument();
        expect(screen.getByText('Doses:')).toBeInTheDocument();
        expect(screen.getByText('500mg')).toBeInTheDocument();
        expect(screen.getByText('Side Effect:')).toBeInTheDocument();
        expect(screen.getByText('Nausea')).toBeInTheDocument();
        expect(screen.getByText('Stock:')).toBeInTheDocument();
        expect(screen.getByText('20')).toBeInTheDocument();
        expect(screen.getByText('Manufactured Date:')).toBeInTheDocument();
        expect(screen.getByText('1/1/2023')).toBeInTheDocument();
        expect(screen.getByText('Expire Date:')).toBeInTheDocument();
        expect(screen.getByText('1/1/2025')).toBeInTheDocument();
        expect(screen.getByText('Manufactured By:')).toBeInTheDocument();
        expect(screen.getByText('Pharma Inc.')).toBeInTheDocument();
    });

    it('calls setShowModal with false when Close button is clicked', () => {
        const setShowModal = jest.fn();
        render(<DetailsModel selectedMedicine={selectedMedicine} setShowModal={setShowModal} />);

        fireEvent.click(screen.getByText('Close'));
        expect(setShowModal).toHaveBeenCalledWith(false);
    });

    it('Add to Cart button is present', () => {
        render(<DetailsModel selectedMedicine={selectedMedicine} setShowModal={() => { }} />);

        expect(screen.getByText('Add to Cart')).toBeInTheDocument();
    });
});