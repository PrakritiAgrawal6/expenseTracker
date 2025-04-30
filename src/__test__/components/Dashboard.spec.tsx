import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { useNavigate } from 'react-router';
import Dashboard from '../../components/Dashboard';

jest.mock("react-router", () => ({
    ...jest.requireActual("react-router"),
    useNavigate: jest.fn(),
}));

const mockStore = configureStore();
const store = mockStore({
    project: {
        projects: [
            { id: '1', name: 'Project 1' },
            { id: '2', name: 'Project 2' },
        ],
    },
    loginUser: {
        data: {
            role: 'manager', // or any role you want to test
        },
    },
});
let navigate: jest.Mock;
beforeEach(() => {
    navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);
});
// reder the form
test('renders ProjectForm', () => {

    render(
        <Provider store={store}>
            <Dashboard
            />
        </Provider>
    );

});
