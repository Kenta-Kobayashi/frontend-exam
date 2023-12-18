"use client";
import React, { useState, useEffect, useContext } from "react";
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
import { dataContext } from "../DataProvider/page";

const RenderLineChart = ({
  selectedPrefectures,
}: {
  selectedPrefectures: string[];
}) => {

  const [populationData, setPopulationData] = useState([]);

  const [contextState, setContextState] = useContext(dataContext);
   /*  console.log(contextState.prefCode); */

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
          `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${contextState.prefCode}`,
          {
            headers: {
              "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY || "", // APIキーがundefinedの場合には空文字列をセット
            },
          }
        );

        const data = await populationData.json();
          setPopulationData(data.result.data[0].data);

      } catch (error) {
        alert("error");
      }
    };
    fetchPopulationData();
  }, [contextState]);

  console.log(populationData);

  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={populationData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis
            type="number"
            domain={[0, 100000000]}
            tickFormatter={formatYAxis}
          />
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
