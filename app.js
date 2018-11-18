var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
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

var player;
var cursors;

var game = new Phaser.Game(config);

function preload() {
  this.load.image("sky", "assets/sky.png");
  this.load.spritesheet("superman-walking", "assets/eradicator-walking.png", {
    frameWidth: 70,
    frameHeight: 86
  });
  this.load.spritesheet("superman-standing", "assets/eradicator-standing.png", {
    frameWidth: 72,
    frameHeight: 84
  });
}

function create() {
  this.add.image(400, 300, "sky");

  player = this.physics.add.sprite(100, 450, "superman-standing");

  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  this.anims.create({
    key: "walking",
    frames: this.anims.generateFrameNumbers("superman-walking", {
      start: 0,
      end: 6
    }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: "standing",
    frames: this.anims.generateFrameNumbers("superman-standing", {
      start: 0,
      end: 4
    }),
    frameRate: 8,
    repeat: -1
  });

  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  if (cursors.right.isDown) {
    player.setVelocityX(160);

    player.anims.play("walking", true);
    player.flipX = false;
  } else if (cursors.left.isDown) {
    player.setVelocityX(-160);

    player.anims.play("walking", true);
    player.flipX = true;
  } else {
    player.setVelocityX(0);

    player.anims.play("standing", true);
  }
}
