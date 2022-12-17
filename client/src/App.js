import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import AppBar from "./components/AppBar";
import TransactionForm from "./components/TransactionForm";
import TransactionsList from "./components/TransactionsList";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState({});

  useEffect(() => {
    fetchTransaction();
  }, []);

  const fetchTransaction = async () => {
    const res = await fetch("http://localhost:4000/transaction");
    const { data } = await res.json();
    setTransactions(data);
    console.log("fetch data >> ", data);
  };

  return (
    <div>
      <AppBar />
      <Container>
        <TransactionForm
          fetchTransaction={fetchTransaction}
          editTransaction={editTransaction}
          setEditTransaction={setEditTransaction}
        />
        <TransactionsList
          transactionsList={transactions}
          fetchTransaction={fetchTransaction}
          setEditTransaction={setEditTransaction}
        />
      </Container>
    </div>
  );
}

export default App;
