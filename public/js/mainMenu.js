//script to load the Inventory page
const showInv = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/inventory', {
      method: 'GET',
      headers: { 'Content-Type': 'text/plain' }
    });
  
    // if (response.ok) {
    //   document.location.replace('/');
    // } else {
    //   alert('Failed to log out.');
    // }
  };
  
  document.querySelector('#show-inventory').addEventListener('click', showInv);