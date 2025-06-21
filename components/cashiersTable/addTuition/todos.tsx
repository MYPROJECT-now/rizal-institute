"use client";
import AddTodo from "./addTodo";
// import { addTuition } from "@/src/actions/serverActions";



const addTuitionPage =() => {

  // Function to create a new todo item
  const createTodo = ( ) => {
    // addTuition( lrn, tuitionFee, soa, siNumber);
  };



  // Rendering the Todo List component
  return (
    <main className="flex mx-auto max-w-xl w-full min-h-screen flex-col items-center p-16">
      <div className="text-5xl font-medium">To-do app</div>
      {/* Adding Todo component for creating new todos */}
      <AddTodo createTodo={createTodo} />
    </main>
  );
};

export default addTuitionPage;
