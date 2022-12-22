import { Container } from "@mui/material";
import React from "react";
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
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/auth";
import CategoryForm from "../components/CategoryForm";

function Category() {
  const user = useSelector((state) => state.auth.user);
  const token = Cookies.get("token");

  const dispatch = useDispatch();

  const deleteClickHandler = async (id) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/category/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const _user = {
        ...user,
        categories: user.categories.filter((cat) => cat._id !== id),
      };
      dispatch(setUser({ user: _user }));
    }
  };

  return (
    <Container>
      <CategoryForm editCategory={{}} fetchTransaction={{}} />
      <Typography variant="h6" sx={{ marginTop: 5, marginBottom: 5 }}>
        Transactions List
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Label</TableCell>
              <TableCell align="center">Icon</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.categories.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {row.label}
                </TableCell>
                <TableCell align="center">{row.icon}</TableCell>

                <TableCell align="center">
                  <IconButton
                    color="primary"
                    component="label"
                    //onClick={() => setEditTransaction(row)}
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
    </Container>
  );
}

export default Category;
