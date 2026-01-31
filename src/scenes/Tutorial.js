// src/scenes/Tutorial.js
export default class Tutorial extends Phaser.Scene {
    constructor() {
        super('Tutorial')
    }

    create() {
        this.cameras.main.setBackgroundColor('#1a0f0a')

        this.add.text(400, 50, 'HOW TO PLAY', {
            fontSize: '40px',
            fontFamily: '"Sankofa Display", sans-serif',
            color: '#d4af37',
            fontStyle: 'bold',
            stroke: '#000',
            strokeThickness: 5
        }).setOrigin(0.5)

        // Instructions
        const instructions = `⬅️ LEFT ARROW - Move Left
➡️ RIGHT ARROW - Move Right
⬆️ UP ARROW - Move Up
⬇️ DOWN ARROW - Move Down

🎯 OBJECTIVE:
Collect all 4 mask pieces scattered across the lands

💡 TIP:
Avoid the red enemies!
The world has 4 different environments
Explore by moving left and right

Try moving around below!`

        this.add.text(400, 180, instructions, {
            fontSize: '18px',
            fontFamily: '"Agbalumo", cursive',
            color: '#ffffff',
            align: 'center',
            lineSpacing: 8
        }).setOrigin(0.5)

        // Add Player for practice - SMALLER SIZE
        this.player = this.physics.add.sprite(400, 350, 'player')
        this.player.setScale(0.3)
        this.player.setCollideWorldBounds(true)
        this.player.body.setAllowGravity(false)

        // Controls
        this.cursors = this.input.keyboard.createCursorKeys()

        const backBtn = this.add.text(400, 430, 'BACK TO MENU', {
            fontSize: '22px',
            fontFamily: '"Agbalumo", cursive',
            color: '#d4af37',
            backgroundColor: '#000000',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive()

        backBtn.on('pointerover', () => {
            backBtn.setScale(1.1)
        })

        backBtn.on('pointerout', () => {
            backBtn.setScale(1)
        })

        backBtn.on('pointerdown', () => {
            if (this.cache.audio.exists('buttonClick')) {
                this.sound.play('buttonClick')
            }
            this.scene.start('MainMenu')
        })

        // Ensure music is playing
        if (this.cache.audio.exists('bgMusic')) {
            const bgMusic = this.sound.get('bgMusic') || this.sound.add('bgMusic', { loop: true, volume: 0.4 })
            if (!bgMusic.isPlaying) {
                bgMusic.play()
            }
        }
    }

    update() {
        const speed = 200
        this.player.setVelocity(0)

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-speed)
            this.player.setFlipX(true)
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(speed)
            this.player.setFlipX(false)
        }

        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-speed)
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(speed)
        }
    }
}
