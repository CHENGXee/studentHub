## 安裝與執行指引
### 安裝步驟
1. **克隆專案**:
   ```bash
   git clone https://github.com/CHENGXee/studentHub.git
   cd studentHub
   ```
2. **安裝依賴**:
   - 後端:
     ```bash
     cd backend
     npm install
     ```
   - 前端:
     ```bash
     cd frontend
     npm install
     ```
3. **設定環境變數**:
   - 複製 `.env.example` 並命名為 `.env`。
   - 編輯 `.env` 文件，填入必要參數，例如資料庫連線資訊。

4. **啟動服務**:
   - 啟動後端:
     ```bash
     cd backend
     npm run dev
     ```
   - 啟動前端:
     ```bash
     cd frontend
     npm run dev
     ```
5. **進入系統**:
   - 開啟瀏覽器並輸入: `http://localhost:5173`

## API規格說明
#### 1. 建立資料
- **方法**: `POST`
- **URL**: `/api/v1/users/insertOne`
- **請求範例**:  
    ```json
    {
        "userName": "tkuim1234",
        "name": "王小明",
        "department": "資訊管理學系",
        "grade": "三年級",
        "class": "A",
        "Email": "411630000@tkuim.com"
    }
    ```
- **回應範例**:  
    403
    ```json
    {
        "code": 403,
        "message": "座號已存在"
    }
    ```
    ```json
    {
        "code": 403,
        "message": "student list is full"
    }
    ```
#### 2. 取得資料 (Read)
- **方法**: `GET`
- **URL**: `/api/v1/users/findAll`
- **回應範例**:
  ```json
    {
        "code": 200,
        "message": "find sucess",
        "body": [
            {
                "_id": "6755d0fabdd34577683813b5",
                "userName": "tkuee0787",
                "sid": "1",
                "name": "一二三",
                "department": "電機工程系",
                "grade": "四年級",
                "class": "A",
                "email": "tkuee0787@tkuim.com"
            },
        ]
    }
  ```
#### 3. 更新資料 (Update)
- **方法**: `PUT`
- **URL**: `/api/v1/users/updateByID`
- **請求範例**:
  ```json
    {
        "id": "6755c661bdd3457768381382",
        "name": "高爾軒"   
    }
  ```
- **回應範例**:  
    200
    ```json
    {
        "code": 200,
        "message": "Update Sucess",
        "body": {
            "_id": "6755c661bdd3457768381382",
            "userName": "tkubm9553",
            "sid": "2",
            "name": "高爾軒",
            "department": "企業管理系",
            "grade": "二年級",
            "class": "A",
            "email": "tkubm9553@tkuim.com"
        }
    }
    ```
    404
    ```json
    {
        "code": 404,
        "message": "user not found"
    }
    ```
    500
    ```json
    {
        "code": 500,
        "message": "server error"
    }
    ```

#### 4. 刪除資料 (Delete)
- **方法**: `DELETE`
- **URL**: `/api/v1/users/deleteByID`
- **請求範例**:
    ```
    id=6755c6c3ff09ea1a415826d8
    ```
- **回應範例**:  
    200
    ```json
    {
        "code": 200,
        "message": "Sucess",
        "body": {
            "acknowledged": true,
            "deletedCount": 1
        }
    }
    ```
    404
    ```json
    {
        "code": 404,
        "message": "user not found"
    }
    ```
    500
    ```json
    {
        "code": 500,
        "message": "server error"
    }
    ```

---
## 架構圖
![image](https://github.com/CHENGXee/studentHub/blob/main/%E6%9E%B6%E6%A7%8B%E5%9C%96.png?raw=true)
## 流程圖
![image](https://github.com/CHENGXee/studentHub/blob/main/%E6%B5%81%E7%A8%8B%E5%9C%96.png?raw=true)
## demo影片