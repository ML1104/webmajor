var tip1 = 'HTML5 Meta Refresh: <meta http-equiv="refresh" content="5;url=http://example.com/" /> redirects to the provided URL in "5" seconds. Set to 0 for immediate effect.';
var tip2 = 'HTML5 Responsive Meta: If designing a responsive website, creating a meta tag: <meta name="viewport" content="width=device-width, initial-scale=1"> with "initial scale" set to 1 creates a responsive meta tag, which will scale the width of the page to the width of the screen';
var tip3 = 'CSS pseudo-classes: Easy way to remember pseudo-classes via the "LoVe HAte" method. L = link, V = visited, H = hover, A = Active. LVHA / LoVe it or HAte it';
var tip4 = 'For making websites with right-to-left languages (such as Japanese), you can swap the layout in most browsers by adding the "dir" attribute: [HTML]: <body dir="rtl">, [CSS]: body { unicode - bidi: bidi - override; direction: rtl; }';
var tip5 = 'Javascript Array Randomizer: var randomItem = myArray[Math.floor(Math.random()*myArray.length)]; is a great way of selecting a random item from an array';
var tip6 = 'Javascript Math Mechanics: If both "foo" and "bar" are 10, then foo += -bar + (bar += 5); makes both 15. If you can figure out why it is so, you might discover a useful trick for the future';

var messageList = new Array();

messageList[0] = tip1;
messageList[1] = tip2;
messageList[2] = tip3;
messageList[3] = tip4;
messageList[4] = tip5;
messageList[5] = tip6;

function randomMessage() {
    var randomized = Math.floor(Math.random() * messageList.length);
    swal({
        title: "Treasure Found!",
        text: messageList[randomized],
        icon: "success",
        button: "Nice",
      });
}

var BootScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function BootScene() {
            Phaser.Scene.call(this, { key: 'BootScene' });
        },

    preload: function () {
        
        this.load.image('tiles', 'assets/games/rpg/spritesheet.png');
        this.load.tilemapTiledJSON('map', 'assets/games/rpg/map.json');
        
        this.load.image("dragonblue", "assets/games/rpg/bluedragon.png");
        this.load.image("dragonorrange", "assets/games/rpg/orangedragon.png");
        
        this.load.spritesheet('player', 'assets/games/rpg/RPG_assets.png', { frameWidth: 16, frameHeight: 16 });
    },

    create: function () {
        
        this.scene.start('WorldScene');
    }
});

var WorldScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function WorldScene() {
            Phaser.Scene.call(this, { key: 'WorldScene' });
        },

    preload: function () {

    },

    create: function () {
        
        var map = this.make.tilemap({ key: 'map' });

        
        var tiles = map.addTilesetImage('spritesheet', 'tiles');

        
        var grass = map.createStaticLayer('Grass', tiles, 0, 0);
        var obstacles = map.createStaticLayer('Obstacles', tiles, 0, 0);

        
        obstacles.setCollisionByExclusion([-1]);

        
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { frames: [1, 7, 1, 13] }),
            frameRate: 10,
            repeat: -1
        });

        
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { frames: [1, 7, 1, 13] }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('player', { frames: [2, 8, 2, 14] }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('player', { frames: [0, 6, 0, 12] }),
            frameRate: 10,
            repeat: -1
        });

        
        this.player = this.physics.add.sprite(50, 100, 'player', 6);

        
        this.physics.world.bounds.width = map.widthInPixels;
        this.physics.world.bounds.height = map.heightInPixels;
        this.player.setCollideWorldBounds(true);

        
        this.physics.add.collider(this.player, obstacles);

        
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.roundPixels = true; 

        
        this.cursors = this.input.keyboard.createCursorKeys();

        
        this.spawns = this.physics.add.group({ classType: Phaser.GameObjects.Zone });
        for (var i = 0; i < 30; i++) {
            var x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
            var y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
            
            this.spawns.create(x, y, 20, 20, 'item');
        }
        
        this.physics.add.overlap(this.player, this.spawns, this.onMeetEnemy, false, this);
        
        this.sys.events.on('wake', this.wake, this);
    },
    wake: function () {
        this.cursors.left.reset();
        this.cursors.right.reset();
        this.cursors.up.reset();
        this.cursors.down.reset();

        randomMessage();
    },

    onMeetEnemy: function (player, zone) {
        zone.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
        zone.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);

        this.cameras.main.shake(300);

        this.input.stopPropagation();
        
        this.scene.switch('BattleScene');
    },
    update: function (time, delta) {
        this.player.body.setVelocity(0);

        if (this.cursors.left.isDown) {
            this.player.body.setVelocityX(-80);
        }
        else if (this.cursors.right.isDown) {
            this.player.body.setVelocityX(80);
        }  
        if (this.cursors.up.isDown) {
            this.player.body.setVelocityY(-80);
        }
        else if (this.cursors.down.isDown) {
            this.player.body.setVelocityY(80);
        }
        if (this.cursors.left.isDown) {
            this.player.anims.play('left', true);
            this.player.flipX = true;
        }
        else if (this.cursors.right.isDown) {
            this.player.anims.play('right', true);
            this.player.flipX = false;
        }
        else if (this.cursors.up.isDown) {
            this.player.anims.play('up', true);
        }
        else if (this.cursors.down.isDown) {
            this.player.anims.play('down', true);
        }
        else {
            this.player.anims.stop();
        }
    }

});

