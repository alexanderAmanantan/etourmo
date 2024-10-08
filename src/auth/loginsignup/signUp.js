import React, { useState } from 'react';
import './userAccessStyle.css'; 

const SignUp = () => {
  const [formData, setFormData] = useState({
    fName: '',
    lName: '',
    email: '',
    password: ''
  });
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch('http://localhost/etourmo/src/auth/loginsignup/register.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        action: 'SignUp',
        fName: formData.fName,
        lName: formData.lName,
        email: formData.email,
        password: formData.password,
      })
    });
    
    const data = await response.json();
    
    if (data.status === 'success') {
      alert(data.message); // Handle success (e.g., redirect or show success message)
    } else {
      alert(data.message); // Handle error (e.g., show error message)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="fName" value={formData.fName} onChange={handleChange} placeholder="First Name" required />
      <input type="text" name="lName" value={formData.lName} onChange={handleChange} placeholder="Last Name" required />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
