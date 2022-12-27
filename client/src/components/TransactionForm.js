import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import _ from "lodash";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

const initialForm = {
  amount: "",
  description: "",
  date: new Date(),
  category_id: "",
};

export default function TransactionForm({
  fetchTransaction,
  editTransaction,
  setEditTransaction,
}) {
  const user = useSelector((state) => state?.auth?.user);
  const [form, setForm] = useState(initialForm);
  const token = Cookies.get("token");

  useEffect(() => {
    if (editTransaction) {
      setForm(editTransaction);
    }
  }, [editTransaction]);

  const handleChange = (e) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDateChange = (newValue) => {
    setForm({ ...form, date: newValue });
  };

  // add and update transaction api call
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      !_.isEmpty(editTransaction)
        ? `${process.env.REACT_APP_API_URL}/transaction/${editTransaction._id}`
        : `${process.env.REACT_APP_API_URL}/transaction`,
      {
        method: !_.isEmpty(editTransaction) ? "PATCH" : "POST",
        body: JSON.stringify(form),
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.ok) {
      fetchTransaction();
      setForm(initialForm);
      setEditTransaction({});
    }
    const data = await res.json();
  };

  const getCategoryNameById = () => {
    return (
      user?.categories?.find((category) => category._id === form.category_id) ??
      ""
    );
  };

  return (
    <Card sx={{ minWidth: 275, marginTop: 10 }}>
      <CardContent>
        <Typography variant="h6" sx={{ marginBottom: 5 }}>
          Add New Transaction
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex" }}>
          <TextField
            sx={{ marginRight: 5 }}
            id="outlined-basic"
            label="Amount"
            variant="outlined"
            size="small"
            name="amount"
            value={form.amount}
            type="number"
            onChange={handleChange}
          />
          <TextField
            sx={{ marginRight: 5 }}
            id="outlined-basic"
            label="Description"
            variant="outlined"
            size="small"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Transaction Date"
              inputFormat="DD/MM/YYYY"
              value={form.date}
              onChange={handleDateChange}
              renderInput={(params) => (
                <TextField sx={{ marginRight: 5 }} size="small" {...params} />
              )}
            />
          </LocalizationProvider>
          <Autocomplete
            value={getCategoryNameById()}
            onChange={(event, newValue) => {
              setForm({ ...form, category_id: newValue._id });
            }}
            // inputValue={form.category}
            // onInputChange={(event, newInputValue) => {
            //   setInputValue(newInputValue);
            // }}
            id="controllable-states-demo"
            options={user.categories ? user.categories : []}
            sx={{ width: 200, marginRight: 5 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="category"
                sx={{ marginRight: 5 }}
                size="small"
              />
            )}
          />
          <Button
            type="submit"
            variant={!_.isEmpty(editTransaction) ? "outlined" : "contained"}
          >
            {!_.isEmpty(editTransaction) ? "update" : "Submit"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
