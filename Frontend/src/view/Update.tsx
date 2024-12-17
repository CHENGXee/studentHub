import { useState } from "react";
import { api } from "../enum/api";
import { asyncPut } from "../utils/fetch";
import "../style/All.css"

export default function Update() {
    const [inputId, setInputId] = useState<string>('');
    const [inputName, setInputName] = useState<string>('');

    async function handleUpdate() {
        try {
            const response = await asyncPut(api.updateByID, {
                "id": inputId,
                "name": inputName
            })
            if (response.code == 200) {
                alert("ok")
                setInputId("")
                setInputName("")
                window.location.href = "/";
            } else if (response?.code == 404) {
                alert("user not found");
            } else {
                alert(`server error: ${response?.message}`)
            }
        } catch (error) {
            alert("server error")
        }
    }

    return (
        <>
            <div className="boxUpdate">
                <h1>更新學生</h1>
                <input type="text" placeholder="請輸入ID" value={inputId} onChange={(e) => setInputId(e.target.value)} required />
                <input type="text" placeholder="請輸入修改名字" value={inputName} onChange={(e) => setInputName(e.target.value)} required />
                <div className="btn">
                    <a onClick={handleUpdate}>更新</a>
                </div>
            </div>
        </>
    )
}