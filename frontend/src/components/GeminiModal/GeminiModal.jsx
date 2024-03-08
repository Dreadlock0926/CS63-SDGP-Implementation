import { useState } from 'react';
import "./gemini.css"

function GeminiModal() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal)
  }

  return (
    <>
    <div className='botBtn'>
      <button onClick={toggleModal} className='modalBtn'>
        <img style={{width:"40px", height:"40px"}} src='./images/chatbot.png' alt='chatbot-icon' />
      </button>
    </div>

    {modal && (
    <div className='modal'>
      <div onClick={toggleModal} className='modalOverlay'>
        <div className='modalContent'>
          <h2>Gemini Chatbot</h2>
          <p>test233414t</p>
          <hr />
          <button onClick={toggleModal} className='closeModal'>Close</button>
        </div>
      </div>
    </div>
    )}
    </>
  );
}

export default GeminiModal;