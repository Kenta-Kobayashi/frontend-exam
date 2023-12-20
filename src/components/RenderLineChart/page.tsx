"use client";
import React, { useState, useEffect, useContext, useMemo } from "react";
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
        console.log(valueName);
      } catch (error) {
        alert("error");
      }
    };
    fetchPopulationData();
  }, [contextState]);


  // dataとprefNameをメモ化
  const memoizedDataAndPrefName = useMemo(
    () => ({
      Data: populationData,
      Name: contextState.prefName,
    }),
    [populationData, contextState.prefName]
  );
  console.log(memoizedDataAndPrefName);
  console.log(populationData, "人口データ");

/*   const data = [
    {
      year: {populationData},
      name: ,
    },
  ]; */

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
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default RenderLineChart;
