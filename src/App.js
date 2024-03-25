import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useReducer } from "react";
import Header from "./components/Header";

import "./App.css";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

function reducer(state, action) {
  switch (action.type) {
    case "changeBlockNo":
      return { ...state, blockNumber: action.payload };
    default:
      return state;
  }
}

const initialState = {
  blockNumber: null,
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { blockNumber } = state;

  useEffect(() => {
    async function getBlockNumber() {
      dispatch({
        type: "changeBlockNo",
        payload: await alchemy.core.getBlockNumber(),
      });
    }

    getBlockNumber();
  });

  return (
    <div className="App">
      <Header />
      <div className="details">Block Number: {blockNumber}</div>
    </div>
  );
}

export default App;
