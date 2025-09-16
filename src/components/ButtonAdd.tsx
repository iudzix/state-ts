import { useState } from "react";

function ButtonAdd() {
  const [count, setCount] = useState(0);
  return (
    <>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
      <button onClick={() => setCount((count) => count - 1)}>
        minus one
      </button>
    </>
  );
}

export default ButtonAdd;
