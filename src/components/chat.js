import React, { useEffect, useRef, useState } from 'react';
import Logo from '../assets/logo.png';
import '../styles/chat.css';

const Chat = ({ isOpen, toggleChatbot, totalPrice, onPriceAccept }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const chatbotBodyRef = useRef(null);
  const [acceptedPrice, setAcceptedPrice] = useState(totalPrice); // New state to store accepted price

  useEffect(() => {
    setMessages([
      { id: 1, text: "I am <b>𝖡𝖺𝗋𝗀ΛI</b>, a negotiation chatbot.", sender: "bot" }
    ]);
  }, []);

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    const userInput = inputMessage.trim().toLowerCase();
    let replyMessage = null;

    if (userInput === "yes") {
      const newPrice = totalPrice - 0.05 * totalPrice;
      setAcceptedPrice(newPrice);
      replyMessage = { id: messages.length + 1, text: `I'm willing to drop the price to <b>₹${newPrice}</b>. Do you <b>'Accept'</b> or <b>'Refuse'</b>?`, sender: "bot" };
    } else if (/(hi|hello|hey|hello bargai)/i.test(userInput)) {
      replyMessage = { id: messages.length + 1, text: `Hi there! If you're interested in negotiating the total price of <b>₹${totalPrice}</b>, please type <b>'Yes'</b>.`, sender: "bot" };
    } else if (userInput === "refuse" || userInput === "no") {
      replyMessage = { id: messages.length + 1, text: "What price are you suggesting?", sender: "bot" };
    } else if (!isNaN(userInput)) {
      const userInputNumber = parseFloat(userInput);
      const lowerBound = totalPrice - 0.1 * totalPrice;

      if (userInputNumber >= lowerBound - 10 || userInput >= lowerBound - 5) {
        setAcceptedPrice(userInputNumber); // Update the accepted price
        replyMessage = { id: messages.length + 1, text: `I can offer you this price.`, sender: "bot" };
      } else {
        const finalPrice = lowerBound;
        setAcceptedPrice(finalPrice); // Update the accepted price
        replyMessage = { id: messages.length + 1, text: `Your offer is too high. How about a final price of <b>₹${finalPrice}</b>.`, sender: "bot" };
      }
    } else if (userInput === "accept" || userInput === "Ok" || userInput === "ok") {
      if (acceptedPrice !== null) {
        replyMessage = { id: messages.length + 2, text: `Got it! The price will now be set at <b>₹${acceptedPrice}</b>.`, sender: "bot" };
      } else {
        replyMessage = { id: messages.length + 1, text: `Please provide a valid price before accepting.`, sender: "bot" };
      }
    }

    // Prepare the new message
    const newMessage = { id: messages.length + 1, text: inputMessage, sender: "user" };

    // Update messages state
    setMessages((prevMessages) => [
      ...prevMessages,
      newMessage,
      ...(replyMessage ? [replyMessage] : []),
    ]);

    setInputMessage("");
  };
  const handleCloseChatbot = () => {
    // Reset messages to the initial greeting message
    setMessages([{ id: 1, text: "I am <b>𝖡𝖺𝗋𝗀ΛI</b>, a negotiation chatbot.", sender: "bot" }]);
    // Call the toggleChatbot function to close the chatbot window
    toggleChatbot();
    onPriceAccept(acceptedPrice);
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="bargai-logo" >
          <img src={Logo} alt="bargai-logo"/>
          </div>
            <h1>𝖡𝖺𝗋𝗀ΛI</h1>
            <button onClick={handleCloseChatbot}>Close</button>
          </div>
          <div className="chatbot-body" ref={chatbotBodyRef}>
          <div className="message-container">
  {messages.map((message) => (
    <div 
      key={message.id} 
      className={`message message-${message.sender}`} 
      style={{ textAlign: message.sender === 'bot' ? 'left' : 'right' }}
      dangerouslySetInnerHTML={{ __html: message.text }} // Render HTML
    />
  ))}
</div>
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Reply here..."
              value={inputMessage}
              onChange={handleInputChange}
            />
            <button onClick={handleSendMessage}><i className="fas fa-paper-plane"></i></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
