"use client";
import { ChangeEvent, FC, useState } from "react";

interface Props {
  createTodo: (lrn:string, tuitionFee: number, soa: string, siNumber: string) => void;
}

const AddTodo: FC<Props> = ({ createTodo }) => {
  // State for handling input value
  const [tuitionFee, setTuitionFee] = useState("");
  const [soa, setSoa] = useState("");
  const [siNumber, setSiNumber] = useState("");
  const [lrn, setLrn] = useState("");

  // Event handler for input change
  const handleLrn = (e: ChangeEvent<HTMLInputElement>) => {
    setLrn(e.target.value);
  };

  const handleTuitionFee = (e: ChangeEvent<HTMLInputElement>) => {
    setTuitionFee(e.target.value);
  };

  const handleSoa = (e: ChangeEvent<HTMLInputElement>) => {
    setSoa(e.target.value);
  };

  const handleSiNumber = (e: ChangeEvent<HTMLInputElement>) => {
    setSiNumber(e.target.value);
  };

  // Event handler for adding a new todo
  const handleAdd = async () => {
    createTodo(lrn, Number(tuitionFee), soa, siNumber);
    setTuitionFee("");
    setSoa("");
    setSiNumber("");  
  };

  // Rendering the AddTodo component
  return (
    <div className="w-full flex gap-1 mt-2">
      {/* Input field for entering new todo text */}
      <div>
        <label htmlFor="lrn">LRN</label>
        <input
          type="tuitionFee"
          onChange={handleLrn}
          className="w-full px-2 py-1 border border-gray-200 rounded outline-none"
        />
      </div>
      
      <input
        type="tuitionFee"
        className="w-full px-2 py-1 border border-gray-200 rounded outline-none"
        onChange={handleTuitionFee}
        value={tuitionFee}
      />
            <input
        type="tuitionFee"
        className="w-full px-2 py-1 border border-gray-200 rounded outline-none"
        onChange={handleSoa}
        value={soa}
      />
            <input
        type="tuitionFee"
        className="w-full px-2 py-1 border border-gray-200 rounded outline-none"
        onChange={handleSiNumber}
        value={siNumber}
      />
      {/* Button for adding a new todo */}
      <button
        className="flex items-center justify-center bg-green-600 text-green-50 rounded px-2 h-9 w-14 py-1"
        onClick={handleAdd}
      >
        Add
      </button>
    </div>
  );
};

export default AddTodo;
