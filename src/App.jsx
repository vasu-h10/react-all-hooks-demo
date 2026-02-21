import {
  useState,
  useEffect,
  useContext,
  useReducer,
  useRef,
  useMemo,
  useCallback
} from "react";
import { ThemeContext } from "./ThemeContext";

/* useReducer */
function reducer(state, action) {
  switch (action.type) {
    case "INC":
      return state + 1;
    case "DEC":
      return state - 1;
    default:
      return state;
  }
}

export default function App() {
  /* useState */
  const [dark, setDark] = useState(false);

  /* useReducer */
  const [count, dispatch] = useReducer(reducer, 0);

  /* useRef */
  const inputRef = useRef(null);

  /* useEffect */
  useEffect(() => {
    console.log("Theme changed:", dark);
  }, [dark]);

  /* useMemo */
  const doubled = useMemo(() => {
    return count * 2;
  }, [count]);

  /* useCallback */
  const toggleTheme = useCallback(() => {
    setDark(prev => !prev);
  }, []);

  return (
    <ThemeContext.Provider value={dark}>
      <div
        style={{
          height: "100vh",
          background: dark ? "#111" : "#fff",
          color: dark ? "#fff" : "#000",
          padding: "40px",
          textAlign: "center"
        }}
      >
        <h1>All React Hooks Demo</h1>

        {/* useContext */}
        <ThemeText />

        <button onClick={toggleTheme}>
          Toggle Theme
        </button>

        {/* useReducer */}
        <h2>Count: {count}</h2>
        <button onClick={() => dispatch({ type: "INC" })}>+</button>
        <button onClick={() => dispatch({ type: "DEC" })}>-</button>

        {/* useMemo */}
        <p>Doubled (memo): {doubled}</p>

        {/* useRef */}
        <input ref={inputRef} placeholder="Focus me" />
        <br />
        <button onClick={() => inputRef.current.focus()}>
          Focus Input
        </button>
      </div>
    </ThemeContext.Provider>
  );
}

function ThemeText() {
  const dark = useContext(ThemeContext);
  return <p>Current Theme: {dark ? "Dark 🌙" : "Light ☀️"}</p>;
}
