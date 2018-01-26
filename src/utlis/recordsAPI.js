import axios from 'axios'
//从环境变量里面读取接口URL
const api=process.env.REACT_APP_BASE_REQUEST_URL;
export const getRecords=()=>axios.get(`${api}/api/v1/records`);
export const CreateRecords=(params)=>axios.post(`${api}/api/v1/records`,params);
export const UpdateRecords=(id,params)=>axios.put(`${api}/api/v1/records/${id}`,params);
export const DeleteRecords=(id)=>axios.delete(`${api}/api/v1/records/${id}`);