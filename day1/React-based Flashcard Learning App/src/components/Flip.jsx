import React, { useState } from "react";

const Flip = () => {
  const [count, setCount] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [wrongAnswer, setWrongAnser] = useState(0);

  const flashcards = [
    {
      id: 1,
      question: "What is the capital of France?",
      answer: "Paris",
    },
    {
      id: 2,
      question: "What is 5 + 7?",
      answer: "12",
    },
    {
      id: 3,
      question: "Who wrote 'To Kill a Mockingbird'?",
      answer: "Harper Lee",
    },
    {
      id: 4,
      question: "What is the chemical symbol for water?",
      answer: "H2O",
    },
    {
      id: 5,
      question: "What is the speed of light in a vacuum?",
      answer: "299,792,458 meters per second",
    },
  ];
  function handleSubmit(e) {
    e.preventDefault();
    if (answer.toLowerCase() == flashcards[count].answer.toLowerCase()) {
      setScore(() => score + 1);
    } else {
      setWrongAnser(() => wrongAnswer + 1);
      alert("wrong answer");
    }
    setAnswer("");
    setCount(() => count + 1);
  }
  function handlereset() {
    setScore(0);
    setCount(0);
    setWrongAnser(0);
  }
  console.log(score);

  return (
    <div id="conatiner">
      <div>
        <h1>{flashcards[count].question}</h1>

        {toggle && <h1>{flashcards[count].answer}</h1>}

        <button onClick={() => setToggle(!toggle)}>Show Answer</button>
      </div>

      <button onClick={() => setCount(count > 0 ? count - 1 : 0)}>Back</button>
      <button
        onClick={() =>
          setCount(count < flashcards.length - 1 ? count + 1 : count)
        }
      >
        Next
      </button>
      <form onSubmit={handleSubmit}>
        <label>
          guess the answer
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </label>
        <input type="submit" />
      </form>
      <div>
        <strong>Score : {score}</strong>
        <br />
        <button onClick={handlereset}>Reset</button>
        <br />
        <strong>Incorrect : {wrongAnswer}</strong>
      </div>
    </div>
  );
};

export default Flip;
