const axios = require('./axios');

// Example of making a POST request to create a new chat room
axios.post('/chatrooms', {
  name: 'Example Room',
  type: 'group'
})
  .then(response => {
    console.log('Chat room created:', response.data);
  })
  .catch(error => {
    console.error('Error creating chat room:', error);
  });
