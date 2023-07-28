"use client";

import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, registerables, Title } from "chart.js";
import { server_path } from "./constants";
import "chartjs-adapter-date-fns";
Chart.register(...registerables);
Chart.register(CategoryScale);
Chart.register(Title);

interface GraphProps {
  country: string;
  social_value: string;
  demo_crit: string;
}

interface GraphData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}

const Graph = (props: GraphProps) => {

  const [chartData, setChartData] = useState<GraphData>();
  const [graphTitle, setGraphTitle] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          server_path + `/api/?country=${props.country}&social_value=${props.social_value}&demo_group=${props.demo_crit}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const jsonData = await res.json();

        const keys = jsonData.values[0].demograpic_groups;
        const values = jsonData.values[0].scores as number[];

        const description = jsonData.values[0].value_description as string;
        
        const data: GraphData = {
          labels: keys,
          datasets: [
            {
              label: "mean value",
              data: values,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 205, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(201, 203, 207, 0.2)",
              ],
              borderColor: [
                "rgb(255, 99, 132)",
                "rgb(255, 159, 64)",
                "rgb(255, 205, 86)",
                "rgb(75, 192, 192)",
                "rgb(54, 162, 235)",
                "rgb(153, 102, 255)",
                "rgb(201, 203, 207)",
              ],
              borderWidth: 1,
            },
          ],
        };

        setChartData(data);
        setGraphTitle(description);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [props.country, props.social_value, props.demo_crit]);

  return (
    <div>
      {chartData && graphTitle &&(
        <div>
          <h2 className="text-neutral-900 text-center pt-2">{graphTitle}</h2>
        <Bar
          data={chartData}
          options={{
            interaction:{
              mode: "x"
            },
            responsive: true,
            plugins: {
              tooltip: {
                enabled: true,
              },
              legend: {
                display: false,
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                max: 10,
              },
            },
          }}
        />
        </div>
      )}
    </div>
  );
};

export default Graph;
