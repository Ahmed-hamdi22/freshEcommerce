import { createContext, useState } from "react";
export const CounterContext = createContext(0);

export default function CounterContextProvider({ children }) {
  let [counter, setCounter] = useState(5);
  return (
    <>
      <CounterContext.Provider value={{ counter, setCounter }}>
        {children}
      </CounterContext.Provider>
    </>
  );
}
