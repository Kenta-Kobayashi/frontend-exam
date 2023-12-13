"use client";
import { useContext, useEffect, useState } from "react";
import { dataContext } from "../DataProvider/page";

interface Prefecture {
    prefCode: number;
    prefName: string;
    id: number;
  }

const Button = () => {

  const [kenData, setKenData] = useState<Prefecture[]>([]);
  const data = useContext(dataContext);
  const [checkboxState, setCheckboxState] = useState<{
    [key:string] : Boolean;
  }>([]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await fetch(
          "https://opendata.resas-portal.go.jp/api/v1/prefectures",
          {
            headers: {
              "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY || "", // APIキーがundefinedの場合には空文字列をセット
            },
          }
        );

        const data = await apiData.json();
            /* console.log(data); */
        setKenData(data.result);
      } catch (error) {
            alert("error");
      }
    };
    fetchData();
  }, []);


  // チェックボックスがクリックされたときのイベントハンドラ
  const handleCheckboxChange = (label: string) => {
    // チェックボックスの状態を更新
    setCheckboxState((prevState) => {
        const updatedState = { ...prevState, [label]: !prevState[label] }; // 最新の状態を使って更新
            /* console.log(updatedState); */ // 更新された状態をログに出力
        return updatedState; // 更新された状態を返す
    });


    // ログをdataに格納
    const updatedData = { ...(data as object), [label]: !checkboxState[label] };
        console.log(updatedData);

    const selectedPrefecture = kenData.find((prefecture) => prefecture.prefName === label);
        if (selectedPrefecture) {
            console.log(selectedPrefecture);
        }
  };

  return (
    <>
      <div>
        {kenData.map((prefecture) => (
          <div key={`checkbox${prefecture.prefCode}`}>
            <input
              type="checkbox"
              name={prefecture.prefName}
              id={prefecture.id}
              checked={checkboxState[prefecture.prefName] || false}
              onChange={() => handleCheckboxChange(prefecture.prefName)}
            />

            <label className="text" htmlFor={prefecture.prefName}>
                {prefecture.prefName}
            </label>
          </div>
        ))}
      </div>
    </>
  );
};

export default Button;
