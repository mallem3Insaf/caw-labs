import './App.css';
import { useState } from "react";
/* EXO 1*/
function ClickButton() {
  const [clicked, setClicked] = useState(false);

  return (
    <div>
      <button onClick={() => setClicked(true)}>ClickMe</button>
      {clicked && <p>Clicked</p>}
    </div>


  );
}

function Toggle() {

 const [toggle, setToggle] = useState(false);

  return (
    <div>
      <button onClick={() => setToggle(!toggle)}>ClickMe</button>
      <p>{toggle ? "Clicked" : "Not Clicked"}</p>
    </div>
  );
}

function Main(){
  const [clicked, setClicked]=useState(null)
  return(
    <div>
      <button onClick={()=> setClicked(1)}>button1</button>
      <button onClick={()=> setClicked(2)}>button2</button>
      <button onClick={()=> setClicked(3)}>button3</button>

      {clicked && <p>Button {clicked} was clicked</p>}
    </div>
  )
}
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>Inc</button>
      <button onClick={() => setCount(count - 1)}>Dec</button>
    </div>
  );
}
/* EXO 2*/

function DisplayTab({ tab }) {
  return (
    <ul>
      {tab.map((element, index) => (
        <li key={index}>{element}</li>
      ))}
    </ul>
  );
}


function DisplayTabNumbered({ tab }) {
  return (
    <ul>
      {tab.map((element, index) => (
        <li key={index}>
          Element {index + 1} is: {element}
        </li>
      ))}
    </ul>
  );
}


function DisplayTabRemovable({ tab }) {
  const [list, setList] = useState(tab);

  const removeItem = (index) => {
    setList(list.filter((_, i) => i !== index));
  };

  return (
    <ul>
      {list.map((element, index) => (
        <li key={index} onClick={() => removeItem(index)}>
          Element {index + 1} is: {element}
        </li>
      ))}
    </ul>
  );
}



/* EXO 3 */
function AuthForm() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    if (!username || !password) return;
    setUsers([...users, { username, password }]);
    setUsername("");
    setPassword("");
  };

  const deleteUser = (index) => {
    setUsers(users.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2>Authentication Form</h2>

      <form onSubmit={submitForm}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input-box"
        /><br />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-box"
        /><br />

        <button type="submit">Login</button>
      </form>

      <h3>Users:</h3>
      <ul>
        {users.map((u, i) => (
          <li key={i}>
            {u.username} — {u.password}
            <button onClick={() => deleteUser(i)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/*EXO 4*/
function DivCreator() {
  const [divs, setDivs] = useState([]);
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [color, setColor] = useState("");

  const addDiv = (e) => {
    e.preventDefault();
    setDivs([...divs, { height, width, color }]);
    setHeight("");
    setWidth("");
    setColor("");
  };

  return (
    <div>
      <h2>Add Styled Divs</h2>

      <form onSubmit={addDiv}>
        <input
          placeholder="Height (px)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="input-box"
        /><br />

        <input
          placeholder="Width (px)"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          className="input-box"
        /><br />

        <input
          placeholder="Color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="input-box"
        /><br />

        <button type="submit">Add Div</button>
      </form>

      <h3>Generated Divs:</h3>
      {divs.map((d, i) => (
        <div
          key={i}
          style={{
            height: d.height + "px",
            width: d.width + "px",
            backgroundColor: d.color,
            margin: "10px"
          }}
        ></div>
      ))}
    </div>
  );
}


function App() {
  const tab1 = ["hello", "world", "from", "react"];
  const tab2 = ["one", "two", "three"];
  
  return (
    <div className="App" >
<h1 style={{ textAlign: "center", color: "#d2691e", fontFamily: "cursive" }}>
   🍁Autumn Inspired 🍁
  </h1>


      <h1>Exercise 1</h1>
      <ClickButton />
      <Toggle />
      <Main />
      <Counter />

       <h1>Exercise 2</h1>
      <DisplayTab tab={tab1} />
      <DisplayTabNumbered tab={tab1} />
      <DisplayTabRemovable tab={tab1} />
      <h3>Two Tables:</h3>
      <DisplayTab tab={tab1} />
      <DisplayTab tab={tab2} />

      <h1>Exercise 3</h1>
      <AuthForm />

       <h1>Exercise 4</h1>
      <DivCreator />
    </div>
  );
}

export default App;
