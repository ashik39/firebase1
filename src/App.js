import { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase-config";
import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";

function App() {
const [teamData, setTeamData] = useState([]);
const [name, setName] = useState("");
const [age, setAge] = useState(0);
const [location, setLocation] = useState("");
const [eventStatus, setEventStatus] = useState("1");
const teamRef = collection(db, "team");

const createUser = async () => {
  await addDoc(teamRef, { name: name, age: Number(age), location: location });
  setEventStatus("create");
};

const updateUser = async (id, age) => {
  const userDoc = doc(db, "team", id);
  const newFields = { age: age + 1 };
  await updateDoc(userDoc, newFields);
  setEventStatus("update");
};

const deleteUser = async (id) => {
  const userDoc = doc(db, "team", id);
  await deleteDoc(userDoc);
  setEventStatus("delete");
};

useEffect(()=>{
  
  const getTeam = async () =>{
    setEventStatus("");
    const data = await getDocs(teamRef);
    console.log("TEST DATA", data);
    setTeamData(data.docs.map((doc) => ({...doc.data(), id : doc.id} )))
  }
  console.log("REACT_APP_firebaseConfig", process.env.REACT_APP_apiKey);
  getTeam();
}, [ eventStatus ])

  return (
    <div className="App">
      <h1>My First Firebase Integration With React</h1>
      <input
        placeholder="Name..."
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      <input
        type="number"
        placeholder="Age..."
        onChange={(event) => {
          setAge(event.target.value);
        }}
      />
      <input
        placeholder="Location..."
        onChange={(event) => {
          setLocation(event.target.value);
        }}
      />

      <button onClick={createUser}> Create User</button>
      {
        teamData.map((data)=>{
          return <div>
            <h4>
              Name: {data.name}
            </h4>
            <h4>
              Age: {data.age}
            </h4>
            
            <h4>
              Location: {data.location}
            </h4>

            <button
              onClick={() => {
                deleteUser(data.id);
              }}
            >
              {" "}
              Delete User
            </button>
            <button
              onClick={() => {
                updateUser(data.id, data.age);
              }}
            >
              {" "}
              Increase Age
            </button>
          </div>
        })
      }
    </div>
  );
}

export default App;
