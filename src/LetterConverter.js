import React, { useCallback, useState } from "react";
import "./LetterConverter.css";

const LetterConverter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [frequency, setFrequency] = useState({});

  const convertSequence = useCallback((inputStr) => {
    let outputStr = "";
    let frequencyDict = {};

    let i = 0;
    while (i < inputStr.length) {
      const currentSequence = inputStr.slice(i, i + 4);

      if (currentSequence.length === 4) {
        const convertedLetter = currentSequence[0];

        if (currentSequence === convertedLetter.repeat(4)) {
          outputStr += convertedLetter;

          frequencyDict = {
            ...frequencyDict,
            [convertedLetter]: (frequencyDict[convertedLetter] || 0) + 1,
          };

          i += 4;
        } else {
          outputStr += currentSequence;
          i++;
        }
      } else {
        outputStr += currentSequence;
        break;
      }
    }

    setOutput(outputStr);
    setFrequency(frequencyDict);
  });

  const handleInputChange = useCallback((event) => {
    const inputValue = event.target.value;
    setInput(inputValue);
    convertSequence(inputValue);
  });
  const formatFrequencyString = useCallback(() => {
    return Object.entries(frequency)
      .map(([letter, count]) => `${letter} converted ${count} times`)
      .join(", ");
  });

  return (
    <div>
      <label>
        Input:
        <input type="text" value={input} onChange={handleInputChange} />
      </label>
      <div>
        <p>Output: {output}</p>
        <p>Frequency: {formatFrequencyString()}</p>
      </div>
    </div>
  );
};

export default LetterConverter;
