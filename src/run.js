import axios from "axios";

axios.get('https://api.example.com/data')
  .then(response => 
    console.log(response)
    
)
  .catch(error => console.error('Error:', error));

