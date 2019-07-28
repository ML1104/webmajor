class SceneMainMenu extends Phaser.Scene {
  constructor() {
    super({ key: "SceneMainMenu" });
  }

  preload() {
    this.load.image("bkg", "assets/games/invaders/bkg.png");
    this.load.image("bkg2", "assets/games/invaders/bkg2.png");
    this.load.image("btnPlay", "assets/games/invaders/btnPlay.png");
    this.load.image("btnPlayHover", "assets/games/invaders/btnPlayHover.png");
    this.load.image("btnPlayDown", "assets/games/invaders/btnPlayDown.png");
    this.load.image("btnRestart", "assets/games/invaders/btnRestart.png");
    this.load.image("btnRestartHover", "assets/games/invaders/btnRestartHover.png");
    this.load.image("btnRestartDown", "assets/games/invaders/btnRestartDown.png");
    this.load.audio("sndBtnOver", "assets/games/invaders/sndBtnOver.wav");
    this.load.audio("sndBtnDown", "assets/games/invaders/sndBtnDown.wav");
  }

  create() {
    this.sfx = {
      btnOver: this.sound.add("sndBtnOver"),
      btnDown: this.sound.add("sndBtnDown")
    };

    this.btnPlay = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      "btnPlay"
    );

    this.btnPlay.setInteractive();

    this.btnPlay.on("pointerover", function() {
      this.btnPlay.setTexture("btnPlayHover");
      this.sfx.btnOver.play();
    }, this);

    this.btnPlay.on("pointerout", function() {
      this.setTexture("btnPlay");
    });

    this.btnPlay.on("pointerdown", function() {
      this.btnPlay.setTexture("btnPlayDown");
      this.sfx.btnDown.play();
    }, this);

    this.btnPlay.on("pointerup", function() {
      this.btnPlay.setTexture("btnPlay");
      this.scene.start("SceneMain");
    }, this);

    this.title = this.add.text(this.game.config.width * 0.5, 128, "SPACE INVADERS", {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center'
    });
    this.title.setOrigin(0.5);

    this.backgrounds = [];
    for (var i = 0; i < 5; i++) {
      var keys = ["bkg", "bkg2"];
      var key = keys[Phaser.Math.Between(0, keys.length - 1)];
      var bg = new ScrollingBackground(this, key, i * 10);
      this.backgrounds.push(bg);
    }
  }

  update() {
    for (var i = 0; i < this.backgrounds.length; i++) {
      this.backgrounds[i].update();
    }
  }
}