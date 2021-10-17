const key = config.API_KEY
let favArr = []
const displayDiv = document.querySelector('#displaybox')

const getMovies = async () => {
  let url = `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`

  try {
    let reqData = await fetch(url)
    let movieData = await reqData.json()
    movieData.results.sort(function (a, b) {
      return b.popularity - a.popularity
    })
    displayData(movieData.results)
  } catch (err) {
    console.log(err.message)
  }
}

getMovies()

const displayData = (data) => {
  displayDiv.innerHTML = ''
  for (let i = 0; i < data.length; i++) {
    let div = document.createElement('div')
    div.setAttribute('class', 'movieBox')
    div.innerHTML = `<img src="https://www.themoviedb.org/t/p/w220_and_h330_face${data[i].backdrop_path} "><h3>${data[i].title}</h3>`
    div.addEventListener('click', () => openDetails(data[i]))
    displayDiv.appendChild(div)
  }
}

const openDetails = (data) => {
  displayDiv.innerHTML = `<h3>${data.title}</h3><br/><img src="https://www.themoviedb.org/t/p/w220_and_h330_face${data.backdrop_path}"><br><button onclick="addToFav(${data.id})">add to fav &#128420</button><br><p>${data.overview}</p>`
}

const addToFav = async (movie_id) => {
  let url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${key}&language=en-US`

  try {
    let reqData = await fetch(url)
    let movieData = await reqData.json()
    let findInFav = favArr.find((element) => element.id === movie_id)
    if (!findInFav) {
      favArr.push(movieData)
    }
  } catch (err) {
    console.log(err.message)
  }
}

const getNowPlaying = async () => {
  let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=1`

  try {
    let reqData = await fetch(url)
    let NowPlayingData = await reqData.json()
    let results = NowPlayingData.results
    results.sort((a, b) => (a.title > b.title ? 1 : b.title > a.title ? -1 : 0))
    displayData(results)
  } catch (err) {
    console.log(err.message)
  }
}

const displayFav = () => {
  displayData(favArr)
}
