import React, { useState } from 'react';
import './userAccessStyle.css'; 

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform input validation
    if (!email || !password) {
      setResponseMessage('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost/etourmo/src/auth/loginsignup/register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          action: 'SignIn',
          email,
          password,
        })
      });

      const data = await response.json();

      // Handle response based on the server's status
      if (data.status === 'success') {
        setResponseMessage(data.message); // Show success message
        // Optional: Redirect to another page or perform another action
        // window.location.href = '/dashboard'; // Uncomment this for redirecting
      } else {
        setResponseMessage(data.message); // Show error message
      }
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('An error occurred while signing in.'); // Show error for unexpected errors
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Sign In</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>} {/* Display response message */}
    </div>
  );
};

export default SignIn;
