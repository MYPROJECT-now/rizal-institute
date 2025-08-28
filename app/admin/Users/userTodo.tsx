"use client";
import { FC } from "react";
import {  UserType } from "@/src/type/ADMIN/admin";
import { toastConfirm } from "@/components/ui/toast.confirm";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface Props {
  userTodo: UserType;
  className?: string;
  deleteUserItem: (clerkId: string, clerk_username: string) => void;

}


const UserTodo: FC<Props> = ({ userTodo, className, deleteUserItem }) => {

  const handleDelteUser = () => {
      toastConfirm("Delete user?", {
      description: "This action will delete the user and cannot be undone.",
      onConfirm: async () => {
        try {
          deleteUserItem(userTodo.clerkId, userTodo.clerk_username);
          toast.success("User deleted successfully!");
        } catch (error) {
          toast.error("Failed to delete user.");
          console.log(error || "something went wrong");
        }
    },
    });
  };

  return (
    <tr className={`border-b hover:bg-green-200 transition duration-200 ${className || ""}`}>
        <td className="px-4 py-2">{userTodo.clerk_username}</td>
        <td className="px-4 py-2">{userTodo.userType}</td>
        <td className="px-4 py-2">{userTodo.clerk_email}</td>
        <td className="px-4 py-2">
          <Button
            variant="rejectButton"
            className="h-[30px] w-[80px] rounded-lg"
            onClick={handleDelteUser}
          >
              Delete
          </Button>
        </td>
    </tr>

  );
};

export default UserTodo;