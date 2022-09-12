import React, { useState, useEffect } from "react";
import "./App.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase-config";

function App() {
  const [users, setUsers] = useState(null);
  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    const getUser = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUser();
  }, []);

  if (!users) {
    return <div>Loading...</div>;
  }
  console.log(users);
  const displayUsers = users.map((user) => {
    const { name, age } = user;
    return (
      <div key={user.id}>
        <h1>{name}</h1>
        <h2>{age}</h2>
      </div>
    );
  });

  return (
    <div className="App">
      <h1>Hello</h1>
      {displayUsers}
    </div>
  );
}

export default App;
