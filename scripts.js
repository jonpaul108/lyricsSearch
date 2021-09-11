const form = document.getElementById('form');
const input = document.getElementById('userText');
const results = document.getElementById('results');

const apiURL = "https://api.lyrics.ovh";

async function searchSong(term) {
  const response= await fetch(`${apiURL}/suggest/${term}`);
  const songList = await response.json();
  showList(songList.data, songList.previous, songList.next)
  console.log(songList)
}

function getSongs(e) {
  e.preventDefault();
  const name = input.value;
  if (name.trim()) {
    searchSong(name);
  }
  input.value = '';
}

function showList(songs, pre, next) {
  const ul = document.createElement('ul');
  ul.className = 'list';
  ul.innerHTML = `
    ${songs.map(el => {
      return `<li class='listItem'><p><strong>${el.artist.name}</strong> - ${el.title}</p><button>Lyrics</button></li>`
    }).join('')}
  `

  console.log('next:', next);
  const previousButton = pre ? `<button class='pre nav' onclick="getPreOrNext('${pre}')">prev</button>`
    : "";
  const nextButton = next ? `<button class='next nav' onclick="getPreOrNext('${next}')">next</button>`
    : "";
  const navContainer = document.createElement('div');
  navContainer.innerHTML = `${previousButton}${nextButton}`;
  navContainer.className = 'nav';
  console.log(navContainer.innerHTML);
  //console.log(songs);
  results.innerHTML = '';
  results.append(ul);
  results.append(navContainer);
  
}

async function getPreOrNext(url) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();
  searchSong(data.data, data.previous, data.next);
}


form.addEventListener('click', getSongs);
