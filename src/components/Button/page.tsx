"use client";
import { useContext, useState } from "react"
import { dataContext } from "../DataProvider/page";


type Props = {
    code: number;
    label: string;
    checked: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  };


const Button = ({ code, label, checked, onChange }) => {

    const data = useContext(dataContext)

    const [checkboxState, setCheckboxState] = useState<{
        [key: string]: boolean;
    }>({});

    // チェックボックスがクリックされたときのイベントハンドラ
    const handleCheckboxChange = (id: string) => {
        // チェックボックスの状態を更新
        setCheckboxState((prevState) => ({
        ...prevState,
        [id]: !prevState[id], // 現在の状態の反転
        }));

        // ログをdataに格納
        const updatedData = { ...data, [id]: !checkboxState[id] };

        console.log(updatedData);

        // 選択された都道府県名を親コンポーネントに伝える
        /* onCheckboxChange(id); */

    };

return (
    <>
        <div>
            {[
            "あああ",
            "千葉県",
            "埼玉県",
            "神奈川県",
            "長野県",
            "山梨県",
            "茨木県",
            "栃木県",
            "群馬県",
            "静岡県",
            "大阪府",
            "京都府",
            "北海道",
            "愛知県",
            "兵庫県",
            "鳥取県",
            ].map((id) => (
                    <div  key={`checkbox${id}`} >
                        <input
                        type="checkbox"
                        value={code}
                        name={label}
                        id={label}
                        checked={checked}
                        onChange={(e) => onChange(e)}
                        />

                        <label className="text" htmlFor={label}>
                            {label}
                        </label>
                    </div>
            ))}
        </div>
    </>
    );
};

export default Button;
