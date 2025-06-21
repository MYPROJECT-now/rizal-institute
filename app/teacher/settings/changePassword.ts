// import { UserResource } from '@clerk/types';

// type UserType = UserResource;

// export const handlePasswordUpdate = async (
//   user: UserType | null,
//   currentPassword: string,
//   newPassword: string
// ) => {
//   try {
//     if (!user) {
//       throw new Error("User is not authenticated");
//     }

//     await user.updatePassword({
//       currentPassword,
//       newPassword,
//       signOutOfOtherSessions: true,
//     });

//     return { success: true };
//   } catch (error: any) {
//     if (error?.errors && Array.isArray(error.errors)) {
//       const firstError = error.errors[0];

//       // Custom message for wrong current password
//       if (firstError.code === "form_param_current_password_invalid") {
//         return { error: "The current password is incorrect." };
//       }

//       return { error: firstError.message || "Something went wrong." };
//     }

//     if (error instanceof Error) {
//       return { error: error.message };
//     }

//     return { error: "An unknown error occurred." };
//   }
// };





// import { UserResource } from '@clerk/types';

// // Update the type definition
// type UserType = UserResource;

// export const handlePasswordUpdate = async (
//     user: UserType | null,
//     currentPassword: string,
//     newPassword: string
// ) => {
//     try {
//         if (!user) {
//             throw new Error("User is not authenticated");
//         }

//         await user.updatePassword({
//             currentPassword,
//             newPassword,
//             signOutOfOtherSessions: true,
//         });

//         return { success: true };
//     } catch (error) {
//         if (error instanceof Error) {
//             return { error: error.message };
//         }
//         return { error: "An unknown error occurred" };
//     }
// };







// import { useUser } from '@clerk/clerk-react';


// // Use the type of the user object
// type UserType = ReturnType<typeof useUser>['user'];


// export const handlePasswordUpdate = async (
//     user: UserType | null, // Accept the user as an argument, and allow it to be null
//     currentPassword: string,
//     newPassword: string
// ) => {
//     try {
//         if (!user) {
//             throw new Error("User is not authenticated");
//         }

//         // Use the Clerk API to update the user's password
//         await user.updatePassword({
//             currentPassword,
//             newPassword,
//             signOutOfOtherSessions: true, // Optional: Sign out from other sessions
//         });


    
//         return { success: true };
//     } catch (error: unknown) {
//         if (error instanceof Error) {
//             console.error(error);
//             return { error: error.message || "Failed to update password. Please try again." };
//         } else {
//             console.error(error);
//             return { error: "An unknown error occurred." };
//         }
//     }
// };

   