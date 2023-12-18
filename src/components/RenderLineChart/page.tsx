"use client";
import React, { useState , useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";


const RenderLineChart = ({ selectedPrefectures }: { selectedPrefectures: string[] }) => {



const [chartData, setChartData] = useState();
const [populationData, setPopulationData] = useState([]);

const formatYAxis = (value: number) => {
  if (value >= 100000) {
    return `${value / 100000}M`; // 1M以上の場合はMで省略
  }
  return String(value);
};

useEffect(() => {
  const fetchPopulationData = async () => {
    try {
      const populationData = await fetch(
        "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear",
        {
          headers: {
            "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY || "", // APIキーがundefinedの場合には空文字列をセット
          },
        }
      );


      const data = await populationData.json();
          /* console.log(data); */
        setPopulationData(data.result);
        const newData = data.result.data.map((item: { year: any; value: any; }) => ({
          name: `${item.year}年`,
          pv: item.value,
        }));
        setChartData(newData);
    } catch (error) {
          alert("error");
    }
  };
  fetchPopulationData();
}, [setPopulationData]);

  return (
    <>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis type="number" domain={[0, 100000000]} tickFormatter={formatYAxis} />
        <Tooltip />
        <Legend />
        <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default RenderLineChart;
