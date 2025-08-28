import { getAllUsers } from "@/src/actions/adminAction";
import UserTodos from "./userTodos";


export const UsersPage = async () =>{
  const data = await getAllUsers();
  return <UserTodos userTodos={data} />
}