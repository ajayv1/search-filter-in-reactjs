import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredUser, setFilteredUser] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await fetch('https://jsonplaceholder.typicode.com/users');
        const userData = await data.json();
        
        setUsers(userData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (searchText.length) {
      const filterUsers = users.filter((user) => {
        return (user.name).toLowerCase().includes(searchText.toLowerCase());
      });

      setFilteredUser(filterUsers);
    } else {
      setFilteredUser([]);
    }
  }, [searchText, users]);

  return (
    <div className="container">
      <h1 className='title'>Search Filter in react <span>( by weekendtutorial.com )</span></h1>
      <input className='search' type="text" placeholder='search user' value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
      <ul className='userList'>
        {
          filteredUser.length ? 
            filteredUser.map((user) => <li className='userListItem' key={user.id}>{user.name}</li>) :        
            users.map((user) => <li className='userListItem' key={user.id}>{user.name}</li>)
        }
      </ul>
      
    </div>
  );
}

export default App;
