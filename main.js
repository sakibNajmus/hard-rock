const searchBox = document.getElementById('search-box');
const searchResult = document.getElementById('search-result');

// input event handler to pick the input in the search box and use get method to bring API
searchBox.addEventListener('input', function(){    
    fetch(`https://api.lyrics.ovh/suggest/${searchBox.value}/`)
    .then(res => res.json())
    .then(data => getResults(data));
})

// this function is to get the Song List
function getResults(search){
    for (let i = 0; i <= 10; i++) {
        let title = search.data[i].title;
        let artist = search.data[i].artist.name;
        let avatar = search.data[i].artist.picture_small;
        let time = search.data[i].duration;
        
        let showResult = `<div class="single-result row align-items-center my-3 p-3">
        <div class="col-md-6">
            <h3 class="lyrics-name">${title}</h3>
            <p class="author lead">Album by <span>${artist}</span></p>
        </div>
        <div class="col-md-2 d-flex justify-content-end">
            <img src="${avatar}">
        </div>
        <div class="col-md-1">
            <h3>(${(time/60).toFixed(2)})</h3>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick= "getArtistTitle('${artist}', '${title}')" class="btn btn-success">Get Lyrics</button>
        </div>
    </div>`
        searchResult.innerHTML += showResult;        
        }
        // condition to make song list and lyrics empty if search box is empty 
        if (searchBox.value == ''){
            searchResult.innerHTML = '';
            document.getElementById('display-lyrics').innerText = '';
            document.getElementById('song-title').innerText = '';
    }
}

// function to get lyrics from API
function getArtistTitle(artist, title){
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then(res => res.json())
    .then(song => getLyrics(song, title))
}

// function to show lyrics 
function getLyrics(song, title){
    if(song.lyrics == undefined){
        document.getElementById('display-lyrics').innerText = "Sorry, lyrics isn't available.";
    }
    else{
        document.getElementById('display-lyrics').innerText = song.lyrics;
    }
    document.getElementById('song-title').innerText = title;
}    

