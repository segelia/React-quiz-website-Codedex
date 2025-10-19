import React, { useState, useContext } from 'react';
import { UserContext } from './UserContext';

export default function UserForm() {
  const [inputName, setInputName] = useState('');
  const { name, setName } = useContext(UserContext);

  function handleSubmit(e) {
    e.preventDefault();
    setName(inputName);  // Set the name in context
    setInputName("");
    window.history.pushState({}, '', '/quiz');  // Change the URL without reloading the page
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);  // Dispatch a navigation event
  }

  function handleChange(e){
    setInputName(e.target.value);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
          <label>Enter your name</label>
          <input type="text" id="name" value={inputName} onChange={handleChange} required></input>
          <button type="submit">Submit</button>
      </form>
      <br/>
      <p>Your current name is: {name}</p>
    </div>
  );
}