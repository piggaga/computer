// admin.js

window.onload = function() {
    fetchUserData();
  };
  
  function fetchUserData() {
    fetch('/user-info')
      .then(response => response.json())
      .then(data => {
        const userInfoDiv = document.getElementById('user-info');
        userInfoDiv.innerHTML = ''; // Clear previous data
        data.forEach(user => {
          const userDiv = document.createElement('div');
          userDiv.textContent = `Username: ${user.username}, Last Login: ${user.lastLogin}, Last IP: ${user.lastLoginIP}`;
          userInfoDiv.appendChild(userDiv);
        });
      })
      .catch(error => console.error('Error fetching user data:', error));
  }
  