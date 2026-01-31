// src/scenes/StoryScene.js
export default class StoryScene extends Phaser.Scene {
  constructor() {
    super('StoryScene')
    this.isAnimating = false
    this.scrollY = 0
    this.maxScroll = 0
    this.canScroll = false
  }

  create() {
    const { width, height } = this.cameras.main
    
    // Calculate responsive sizes
    const padding = Math.min(width * 0.05, 40)
    const contentWidth = width - padding * 2
    const titleSize = Math.min(Math.floor(width * 0.032), 26)
    const textSize = Math.min(Math.floor(width * 0.018), 14)
    const cardScale = Math.min(width / 800, 1)
    
    // Background
    this.cameras.main.setBackgroundColor('#1a0f0a')
    
    // Fixed UI layer (doesn't scroll)
    this.fixedLayer = this.add.container(0, 0).setScrollFactor(0)
    
    // Decorative top border
    const topBorder = this.add.graphics()
    topBorder.fillStyle(0xd4af37, 1)
    topBorder.fillRect(0, 0, width, 4)
    this.fixedLayer.add(topBorder)
    
    // Bottom gradient for fade effect
    const bottomFade = this.add.graphics()
    bottomFade.fillGradientStyle(0x1a0f0a, 0x1a0f0a, 0x1a0f0a, 0x1a0f0a, 0, 0, 1, 1)
    bottomFade.fillRect(0, height - 80, width, 80)
    this.fixedLayer.add(bottomFade)
    
    // Create ambient particles
    this.createAmbientParticles(width, height)
    
    // Scrollable content container
    this.contentContainer = this.add.container(0, 0)
    
    // Main content background
    const contentBg = this.add.graphics()
    contentBg.fillStyle(0x000000, 0.5)
    contentBg.lineStyle(2, 0xd4af37, 0.3)
    contentBg.fillRoundedRect(padding, padding + 10, contentWidth, height * 1.2, 15)
    contentBg.strokeRoundedRect(padding, padding + 10, contentWidth, height * 1.2, 15)
    this.contentContainer.add(contentBg)
    
    // Track content height for scrolling
    let currentY = padding + 30
    
    // Title
    const titleShadow = this.add.text(width / 2, currentY + 2, 'THE LEGEND OF THE SACRED MASK', {
      fontSize: `${titleSize}px`,
      fontFamily: '"Sankofa Display", sans-serif',
      color: '#000000',
      fontStyle: 'bold',
      wordWrap: { width: contentWidth - 40 }
    }).setOrigin(0.5, 0).setAlpha(0)
    this.contentContainer.add(titleShadow)
    
    const title = this.add.text(width / 2, currentY, 'THE LEGEND OF THE SACRED MASK', {
      fontSize: `${titleSize}px`,
      fontFamily: '"Sankofa Display", sans-serif',
      color: '#d4af37',
      fontStyle: 'bold',
      stroke: '#000',
      strokeThickness: 4,
      wordWrap: { width: contentWidth - 40 }
    }).setOrigin(0.5, 0).setAlpha(0)
    this.contentContainer.add(title)
    
    currentY += title.height + 10
    
    // Decorative line
    const titleLine = this.add.graphics()
    titleLine.lineStyle(2, 0xd4af37, 0.8)
    titleLine.beginPath()
    titleLine.moveTo(width / 2 - Math.min(150, contentWidth * 0.25), currentY)
    titleLine.lineTo(width / 2 + Math.min(150, contentWidth * 0.25), currentY)
    titleLine.strokePath()
    titleLine.setAlpha(0)
    this.contentContainer.add(titleLine)
    
    currentY += 20
    
    // Story paragraphs
    const storyParagraphs = [
      'Long ago, in the heart of Africa, a wise and powerful king ruled over a united and prosperous kingdom.',
      'At the center of this harmony was a sacred mask, blessed by the ancestors, which protected the land and bound the people together.',
      'When a great storm struck, the Mask was shattered into four pieces and scattered across four clans, throwing the kingdom into chaos.',
      'Blamed for the disaster, the king was exiled as famine, conflict, and division spread throughout the land.',
      'Now, the exiled king returns as the Chosen One, destined to restore balance.',
      'Journey through the Golden Savannah, Mystic Swamp, Ancient Forest, and Sacred Mountain, each guarded by powerful guards who protect a fragment of the Mask.',
      'Defeat the guardians, reclaim the lost pieces, and heal the broken lands.',
      'Unite the Mask and reveal the symbol of ancestral power to restore peace to the kingdom.'
    ]
    
    this.storyTextObjects = []
    storyParagraphs.forEach((para, index) => {
      const text = this.add.text(width / 2, currentY, para, {
        fontSize: `${textSize}px`,
        fontFamily: '"Agbalumo", cursive',
        color: '#ffffff',
        align: 'center',
        wordWrap: { width: contentWidth - 60 },
        lineSpacing: 4
      }).setOrigin(0.5, 0).setAlpha(0)
      this.contentContainer.add(text)
      this.storyTextObjects.push(text)
      currentY += text.height + 15
    })
    
    currentY += 10
    
    // Location cards - responsive grid
    const locations = [
      { icon: '🌅', name: 'Golden Savannah', color: '#e6ccb2' },
      { icon: '🌿', name: 'Mystic Swamp', color: '#2d6a4f' },
      { icon: '🌲', name: 'Ancient Forest', color: '#52b788' },
      { icon: '⛰️', name: 'Sacred Mountain', color: '#a8dadc' }
    ]
    
    // Calculate card layout - 2x2 grid for small screens, 4x1 for large
    const useGrid = width < 600
    const cardWidth = useGrid ? (contentWidth - 60) / 2 : (contentWidth - 80) / 4
    const cardHeight = 60 * cardScale
    
    this.locationCards = []
    
    locations.forEach((loc, index) => {
      let cardX, cardY
      
      if (useGrid) {
        // 2x2 grid layout
        const col = index % 2
        const row = Math.floor(index / 2)
        cardX = padding + 30 + col * (cardWidth + 10) + cardWidth / 2
        cardY = currentY + row * (cardHeight + 10) + cardHeight / 2
      } else {
        // 4x1 row layout
        cardX = padding + 40 + index * (cardWidth + 10) + cardWidth / 2
        cardY = currentY + cardHeight / 2
      }
      
      // Card background
      const card = this.add.graphics()
      card.fillStyle(Phaser.Display.Color.HexStringToColor(loc.color).color, 0.2)
      card.lineStyle(2, Phaser.Display.Color.HexStringToColor(loc.color).color, 0.5)
      card.fillRoundedRect(-cardWidth / 2, -cardHeight / 2, cardWidth, cardHeight, 8)
      card.strokeRoundedRect(-cardWidth / 2, -cardHeight / 2, cardWidth, cardHeight, 8)
      card.setPosition(cardX, cardY)
      card.setAlpha(0)
      this.contentContainer.add(card)
      
      // Icon
      const iconSize = Math.floor(20 * cardScale)
      const icon = this.add.text(cardX, cardY - 12, loc.icon, {
        fontSize: `${iconSize}px`
      }).setOrigin(0.5).setAlpha(0)
      this.contentContainer.add(icon)
      
      // Location name
      const nameSize = Math.max(10, Math.floor(11 * cardScale))
      const name = this.add.text(cardX, cardY + 15, loc.name, {
        fontSize: `${nameSize}px`,
        fontFamily: '"Agbalumo", cursive',
        color: loc.color,
        fontStyle: 'bold'
      }).setOrigin(0.5).setAlpha(0)
      this.contentContainer.add(name)
      
      this.locationCards.push({ card, icon, name })
    })
    
    currentY += useGrid ? (cardHeight * 2 + 30) : (cardHeight + 20)
    currentY += 15
    
    // Quest text
    this.questText = this.add.text(width / 2, currentY, 'Your quest: Recover all 4 pieces to restore peace to the kingdom.', {
      fontSize: `${textSize + 1}px`,
      fontFamily: '"Agbalumo", cursive',
      color: '#c9a961',
      align: 'center',
      wordWrap: { width: contentWidth - 60 },
      lineSpacing: 4
    }).setOrigin(0.5, 0).setAlpha(0)
    this.contentContainer.add(this.questText)
    
    currentY += this.questText.height + 25
    
    // Continue button
    const btnWidth = Math.min(200, contentWidth * 0.5)
    const btnHeight = 36
    
    this.continueBtn = this.add.container(width / 2, currentY)
    
    this.btnBg = this.add.graphics()
    this.btnBg.fillStyle(0xd4af37, 1)
    this.btnBg.fillRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 8)
    this.continueBtn.add(this.btnBg)
    
    const btnTextSize = Math.min(18, Math.floor(width * 0.022))
    const btnText = this.add.text(0, 0, '▶ BEGIN QUEST', {
      fontSize: `${btnTextSize}px`,
      fontFamily: '"Sankofa Display", sans-serif',
      color: '#1a0f0a',
      fontStyle: 'bold'
    }).setOrigin(0.5)
    this.continueBtn.add(btnText)
    
    this.continueBtn.setAlpha(0)
    this.continueBtn.setSize(btnWidth, btnHeight)
    this.continueBtn.setInteractive({ useHandCursor: true })
    this.contentContainer.add(this.continueBtn)
    
    this.continueBtn.on('pointerover', () => {
      this.tweens.add({ targets: this.continueBtn, scale: 1.1, duration: 150 })
      this.btnBg.clear()
      this.btnBg.fillStyle(0xf4cf67, 1)
      this.btnBg.fillRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 8)
    })
    
    this.continueBtn.on('pointerout', () => {
      this.tweens.add({ targets: this.continueBtn, scale: 1, duration: 150 })
      this.btnBg.clear()
      this.btnBg.fillStyle(0xd4af37, 1)
      this.btnBg.fillRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 8)
    })
    
    this.continueBtn.on('pointerdown', () => {
      if (this.cache.audio.exists('buttonClick')) {
        this.sound.play('buttonClick')
      }
      this.cameras.main.fadeOut(800, 0, 0, 0)
      this.time.delayedCall(800, () => {
        this.scene.start('GameScene')
      })
    })
    
    currentY += btnHeight + 30
    
    // Calculate max scroll
    const totalContentHeight = currentY + padding
    this.maxScroll = Math.max(0, totalContentHeight - height + 40)
    this.canScroll = this.maxScroll > 0
    
    // Scroll indicator (only if content is scrollable)
    if (this.canScroll) {
      this.scrollIndicator = this.add.text(width / 2, height - 30, '▼ Scroll for more ▼', {
        fontSize: '12px',
        fontFamily: '"Agbalumo", cursive',
        color: '#d4af37'
      }).setOrigin(0.5).setAlpha(0.7)
      this.fixedLayer.add(this.scrollIndicator)
      
      this.tweens.add({
        targets: this.scrollIndicator,
        y: height - 25,
        alpha: 0.4,
        duration: 800,
        yoyo: true,
        repeat: -1
      })
    }
    
    // Skip button (fixed position)
    this.skipText = this.add.text(width - 50, 20, 'Skip ▶', {
      fontSize: '13px',
      fontFamily: '"Agbalumo", cursive',
      color: '#666666'
    }).setOrigin(0.5).setInteractive({ useHandCursor: true })
    this.fixedLayer.add(this.skipText)
    
    this.skipText.on('pointerover', () => this.skipText.setColor('#d4af37'))
    this.skipText.on('pointerout', () => this.skipText.setColor('#666666'))
    this.skipText.on('pointerdown', () => this.skipToEnd())
    
    // Input handling for scroll
    this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY) => {
      if (this.canScroll) {
        this.scrollY = Phaser.Math.Clamp(this.scrollY + deltaY * 0.5, 0, this.maxScroll)
        this.contentContainer.y = -this.scrollY
        this.updateScrollIndicator()
      }
    })
    
    // Touch/drag scrolling
    this.isDragging = false
    this.lastPointerY = 0
    
    this.input.on('pointerdown', (pointer) => {
      if (this.canScroll) {
        this.isDragging = true
        this.lastPointerY = pointer.y
      }
    })
    
    this.input.on('pointermove', (pointer) => {
      if (this.isDragging && this.canScroll) {
        const deltaY = this.lastPointerY - pointer.y
        this.scrollY = Phaser.Math.Clamp(this.scrollY + deltaY, 0, this.maxScroll)
        this.contentContainer.y = -this.scrollY
        this.lastPointerY = pointer.y
        this.updateScrollIndicator()
      }
    })
    
    this.input.on('pointerup', () => {
      this.isDragging = false
    })
    
    // Start animation
    this.cameras.main.fadeIn(500, 0, 0, 0)
    this.time.delayedCall(300, () => {
      this.animateSequence(title, titleShadow, titleLine)
    })
  }
  
  updateScrollIndicator() {
    if (this.scrollIndicator) {
      // Hide scroll indicator when near bottom
      const nearBottom = this.scrollY >= this.maxScroll - 20
      this.scrollIndicator.setVisible(!nearBottom)
    }
  }
  
  createAmbientParticles(width, height) {
    for (let i = 0; i < 15; i++) {
      const x = Phaser.Math.Between(50, width - 50)
      const y = Phaser.Math.Between(50, height - 50)
      const particle = this.add.circle(x, y, Phaser.Math.Between(1, 2), 0xd4af37, 0.3)
      
      this.tweens.add({
        targets: particle,
        y: y - Phaser.Math.Between(30, 80),
        alpha: 0,
        duration: Phaser.Math.Between(3000, 5000),
        repeat: -1,
        delay: Phaser.Math.Between(0, 2000)
      })
    }
  }
  
  animateSequence(title, titleShadow, titleLine) {
    this.isAnimating = true
    
    // Animate title
    this.tweens.add({
      targets: [title, titleShadow],
      alpha: 1,
      duration: 800,
      ease: 'Power2'
    })
    
    this.tweens.add({
      targets: titleLine,
      alpha: 1,
      duration: 600,
      delay: 400
    })
    
    // Animate story paragraphs
    this.storyTextObjects.forEach((textObj, index) => {
      this.tweens.add({
        targets: textObj,
        alpha: 1,
        duration: 600,
        delay: 600 + index * 400,
        ease: 'Power2'
      })
    })
    
    // Animate location cards
    const storyDelay = 600 + this.storyTextObjects.length * 400
    
    this.locationCards.forEach((card, index) => {
      this.tweens.add({
        targets: [card.card, card.icon, card.name],
        alpha: 1,
        duration: 400,
        delay: storyDelay + index * 150,
        ease: 'Power2'
      })
      
      // Floating icon animation
      this.tweens.add({
        targets: card.icon,
        y: card.icon.y - 4,
        duration: 1000 + index * 100,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
        delay: storyDelay + 400 + index * 150
      })
    })
    
    // Animate quest text and button
    const cardsDelay = storyDelay + this.locationCards.length * 150
    
    this.tweens.add({
      targets: this.questText,
      alpha: 1,
      duration: 600,
      delay: cardsDelay + 200,
      ease: 'Power2'
    })
    
    this.tweens.add({
      targets: this.continueBtn,
      alpha: 1,
      duration: 600,
      delay: cardsDelay + 500,
      ease: 'Back.easeOut',
      onComplete: () => {
        this.isAnimating = false
        this.tweens.add({
          targets: this.continueBtn,
          scale: 1.05,
          duration: 800,
          yoyo: true,
          repeat: -1,
          ease: 'Sine.easeInOut'
        })
        // Hide skip button
        this.skipText.setAlpha(0)
      }
    })
  }
  
  skipToEnd() {
    this.tweens.killAll()
    
    this.storyTextObjects.forEach(obj => obj.setAlpha(1))
    this.locationCards.forEach(card => {
      card.card.setAlpha(1)
      card.icon.setAlpha(1)
      card.name.setAlpha(1)
    })
    this.questText.setAlpha(1)
    this.continueBtn.setAlpha(1)
    this.skipText.setAlpha(0)
    
    this.tweens.add({
      targets: this.continueBtn,
      scale: 1.05,
      duration: 800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    })
    
    this.isAnimating = false
  }
}
