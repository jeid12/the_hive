// src/scenes/Credits.js
export default class Credits extends Phaser.Scene {
  constructor() {
    super('Credits')
  }

  create() {
    const { width, height } = this.cameras.main
    
    // Calculate responsive sizes
    const padding = Math.min(width * 0.05, 40)
    const contentWidth = width - padding * 2
    const titleSize = Math.min(Math.floor(width * 0.045), 36)
    const headingSize = Math.min(Math.floor(width * 0.022), 18)
    const textSize = Math.min(Math.floor(width * 0.018), 14)
    
    // Dark background
    this.cameras.main.setBackgroundColor('#0a0a0a')
    
    // Fixed UI layer
    this.fixedLayer = this.add.container(0, 0).setScrollFactor(0)
    
    // Decorative top border
    const topBorder = this.add.graphics()
    topBorder.fillStyle(0xd4af37, 1)
    topBorder.fillRect(0, 0, width, 4)
    this.fixedLayer.add(topBorder)
    
    // Create ambient particles
    this.createParticles(width, height)
    
    // Scrolling credits container
    this.creditsContainer = this.add.container(0, height)
    
    // Credits data structure
    const creditsData = [
      { type: 'title', text: '✦ CREDITS ✦' },
      { type: 'spacer', height: 20 },
      { type: 'game-title', text: 'THE HIVE' },
      { type: 'subtitle', text: 'A Traditional African Kingdom Adventure' },
      { type: 'spacer', height: 40 },
      
      { type: 'heading', text: '— Game Design & Development —' },
      { type: 'name', text: 'Kevin Ishimwe' },
      { type: 'spacer', height: 30 },
      
      { type: 'heading', text: '— Programming —' },
      { type: 'name', text: 'Kevin Ishimwe' },
      { type: 'spacer', height: 30 },
      
      { type: 'heading', text: '— Art & Visual Design —' },
      { type: 'name', text: 'Kevin Ishimwe' },
      { type: 'spacer', height: 30 },
      
      { type: 'heading', text: '— Story & Narrative —' },
      { type: 'name', text: 'Kevin Ishimwe' },
      { type: 'spacer', height: 30 },
      
      { type: 'heading', text: '— Inspiration —' },
      { type: 'text', text: 'African Folklore & Traditions' },
      { type: 'text', text: 'The Rich Heritage of African Kingdoms' },
      { type: 'spacer', height: 30 },
      
      { type: 'heading', text: '— Created For —' },
      { type: 'name', text: 'Global Game Jam 2026' },
      { type: 'spacer', height: 30 },
      
      { type: 'heading', text: '— Built With —' },
      { type: 'text', text: 'Phaser 3 Game Framework' },
      { type: 'text', text: 'JavaScript / HTML5' },
      { type: 'spacer', height: 40 },
      
      { type: 'heading', text: '— Special Thanks —' },
      { type: 'text', text: 'To all players who embarked on this quest' },
      { type: 'text', text: 'To the ancestors who inspire these stories' },
      { type: 'spacer', height: 50 },
      
      { type: 'final', text: '🎭 Thank You For Playing! 🎭' },
      { type: 'spacer', height: 30 },
      { type: 'copyright', text: '© 2026 Kevin Ishimwe' },
      { type: 'copyright', text: 'All Rights Reserved' },
      { type: 'spacer', height: 60 }
    ]
    
    // Build credits content
    let currentY = 0
    
    creditsData.forEach(item => {
      if (item.type === 'spacer') {
        currentY += item.height
        return
      }
      
      let style = {}
      let yOffset = 0
      
      switch (item.type) {
        case 'title':
          style = {
            fontSize: `${titleSize}px`,
            fontFamily: '"Sankofa Display", sans-serif',
            color: '#d4af37',
            fontStyle: 'bold',
            stroke: '#000',
            strokeThickness: 4
          }
          yOffset = 25
          break
        case 'game-title':
          style = {
            fontSize: `${titleSize - 4}px`,
            fontFamily: '"Sankofa Display", sans-serif',
            color: '#ffffff',
            fontStyle: 'bold'
          }
          yOffset = 20
          break
        case 'subtitle':
          style = {
            fontSize: `${textSize}px`,
            fontFamily: '"Agbalumo", cursive',
            color: '#c9a961',
            fontStyle: 'italic'
          }
          yOffset = 18
          break
        case 'heading':
          style = {
            fontSize: `${headingSize}px`,
            fontFamily: '"Sankofa Display", sans-serif',
            color: '#d4af37'
          }
          yOffset = 25
          break
        case 'name':
          style = {
            fontSize: `${headingSize - 2}px`,
            fontFamily: '"Agbalumo", cursive',
            color: '#ffffff',
            fontStyle: 'bold'
          }
          yOffset = 22
          break
        case 'text':
          style = {
            fontSize: `${textSize}px`,
            fontFamily: '"Agbalumo", cursive',
            color: '#aaaaaa'
          }
          yOffset = 20
          break
        case 'final':
          style = {
            fontSize: `${headingSize + 2}px`,
            fontFamily: '"Sankofa Display", sans-serif',
            color: '#d4af37',
            fontStyle: 'bold'
          }
          yOffset = 30
          break
        case 'copyright':
          style = {
            fontSize: `${textSize - 2}px`,
            fontFamily: '"Agbalumo", cursive',
            color: '#666666'
          }
          yOffset = 16
          break
      }
      
      const text = this.add.text(width / 2, currentY, item.text, {
        ...style,
        align: 'center',
        wordWrap: { width: contentWidth - 40 }
      }).setOrigin(0.5, 0)
      
      this.creditsContainer.add(text)
      currentY += text.height + yOffset
    })
    
    // Total height of credits
    this.totalCreditsHeight = currentY
    
    // Auto-scroll speed (pixels per second)
    this.scrollSpeed = 40
    this.isScrolling = true
    this.scrollY = 0
    
    // Add decorative lines on sides
    const sideDecor = this.add.graphics()
    sideDecor.lineStyle(1, 0xd4af37, 0.2)
    sideDecor.beginPath()
    sideDecor.moveTo(padding, 50)
    sideDecor.lineTo(padding, height - 80)
    sideDecor.moveTo(width - padding, 50)
    sideDecor.lineTo(width - padding, height - 80)
    sideDecor.strokePath()
    this.fixedLayer.add(sideDecor)
    
    // Bottom UI container (fixed)
    const bottomBg = this.add.graphics()
    bottomBg.fillGradientStyle(0x0a0a0a, 0x0a0a0a, 0x0a0a0a, 0x0a0a0a, 0, 0, 1, 1)
    bottomBg.fillRect(0, height - 70, width, 70)
    this.fixedLayer.add(bottomBg)
    
    // Back to menu button
    const btnWidth = Math.min(180, contentWidth * 0.4)
    const btnHeight = 36
    
    this.menuBtn = this.add.container(width / 2, height - 40)
    this.fixedLayer.add(this.menuBtn)
    
    this.btnBg = this.add.graphics()
    this.btnBg.fillStyle(0xd4af37, 1)
    this.btnBg.fillRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 8)
    this.menuBtn.add(this.btnBg)
    
    const btnTextSize = Math.min(16, Math.floor(width * 0.02))
    const btnText = this.add.text(0, 0, '◄ MAIN MENU', {
      fontSize: `${btnTextSize}px`,
      fontFamily: '"Sankofa Display", sans-serif',
      color: '#0a0a0a',
      fontStyle: 'bold'
    }).setOrigin(0.5)
    this.menuBtn.add(btnText)
    
    this.menuBtn.setSize(btnWidth, btnHeight)
    this.menuBtn.setInteractive({ useHandCursor: true })
    
    this.menuBtn.on('pointerover', () => {
      this.tweens.add({ targets: this.menuBtn, scale: 1.1, duration: 150 })
      this.btnBg.clear()
      this.btnBg.fillStyle(0xf4cf67, 1)
      this.btnBg.fillRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 8)
    })
    
    this.menuBtn.on('pointerout', () => {
      this.tweens.add({ targets: this.menuBtn, scale: 1, duration: 150 })
      this.btnBg.clear()
      this.btnBg.fillStyle(0xd4af37, 1)
      this.btnBg.fillRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 8)
    })
    
    this.menuBtn.on('pointerdown', () => {
      if (this.cache.audio.exists('buttonClick')) {
        this.sound.play('buttonClick')
      }
      this.cameras.main.fadeOut(500, 0, 0, 0)
      this.time.delayedCall(500, () => {
        this.scene.start('MainMenu')
      })
    })
    
    // Scroll control hint
    this.scrollHint = this.add.text(width / 2, height - 65, 'Scroll or wait for auto-scroll', {
      fontSize: '10px',
      fontFamily: '"Agbalumo", cursive',
      color: '#555555'
    }).setOrigin(0.5)
    this.fixedLayer.add(this.scrollHint)
    
    // Manual scroll with mouse wheel
    this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY) => {
      this.isScrolling = false
      this.scrollY += deltaY * 0.8
      this.scrollY = Phaser.Math.Clamp(this.scrollY, 0, this.totalCreditsHeight + height)
      this.creditsContainer.y = height - this.scrollY
    })
    
    // Touch drag scroll
    this.isDragging = false
    this.lastPointerY = 0
    
    this.input.on('pointerdown', (pointer) => {
      if (pointer.y < height - 80) {
        this.isDragging = true
        this.isScrolling = false
        this.lastPointerY = pointer.y
      }
    })
    
    this.input.on('pointermove', (pointer) => {
      if (this.isDragging) {
        const deltaY = this.lastPointerY - pointer.y
        this.scrollY += deltaY
        this.scrollY = Phaser.Math.Clamp(this.scrollY, 0, this.totalCreditsHeight + height)
        this.creditsContainer.y = height - this.scrollY
        this.lastPointerY = pointer.y
      }
    })
    
    this.input.on('pointerup', () => {
      this.isDragging = false
    })
    
    // Fade in
    this.cameras.main.fadeIn(500, 0, 0, 0)
  }
  
  createParticles(width, height) {
    // Subtle golden particles
    for (let i = 0; i < 12; i++) {
      const x = Phaser.Math.Between(50, width - 50)
      const y = Phaser.Math.Between(height, height + 100)
      const particle = this.add.circle(x, y, Phaser.Math.Between(1, 2), 0xd4af37, 0.3)
      
      this.tweens.add({
        targets: particle,
        y: -20,
        alpha: 0,
        duration: Phaser.Math.Between(8000, 15000),
        repeat: -1,
        delay: Phaser.Math.Between(0, 5000)
      })
    }
  }
  
  update(time, delta) {
    // Auto-scroll credits
    if (this.isScrolling) {
      this.scrollY += (this.scrollSpeed * delta) / 1000
      this.creditsContainer.y = this.cameras.main.height - this.scrollY
      
      // Loop credits when they've scrolled past
      if (this.scrollY > this.totalCreditsHeight + this.cameras.main.height) {
        this.scrollY = 0
        this.creditsContainer.y = this.cameras.main.height
      }
    }
  }
}
