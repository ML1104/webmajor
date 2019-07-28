class SceneMain extends Phaser.Scene {
    constructor() {
        super({ key: "SceneMain" });
    }

    preload() {
        this.load.spritesheet("explosion", "assets/games/invaders/explosion.png", {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet("enemy1", "assets/games/invaders/enemy1.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.image("enemy2", "assets/games/invaders/enemy2.png");
        this.load.spritesheet("enemy3", "assets/games/invaders/enemy3.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.image("laserEnemy", "assets/games/invaders/laserEnemy.png");
        this.load.image("laserPlayer", "assets/games/invaders/laserPlayer.png");
        this.load.spritesheet("player", "assets/games/invaders/player.png", {
            frameWidth: 16,
            frameHeight: 16
        });

        this.load.audio("sndExplode0", "assets/games/invaders/sndExplode0.wav");
        this.load.audio("sndExplode1", "assets/games/invaders/sndExplode1.wav");
        this.load.audio("sndLaser", "assets/games/invaders/sndLaser.wav");
    }

    create() {
        this.anims.create({
            key: "enemy1",
            frames: this.anims.generateFrameNumbers("enemy1"),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: "enemy3",
            frames: this.anims.generateFrameNumbers("enemy3"),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: "explosion",
            frames: this.anims.generateFrameNumbers("explosion"),
            frameRate: 20,
            repeat: 0
        });
        this.anims.create({
            key: "player",
            frames: this.anims.generateFrameNumbers("player"),
            frameRate: 20,
            repeat: -1
        });

        this.sfx = {
            explosions: [
                this.sound.add("sndExplode0"),
                this.sound.add("sndExplode1")
            ],
            laser: this.sound.add("sndLaser")
        };

        this.backgrounds = [];
        for (var i = 0; i < 5; i++) {
            var bg = new ScrollingBackground(this, "bkg", i * 10);
            this.backgrounds.push(bg);
        }

        this.player = new Player(
            this,
            this.game.config.width * 0.5,
            this.game.config.height * 0.5,
            "player"
        );
        console.log(this.player);

        var chances = 1;
        var trialNumber = 0;

        var playerCharacter = this.player;

        var instance = this;

        var trialList = new Array();

        trialList[0] = 1;
        trialList[1] = 2;
        trialList[2] = 3;
        trialList[3] = 4;
        trialList[4] = 5;
        trialList[5] = 6;

        function randomTrial() {
            var randomized = Math.floor(Math.random() * trialList.length);
            trialNumber += trialList[randomized];
            instance.scene.pause();

            switch (trialNumber) {
                case 1:
                    swal({
                        title: "Truth, Die, or Bail",
                        text: "Arrays are written in...",
                        icon: "warning",
                        buttons: {
                            false: {
                                text: "String/Value Pairs",
                                value: "incorrect",
                            },
                            true: {
                                text: "Key/Value Pairs",
                                value: "correct",
                            },
                            cancel: "Bail",

                        },
                    })
                        .then((value) => {
                            switch (value) {
                                case "correct":
                                    swal("Truth!", "Keep Going");
                                    instance.scene.resume();
                                    break;

                                case "incorrect":
                                    swal("You Died", "Score Lost");
                                    playerCharacter.explode(false);
                                    playerCharacter.onDestroy();
                                    instance.scene.resume();
                                    break;

                                default:
                                    swal("You Bailed Out", "Score: " + score);
                                    playerCharacter.explode(false);
                                    playerCharacter.onDestroy();
                                    instance.scene.resume();
                            }
                        });
                    break;

                case 2:
                    swal({
                        title: "Truth or Die. You can't bail this one",
                        text: "Math.floor can return the largest integer _____ a given number",
                        icon: "warning",
                        buttons: {
                            false1: {
                                text: "Only less than",
                                value: "incorrect",
                            },
                            false2: {
                                text: "Only equal to",
                                value: "incorrect",
                            },

                            true: {
                                text: "Both",
                                value: "correct",
                            },
                        },
                    })
                        .then((value) => {
                            switch (value) {
                                case "correct":
                                    swal("Truth!", "Keep Going");
                                    instance.scene.resume();
                                    break;

                                case "incorrect":
                                    swal("You Died", "Score Lost");
                                    playerCharacter.explode(false);
                                    playerCharacter.onDestroy();
                                    instance.scene.resume();
                                    break;
                            }
                        });
                    break;

                case 3:
                    swal({
                        title: "Truth or Die. You can't bail this one.",
                        text: "In ECMAScript6, an arrow function is written:",
                        icon: "warning",
                        buttons: {
                            false1: {
                                text: "hello() => { }",
                                value: "incorrect",
                            },
                            true: {
                                text: "hello = () => { }",
                                value: "correct",
                            },
                            false2: {
                                text: "hello => () = { }",
                                value: "incorrect",
                            },
                        },
                    })
                        .then((value) => {
                            switch (value) {
                                case "correct":
                                    swal("Truth!", "Keep Going");
                                    instance.scene.resume();
                                    break;

                                case "incorrect":
                                    swal("You Died", "Score Lost");
                                    playerCharacter.explode(false);
                                    playerCharacter.onDestroy();
                                    instance.scene.resume();
                                    break;
                            }
                        });
                    break;

                case 4:
                    swal({
                        title: "Truth, Die, or Bail",
                        text: "Situation: (z = x + y) (x = 10) (y = '5'). How much is Z?",
                        icon: "warning",
                        buttons: {
                            true: {
                                text: "105",
                                value: "correct",
                            },
                            false: {
                                text: "15",
                                value: "incorrect",
                            },
                            cancel: "Bail",

                        },
                    })
                        .then((value) => {
                            switch (value) {
                                case "correct":
                                    swal("Truth!", "Keep Going");
                                    instance.scene.resume();
                                    break;

                                case "incorrect":
                                    swal("You Died", "Score Lost");
                                    playerCharacter.explode(false);
                                    playerCharacter.onDestroy();
                                    instance.scene.resume();
                                    break;

                                default:
                                    swal("You Bailed Out", "Score: " + score);
                                    playerCharacter.explode(false);
                                    playerCharacter.onDestroy();
                                    instance.scene.resume();
                            }
                        });
                    break;

                case 5:
                    swal({
                        title: "Truth, Die, or Bail",
                        text: "str.slice(1) of var str = 'Banana, Banana, Banana' will return..",
                        icon: "warning",
                        buttons: {
                            true: {
                                text: "anana, Banana, Banana",
                                value: "correct",
                            },
                            false: {
                                text: "B",
                                value: "incorrect",
                            },
                            cancel: "Bail",

                        },
                    })
                        .then((value) => {
                            switch (value) {
                                case "correct":
                                    swal("Truth!", "Keep Going");
                                    instance.scene.resume();
                                    break;

                                case "incorrect":
                                    swal("You Died", "Score Lost");
                                    playerCharacter.explode(false);
                                    playerCharacter.onDestroy();
                                    instance.scene.resume();
                                    break;

                                default:
                                    swal("You Bailed Out", "Score: " + score);
                                    playerCharacter.explode(false);
                                    playerCharacter.onDestroy();
                                    instance.scene.resume();
                            }
                        });
                    break;

                case 6:
                    swal({
                        title: "Truth, Die, or Bail",
                        text: "In JavaScript, the number 0 is associated with...",
                        icon: "warning",
                        buttons: {
                            true: {
                                text: "False",
                                value: "correct",
                            },
                            true2: {
                                text: "Your bank account",
                                value: "correct",
                            },
                            cancel: "Bail",

                        },
                    })
                        .then((value) => {
                            switch (value) {
                                case "correct":
                                    swal("Truth!", "Keep Going");
                                    instance.scene.resume();
                                    break;

                                case "incorrect":
                                    swal("You Died", "Score Lost");
                                    playerCharacter.explode(false);
                                    playerCharacter.onDestroy();
                                    instance.scene.resume();
                                    break;

                                default:
                                    swal("You Bailed Out", "Score: " + score);
                                    playerCharacter.explode(false);
                                    playerCharacter.onDestroy();
                                    instance.scene.resume();
                            }
                        });
                    break;
            }
        }

        var score = 0;
        var scoreText;

        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.enemies = this.add.group();
        this.enemyLasers = this.add.group();
        this.playerLasers = this.add.group();

        this.time.addEvent({
            delay: 1000,
            callback: function () {
                var enemy = null;

                if (Phaser.Math.Between(0, 10) >= 3) {
                    enemy = new GunShip(
                        this,
                        Phaser.Math.Between(0, this.game.config.width),
                        0
                    );
                }
                else if (Phaser.Math.Between(0, 10) >= 5) {
                    if (this.getEnemiesByType("ChaserShip").length < 5) {

                        enemy = new ChaserShip(
                            this,
                            Phaser.Math.Between(0, this.game.config.width),
                            0
                        );
                    }
                }
                else {
                    enemy = new CarrierShip(
                        this,
                        Phaser.Math.Between(0, this.game.config.width),
                        0
                    );
                }

                if (enemy !== null) {
                    enemy.setScale(Phaser.Math.Between(10, 20) * 0.1);
                    this.enemies.add(enemy);
                }
            },
            callbackScope: this,
            loop: true
        });

        this.physics.add.collider(this.playerLasers, this.enemies, function (playerLaser, enemy) {
            if (enemy) {
                if (enemy.onDestroy !== undefined) {
                    enemy.onDestroy();
                }
                enemy.explode(true);
                playerLaser.destroy();
                score += 10;
                scoreText.setText('Score: ' + score);
            }
        });

        scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#ffffff' });

        this.physics.add.overlap(this.player, this.enemies, function (player, enemy) {
            if (!player.getData("isDead") &&
                !enemy.getData("isDead")) {
                if (chances == 1) {
                    enemy.explode(true);
                    randomTrial();
                    chances = 0;
                    console.log(trialNumber);
                } else {
                    enemy.explode(true);
                    player.explode(false);
                    player.onDestroy();
                    console.log('you died');
                    console.log(trialNumber);
                }
            }
        });

        this.physics.add.overlap(this.player, this.enemyLasers, function (player, laser) {
            if (!player.getData("isDead") &&
                !laser.getData("isDead")) {
                if (chances == 1) {
                    laser.destroy();
                    randomTrial();
                    chances = 0;
                    console.log(trialNumber);
                } else {
                    player.explode(false);
                    player.onDestroy();
                    laser.destroy();
                    console.log('you died');
                    console.log(trialNumber);
                }
            }
        });
    }

    getEnemiesByType(type) {
        var arr = [];
        for (var i = 0; i < this.enemies.getChildren().length; i++) {
            var enemy = this.enemies.getChildren()[i];
            if (enemy.getData("type") == type) {
                arr.push(enemy);
            }
        }
        return arr;
    }

    update() {

        if (!this.player.getData("isDead")) {
            this.player.update();
            if (this.keyW.isDown) {
                this.player.moveUp();
            }
            else if (this.keyS.isDown) {
                this.player.moveDown();
            }
            if (this.keyA.isDown) {
                this.player.moveLeft();
            }
            else if (this.keyD.isDown) {
                this.player.moveRight();
            }

            if (this.keySpace.isDown) {
                this.player.setData("isShooting", true);
            }
            else {
                this.player.setData("timerShootTick", this.player.getData("timerShootDelay") - 1);
                this.player.setData("isShooting", false);
            }
        }

        for (var i = 0; i < this.enemies.getChildren().length; i++) {
            var enemy = this.enemies.getChildren()[i];

            enemy.update();

            if (enemy.x < -enemy.displayWidth ||
                enemy.x > this.game.config.width + enemy.displayWidth ||
                enemy.y < -enemy.displayHeight * 4 ||
                enemy.y > this.game.config.height + enemy.displayHeight) {
                if (enemy) {
                    if (enemy.onDestroy !== undefined) {
                        enemy.onDestroy();
                    }
                    enemy.destroy();
                }
            }
        }

        for (var i = 0; i < this.enemyLasers.getChildren().length; i++) {
            var laser = this.enemyLasers.getChildren()[i];
            laser.update();
            if (laser.x < -laser.displayWidth ||
                laser.x > this.game.config.width + laser.displayWidth ||
                laser.y < -laser.displayHeight * 4 ||
                laser.y > this.game.config.height + laser.displayHeight) {
                if (laser) {
                    laser.destroy();
                }
            }
        }

        for (var i = 0; i < this.playerLasers.getChildren().length; i++) {
            var laser = this.playerLasers.getChildren()[i];
            laser.update();
            if (laser.x < -laser.displayWidth ||
                laser.x > this.game.config.width + laser.displayWidth ||
                laser.y < -laser.displayHeight * 4 ||
                laser.y > this.game.config.height + laser.displayHeight) {
                if (laser) {
                    laser.destroy();
                }
            }
        }

        for (var i = 0; i < this.backgrounds.length; i++) {
            this.backgrounds[i].update();
        }
    }
}