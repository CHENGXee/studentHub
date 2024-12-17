import { useState } from "react"
import { asyncPost} from "../utils/fetch";
import { api } from "../enum/api";
import "../style/All.css"
export default function Add() {
    const [userName, setUserName] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [department, setDepartment] = useState<string>('');
    const [grade, setGrade] = useState<string>('');
    const [className, setClassName] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    async function handleSubmit() {
        try {
            const response = await asyncPost(api.insertOne, {
                "userName": userName,
                "name": name,
                "department": department,
                "grade": grade,
                "class": className,
                "email": email,
            })
            if (response.code == 200) {
                alert("ok")
                setUserName("")
                setName("")
                setDepartment("")
                setClassName("")
                setGrade("")
                setEmail("")
                window.location.href = "/";
            } else if (response?.code == 404) {
                alert("user not found");
            } else {
                alert(`server error: ${response?.message}`)
            }
        } catch (error) {
            console.log(error)
            alert("server error")
        }
    }

    return (
        <>
            <div className="boxAdd">

                <h1>新增學生</h1>
                <input type="text" placeholder="userName" value={userName} onChange={(e) => setUserName(e.target.value)} />
                <input type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="department" value={department} onChange={(e) => setDepartment(e.target.value)} />
                <input type="text" placeholder="grade" value={grade} onChange={(e) => setGrade(e.target.value)} />
                <input type="text" placeholder="class" value={className} onChange={(e) => setClassName(e.target.value)} />
                <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                <div className="btn">
                    <a onClick={handleSubmit}>送出</a>
                </div>
            </div>
        </>
    )
}