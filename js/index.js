document.addEventListener('submit', gitForm);

function showUsers(data) {
    console.log(user)
}

function GitForm(event) {
    event.preventDefault();
    
    const formInput = document.querySelector('#search').value
    const form = document.getElementById('github-form')
    form.reset()
    fetch(`https://api.github.com/search/users?q=${formInput}`)
        .then(response => response.json())
        .then(response => {
            const ul = document.getElementById('user-list')
            const reposList = document.getElementById('repos-list')
            reposList.innerHTML = ""
            ul.innerHTML = ""
            
            response.items.map(item => {
                const li = document.createElement("li")

                const h2 = document.createElement("h2")
                h2.textContent = item.login
                h2.addEventListener('click', event => showUserRepos(item.login, event))
                
                const img = document.createElement('img')
                img.src = item.avatar_url
                

                const p = document.createElement("p")
                p.textContent = item.html_url
                
                li.append(h2, img)
                
                ul.append(li)
            })

            
        })
        .catch((error) => {
            console.error('Error', error);
        });
        
function showUserRepos(username, event) {
    const reposList = document.getElementById('repos-list')
    reposList.innerHTML = ""
    event.preventDefault()
    
    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(response => response.map(repo => {
            
            const li = document.createElement('li')
            const h1 = document.createElement('h1')
            h1.textContent = repo.name
            li.append(h1)
            reposList.append(li)
        }))
    }
}
