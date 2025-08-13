import React, { useReducer } from "react";
import { Button } from "@mui/material";
import Header from "../Header";
const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

const Dashboard = () => {
  const HHH = [
    {
      Names:"Apple",
      Desc:"Lorem",
    },
    {
      Names:"Banana",
      Desc:"Dummy",
    },
  ];

  const [state, qqqq] = useReducer(reducer, initialState);

  return (
    <>
      <Header />
      <ul>
        {HHH.map((aaa, employee) => (
          <li key={employee.id}> 
            <span>
            {aaa.Names}
            </span>
            <p>{aaa.Desc}</p>
          </li>
        ))}
      </ul>
      <div>
        <p>Count: {state.count}</p>
        <Button onClick={() => qqqq({ type: "decrement" })}>Decrement</Button>
        <Button onClick={() => qqqq({ type: "increment" })}>Increment</Button>
      </div>
    </>
  );
};
export default Dashboard;
