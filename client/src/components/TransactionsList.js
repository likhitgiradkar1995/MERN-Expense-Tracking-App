import * as React from "react";
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

export default function TransactionsList({
  transactionsList,
  fetchTransaction,
  setEditTransaction,
}) {
  const deleteClickHandler = async (id) => {
    if (!window.confirm("Are you sure you want to delete ?")) return;
    const res = await fetch(`http://localhost:4000/transaction/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      fetchTransaction();
      window.alert("transaction deleted successfully!");
    }
  };

  const formatDate = (date) => {
    return dayjs(date).format("DD MMM, YYYY");
  };
  return (
    <>
      <Typography variant="h6" sx={{ marginTop: 10 }}>
        Transactions List
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactionsList.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {row.amount}
                </TableCell>
                <TableCell align="center">{row.description}</TableCell>
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
