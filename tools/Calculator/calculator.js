//

fetch("https://randomuser.me/api/")
    .then(response => response.json())
    .then(localStorage.setItem("name, email"))
    .then(console.log(localStorage.getItem("name, email")));


