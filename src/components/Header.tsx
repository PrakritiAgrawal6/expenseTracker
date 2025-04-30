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
import { capitalizeFirstLetter } from "../utils/functions";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: currentUser } = useSelector((store: IStore) => store.user);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { email, name } = currentUser;
  const closeDialog = () => setIsDialogOpen(false);
  const openDialog = () => setIsDialogOpen(true);

  const logout = () => {
    setIsDialogOpen(false);
    dispatch(clearLoginUser());
    navigate("/");
  };

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  const goToTransactions = () => {
    navigate("/transactions");
  };

  return (
    <header className="w-full flex justify-between items-center gap-4 sticky top-0 z-50 p-4 bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-lg">
      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center justify-center"
      >
        <div>
          <p className="text-[20px] font-bold">Expense Tracker</p>
        </div>
      </button>
      {!isEmpty(email) && (
        <div className="flex items-center justify-center">
          {currentUser?.role === "admin" && (
            <p className="text-xl mx-2">
              <strong>User:</strong> {capitalizeFirstLetter(currentUser.name)}{" "}
            </p>
          )}
          <button
            onClick={goToDashboard}
            className="border border-white py-2 px-5 rounded-lg mr-2 hover:bg-white hover:text-blue-500 transition"
          >
            Dashboard
          </button>
          <button
            onClick={goToTransactions}
            className="border border-white py-2 px-5 rounded-lg mr-2 hover:bg-white hover:text-blue-500 transition"
          >
            Transactions
          </button>
          <button
            onClick={openDialog}
            className="border border-white h-10 w-10 hover:bg-white hover:text-blue-500 transition rounded-full"
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