const URL_BASE = 'https://swapi.dev/api/'

const $container = document.querySelector('.container')
const $next = document.querySelector('.next')
const $prev = document.querySelector('.prev')
const $currentPage = document.querySelector('.currentPage')
const $page = document.querySelector('.page')

let currentPage = 1
let pages = 9

window.addEventListener('load', () => {
  $currentPage.innerHTML = currentPage
  $page.innerHTML = pages
})

$next.addEventListener('click' , e => {
  e.preventDefault()

  currentPage++

  getUrl(`${URL_BASE}people/` , `page=${currentPage}`, cb => {
    console.log(cb);
    cardTemplate(cb)
  })

  $currentPage.innerHTML = currentPage
})

$prev.addEventListener('click' , e => {
  e.preventDefault()

  currentPage--

  getUrl(`${URL_BASE}people/` , `page=${currentPage}`, cb => {
    console.log(cb);
    cardTemplate(cb)
  })

  $currentPage.innerHTML = currentPage
})

function getUrl(url, query, cb){
  fetch(`${url}?${query}`)
    .then(res => res.json())
    .then(res => {
      cb(res)
    })
}

getUrl(`${URL_BASE}people`, '', cb => {
  console.log(cb);
  cardTemplate(cb)
})

function cardTemplate(data){
  const card = data.results.map(({name, url}) => {
    return `
      <div class='card'>
        <div class="card-header">
          <h1>${name}</h1>
        </div>
        <div class="card-body">
          <img src="https://lumiere-a.akamaihd.net/v1/images/hb_disneyplus_skywalkersaga_mobile_19267_e964ed2c.jpeg?region=0,0,640,400">
        </div>
        <div class="card-footer">
          <button onclick="More('${url}')">More</button>
        </div>
      </div>
    `

  }).join('')

  $container.innerHTML = card
}


function More(url){
  getUrl(url, '', cb => {
    const card = `
        <div class="cardMore">
          <h1>Name: <span>${cb.name}</span></h1>
          <h3>Height: <span>${cb.height}</span></h3>
          <h3>Mass: <span>${cb.mass}</span></h3>
          <h3>Gender: <span>${cb.gender}</span></h3>
          <h3>Hair color: <span>${cb.hair_color}</span></h3>
          <h3>Skin color: <span>${cb.skin_color}</span></h3>
          <h3>Eye color: <span>${cb.eye_color}</span></h3>
        </div>
      `

    $container.innerHTML = card
  })
}
