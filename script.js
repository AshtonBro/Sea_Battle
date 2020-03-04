'use strict';

const record = document.getElementById('record'),
    shot = document.getElementById('shot'),
    hit = document.getElementById('hit'),
    dead = document.getElementById('dead'),
    enemy = document.getElementById('enemy'),
    again = document.getElementById('again');

const dataGame = {
    record: 0,
    shot: 0,
    hit: 0,
    dead: 0
};

const show = {
    hit() {

    },
    miss(elem) {
        this.changeClass(elem, 'miss');
    },
    dead() {

    },
    changeClass(elem, value){
        elem.className = value;
    }
};

const fire = (event) => {
    const target = event.target;
    show.miss(target);

};

const init = () => {
    enemy.addEventListener('click', fire);
};

const start = () => {

};

init();