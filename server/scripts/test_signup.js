fetch('http://localhost:4000/api/auth/signup', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: "Test User",
    email: "test@example.com",
    password: "Password123",
    accountType: "Student",
    contactNumber: "1234567890",
    otp: "583517"
  })
}).then(res => res.json()).then(console.log).catch(console.error);
