import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import _ from "lodash";

const initialForm = { amount: 0, description: "", date: new Date() };

export default function TransactionForm({
  fetchTransaction,
  editTransaction,
  setEditTransaction,
}) {
  const [form, setForm] = useState(initialForm);

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
        },
      }
    );
    if (res.ok) {
      fetchTransaction();
      setForm(initialForm);
      setEditTransaction({});
    }
    const data = await res.json();
    console.log("data >> ", data);
  };

  return (
    <Card sx={{ minWidth: 275, marginTop: 10 }}>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" sx={{ marginBottom: 5 }}>
            Add New Transaction
          </Typography>
          <TextField
            sx={{ marginRight: 5 }}
            id="outlined-basic"
            label="Amount"
            variant="outlined"
            size="small"
            name="amount"
            value={form.amount}
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
          <Button
            type="submit"
            variant={!_.isEmpty(editTransaction) ? "outlined" : "contained"}
          >
            {!_.isEmpty(editTransaction) ? "update" : "Submit"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
