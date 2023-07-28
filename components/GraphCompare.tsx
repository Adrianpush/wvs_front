'use client'

import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, registerables, Title } from "chart.js";
import "chartjs-adapter-date-fns";
import { server_path } from "./constants";
Chart.register(...registerables);
Chart.register(CategoryScale);
Chart.register(Title);

interface Country {
  value: string,
  label: string,
  color: string,
}

interface GraphComparProps {
  countries: Country[];
  social_value: string;
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

const GraphCompare = (props: GraphComparProps) => {
  const [chartData, setChartData] = useState<GraphData>();
  const [socialValue, setSocialValue] = useState<string>();



  useEffect(() => {
    const fetchData = async () => {

      const updatedInfo : [number, string, string][]= []

      if (socialValue == props.social_value) {
        for (const country of props.countries) {
          const countryExists = (chartData?.labels.includes(country.label));
          if (countryExists) {
            let index = chartData?.labels.indexOf(country.label) as number
            updatedInfo.push([chartData?.datasets[0].data[index] as number, country.label, country.color])
            continue; // Skip fetching data for existing country
          } else {
            try {
              const res = await fetch(
                server_path + `/api/?country=${country.value}&social_value=${props.social_value}`
              );
              if (!res.ok) {
                throw new Error("Failed to fetch data");
              }

              const jsonData = await res.json();
              updatedInfo.push([jsonData.values[0].data[0].country_average as number, country.label, country.color])
            } catch (error) {
              console.error("Error:", error);
            }
          }
        }
      } else {
        for (const country of props.countries) {
          try {
            const res = await fetch(
              server_path + `/api/?country=${country.value}&social_value=${props.social_value}`
            );
            if (!res.ok) {
              throw new Error("Failed to fetch data");
            }

            const jsonData = await res.json();
            updatedInfo.push([jsonData.values[0].data[0].country_average as number, country.label, country.color])
          } catch (error) {
            console.error("Error:", error);
          }
      }



    }

    updatedInfo.sort();
    let updatedLabels: string[] = []
    let updatedData: number[] = []
    let updateColors: string[] = []

    for (const country of updatedInfo) { 
      updatedLabels.push(country[1])
      updatedData.push(country[0])
      updateColors.push(country[2])
    }

    console.log(updatedInfo)

    const data: GraphData = {
      labels: updatedLabels,
      datasets: [
        {
          label: "mean value",
          data: updatedData,
          backgroundColor: updateColors,
          borderColor: updateColors,
          borderWidth: 1,
        },
      ],
    };
    setChartData(data);
  };

  fetchData();
  setSocialValue(props.social_value)
}, [props.countries, props.social_value]);



return (
  <div>
    {chartData && (
      <div>
        <Bar
          data={chartData}
          options={{
            interaction: {
              mode: "x",
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

export default GraphCompare;
