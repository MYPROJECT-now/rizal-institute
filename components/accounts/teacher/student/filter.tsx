// // app/components/MyStudentsClient.tsx (Client Component)
// "use client";

// import { useSearchParams } from "next/navigation";
// import dynamic from "next/dynamic";

// // Dynamically import the server component
// const MyStudentsWrapper = dynamic(() => import("./MyStudentsWrapper"), {
//   ssr: false, // Prevent SSR for client-only usage
// });

// export const MyStudentsClient = () => {
//   const searchParams = useSearchParams();
//   const filterID = searchParams.get("filterID");

//   return <MyStudentsWrapper filterID={filterID} />;
// };
