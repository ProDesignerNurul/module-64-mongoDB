import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(error => console.error(error))
  }, [])

  const handleAddUser = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = {name, email};
    console.log(user)
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify(user)
    })
    .then( res => res.json())
    .then( data => console.log(data))
    event.target.reset();
  }

  return (
    <div className="App">
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" />
        <br />
        <input type="email" name="email" />
        <br />
        <button  type="submit">Add New User</button>
      </form>


      <h2> User Length : {users.length}</h2>
      {
        users.map(user => <p key={user.id}> {user.name} {user.email} </p>)
      }
    </div>
  );
}

export default App;
