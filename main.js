const URL = "http://api.unsplash.com/search/photos?query="
const CLIENT_ID = "&client_id=eymPo17tytd_9pUxyyyEyvVZnWBjJlk-bZI9QmPzM_c"
let searchFor = "london"

// fetch(URL+searchFor+CLIENT_ID)
//     .then(resp => resp.json())
//     .then(data => console.log(data))



function fetchPictures(searchWord){
    fetch(URL+searchWord+CLIENT_ID)
        .then(resp => resp.json())
        .then(data => console.log(data.results[0]))
        // function som lägger resultatet i en img-tag
}

let searchWord = "stockholm"
fetchPictures(searchWord)

// pagenation