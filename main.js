//Criar quadro
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 512;
canvas.height = 480;
canvas.radius =100;
document.body.appendChild(canvas)

//imagem de fundo
let bgReady = false;
const bgImage = new Image();
//para mudar o 'bgReady' para true ao carregar o background
//usamos uma function
bgImage.onload = () => bgReady = true;
bgImage.src = 'images/background.png';

//imagem do herói
let heroReady = false;
const heroImage = new Image();
heroImage.onload = () => heroReady = true;
heroImage.src = 'images/hero.png';

//imagem do monstro
let monsterReady = false;
const monsterImage = new Image();
monsterImage.onload = () => monsterReady = true;
monsterImage.src= 'images/monster.png';

//objetos do jogo
const hero = {
    speed: 256 //movimento em px/s
};
const monster = {};
let monsterCaught = 0;

//Controles do teclado
const keysDown = {};

window.addEventListener('keydown', function(e) {
    keysDown[e.keyCode] = true;
}, false);

window.addEventListener('keyup', function(e) {
    delete keysDown[e.keyCode];
}, false);

//Reseta o jogo quando o jogador pegar o monstro
const reset = function () {
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;

    //posicionar o monstro randomicamente na tela
    monster.x = 32 + (Math.random() * (canvas.width - 64))
    monster.y = 32 + (Math.random() * (canvas.height - 64))
};



//atualiza os objetos do jogo
const update = function (modifier) {
    //pressionando a seta para cima
    if (38 in keysDown) {
        hero.y -= hero.speed * modifier;
    }
    //pressionando a seta para baixo
    if (40 in keysDown) {
        hero.y += hero.speed * modifier;
    }
    if (37 in keysDown) {
        hero.x -= hero.speed * modifier;
    }
    if (39 in keysDown) {
        hero.x += hero.speed * modifier;
    }
    //os personagens se encostaram?
    if (
        hero.x <= (monster.x + 32) 
        && monster.x <= (hero.x+32)
        && hero.y <= (monster.y + 32) 
        && monster.y <= (hero.y+32)){
        ++monsterCaught;
        reset();
    }
};
//Renderização
const render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }
    if (heroReady){
        ctx.drawImage(heroImage, hero.x, hero.y)
    }
    if (monsterReady){
        ctx.drawImage(monsterImage, monster.x, monster.y);
    }
//pontuação
    ctx.fillStyle = 'rgb(250, 250, 250)';
    ctx.font = '24px Helvetica';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(`Monstros pegos: ${monsterCaught}`, 32, 32);
};

//Controla o loop do jogo
const main = function (){ 
    const now = Date.now();
    const delta = now - then;

    update(delta / 1000);
    render();

    then = now;

    requestAnimationFrame(main);
};
const w = window;
const requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame ||
w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

let then = Date.now();
reset();
main();