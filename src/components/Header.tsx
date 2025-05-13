import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import isEmpty from "lodash/isEmpty";
import { useSelector, useDispatch } from "react-redux";

import { IStore } from "../interfaces/store";
import { clearLoginUser } from "../redux/actions/userAction";

// Header component for navigation and user actions
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Extracting current user data from Redux store
  const { data: currentUser } = useSelector((store: IStore) => store.user);

  // State to manage the dialog open/close status
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { email, name } = currentUser;
  const closeDialog = () => setIsDialogOpen(false);
  const openDialog = () => setIsDialogOpen(true);

  // Function to handle user logout
  const logout = () => {
    setIsDialogOpen(false);
    dispatch(clearLoginUser());
    navigate("/");
  };

  // Function to navigate to the dashboard/transaction page
  const goToDashboard = () => {
    navigate("/dashboard");
  };
  const goToTransactions = () => {
    navigate("/transactions");
  };

  return (
    <header className="w-full flex flex-wrap justify-between items-center gap-4 sticky p-4 bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-lg">
      {/* Button to navigate to the dashboard */}
      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center justify-center"
      >
        <div>
          <p className="text-[20px] font-bold">Expense Tracker</p>
        </div>
      </button>
      {!isEmpty(email) && (
        <div className="flex items-center justify-center flex-wrap gap-2">
          <button
            onClick={goToDashboard}
            className="border border-white py-2 px-5 rounded-lg hover:bg-white hover:text-blue-500 transition"
          >
            Dashboard
          </button>
          <button
            onClick={goToTransactions}
            className="border border-white py-2 px-5 rounded-lg hover:bg-white hover:text-blue-500 transition"
          >
            Transactions
          </button>
          <button
            onClick={openDialog}
            className="border border-white h-10 w-10 hover:bg-white hover:text-blue-500 transition rounded-full flex items-center justify-center"
          >
            {name?.charAt(0)}
          </button>
        </div>
      )}
      <Dialog
        open={isDialogOpen}
        keepMounted
        onClose={closeDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Logout</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Close</Button>
          <Button onClick={logout}>Logout</Button>
        </DialogActions>
      </Dialog>
    </header>
  );
};

export default Header;
