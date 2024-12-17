import { useEffect, useRef, useState } from 'react'
import '../style/App.css'
import { asyncGet } from '../utils/fetch'
import { api } from '../enum/api'
import { Student } from '../interface/Student'
import { resp } from '../interface/resp'

function App() {

  const [students, setStudents] = useState<Array<Student>>([])
  const cache = useRef<boolean>(false)

  useEffect(() => {
    /**
     * 做緩存處理, 避免多次發起請求
     */
    if (!cache.current) {
      cache.current = true;
      asyncGet(api.findAll).then((res: resp<Array<Student>>) => {
        if (res.code == 200) {
          setStudents(res.body)
        }
      });
    }
  }, [])
  const studentList = students ? students.map((student: Student) => {
    return (
      <div className='student' key={student._id}>
        <p>帳號: {student.userName}</p>
        <p>座號: {student.sid}</p>
        <p>姓名: {student.name}</p>
        <p>院系: {student.department}</p>
        <p>年級: {student.grade}</p>
        <p>班級: {student.class}</p>
        <p>Email: {student.email}</p>
        <p>缺席次數: {student.absences ? student.absences : 0}</p>
      </div>
    )
  }) : "loading"

  return (
    <>
      <div className='btn'>
        <a href='#/add'>新增學生</a>
        <a href='#/delete'>刪除學生</a>
        <a href='#/update'>更新學生</a>
        <a href='#/find'>尋找學生</a>
      </div>
      <p> </p>
      <div className="container">
        {studentList}
      </div>
    </>
  )
}

export default App
