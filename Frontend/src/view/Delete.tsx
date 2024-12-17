import { api } from "../enum/api"
import { useState } from "react"
import { asyncDelete } from "../utils/fetch";
import "../style/All.css"
export default function Delete() {
    const [inputValue, setInputValue] = useState<string>('');
    async function handleDelete() {
        //alert(inputValue);
        const uri = `${api.deleteByID}?id=${inputValue}`;
        try {
            const response = await asyncDelete(uri);

            if (response?.code === 200) {
                alert("刪除成功");
                setInputValue(""); //清空輸入盒
                window.location.href = "/";
            }
            else {
                alert("無法找到學生ID");
            }
        } catch (error) {
            alert("server error")
        }

    }
    return (
        <>
            <div className="boxDelete">
                <h1>刪除學生</h1>
                    <input type="text" placeholder="請輸入ID" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                    <div className="btn">
                        <a onClick={handleDelete}>刪除</a>
                    </div>
            </div>
        </>

    )
}