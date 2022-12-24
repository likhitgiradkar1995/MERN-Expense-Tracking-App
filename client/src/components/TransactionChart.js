import Paper from "@mui/material/Paper";
import {
  Chart,
  BarSeries,
  ArgumentAxis,
  ValueAxis,
  Tooltip,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";
import { scaleBand } from "@devexpress/dx-chart-core";
import { ArgumentScale, EventTracker } from "@devexpress/dx-react-chart";
import dayjs from "dayjs";

export default function TransactionChart({ data }) {
  const chartData = data.map((item) => {
    item.month = dayjs()
      .month(item._id - 1)
      .format("MMMM");
    return item;
  });

  return (
    <Paper sx={{ marginTop: 5 }}>
      <Chart data={chartData}>
        <ArgumentScale factory={scaleBand} />
        <ArgumentAxis />
        <ValueAxis />
        <BarSeries valueField="totalExpenses" argumentField="month" />
        <Animation />
        <EventTracker />
        <Tooltip />
      </Chart>
    </Paper>
  );
}
