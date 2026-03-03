import { useState } from 'react'
import api from './api' // Import your custom bridge!

function App() {
  const [message, setMessage] = useState("Waiting for backend...");

  const testLogin = async () => {
    try {
      // 1. Send the login request
      const response = await api.post('/login', {
        email: "testnumber123@mail.com", // Use the email you created earlier!
        password: "password123"
      });
      
      setMessage(`Success! Logged in as: ${response.data.user.email}`);
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div>
      <h1 className='text-3xl font-bold text-center mt-8'>Frontend 🤝 Backend</h1>
      <button onClick={testLogin} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Test Login
      </button>
      <p><strong>Status:</strong> {message}</p>
    </div>
  )
}

export default App