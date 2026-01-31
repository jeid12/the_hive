// src/scenes/Credits.js
export default class Credits extends Phaser.Scene {
  constructor() {
    super('Credits')
  }

  create() {
    this.cameras.main.setBackgroundColor('#0a0a0a')

    this.add.text(400, 100, 'CREDITS', {
      fontSize: '40px',
      fontFamily: '"Sankofa Display", sans-serif',
      color: '#d4af37',
      fontStyle: 'bold'
    }).setOrigin(0.5)

    const creditsText = `MASK OF THE KING
    
A traditional African kingdom adventure

Game Design & Development
Kevin Ishimwe

Inspired by African folklore and traditions

Created for Global Game Jam

Thank you for playing!`

    this.add.text(400, 250, creditsText, {
      fontSize: '18px',
      fontFamily: '"Agbalumo", cursive',
      color: '#ffffff',
      align: 'center',
      lineSpacing: 10
    }).setOrigin(0.5)

    const menuBtn = this.add.text(400, 410, 'BACK TO MENU', {
      fontSize: '22px',
      fontFamily: '"Agbalumo", cursive',
      color: '#d4af37',
      backgroundColor: '#000000',
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5).setInteractive()

    menuBtn.on('pointerover', () => {
      menuBtn.setScale(1.1)
    })

    menuBtn.on('pointerout', () => {
      menuBtn.setScale(1)
    })

    menuBtn.on('pointerdown', () => {
      if (this.cache.audio.exists('buttonClick')) {
        this.sound.play('buttonClick')
      }
      this.scene.start('MainMenu')
    })
  }
}
