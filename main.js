let repoDiv = document.querySelector(".repos");
let input = document.querySelector("input");
let search = document.querySelector("#btn-search");
let loading = document.querySelector(".loading");
search.onclick = function () {
  if (input.value.trim() === "") {
    repoDiv.innerHTML = "the input is empty";
  } else {
    loading.classList.add("block"); 
    let data = new Promise((res, rej) => {
      let respone = fetch(`https://api.github.com/users/${input.value}/repos`);
      respone
        .then((data) => {
          if (data.status === 200) {
            return data.json();
          } else { 
            rej(Error("Not found"));
          }
        })
        .then((repos) => {
          res(repos);
        })
        .catch((err) => {
          rej(Error(err));
        });
    });
    data
      .then((repos) => {
        loading.classList.remove("block");
        if(repos.length == 0) {
          repoDiv.innerHTML = 'no repository'
          return
        }
        console.log("object");
        let template = "";
        repos.forEach((repo) => {
          template += `
            <div class="repo">
            <p>${repo.name}</p>
            <div class="btn">
              <span class="start">Start ${repo.stargazers_count}</span>
              <a target="_blank" href='${repo.html_url}' class="visit">Vist</a>
            </div>
          </div>`;
        });
        repoDiv.innerHTML = template;
      })
      .catch((err) => {
        repoDiv.innerHTML = err;
        loading.classList.remove("block");
      });
  }
};
input.addEventListener('keydown', (e) => {
  if(e.key === 'Enter') {
    search.onclick();
  }
})