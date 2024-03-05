import React, { useState, useRef, useEffect } from 'react';
import repliesJson from '../assets/replies.json';
import { useSelector, useDispatch } from 'react-redux'; // Assuming you are using Redux for state management

const ChatBot = ({show, onClose}) => {
  const [replies] = useState(repliesJson.intents);

  const username = useSelector((state) => state.user.username);

  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const [currentTag, setCurrentTag] = useState('0');

  useEffect(() => {
    // Display the first question and responses
    displayQuestionAndResponses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTag]);
  

  const displayQuestionAndResponses = () => {
    const currentIntent = replies.find(intent => intent.tag === currentTag);
  
    if (currentIntent) {
      console.log(currentIntent.question[0]);
      console.log(currentIntent.responses);
    }
  };
  

  const handleAnswerClick = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  
    const currentIntent = replies.find(intent => intent.tag === currentTag);
  
    // Logic to handle user's answer
    console.log(`User selected answer: ${currentIntent.responses[answerIndex]}`);
  
    // Move to the next question based on the selected answer
    const match = currentIntent.responses[answerIndex].match(/\$(\d+)/);

    if (match) {
      const numberAfterDollarSign = match[1];
      console.log(numberAfterDollarSign); // Output: 021
      setCurrentTag(numberAfterDollarSign);
    } else {
      console.log("No match found");
    }
  
    // Reset selectedAnswer for the next question
    setSelectedAnswer(null);
  };
  
  const handleReturnClick = () => {
  
    setCurrentTag('0');
    // Reset selectedAnswer for the next question
    setSelectedAnswer(null);
  };

  const closeModel=()=>{
    onClose();
    setCurrentTag('0');
  }

  if (!show) {
    return null;
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="relative w-auto max-w-md mx-auto my-6">
        <div className="border rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 className="text-3xl font-semibold">Chat Bot</h3>
            <button
              className="text-blue-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={closeModel}
            >
              Close
            </button>
          </div>


      <div className="flex flex-col p-6">
        {/* <div >
          <p>{replies.find(intent => intent.tag === currentTag)?.question[0]}</p>
        </div> */}
        <div className="flex flex-col text-black">
          <p className="text-red">{replies.find(intent => intent.tag === currentTag)?.question[0]}</p>
          <div className="mt-1 flex flex-col">
          {replies.find(intent => intent.tag === currentTag)?.responses.map((answer, index) => {
            // Extract the string until the dollar sign
            const labelUntilDollarSign = answer.split('$')[0].trim();

            return (
              <button
                key={index}
                className={`mb-2 px-4 py-2 ${
                  selectedAnswer === index ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
                } rounded`}
                onClick={() => handleAnswerClick(index)}
                disabled={selectedAnswer !== null}
              >
                {labelUntilDollarSign}
              </button>
            );
          })}
             </div>
             <button
                className={`mb-2 px-4 py-2 bg-gray-300 text-black rounded`}
                onClick={() => handleReturnClick()}
              >Return to the main menu</button>
        </div>
      </div>


        </div>
      </div>
    </div>
  );
};

export default ChatBot;