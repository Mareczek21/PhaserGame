const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 764,
    physics: {
        default: 'arcade',
        arcade:{
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

function preload (){    
    this.load.image('game_background_2', './assets/Space_Background.png');
    this.load.image('ground', './assets/ground.png');
    this.load.spritesheet('player', './assets/player.png', {
        frameWidth: 484,
        frameHeight: 487
    });
    
}

let platforms;

function create (){
    background = this.add.image(1200, 800, 'game_background_2');
    background.setScale(2);

    platforms = this.physics.add.staticGroup();
    platforms.create(0, 900, 'ground').setScale(2).refreshBody();

    player = this.physics.add.sprite(100,450, 'player');

    player.setBounce(0);
    player.setCollideWorldBounds(true);
    player.setScale(0.2);
    


    this.physics.add.collider(player, platforms);

    cursors = this.input.keyboard.createCursorKeys();

    this.keys = this.input.keyboard.addKeys({
        d:  Phaser.Input.Keyboard.KeyCodes.D
    });

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'player', frame: 4 } ],
        frameRate: 20
    });
    
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { start: 5, end: 9 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('player', { start: 14, end: 14 }),
        frameRate: 10,
        repeat: -1
    });
    
}

function update (){
    if (cursors.left.isDown)
    {
        player.setVelocityX(-300);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
        {
        player.setVelocityX(300);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
    player.setVelocityY(-400);
    player.anims.play('up');
    }
}