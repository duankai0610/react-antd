import http from "@utils/http";

export const LoginApi = (values)=>http.post("/api/users/login",{userId:values.userId,password:values.password})
export const UserListApi = ()=>http.get("/api/users/list");