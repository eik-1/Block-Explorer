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
    case "blockDetails":
      const block = action.payload;
      return {
        ...state,
        hash: block.hash,
        miner: block.miner,
        timestamp: block.timestamp,
        gasLimit: block.gasLimit.toString(),
        gasUsed: block.gasUsed.toString(),
      };
    default:
      return state;
  }
}

const initialState = {
  blockNumber: null,
  hash: null,
  miner: null,
  timestamp: 0,
  gasLimit: 0,
  gasUsed: 0,
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { blockNumber, hash, miner, timestamp, gasLimit, gasUsed } = state;

  useEffect(() => {
    async function getBlockNumber() {
      dispatch({
        type: "changeBlockNo",
        payload: await alchemy.core.getBlockNumber(),
      });
    }

    async function getBlockDetails() {
      const block = await alchemy.core.getBlock(blockNumber);
      console.log(block);
      dispatch({ type: "blockDetails", payload: block });
    }

    getBlockNumber();
    getBlockDetails();
  }, [dispatch, blockNumber]);

  return (
    <div className="App">
      <Header />
      <div className="details">
        <p id="blocknum">Curent Block Number: {blockNumber}</p>
        <p>
          <b>Hash:</b> {hash}
        </p>
        <p>
          <b>Miner:</b> {miner}
        </p>
        <p>
          <b>Timestamp:</b> {new Date(timestamp * 1000).toLocaleString()}
        </p>
        <p>
          <b>Gas Limit:</b> {gasLimit}
        </p>
        <p>
          <b>Gas Used:</b> {gasUsed}
        </p>
      </div>
    </div>
  );
}

export default App;
