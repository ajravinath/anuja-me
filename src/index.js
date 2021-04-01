import './index.scss';

const content = document.getElementById('content');
const getMyData = async () => {
  const response = await fetch('https://api.github.com/users/ajravinath');
  const data = await response.json();
  setData(data);
};

const setData = async data => {
  console.log('data:', data);
  const elements = `
  <div class="card">
    <img class="image" src=${data.avatar_url} alt="Avatar" style="width:100%">
    <div class="container">
        <span>
            <p class="name"><b>${data.name}</b></p>
            <span style="display:block;margin-bottom:5px;">
            <a href=${data.url} style="font-size:10px;color:gray;text-decoration:none;font-weight:300;">${data.url}</a>
            </span>
        </span>
        <p class="bio">${data.bio}</p>
    </div>
  </div>`;
  content.innerHTML = elements;
};

getMyData();
