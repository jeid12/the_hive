# 🎭 Mask of the King

An African kingdom-themed platformer adventure game built with Phaser 3.

## 🎮 Game Concept

In the heart of Africa, a powerful king ruled with wisdom and strength. His sacred mask, blessed by the ancestors, kept the kingdom united and prosperous. But a great storm scattered the mask into 4 pieces, each lost in a different land.

You must journey through **4 unique environments** to collect all the mask pieces and restore peace to the kingdom:

1. **🌾 The Golden Savannah** - Wide open plains with scattered platforms
2. **🌿 The Mystic Swamp** - Treacherous waters and floating platforms
3. **🌲 The Ancient Forest** - Dense vegetation with vertical challenges
4. **⛰️ The Sacred Mountain** - High peaks requiring precise jumping

## 🎯 Features

### ✅ Implemented
- **Main Menu** with animated title and interactive buttons
- **Tutorial Scene** with playable practice area
- **Story Introduction** with African kingdom narrative
- **4 Unique Environments** with different platform layouts
- **Mask Collection Mechanic** with particle effects
- **Visual Feedback** - Screen flash, particle bursts, celebration text
- **Progressive Difficulty** across environments
- **End Story** with victory celebration
- **Credits Scene** with game information
- **Loading Screen** with progress bar
- **Responsive Controls** - Arrow keys for movement and jumping
- **African Theme** - Gold (#d4af37) color scheme throughout

### 🎨 Visual Features
- Animated title with pulse effect
- Button hover effects
- Particle effects on mask collection
- Screen flash feedback
- Smooth transitions between scenes
- Environment-specific color schemes
- Floating mask animation

### 🎮 Gameplay Mechanics
- Smooth platformer physics
- Jump mechanics with gravity
- Collision detection
- World scrolling (1600x450 world size)
- Camera following player
- Restart functionality (Press R)

## 🕹️ Controls

- **⬅️ Left Arrow** - Move left
- **➡️ Right Arrow** - Move right  
- **⬆️ Up Arrow** - Jump
- **R** - Restart current level
- **Mouse Click** - Navigate menus and story screens

## 📁 Project Structure

```
the hive/
├── index.html              # Main HTML file
├── phaser.js              # Phaser 3 library
├── assets/                # Game assets (placeholders)
│   ├── player.png
│   ├── ground.png
│   └── maskPiece.png
└── src/
    ├── main.js            # Game configuration
    ├── gameState.js       # Global game state
    └── scenes/
        ├── Preload.js     # Asset loading with progress bar
        ├── MainMenu.js    # Main menu with Start/Tutorial
        ├── Tutorial.js    # Tutorial with practice area
        ├── StoryScene.js  # Opening story
        ├── GameScene.js   # Main gameplay
        ├── EndStory.js    # Victory screen
        └── Credits.js     # Credits and info
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Edge, Safari)
- Local web server (Python, Node.js, or any HTTP server)

### Running the Game

1. **Using Python:**
   ```bash
   python -m http.server 8080
   ```

2. **Using Node.js (http-server):**
   ```bash
   npx http-server -p 8080
   ```

3. **Using PHP:**
   ```bash
   php -S localhost:8080
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:8080
   ```

## 🎨 Asset Implementation

Currently using **placeholder assets**. The game is designed to work with:

### Required Assets
- **player.png** - Character sprite (currently placeholder)
- **ground.png** - Platform/ground tiles (currently placeholder)
- **maskPiece.png** - Collectible mask piece (currently placeholder)

### Future Assets (TODO)
- **Sound Effects:**
  - Mask collection sound
  - Jump sound
  - Background music for each environment
  - Victory fanfare
  
- **Visual Assets:**
  - Animated character sprites
  - Environment-specific backgrounds
  - Obstacle sprites
  - Particle textures
  - UI elements

## 🔧 Technical Details

### Built With
- **Phaser 3** - Game framework
- **JavaScript ES6** - Module system
- **HTML5 Canvas** - Rendering

### Configuration
- **Resolution:** 800x450 pixels (small resolution as requested)
- **Physics:** Arcade physics with gravity (800)
- **World Size:** 1600x450 (scrolling levels)
- **Pixel Art:** Enabled for crisp rendering

### Game State Management
```javascript
gameState = {
  maskPieces: 0,           // Current collected pieces
  totalPieces: 4,          // Total pieces to collect
  environments: [          // Environment progression
    'savannah', 
    'swamp', 
    'forest', 
    'mountain'
  ],
  currentEnvIndex: 0       // Current environment
}
```

## 🎯 Game Flow

```
Preload (Loading Screen)
    ↓
Main Menu (Start / Tutorial)
    ↓
Story Scene (Introduction)
    ↓
Game Scene (Environment 1: Savannah)
    ↓
Game Scene (Environment 2: Swamp)
    ↓
Game Scene (Environment 3: Forest)
    ↓
Game Scene (Environment 4: Mountain)
    ↓
End Story (Victory)
    ↓
Credits
    ↓
Back to Main Menu
```

## 🌟 Future Enhancements

### Planned Features
- [ ] Add sound effects and background music
- [ ] Create custom African-themed sprites
- [ ] Add enemies/obstacles in each environment
- [ ] Implement lives/health system
- [ ] Add collectible items (coins, power-ups)
- [ ] Create animated character sprites
- [ ] Add environment-specific hazards
- [ ] Implement score system
- [ ] Add local storage for high scores
- [ ] Create more levels per environment
- [ ] Add boss battles
- [ ] Implement difficulty settings
- [ ] Add mobile touch controls
- [ ] Create fullscreen mode
- [ ] Add pause menu

### Asset Improvements
- [ ] Replace placeholder sprites with custom art
- [ ] Add background parallax layers
- [ ] Create environment-specific tilesets
- [ ] Design unique mask piece visuals
- [ ] Add animated environmental effects

## 👨‍💻 Development

### Adding New Environments
1. Add environment name to `gameState.environments` array
2. Add color scheme in `GameScene.create()`
3. Add environment name in `envNames` object
4. Create level layout in `createLevel()` method

### Modifying Game Parameters
- **Gravity:** Adjust in `src/main.js` (arcade.gravity.y)
- **Player Speed:** Modify in `GameScene.update()` (setVelocityX)
- **Jump Height:** Modify in `GameScene.update()` (setVelocityY)
- **World Size:** Adjust in `GameScene.create()` (setBounds)

## 📝 Credits

**Game Design & Development:** Kevin Ishimwe  
**Framework:** Phaser 3  
**Theme:** African Kingdom Folklore  
**Created for:** Global Game Jam  

## 📄 License

This project is created for educational and game jam purposes.

## 🤝 Contributing

This is a game jam project, but suggestions and improvements are welcome!

---

**Enjoy your quest to restore the Sacred Mask! 🎭✨**
