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
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/auth";

const initialForm = {
  label: "",
  icon: "",
};

const icons = ["User"];

export default function CategoryForm({
  fetchTransaction,
  editCategory,
  //setEditTransaction,
}) {
  const user = useSelector((state) => state.auth.user);
  const [form, setForm] = useState(initialForm);
  const token = Cookies.get("token");
  const dispatch = useDispatch();

  useEffect(() => {
    if (editCategory) {
      setForm(editCategory);
    }
  }, [editCategory]);

  const handleChange = (e) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // add and update transaction api call
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      !_.isEmpty(editCategory)
        ? `${process.env.REACT_APP_API_URL}/category/${editCategory._id}`
        : `${process.env.REACT_APP_API_URL}/category`,
      {
        method: !_.isEmpty(editCategory) ? "PATCH" : "POST",
        body: JSON.stringify(form),
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.ok) {
      const _user = {
        ...user,
        categories: [...user.categories, { ...form }],
      };
      dispatch(setUser({ user: _user }));
      setForm(initialForm);
      //setEditTransaction({});
    }
  };

  const getCategoryNameById = () => {
    return (
      user.categories.find((category) => category._id === form.category_id) ??
      ""
    );
  };

  return (
    <Card sx={{ minWidth: 275, marginTop: 10 }}>
      <CardContent>
        <Typography variant="h6" sx={{ marginBottom: 5 }}>
          Add New Category
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex" }}>
          <TextField
            sx={{ marginRight: 5 }}
            id="outlined-basic"
            label="Title"
            variant="outlined"
            size="small"
            name="label"
            value={form.label}
            onChange={handleChange}
          />

          <Autocomplete
            value={getCategoryNameById()}
            onChange={(event, newValue) => {
              setForm({ ...form, icon: newValue });
            }}
            // inputValue={form.category}
            // onInputChange={(event, newInputValue) => {
            //   setInputValue(newInputValue);
            // }}
            id="controllable-states-demo"
            options={icons}
            sx={{ width: 200, marginRight: 5 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="icons"
                sx={{ marginRight: 5 }}
                size="small"
              />
            )}
          />
          <Button
            type="submit"
            variant={!_.isEmpty(editCategory) ? "outlined" : "contained"}
          >
            {!_.isEmpty(editCategory) ? "update" : "Submit"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
