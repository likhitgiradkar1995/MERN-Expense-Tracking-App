import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton, Typography } from "@mui/material";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import ConfirmationDialog from "../common-ui-components/ConfirmationDialog";
import SnackbarAlert from "../common-ui-components/Snackbar";

export default function TransactionsList({
  data,
  fetchTransaction,
  setEditTransaction,
}) {
  const user = useSelector((state) => state.auth.user);
  const token = Cookies.get("token");
  const [showConfirmDialog, setShowConfirmDialog] = useState({
    open: false,
    id: null,
  });
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const deleteClickHandler = (id) => {
    setShowConfirmDialog({ open: true, id: id });
  };

  const deleteTransaction = async () => {
    if (showConfirmDialog.open && showConfirmDialog.id) {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/transaction/${showConfirmDialog.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.ok) {
        fetchTransaction();
        setShowSuccessAlert(true);
      }
      setShowConfirmDialog({ open: false, id: null });
    }
  };

  const getCategoryName = (id) => {
    const category = user?.categories?.find((category) => category._id === id);
    return category ? category.label : "NA";
  };

  const formatDate = (date) => {
    return dayjs(date).format("DD MMM, YYYY");
  };
  return (
    <>
      <Typography variant="h6" sx={{ marginTop: 5, marginBottom: 5 }}>
        Transactions List
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((month) =>
              month.transactions.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="row">
                    {row.amount}
                  </TableCell>
                  <TableCell align="center">{row.description}</TableCell>
                  <TableCell align="center">
                    {getCategoryName(row.category_id)}
                  </TableCell>
                  <TableCell align="center">{formatDate(row.date)}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      component="label"
                      onClick={() => setEditTransaction(row)}
                    >
                      <EditSharpIcon />
                    </IconButton>

                    <IconButton
                      color="warning"
                      component="label"
                      onClick={() => deleteClickHandler(row._id)}
                    >
                      <DeleteSharpIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {showConfirmDialog.open && (
        <ConfirmationDialog
          open={showConfirmDialog.open}
          title="Delete"
          message="Are you sure, you want to delete this transaction ?"
          close={() => setShowConfirmDialog({ open: false, id: null })}
          onDelete={deleteTransaction}
        />
      )}

      {showSuccessAlert && (
        <SnackbarAlert
          open={showSuccessAlert}
          close={() => setShowSuccessAlert(false)}
          message="transaction deleted successfully !"
          isSuccessAlert={true}
        />
      )}
    </>
  );
}
