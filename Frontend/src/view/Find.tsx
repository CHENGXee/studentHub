import { useState } from "react"
import { asyncGet } from "../utils/fetch";
import { api } from "../enum/api";
import { Student } from "../interface/Student";
import "../style/All.css"

export default function Find() {
    const [Id, setId] = useState<string>("");
    const [student, setStudent] = useState<Student>();
    const [visible, setVisible] = useState(false);
    async function handleSubmit() {
        try {
            const response = await asyncGet(`${api.findByID}?id=${Id}`)
            if (response?.code === 200) {
                setStudent(response.body);
                setVisible(true);
                setId(""); //清空輸入盒
            }
            else {
                alert("找不到");
            }
        } catch (error) {
            alert("server error");
        }
    }
    return (
        <>
            <div className="boxFind">
                <h1>尋找學生</h1>
                <input type="text" placeholder="請輸入ID" value={Id} onChange={(e) => setId(e.target.value)} />
                <div className="btn">
                    <a onClick={handleSubmit}>查詢</a>
                </div>
                {visible && (
                    <div className="left">
                        <p>帳號:{student?.userName}</p>
                        <p>名字:{student?.name}</p>
                        <p>座號:{student?.sid}</p>
                        <p>科系:{student?.department}</p>
                        <p>年級:{student?.grade}</p>
                        <p>班級:{student?.class}</p>
                        <p>信箱:{student?.email}</p>
                    </div>
                )}

            </div>

        </>
    )
}