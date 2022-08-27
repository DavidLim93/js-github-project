const form = document.getElementById("github-form");
const submit = document.getElementById("submit");
const container = document.getElementById("github-container");
const userList = document.getElementById('user-list');


const user_URL = 'https://api.github.com/users/';


function fetchUser () {

    const username = document.getElementById('search').value

    fetch(user_URL + username)
    .then((response) => response.json())
    .then((data)=> {


        if (data.message){
            userList.innerHTML = `
                <h3>User not found</h3>
            `
        } else {
            userList.innerHTML = `
                <img src="${data.avatar_url} alt="${data.name}">
                <h2>${data.name}</h2>
            <ul>
            <li><strong>Username :</strong> ${data.login}</li>
            <li><strong>Profile :</strong> <a href = '${data.html_url}'>${data.html_url}</a></li>
        </ul>
            `

           
        }
        fetchRepo(username);
    })


    .catch(error => console.log(error));

        }
        



async function fetchRepo(username) {
const resp = await fetch(user_URL + username + "/repos");
const respData = await resp.json();
    addRepo(respData)
                    }


function addRepo(repos) {
    const reposEl = document.getElementById("repos-list");

    repos.forEach((repo) => {

        const repoEl = document.createElement("li");
        repoEl.classList.add("repo");
        repoEl.href = repo.html_url;
        repoEl.target = "_blank";
        repoEl.innerText = repo.name;
        reposEl.appendChild(repoEl);
    });
}


   

form.addEventListener("submit", function (e) {
    e.preventDefault()
  
   const user = search.value;
   if (user) {
    fetchUser(user);

    search.value="";
        }

    })



