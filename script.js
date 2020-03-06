'use strict';

const record = document.getElementById('record'),
    shot = document.getElementById('shot'),
    hit = document.getElementById('hit'),
    dead = document.getElementById('dead'),
    enemy = document.getElementById('enemy'),
    again = document.getElementById('again'),
    header = document.querySelector('.header');

const game = {
    ships: [],
    shipCount: 0,
    settingShip: {
        count: [1, 0, 0, 0],
        size: [4, 3, 2, 1]
    },
    generateShip(){
        for (let i = 0; i < this.settingShip.count.length; i++){
            for (let j = 0; j < this.settingShip.count[i]; j++){
                const size = this.settingShip.size[i];
                const ship = this.generationSettiongsShip(size);
                this.ships.push(ship);
                this.shipCount++;
            }
        }
    },
    generationSettiongsShip(shipSize){
        const newShip = {
            hit: [],
            location: []
        };
        // [0 до 0,99999]
        // [0 - 0,49999] / [0,5 - 0,99999]
        const direction = Math.random() < 0.5;
        let x, y;
        if(direction){
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * (10 - shipSize));
        } else {
            x = Math.floor(Math.random() * (10 - shipSize));
            y = Math.floor(Math.random() * 10);
        }

        for (let i = 0; i < shipSize; i++){
            if(direction){
                newShip.location.push(x + (y + i));
            } else {
                newShip.location.push((x + i) + y);
            }
        }


        return newShip;
    }
};

const dataGame = {
    record: localStorage.getItem('seaBattleRecord') || 0,
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
    hit(elem) {
        this.changeClass(elem, 'hit');
    },
    miss(elem) {
        this.changeClass(elem, 'miss');
    },
    dead(elem) {
        this.changeClass(elem, 'dead');
    },
    changeClass(elem, value){
        elem.className = value;
    }
};

const fire = (event) => {
    const target = event.target;
    if (target.classList.contains('miss') || target.tagName !== 'TD' || !game.shipCount) {return;}
    show.miss(target);
    dataGame.updateData = 'shot';
    
    for (let i = 0; i < game.ships.length; i++){
        const ship = game.ships[i];
        const idShip = ship.location.indexOf(target.id);
        if (idShip >= 0) {
            show.hit(target);
            dataGame.updateData = 'hit';
            ship.hit[idShip] = 'x';
            const checkAllHits = ship.hit.indexOf('');
            if (checkAllHits < 0) {
                dataGame.updateData = 'dead';
                for (const id of ship.location) {
                    show.dead(document.getElementById(id));
                }

                game.shipCount -= 1;

                if (!game.shipCount) {
                    header.textContent = 'Игра окончена';
                    header.style.color = 'red';

                    if (dataGame.shot < dataGame.record || dataGame.record == 0) {
                        localStorage.setItem('seaBattleRecord', dataGame.shot);
                        dataGame.record = dataGame.shot;
                        dataGame.render();
                    }
                }
            }
        }
    }
};

const init = () => {
    enemy.addEventListener('click', fire);
    dataGame.render();
    game.generateShip();
    again.addEventListener('click', () => {
        location.reload();
    });

    record.addEventListener('dblclick', () => {
        localStorage.clear();
        dataGame.record = 0;
        dataGame.render();
    });
};

const start = () => {

};

init();