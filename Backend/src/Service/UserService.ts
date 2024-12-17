import { Service } from "../abstract/Service";
import { Student } from "../interfaces/Student";
import { logger } from "../middlewares/log";
import { studentsModel } from "../orm/schemas/studentSchemas";
import { Document } from "mongoose"
import { MongoDB } from "../utils/MongoDB";
import { DBResp } from "../interfaces/DBResp";
import { resp } from "../utils/resp";

type seatInfo = {
    schoolName: string,
    department: string,
    seatNumber: string
}

export class UserService extends Service {

    public async getAllStudents(): Promise<Array<DBResp<Student>> | undefined> {
        try {
            const res: Array<DBResp<Student>> = await studentsModel.find({});
            return res;
        } catch (error) {
            return undefined;
        }

    }

    /**
     * 新增學生
     * @param info 學生資訊
     * @returns resp
     */
    public async insertOne(info: Student): Promise<resp<DBResp<Student> | undefined>> {
        const resp: resp<DBResp<Student> | undefined> = {
            code: 200,
            message: "",
            body: undefined
        };

        try {
            // 驗證用戶名稱是否有效
            const nameValidator = await this.userNameValidator(info.userName);

            if (nameValidator !== "驗證通過") {
                resp.code = 403;
                resp.message = nameValidator;
                return resp;
            }

            // 查詢當前的學生數量
            const studentCount = await studentsModel.countDocuments();
            if (studentCount >= 200) { // 最多存放 200 筆資料
                resp.message = "student list is full";
                resp.code = 403;
                return resp;
            }

            // 查詢當前的最大座號
            const maxSid = await studentsModel
                .findOne()
                .sort({ sid: -1 }) // 按 sid 降序排列，取第一個
                .select("sid") // 只取 sid 欄位
                .exec();

            // 設置新的 sid
            const newSid = maxSid ? Number(maxSid.sid) + 1 : 1;
            info.sid = String(newSid);
            info._id = undefined; // 讓 MongoDB 自動生成 _id

            // 插入新學生
            const res = new studentsModel(info);
            resp.body = await res.save();
            resp.message = "insert success";
        } catch (error) {
            resp.message = "server error";
            resp.code = 500;
            console.error("Error inserting student:", error);
        }

        return resp;
    }
    /**
    *刪除一筆用戶
    *@param id:用戶_id
    *@returns resp<any>
    */
    public async deleteByID(id: string) {
        const resp: resp<any> = {
            code: 200,
            message: "",
            body: undefined
        }
        try {
            const res = await studentsModel.deleteOne({ _id: id })
            resp.message = "Sucess";
            resp.body = res;
        } catch (error) {
            resp.message = error as string;
            resp.code = 500;
        }
        return resp;
    }
    /**
    *查詢一筆用戶
    *@param id:用戶_id
    *@returns resp<any>
    */
    public async findByID(id: string) {
        const resp: resp<any> = {
            code: 200,
            message: "",
            body: undefined
        }
        const user = await studentsModel.findById({ _id: id });
        if (user) {
            try {
                resp.message = "Sucess";
                resp.body = user;
            } catch (error) {
                resp.message = error as string;
                resp.code = 500;
                resp.message = "server error"
            }
        } else {
            resp.code = 404;
            resp.message = "user not found";
        }
        return resp;
    }
    /**
     * 更新用戶姓名
     * @param id:用戶ID
     * @param name:用戶更新名稱
     * @returns resp<any>
     */
    public async updateByID(id: string, name: string) {
        const resp: resp<any> = {
            code: 200,
            message: "",
            body: undefined
        }
        const user = await studentsModel.findById(id);
        if (user) {
            try {
                user.name = name;
                await user.save();
                resp.body = user;
                resp.message = "Update Sucess";
            } catch (error) {
                console.log(error)
                resp.code = 500;
                resp.message = "server error";
            }
        } else {
            resp.code = 404;
            resp.message = "user not found";
        }
        return resp;
    }


    /**
     * 學生名字驗證器
     * @param userName 學生名字
     * tku ee 0787
     * ee 科系縮寫
     *  0787 四碼
     * 座號檢查，跟之前有重複就噴錯  只能寫沒重複的號碼
     */
    public async userNameValidator(userName: string): Promise<
        '學生名字格式不正確，應為 tku + 科系縮寫 + 四碼座號，例如: tkubm1760' | '座號已存在' | '校名必須為 tku' | '座號格式不正確，必須為四位數字。' | '驗證通過'
    > {

        if (userName.length < 7) {
            return ('學生名字格式不正確，應為 tku + 科系縮寫 + 四碼座號，例如: tkubm1760');
        }

        const info = this.userNameFormator(userName);

        if (info.schoolName !== 'tku') {
            return '校名必須為 tku';
        }

        // 驗證座號(正則不想寫可以給 gpt 寫, 記得測試就好)
        const seatNumberPattern = /^\d{4}$/; // 驗證4個數字

        if (!seatNumberPattern.test(info.seatNumber)) {
            return '座號格式不正確，必須為四位數字。';
        }

        if (await this.existingSeatNumbers(info.seatNumber)) {
            return '座號已存在'
        }

        return '驗證通過'

    }

    /**
     * 用戶名格式化
     * @param userName 用戶名
     * @returns seatInfo
     */
    public userNameFormator(userName: string) {
        const info: seatInfo = {
            schoolName: userName.slice(0, 3),
            department: userName.slice(3, userName.length - 4),
            seatNumber: userName.slice(-4)
        }
        return info
    }

    /**
     * 檢查用戶名是否存在
     * @param SeatNumber 
     * @returns boolean
     */
    public async existingSeatNumbers(SeatNumber: string): Promise<boolean> {
        const students = await this.getAllStudents();
        let exist = false
        if (students) {
            students.forEach((student) => {
                const info = this.userNameFormator(student.userName)
                if (info.seatNumber === SeatNumber) {
                    exist = true;
                }
            })
        }
        return exist
    }

}