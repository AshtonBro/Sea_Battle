'use strict';

const record = document.getElementById('record'),
    shot = document.getElementById('shot'),
    hit = document.getElementById('hit'),
    dead = document.getElementById('dead'),
    enemy = document.getElementById('enemy'),
    again = document.getElementById('again');

const game = {
    ships: [
        {
            location: ['26', '36', '46', '56'],
            hit: ['', '', '', '']
        },
        {
            location: ['11', '12', '13'],
            hit: ['', '', '']
        },
        {
            location: ['69', '79'],
            hit: ['', '']
        },
        {
            location: ['32'],
            hit: ['']
        },
    ],
};

const dataGame = {
    record: 0,
    shot: 0,
    hit: 0,
    dead: 0,
    set updateData(data) {
        this[data] += 1;
        this.render();
    },
    render() {
        record.textContent = this.record;
        shot.textContent = this.shot;
        hit.textContent = this.hit;
        dead.textContent = this.dead;
    }
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
    if (target.classList.contains('miss') || target.tagName !== 'TD') {return;}
    show.miss(target);
    dataGame.updateData = 'shot';
    
};

const init = () => {
    enemy.addEventListener('click', fire);
};

const start = () => {

};

init();