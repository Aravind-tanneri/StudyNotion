fetch('http://localhost:4000/api/auth/sendotp', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: "test@example.com"
  })
}).then(res => res.json()).then(console.log).catch(console.error);
