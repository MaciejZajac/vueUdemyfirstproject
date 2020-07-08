new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: [],
    },
    methods: {
        startGame: function () {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function () {
            let damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits for ' + damage,
            });
            if (this.checkWin()) {
                return;
            }

            this.monsterAttacks();

            this.checkWin();
        },
        specialAttack: function () {
            let damage = this.calculateDamage(10, 20);
            this.monsterHealth -= damage;

            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits for ' + damage,
            });

            if (this.checkWin()) {
                return;
            }

            this.monsterAttacks();

            this.checkWin();
        },
        heal: function () {
            this.playerHealth += 10;

            if (this.playerHealth > 100) {
                this.playerHealth = 100;
            }

            this.turns.unshift({
                isPlayer: true,
                text: 'Player heals for 10',
            });

            this.monsterAttacks();
            this.checkWin();
        },
        giveUp: function () {
            this.gameIsRunning = false;
        },
        monsterAttacks: function () {
            let damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage;

            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits for ' + damage,
            });
        },
        calculateDamage: function (min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function () {
            if (this.monsterHealth < 0) {
                if (confirm('You won! new game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth < 0) {
                if (confirm('You lost! new game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return false;
            }
        },
    },
});
