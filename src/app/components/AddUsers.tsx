"use client"
import React, { useState } from 'react';
import { addUser } from '../redux/slice';
import { useDispatch } from 'react-redux';

const AddUsers: React.FC = () => {
  const [name, setName] = useState('')
  const dispatch: any = useDispatch();

  const handleuseDispatch = () => {
    dispatch(addUser(name))
  }

  return (
    <div>
      {/* JSX for your component */}
      AddUsers Component
      <input type="text" onChange={(e) => setName(e.target.value)} placeholder='add usera' />
      <button onClick={handleuseDispatch}>Add</button>
    </div>
  );
};

export default AddUsers;
