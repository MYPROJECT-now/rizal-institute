import { UserResource } from '@clerk/types';

type UserType = UserResource;

export const handlePasswordUpdate = async (
  user: UserType | null,
  currentPassword: string,
  newPassword: string
) => {
  try {
    if (!user) {
      throw new Error("User is not authenticated");
    }

    await user.updatePassword({
      currentPassword,
      newPassword,
      signOutOfOtherSessions: true,
    });

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      if (error?.message) {
        // Handle specific errors or messages here
        return { error: error.message };
      }
    }

    return { error: "An unknown error occurred." };
  }
};
