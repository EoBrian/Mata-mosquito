const display_game = document.getElementById('root-app')
var mosca = document.createElement('img')
mosca.src = 'components/img/mosca.png'; mosca.style.position = 'absolute'; mosca.id = 'mosca'

let width_screen = 0
let height_screen = 0

function resizeScreen () {
    width_screen = window.innerWidth
    height_screen = window.innerHeight
}

//nivel de dificudade do game
var tempo_mosquito_aparece = 0
var nivel = location.search
nivel = nivel.replace('?', '')

if (nivel === 'facil') {
    tempo_mosquito_aparece = 1500
}else if (nivel === 'medio') {
    tempo_mosquito_aparece = 1000
}else {
    tempo_mosquito_aparece = 780
}



//3 - criar função de vida / 3 vidas (se vida for == 0 perde)
const display_life = document.getElementsByClassName('heart-life')
var vida = 3


//4 - função de tempo (se conseguir matar todos os mosquitos neste tempo ganha)
const display_time = document.getElementsByClassName('timer')[0]
var time = 60
const Cronometro = ()=> {
    time--
    display_time.innerHTML = `<h1>Time: <span style="color:white;">${time}</span> </h1>`
    if (time === 0) {
        clearInterval(gerarMoscas)
        clearInterval(this)
        location.href = 'vitoria.html'
    }
};setInterval(Cronometro, 1000);


//1 - gerar moscas
const gerarMoscas = ()=> {

    if (document.getElementById('mosca')) {
        document.getElementById('mosca').remove()
        vida--
        if (vida === 2) {display_life[0].src = 'components/img/coracao_vazio.png'}
        else if (vida === 1) {display_life[1].src = 'components/img/coracao_vazio.png'}
        else {display_life[2].src = 'components/img/coracao_vazio.png'}
        if (vida < 0) {
            location.href = 'perdeu.html'
        }
    }
    
    //randomizando o tamanho das moscas
    var rng = Math.floor(Math.random() * 3)
    if (rng === 0){mosca.width = 50} else if (rng === 1){mosca.width = 70} else {mosca.width = 90}
    
    //randomizando a posição em que aparecerão na tela
    mosca.style.left = `${Math.floor(Math.random() * (width_screen = window.innerWidth - 90))}px`
    mosca.style.top = `${Math.floor(Math.random() * (height_screen = window.innerHeight - 90))}px`
    
    //randomizando o lado da mosca
    var mosca_side = Math.floor(Math.random() * 2)
    if(mosca_side === 1) {mosca.style.transform = 'scaleX(-1)'} else {mosca.style.transform = 'scaleX(1)'}

    //adiciona a mosca na tela
    display_game.appendChild(mosca)
    
}; setInterval(gerarMoscas, tempo_mosquito_aparece);


//2 - matar moscas
const matarMoscas = ()=> {
    mosca.remove()
}; mosca.addEventListener('click', matarMoscas);


