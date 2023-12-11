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




const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  }

];

const RenderLineChart = () => {

    const generateData = () => {
        const startYear = 1960;
        const endYear = 2050;
        const interval = 5;
    
        const data = [];
    
        for (let year = startYear; year <= endYear; year += interval) {
          data.push({
            name: `${year}年`,
/*             uv: // 何かしらの数値データをここに設定する,
            pv: // 何かしらの数値データをここに設定する,
            amt: // 何かしらの数値データをここに設定する, */
          });
        }
    
        return data;
      };

      const [chartData, setChartData] = useState(generateData());

  useEffect(() => {
    const fetchData = async () => {
        try {
            const apiData = await fetch('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
                headers: {
                    'X-API-KEY': process.env.NEXT_PUBLIC_API_KEY || '', // APIキーがundefinedの場合には空文字列をセット
                },
            });

    const data = await apiData.json();
        console.log(data);
        } catch (error) {
            alert("error");
        }
    };
        fetchData();
    }, []);


/*             // APIデータから必要な形式に変換してセット
            const formattedData = data.result.map((prefecture) => ({
                name: prefecture.prefName,
                uv: // 何かしらの数値データをここに設定する,
                pv: // 何かしらの数値データをここに設定する,
                amt: // 何かしらの数値データをここに設定する,
              }));
      
              setChartData(formattedData);
            } catch (error) {
              alert("error");
            }
          };

          fetchData();
        }, []); */

  return (
    <>
    <p>{data}</p>
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
        <YAxis />
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
