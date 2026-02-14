// ==========================================
// 貓咪射擊遊戲 - 完整遊戲代碼
// ==========================================

const GAME_CONFIG = {
    width: 800,
    height: 1000,
    totalLevels: 37,
    playerSpeed: 300,
    playerHealth: 100,
    playerLives: 9,
    invincibleTime: 1000
};

// ==========================================
// 關卡配置系統 - 37個獨特關卡
// ==========================================
const LEVEL_CONFIG = {
    // 第1區域：村莊外圍 (1-5)
    1: { name: "村莊入口", theme: "village", enemies: ['enemy_rat'], bgColors: [0x87CEEB, 0x98FB98], spawnRate: 2000 },
    2: { name: "稻草田危機", theme: "field", enemies: ['enemy_rat', 'enemy_bird'], bgColors: [0xFFD700, 0xFFA500], spawnRate: 1800 },
    3: { name: "小溪邊緣", theme: "river", enemies: ['enemy_rat', 'enemy_bird'], bgColors: [0x87CEEB, 0x4682B4], spawnRate: 1600 },
    4: { name: "風車平原", theme: "windmill", enemies: ['enemy_rat', 'enemy_bird', 'enemy_dog'], bgColors: [0xF0E68C, 0xDAA520], spawnRate: 1500 },
    5: { 
        name: "盜賊團首領", 
        theme: "boss_mid", 
        enemies: [], 
        bgColors: [0x8B4513, 0xA0522D], 
        bossType: 'mid', 
        bossKey: 'boss_fox', 
        bossName: '鼠盜王', 
        bossHealth: 300, 
        hpLayers: 1,
        phases: [
            { type: 'minions', waves: 3, enemies: ['enemy_rat'], count: 5, name: '盜賊嘍囉' },
            { type: 'elite', enemies: ['enemy_dog'], count: 2, name: '護衛犬' },
            { type: 'boss', key: 'boss_fox_mini', name: '狐妖副官', health: 150, scale: 1.2 }
        ]
    },
    
    // 第2區域：森林地帶 (6-10)
    6: { name: "迷霧森林", theme: "forest", enemies: ['enemy_bird', 'enemy_dog'], bgColors: [0x228B22, 0x006400], spawnRate: 1500 },
    7: { name: "蘑菇洞穴", theme: "cave", enemies: ['enemy_rat', 'enemy_dog'], bgColors: [0x4B0082, 0x800080], spawnRate: 1400 },
    8: { name: "古樹迷蹤", theme: "ancient", enemies: ['enemy_bird', 'enemy_dog', 'enemy_pig'], bgColors: [0x556B2F, 0x8B4513], spawnRate: 1300 },
    9: { name: "精靈之泉", theme: "fairy", enemies: ['enemy_bird', 'enemy_dog', 'enemy_pig'], bgColors: [0x00CED1, 0x48D1CC], spawnRate: 1200 },
    10: { 
        name: "森林守護者", 
        theme: "boss_big", 
        enemies: [], 
        bgColors: [0x006400, 0x228B22], 
        bossType: 'big', 
        bossKey: 'boss_wolf', 
        bossName: '森狼王', 
        bossHealth: 800, 
        hpLayers: 3,
        phases: [
            { type: 'minions', waves: 3, enemies: ['enemy_rat', 'enemy_bird'], count: 6, name: '森林嘍囉' },
            { type: 'elite', enemies: ['enemy_dog', 'enemy_pig'], count: 3, name: '精英護衛' },
            { type: 'miniboss', key: 'boss_fox', name: '狐族長老', health: 300, scale: 1.5 },
            { type: 'midboss', key: 'boss_wolf', name: '狼族將軍', health: 500, scale: 1.8 },
            { type: 'boss', key: 'boss_wolf', name: '森狼王', health: 800, scale: 2.2 }
        ]
    },
    
    // 第3區域：火山地帶 (11-15)
    11: { name: "岩漿邊緣", theme: "volcano_edge", enemies: ['enemy_rat', 'enemy_pig'], bgColors: [0xFF4500, 0x8B0000], spawnRate: 1400 },
    12: { name: "硫磺峽谷", theme: "sulfur", enemies: ['enemy_bird', 'enemy_pig'], bgColors: [0xFFD700, 0xFF6347], spawnRate: 1300 },
    13: { name: "熔岩隧道", theme: "tunnel", enemies: ['enemy_dog', 'enemy_pig'], bgColors: [0x8B0000, 0x4B0000], spawnRate: 1200 },
    14: { name: "火焰之心", theme: "fire_core", enemies: ['enemy_bird', 'enemy_dog', 'enemy_pig'], bgColors: [0xDC143C, 0x8B0000], spawnRate: 1100 },
    15: { name: "烈焰統領", theme: "boss_mid", enemies: [], bgColors: [0x8B0000, 0xFF4500], bossType: 'mid', bossKey: 'boss_bear', bossName: '熔岩熊怪', bossHealth: 600, hpLayers: 1 },
    
    // 第4區域：冰雪世界 (16-20)
    16: { name: "冰原初探", theme: "ice", enemies: ['enemy_rat', 'enemy_bird'], bgColors: [0xE0FFFF, 0xB0E0E6], spawnRate: 1300 },
    17: { name: "雪花飛舞", theme: "snow", enemies: ['enemy_bird', 'enemy_dog'], bgColors: [0xFFFAFA, 0xF0F8FF], spawnRate: 1200 },
    18: { name: "冰川裂縫", theme: "glacier", enemies: ['enemy_dog', 'enemy_pig'], bgColors: [0x87CEFA, 0x4682B4], spawnRate: 1100 },
    19: { name: "極光之夜", theme: "aurora", enemies: ['enemy_bird', 'enemy_dog', 'enemy_pig'], bgColors: [0x191970, 0x4B0082], spawnRate: 1000 },
    20: { name: "冰霜巨人", theme: "boss_big", enemies: [], bgColors: [0x000080, 0x4169E1], bossType: 'big', bossKey: 'boss_dragon', bossName: '冰龍', bossHealth: 1200, hpLayers: 3 },
    
    // 第5區域：沙漠地帶 (21-25)
    21: { name: "黃金沙丘", theme: "desert", enemies: ['enemy_rat', 'enemy_bird'], bgColors: [0xF4A460, 0xD2691E], spawnRate: 1200 },
    22: { name: "綠洲迷蹤", theme: "oasis", enemies: ['enemy_bird', 'enemy_dog'], bgColors: [0x32CD32, 0x20B2AA], spawnRate: 1100 },
    23: { name: "金字塔群", theme: "pyramid", enemies: ['enemy_dog', 'enemy_pig'], bgColors: [0xDAA520, 0xB8860B], spawnRate: 1000 },
    24: { name: "法老詛咒", theme: "curse", enemies: ['enemy_bird', 'enemy_dog', 'enemy_pig'], bgColors: [0x800080, 0x4B0082], spawnRate: 900 },
    25: { name: "沙漠霸主", theme: "boss_mid", enemies: [], bgColors: [0x8B4513, 0xA0522D], bossType: 'mid', bossKey: 'boss_fox', bossName: '沙漠狐王', bossHealth: 800, hpLayers: 1 },
    
    // 第6區域：天空之城 (26-30)
    26: { name: "浮空島嶼", theme: "sky", enemies: ['enemy_bird'], bgColors: [0x87CEEB, 0xF0F8FF], spawnRate: 1000 },
    27: { name: "雲海航行", theme: "cloud", enemies: ['enemy_bird', 'enemy_rat'], bgColors: [0xF0FFFF, 0xE0FFFF], spawnRate: 950 },
    28: { name: "風暴之眼", theme: "storm", enemies: ['enemy_bird', 'enemy_dog'], bgColors: [0x2F4F4F, 0x696969], spawnRate: 900 },
    29: { name: "雷電交錯", theme: "thunder", enemies: ['enemy_bird', 'enemy_dog', 'enemy_pig'], bgColors: [0x483D8B, 0x000000], spawnRate: 850 },
    30: { name: "天空守護神", theme: "boss_big", enemies: [], bgColors: [0x000080, 0x4169E1], bossType: 'big', bossKey: 'boss_wolf', bossName: '雷狼王', bossHealth: 1500, hpLayers: 3 },
    
    // 第7區域：黑暗領域 (31-34)
    31: { name: "黑暗邊境", theme: "darkness", enemies: ['enemy_rat', 'enemy_dog', 'enemy_pig'], bgColors: [0x1a1a2e, 0x16213e], spawnRate: 800 },
    32: { name: "暗影沼澤", theme: "shadow", enemies: ['enemy_bird', 'enemy_dog', 'enemy_pig'], bgColors: [0x2d2d2d, 0x1a1a1a], spawnRate: 750 },
    33: { name: "虛空裂縫", theme: "void", enemies: ['enemy_rat', 'enemy_bird', 'enemy_dog', 'enemy_pig'], bgColors: [0x000000, 0x4B0082], spawnRate: 700 },
    34: { name: "絕望深淵", theme: "abyss", enemies: ['enemy_rat', 'enemy_bird', 'enemy_dog', 'enemy_pig'], bgColors: [0x000000, 0x8B0000], spawnRate: 650 },
    
    // 最終三關：終極BOSS戰
    35: { name: "龍貓大王的威嚴", theme: "boss_ultimate", enemies: [], bgColors: [0x2a0a0a, 0x0a0a2a], bossType: 'ultimate', bossKey: 'boss_dragon', bossName: '龍貓大王', bossHealth: 2000, hpLayers: 5 },
    36: { name: "龍貓大王的憤怒", theme: "boss_ultimate2", enemies: [], bgColors: [0x4a0000, 0x1a0033], bossType: 'ultimate2', bossKey: 'boss_dragon', bossName: '龍貓大王·狂暴型態', bossHealth: 4000, hpLayers: 10 },
    37: { name: "最終決戰", theme: "boss_final", enemies: [], bgColors: [0x000000, 0xff0000], bossType: 'final', bossKey: 'boss_dragon', bossName: '龍貓大王·滅世型態', bossHealth: 8000, hpLayers: 20 }
};

// 精靈圖配置 (基於2400x1792的精靈圖)
const SPRITE_CONFIG = {
    frameWidth: 250,
    frameHeight: 213,
    columns: 8,
    rows: 7,
    animations: {
        idle: { row: 0, frames: 8, speed: 8 },
        walk: { row: 1, frames: 8, speed: 10 },
        run: { row: 2, frames: 8, speed: 12 },
        attack: { row: 3, frames: 8, speed: 12 },
        hurt: { row: 4, frames: 4, speed: 8 },
        die: { row: 5, frames: 8, speed: 8 },
        jump: { row: 6, frames: 8, speed: 10 }
    }
};

// ==========================================
// 音頻管理器
// ==========================================
class AudioManager {
    constructor() {
        this.initialized = false;
        this.sounds = {};
        this.currentBGM = null;
        this.masterVolume = 0.5;
        this.sfxVolume = 0.6;
        this.bgmVolume = 0.4;
        this.audioContext = null;
    }

    init() {
        if (this.initialized) return;
        
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.initialized = true;
        } catch (e) {
            console.warn('Web Audio API not supported');
        }
    }

    playShootSound() {
        if (!this.initialized) return;
        this.playTone(800, 0.05, 'square', 0.1);
    }

    playExplosionSound() {
        if (!this.initialized) return;
        this.playNoise(0.15, 0.3);
    }

    playHurtSound() {
        if (!this.initialized) return;
        this.playTone(200, 0.2, 'sawtooth', 0.2);
    }

    playPowerUpSound() {
        if (!this.initialized) return;
        this.playTone(600, 0.1, 'sine', 0.2);
        setTimeout(() => this.playTone(800, 0.1, 'sine', 0.2), 100);
        setTimeout(() => this.playTone(1000, 0.2, 'sine', 0.2), 200);
    }

    playBossWarning() {
        if (!this.initialized) return;
        this.playTone(300, 0.5, 'sawtooth', 0.3);
        setTimeout(() => this.playTone(250, 0.5, 'sawtooth', 0.3), 400);
    }

    playVictorySound() {
        if (!this.initialized) return;
        [523, 659, 784, 1047].forEach((freq, i) => {
            setTimeout(() => this.playTone(freq, 0.2, 'sine', 0.3), i * 150);
        });
    }

    startBGM(level) {
        if (!this.initialized) return;
        this.stopBGM();
        
        const theme = this.getBGMThemeForLevel(level);
        this.playProceduralBGM(theme);
    }

    stopBGM() {
        if (this.currentBGM) {
            this.currentBGM.forEach(osc => {
                try { osc.stop(); } catch (e) {}
            });
            this.currentBGM = null;
        }
    }

    playTone(frequency, duration, type = 'sine', volume = 0.3) {
        if (!this.audioContext) return;
        
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        
        osc.type = type;
        osc.frequency.value = frequency;
        gain.gain.value = volume * this.sfxVolume * this.masterVolume;
        
        osc.connect(gain);
        gain.connect(this.audioContext.destination);
        
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
        osc.stop(this.audioContext.currentTime + duration);
    }

    playNoise(duration, volume = 0.3) {
        if (!this.audioContext) return;
        
        const bufferSize = this.audioContext.sampleRate * duration;
        const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const output = buffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }
        
        const source = this.audioContext.createBufferSource();
        const gain = this.audioContext.createGain();
        
        source.buffer = buffer;
        gain.gain.value = volume * this.sfxVolume * this.masterVolume;
        
        source.connect(gain);
        gain.connect(this.audioContext.destination);
        
        source.start();
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
    }

    getBGMThemeForLevel(level) {
        const config = LEVEL_CONFIG[level];
        if (!config) return 'village';
        return config.theme || 'village';
    }

    playProceduralBGM(theme) {
        const melodies = {
            village: { tempo: 120, notes: [523, 587, 659, 784, 659, 587, 523, 440], type: 'sine' },
            boss: { tempo: 140, notes: [220, 196, 185, 175, 165, 147, 139, 131], type: 'sawtooth' },
            boss_big: { tempo: 160, notes: [131, 139, 147, 156, 165, 175, 185, 196], type: 'sawtooth' },
            boss_ultimate: { tempo: 180, notes: [65, 69, 73, 78, 82, 87, 92, 98], type: 'sawtooth' }
        };

        const melody = melodies[theme] || melodies.village;
        this.currentBGM = [];

        let currentTime = 0;
        const noteDuration = 60 / melody.tempo;

        melody.notes.forEach((freq, i) => {
            setTimeout(() => {
                if (!this.initialized) return;
                const osc = this.audioContext.createOscillator();
                const gain = this.audioContext.createGain();
                
                osc.type = melody.type;
                osc.frequency.value = freq;
                gain.gain.value = 0.1 * this.bgmVolume * this.masterVolume;
                
                osc.connect(gain);
                gain.connect(this.audioContext.destination);
                
                osc.start();
                osc.stop(this.audioContext.currentTime + noteDuration);
                
                if (this.currentBGM) this.currentBGM.push(osc);
            }, i * noteDuration * 1000);
        });
    }
}

const audioManager = new AudioManager();


// ==========================================
// 遊戲主場景
// ==========================================
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    init(data) {
        this.currentLevel = data.level || 1;
        this.score = data.score || 0;
        this.powerLevel = data.powerLevel || 1;
        this.playerMaxHealth = data.playerMaxHealth || GAME_CONFIG.playerHealth;
        this.playerHealth = data.playerHealth !== undefined ? data.playerHealth : this.playerMaxHealth;
        const baseMaxHp = GAME_CONFIG.playerHealth + (this.currentLevel - 1) * 10;
        if (this.playerMaxHealth < baseMaxHp) {
            const hpIncrease = baseMaxHp - this.playerMaxHealth;
            this.playerMaxHealth = baseMaxHp;
            this.playerHealth = Math.min(this.playerHealth + hpIncrease, this.playerMaxHealth);
        }
        this.energy = data.energy !== undefined ? data.energy : 50;
        this.maxEnergy = 100;
        this.lives = data.lives !== undefined ? data.lives : GAME_CONFIG.playerLives;
        this.consecutiveDeaths = data.consecutiveDeaths || 0;
        this.isGameOver = false;
        this.isPaused = false;
        
        this.exp = data.exp || 0;
        this.maxExp = data.maxExp || 100;
        this.playerLevel = data.playerLevel || 1;
        
        this.powerExp = data.powerExp || 0;
        this.maxPowerExp = 100;
        
        this.specialSkillCount = data.specialSkillCount || 0;
        this.specialSkillMaxCount = data.specialSkillMaxCount || 3;
        this.specialSkillTotalUsed = data.specialSkillTotalUsed || 0;
        this.specialSkillUnlockThreshold = data.specialSkillUnlockThreshold || 5;

        this.waveNumber = 1;
        this.totalWaves = this.getLevelWaveCount();
        this.enemiesKilled = 0;
        this.enemiesSpawned = 0;
        this.totalEnemies = this.getLevelEnemyCount();
    }

    create() {
        audioManager.init();
        audioManager.startBGM(this.currentLevel);

        this.createBackground();
        this.createPlayer();
        this.createGroups();
        this.setupControls();
        this.createUI();
        this.setupCollisions();
        this.startLevel();

        this.lastShotTime = 0;
        this.shotInterval = 200;
    }

    createBackground() {
        const levelConfig = LEVEL_CONFIG[this.currentLevel];
        let topColor, bottomColor;
        
        if (levelConfig && levelConfig.bgColors) {
            [topColor, bottomColor] = levelConfig.bgColors;
        } else {
            topColor = 0x1a1a3e;
            bottomColor = 0x2d2d5a;
        }

        const graphics = this.add.graphics();
        graphics.fillGradientStyle(topColor, bottomColor, topColor, bottomColor, 1);
        graphics.fillRect(0, 0, GAME_CONFIG.width, GAME_CONFIG.height);

        this.stars = [];
        for (let i = 0; i < 50; i++) {
            const star = this.add.circle(
                Math.random() * GAME_CONFIG.width,
                Math.random() * GAME_CONFIG.height,
                Math.random() * 2 + 1,
                0xffffff,
                0.8
            );
            star.speed = Math.random() * 0.5 + 0.1;
            this.stars.push(star);
        }
    }

    createPlayer() {
        this.player = this.physics.add.sprite(GAME_CONFIG.width / 2, GAME_CONFIG.height - 100, 'catSprite', 0);
        this.player.setCollideWorldBounds(true);
        this.player.setScale(1);
        this.player.play('cat_idle');
        this.player.invulnerable = false;
        this.player.speed = GAME_CONFIG.playerSpeed;
    }

    createGroups() {
        this.bullets = this.physics.add.group();
        this.enemies = this.physics.add.group();
        this.enemyBullets = this.physics.add.group();
        this.items = this.physics.add.group();
    }

    setupControls() {
        this.keys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE,
            up2: Phaser.Input.Keyboard.KeyCodes.UP,
            down2: Phaser.Input.Keyboard.KeyCodes.DOWN,
            left2: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right2: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            esc: Phaser.Input.Keyboard.KeyCodes.ESC
        });

        this.input.on('pointermove', (pointer) => {
            if (!this.player || this.isGameOver) return;
            if (pointer.x < this.player.x) {
                this.player.setFlipX(true);
            } else {
                this.player.setFlipX(false);
            }
        });

        this.input.on('pointerdown', (pointer) => {
            if (!this.isGameOver && !this.isPaused && pointer.leftButtonDown()) {
                this.fireBullet();
            }
        });
    }

    createUI() {
        this.uiContainer = this.add.container(0, 0);
        this.uiContainer.setDepth(1000);

        // HP
        const hpBg = this.add.rectangle(20, 35, 204, 24, 0x000000, 0.8);
        hpBg.setOrigin(0, 0.5);
        this.uiContainer.add(hpBg);

        this.hpBar = this.add.rectangle(22, 35, 200, 20, 0xff0000, 1);
        this.hpBar.setOrigin(0, 0.5);
        this.uiContainer.add(this.hpBar);

        this.hpText = this.add.text(120, 35, `${this.playerHealth}/${this.playerMaxHealth}`, {
            fontSize: '16px',
            fontFamily: 'Microsoft JhengHei',
            color: '#ffffff'
        }).setOrigin(0.5);
        this.uiContainer.add(this.hpText);

        // 能量條
        const energyBg = this.add.rectangle(250, 35, 204, 24, 0x000000, 0.8);
        energyBg.setOrigin(0, 0.5);
        this.uiContainer.add(energyBg);

        this.energyBar = this.add.rectangle(252, 35, 100, 20, 0x00aaff, 1);
        this.energyBar.setOrigin(0, 0.5);
        this.uiContainer.add(this.energyBar);

        // 分數
        this.scoreText = this.add.text(GAME_CONFIG.width - 20, 35, `分數: ${this.score}`, {
            fontSize: '24px',
            fontFamily: 'Microsoft JhengHei',
            fontStyle: 'bold',
            color: '#ffff00',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(1, 0.5);
        this.uiContainer.add(this.scoreText);

        // 殘機數
        this.livesText = this.add.text(20, 65, `❤ x ${this.lives}`, {
            fontSize: '20px',
            fontFamily: 'Microsoft JhengHei',
            fontStyle: 'bold',
            color: '#ff6688',
            stroke: '#000000',
            strokeThickness: 2
        });
        this.uiContainer.add(this.livesText);

        // 威力等級
        this.powerText = this.add.text(GAME_CONFIG.width - 20, 65, `威力 Lv.${this.powerLevel}`, {
            fontSize: '18px',
            fontFamily: 'Microsoft JhengHei',
            color: '#ff6600'
        }).setOrigin(1, 0.5);
        this.uiContainer.add(this.powerText);

        // 經驗值條
        const expBg = this.add.rectangle(20, 95, 204, 16, 0x000000, 0.8);
        expBg.setOrigin(0, 0.5);
        this.uiContainer.add(expBg);

        this.expBar = this.add.rectangle(22, 95, 0, 12, 0x00ff00, 1);
        this.expBar.setOrigin(0, 0.5);
        this.uiContainer.add(this.expBar);

        this.expText = this.add.text(120, 95, `LV.${this.playerLevel}`, {
            fontSize: '14px',
            fontFamily: 'Microsoft JhengHei',
            fontStyle: 'bold',
            color: '#00ff00',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);
        this.uiContainer.add(this.expText);

        // 威力值累積條
        const powerExpBg = this.add.rectangle(GAME_CONFIG.width - 20, 95, 150, 16, 0x000000, 0.8);
        powerExpBg.setOrigin(1, 0.5);
        this.uiContainer.add(powerExpBg);

        this.powerExpBar = this.add.rectangle(GAME_CONFIG.width - 170, 95, 0, 12, 0xff6600, 1);
        this.powerExpBar.setOrigin(0, 0.5);
        this.uiContainer.add(this.powerExpBar);

        this.powerExpText = this.add.text(GAME_CONFIG.width - 95, 95, `威力值`, {
            fontSize: '12px',
            fontFamily: 'Microsoft JhengHei',
            color: '#ffffff'
        }).setOrigin(0.5);
        this.uiContainer.add(this.powerExpText);

        // 必殺技次數顯示
        const skillBg = this.add.rectangle(20, 125, 40, 40, 0x330033, 0.9);
        skillBg.setOrigin(0, 0.5);
        skillBg.setStrokeStyle(2, 0xff00ff);
        this.uiContainer.add(skillBg);

        this.skillIcon = this.add.text(40, 125, '⚡', {
            fontSize: '24px'
        }).setOrigin(0.5);
        this.uiContainer.add(this.skillIcon);

        this.skillCountText = this.add.text(70, 125, `x ${this.specialSkillCount}/${this.specialSkillMaxCount}`, {
            fontSize: '20px',
            fontFamily: 'Microsoft JhengHei',
            fontStyle: 'bold',
            color: '#ff00ff',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0, 0.5);
        this.uiContainer.add(this.skillCountText);

        const skillProgressBg = this.add.rectangle(180, 125, 100, 12, 0x000000, 0.8);
        skillProgressBg.setOrigin(0, 0.5);
        this.uiContainer.add(skillProgressBg);

        const progressPercent = Math.min(this.specialSkillTotalUsed / this.specialSkillUnlockThreshold, 1);
        this.skillProgressBar = this.add.rectangle(182, 125, 96 * progressPercent, 8, 0xff00ff, 1);
        this.skillProgressBar.setOrigin(0, 0.5);
        this.uiContainer.add(this.skillProgressBar);

        // 波次信息
        this.waveText = this.add.text(GAME_CONFIG.width / 2, 35, `波次 ${this.waveNumber}/${this.totalWaves}`, {
            fontSize: '20px',
            fontFamily: 'Microsoft JhengHei',
            fontStyle: 'bold',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);
        this.uiContainer.add(this.waveText);
    }

    setupCollisions() {
        this.physics.add.overlap(this.bullets, this.enemies, (bullet, enemy) => {
            this.hitEnemy(enemy, bullet);
            bullet.destroy();
        });

        this.physics.add.overlap(this.player, this.enemyBullets, (player, bullet) => {
            if (!player.invulnerable) {
                this.hitPlayer(bullet.damage || 10);
                bullet.destroy();
                this.createExplosion(bullet.x, bullet.y, 0.5);
            }
        });

        this.physics.add.overlap(this.player, this.enemies, (player, enemy) => {
            if (!enemy.active) return;
            if (!player.invulnerable) {
                this.hitPlayer(20);
            }
        });

        this.physics.add.overlap(this.player, this.items, (player, item) => {
            this.collectItem(item);
        });
    }

    startLevel() {
        const levelConfig = LEVEL_CONFIG[this.currentLevel];
        if (levelConfig && levelConfig.bossType) {
            this.scene.start('BossScene', {
                level: this.currentLevel,
                score: this.score,
                powerLevel: this.powerLevel,
                lives: this.lives,
                consecutiveDeaths: this.consecutiveDeaths,
                energy: this.energy,
                powerExp: this.powerExp,
                exp: this.exp,
                maxExp: this.maxExp,
                playerLevel: this.playerLevel,
                playerHealth: this.playerHealth,
                playerMaxHealth: this.playerMaxHealth,
                specialSkillCount: this.specialSkillCount,
                specialSkillMaxCount: this.specialSkillMaxCount,
                specialSkillTotalUsed: this.specialSkillTotalUsed,
                specialSkillUnlockThreshold: this.specialSkillUnlockThreshold
            });
            return;
        }

        this.showLevelStartMessage();
        this.startWave();
    }

    showLevelStartMessage() {
        const levelConfig = LEVEL_CONFIG[this.currentLevel];
        const levelName = levelConfig ? levelConfig.name : `第 ${this.currentLevel} 關`;
        const baseMaxHp = GAME_CONFIG.playerHealth + (this.currentLevel - 1) * 10;
        const hasHpIncrease = this.playerMaxHealth >= baseMaxHp;

        const container = this.add.container(GAME_CONFIG.width / 2, GAME_CONFIG.height / 2);
        
        const bg = this.add.rectangle(0, 0, 500, hasHpIncrease ? 200 : 150, 0x000000, 0.8);
        bg.setStrokeStyle(3, 0xffa500);
        container.add(bg);

        const levelText = this.add.text(0, -40, `第 ${this.currentLevel} 關`, {
            fontSize: '48px',
            fontFamily: 'Microsoft JhengHei',
            fontStyle: 'bold',
            color: '#ffa500',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);
        container.add(levelText);

        const nameText = this.add.text(0, 10, levelName, {
            fontSize: '32px',
            fontFamily: 'Microsoft JhengHei',
            color: '#ffffff'
        }).setOrigin(0.5);
        container.add(nameText);

        if (hasHpIncrease) {
            const hpText = this.add.text(0, 60, `❤ HP 上限提升至 ${this.playerMaxHealth}!`, {
                fontSize: '24px',
                fontFamily: 'Microsoft JhengHei',
                color: '#00ff00'
            }).setOrigin(0.5);
            container.add(hpText);
        }

        container.setDepth(2000);

        this.tweens.add({
            targets: container,
            alpha: 0,
            duration: 1000,
            delay: 2000,
            onComplete: () => container.destroy()
        });
    }

    startWave() {
        if (this.waveNumber > this.totalWaves) {
            this.levelComplete();
            return;
        }

        this.waveText.setText(`波次 ${this.waveNumber}/${this.totalWaves}`);
        
        const enemiesInWave = Math.floor(this.totalEnemies / this.totalWaves);
        this.enemiesSpawned = 0;
        this.enemiesToSpawn = enemiesInWave;

        const levelConfig = LEVEL_CONFIG[this.currentLevel];
        const spawnRate = levelConfig ? levelConfig.spawnRate : 2000;

        this.spawnTimer = this.time.addEvent({
            delay: spawnRate,
            callback: () => this.spawnEnemy(),
            repeat: enemiesInWave - 1
        });
    }

    spawnEnemy() {
        if (this.isGameOver || this.enemiesSpawned >= this.enemiesToSpawn) return;

        const enemyTypes = this.getAvailableEnemyTypes();
        const enemyType = Phaser.Utils.Array.GetRandom(enemyTypes);
        
        const x = Phaser.Math.Between(50, GAME_CONFIG.width - 50);
        const y = -50;

        const enemy = this.enemies.create(x, y, enemyType);
        this.setupEnemy(enemy, enemyType);

        this.enemiesSpawned++;
    }

    getAvailableEnemyTypes() {
        const levelConfig = LEVEL_CONFIG[this.currentLevel];
        if (levelConfig && levelConfig.enemies && levelConfig.enemies.length > 0) {
            return levelConfig.enemies;
        }
        return ['enemy_rat'];
    }

    setupEnemy(enemy, type) {
        enemy.setOrigin(0.5);
        enemy.setScale(1);
        
        const configs = {
            'enemy_rat': { health: 30, speed: 100, score: 50, exp: 10 },
            'enemy_bird': { health: 20, speed: 150, score: 60, exp: 15 },
            'enemy_dog': { health: 60, speed: 80, score: 100, exp: 20 },
            'enemy_pig': { health: 100, speed: 60, score: 150, exp: 30 }
        };

        const config = configs[type] || configs['enemy_rat'];
        const levelMultiplier = 1 + (this.currentLevel - 1) * 0.1;
        
        enemy.health = Math.floor(config.health * levelMultiplier);
        enemy.maxHealth = enemy.health;
        enemy.scoreValue = config.score;
        enemy.expValue = config.exp;
        enemy.speed = config.speed;
        enemy.enemyType = type;

        enemy.setVelocityY(enemy.speed);
        enemy.setAngularVelocity(Phaser.Math.Between(-50, 50));
    }

    hitEnemy(enemy, bullet) {
        if (!enemy.active) return;

        const dmg = this.powerLevel * 10 + 10;
        enemy.health -= dmg;

        audioManager.playExplosionSound();

        this.tweens.add({
            targets: enemy,
            alpha: 0.5,
            duration: 50,
            yoyo: true,
            repeat: 2
        });

        this.showDamageNumber(enemy.x, enemy.y - 30, dmg);
        this.createExplosion(bullet.x, bullet.y, 0.3);

        this.addExp(Math.floor(dmg / 10));
        this.addPowerExp(2);

        if (enemy.health <= 0) {
            this.defeatEnemy(enemy);
        }
    }

    defeatEnemy(enemy) {
        this.createExplosion(enemy.x, enemy.y, 0.8);
        
        this.score += enemy.scoreValue;
        this.enemiesKilled++;

        this.spawnItem(enemy.x, enemy.y);

        enemy.destroy();
        this.updateUI();

        this.checkWaveComplete();
    }

    spawnItem(x, y) {
        const rand = Math.random();
        let itemType = null;

        if (rand < 0.15) {
            itemType = 'heart';
        } else if (rand < 0.40) {
            itemType = 'star';
        } else if (rand < 0.70) {
            itemType = 'fish';
        }

        if (itemType) {
            const item = this.items.create(x, y, itemType);
            item.itemType = itemType;
            item.setVelocity(0, 50);
        }
    }

    collectItem(item) {
        switch(item.itemType) {
            case 'fish':
                this.score += 50;
                this.addEnergy(10);
                break;
            case 'heart':
                this.healPlayer(20);
                break;
            case 'star':
                this.addPowerExp(30);
                break;
        }
        item.destroy();
        this.updateUI();
    }

    checkWaveComplete() {
        const activeEnemies = this.enemies.countActive();
        
        if (this.enemiesSpawned >= this.enemiesToSpawn && activeEnemies === 0) {
            this.waveNumber++;
            if (this.waveNumber <= this.totalWaves) {
                this.time.delayedCall(2000, () => {
                    this.startWave();
                });
            } else {
                this.levelComplete();
            }
        }
    }

    levelComplete() {
        this.physics.pause();

        audioManager.playVictorySound();

        const overlay = this.add.rectangle(0, 0, GAME_CONFIG.width, GAME_CONFIG.height, 0x000000, 0.7).setOrigin(0);
        overlay.setDepth(4000);

        const container = this.add.container(GAME_CONFIG.width / 2, GAME_CONFIG.height / 2);
        container.setDepth(4001);

        const victoryText = this.add.text(0, -50, '關卡完成！', {
            fontSize: '56px',
            fontFamily: 'Microsoft JhengHei',
            fontStyle: 'bold',
            color: '#00ff00',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);

        const scoreText = this.add.text(0, 30, `當前分數: ${this.score}`, {
            fontSize: '32px',
            fontFamily: 'Microsoft JhengHei',
            color: '#ffff00'
        }).setOrigin(0.5);

        container.add([victoryText, scoreText]);

        this.consecutiveDeaths = 0;

        const passData = {
            level: this.currentLevel + 1,
            score: this.score,
            powerLevel: this.powerLevel,
            lives: this.lives,
            consecutiveDeaths: 0,
            energy: this.energy,
            powerExp: this.powerExp,
            exp: this.exp,
            maxExp: this.maxExp,
            playerLevel: this.playerLevel,
            playerHealth: this.playerHealth,
            playerMaxHealth: this.playerMaxHealth,
            specialSkillCount: this.specialSkillCount,
            specialSkillMaxCount: this.specialSkillMaxCount,
            specialSkillTotalUsed: this.specialSkillTotalUsed,
            specialSkillUnlockThreshold: this.specialSkillUnlockThreshold
        };

        this.time.delayedCall(3000, () => {
            const nextLevelConfig = LEVEL_CONFIG[this.currentLevel + 1];
            const isNextLevelBoss = nextLevelConfig && nextLevelConfig.bossType;
            
            if (this.currentLevel >= GAME_CONFIG.totalLevels) {
                this.scene.start('VictoryScene', { score: this.score });
            } else if (isNextLevelBoss) {
                this.scene.start('BossScene', passData);
            } else {
                this.scene.start('GameScene', passData);
            }
        });
    }

    hitPlayer(damage) {
        this.playerHealth -= damage;
        this.player.invulnerable = true;

        audioManager.playHurtSound();
        this.player.play('cat_hurt');

        this.tweens.add({
            targets: this.player,
            alpha: 0,
            duration: 100,
            yoyo: true,
            repeat: 5,
            onComplete: () => {
                this.player.alpha = 1;
                this.player.invulnerable = false;
                this.player.play('cat_idle');
            }
        });

        this.cameras.main.shake(200, 0.01);
        this.createExplosion(this.player.x, this.player.y, 0.8);

        if (this.playerHealth <= 0) {
            this.lives--;
            if (this.livesText) this.livesText.setText(`❤ x ${this.lives}`);
            if (this.lives <= 0) {
                this.gameOver();
            } else {
                this.playerHealth = this.playerMaxHealth;
                this.player.invulnerable = true;
                this.showFloatingText(this.player.x, this.player.y - 50, `殘機 x ${this.lives}`, '#ff6688');
                this.consecutiveDeaths++;

                if (this.consecutiveDeaths >= 2) {
                    this.powerLevel = 1;
                    if (this.powerText) this.powerText.setText(`威力 Lv.${this.powerLevel}`);
                    this.showFloatingText(this.player.x, this.player.y - 80, '威力重置！', '#ff0000');
                    this.consecutiveDeaths = 0;
                }

                this.time.delayedCall(2000, () => {
                    if (this.player && this.player.active) {
                        this.player.invulnerable = false;
                        this.player.play('cat_idle');
                    }
                });
            }
        } else {
            this.consecutiveDeaths = 0;
        }

        this.updateUI();
    }

    gameOver() {
        this.isGameOver = true;
        this.physics.pause();
        if (this.spawnTimer) this.spawnTimer.remove();

        audioManager.stopBGM();

        this.player.play('cat_die');

        const overlay = this.add.rectangle(0, 0, GAME_CONFIG.width, GAME_CONFIG.height, 0x000000, 0.8).setOrigin(0);
        overlay.setDepth(5000);

        const container = this.add.container(GAME_CONFIG.width / 2, GAME_CONFIG.height / 2);
        container.setDepth(5001);

        const gameOverText = this.add.text(0, -80, '遊戲結束', {
            fontSize: '72px',
            fontFamily: 'Microsoft JhengHei',
            fontStyle: 'bold',
            color: '#ff0000',
            stroke: '#000000',
            strokeThickness: 5
        }).setOrigin(0.5);

        const scoreText = this.add.text(0, 30, `最終分數: ${this.score}`, {
            fontSize: '32px',
            fontFamily: 'Microsoft JhengHei',
            color: '#ffff00'
        }).setOrigin(0.5);

        const restartText = this.add.text(0, 100, '點擊重新開始', {
            fontSize: '28px',
            fontFamily: 'Microsoft JhengHei',
            color: '#ffa500'
        }).setOrigin(0.5);

        container.add([gameOverText, scoreText, restartText]);

        this.tweens.add({
            targets: restartText,
            alpha: 0.3,
            duration: 500,
            yoyo: true,
            repeat: -1
        });

        this.input.on('pointerdown', () => {
            this.scene.start('GameScene', {
                level: this.currentLevel,
                score: 0,
                lives: GAME_CONFIG.playerLives,
                powerLevel: this.consecutiveDeaths >= 2 ? 1 : this.powerLevel,
                consecutiveDeaths: this.consecutiveDeaths,
                playerHealth: undefined,
                playerMaxHealth: undefined,
                specialSkillCount: 0,
                specialSkillMaxCount: 3,
                specialSkillTotalUsed: 0,
                specialSkillUnlockThreshold: 5
            });
        });
    }

    healPlayer(amount) {
        this.playerHealth = Math.min(this.playerHealth + amount, this.playerMaxHealth);
        this.updateUI();
    }

    addEnergy(amount) {
        this.energy += amount;
        
        while (this.energy >= this.maxEnergy) {
            this.energy -= this.maxEnergy;
            
            if (this.specialSkillCount < this.specialSkillMaxCount) {
                this.specialSkillCount++;
                this.showFloatingText(this.player.x, this.player.y - 80, '必殺技 +1!', '#ff00ff');
            } else {
                this.score += 500;
                this.showFloatingText(this.player.x, this.player.y - 80, '能量溢出 +500分!', '#ffff00');
            }
        }
        
        this.updateUI();
    }

    addExp(amount) {
        this.exp += amount;
        while (this.exp >= this.maxExp) {
            this.exp -= this.maxExp;
            this.playerLevel++;
            this.maxExp = Math.floor(this.maxExp * 1.2);
            this.playerMaxHealth += 10;
            this.playerHealth = this.playerMaxHealth;
            this.showLevelUpEffect();
        }
    }

    addPowerExp(amount) {
        if (this.powerLevel >= 5) return;
        
        this.powerExp += amount;
        if (this.powerExp >= this.maxPowerExp) {
            this.powerExp = 0;
            this.powerLevel = Math.min(this.powerLevel + 1, 5);
            this.powerText.setText(`威力 Lv.${this.powerLevel}`);
            this.showFloatingText(this.player.x, this.player.y - 80, '威力升級!', '#ff6600');
            audioManager.playPowerUpSound();
        }
    }

    showLevelUpEffect() {
        const levelUpText = this.add.text(this.player.x, this.player.y - 100, `★ 等級提升! LV.${this.playerLevel} ★`, {
            fontSize: '32px',
            fontFamily: 'Microsoft JhengHei',
            fontStyle: 'bold',
            color: '#00ff00',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);

        this.tweens.add({
            targets: levelUpText,
            y: levelUpText.y - 80,
            scale: 1.3,
            alpha: 0,
            duration: 1500,
            ease: 'Power2',
            onComplete: () => levelUpText.destroy()
        });

        const ring = this.add.circle(this.player.x, this.player.y, 50, 0x00ff00, 0.5);
        this.tweens.add({
            targets: ring,
            scale: 3,
            alpha: 0,
            duration: 800,
            onComplete: () => ring.destroy()
        });

        audioManager.playPowerUpSound();
    }

    showDamageNumber(x, y, damage) {
        const text = this.add.text(x, y, damage.toString(), {
            fontSize: '24px',
            fontFamily: 'Arial',
            fontStyle: 'bold',
            color: '#ffffff',
            stroke: '#ff0000',
            strokeThickness: 2
        }).setOrigin(0.5);

        this.tweens.add({
            targets: text,
            y: y - 60,
            alpha: 0,
            duration: 800,
            onComplete: () => text.destroy()
        });
    }

    showFloatingText(x, y, text, color) {
        const txt = this.add.text(x, y, text, {
            fontSize: '24px',
            fontFamily: 'Microsoft JhengHei',
            fontStyle: 'bold',
            color: color,
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);

        this.tweens.add({
            targets: txt,
            y: y - 60,
            scale: 1.2,
            alpha: 0,
            duration: 1000,
            onComplete: () => txt.destroy()
        });
    }

    createExplosion(x, y, scale = 1) {
        const colors = [0xff4400, 0xffaa00, 0xffff00, 0xff6600];
        
        for (let i = 0; i < 10 * scale; i++) {
            const angle = (Math.PI * 2 * i) / (10 * scale);
            const speed = 100 + Math.random() * 150;
            const color = Phaser.Utils.Array.GetRandom(colors);
            
            const particle = this.add.circle(x, y, 5 * scale, color, 0.8);
            
            this.tweens.add({
                targets: particle,
                x: x + Math.cos(angle) * speed,
                y: y + Math.sin(angle) * speed,
                scale: 0,
                alpha: 0,
                duration: 500 + Math.random() * 300,
                onComplete: () => particle.destroy()
            });
        }

        const flash = this.add.circle(x, y, 20 * scale, 0xffffff, 1);
        this.tweens.add({
            targets: flash,
            scale: 2 * scale,
            alpha: 0,
            duration: 200,
            onComplete: () => flash.destroy()
        });
    }

    fireBullet() {
        const now = this.time.now;
        if (now - this.lastShotTime < this.shotInterval) return;
        this.lastShotTime = now;

        audioManager.playShootSound();
        this.player.play('cat_attack');
        this.time.delayedCall(300, () => {
            if (!this.isGameOver) this.player.play('cat_idle');
        });

        const bulletCount = Math.min(this.powerLevel, 5);
        const spreadAngle = 15;

        for (let i = 0; i < bulletCount; i++) {
            const angle = (i - (bulletCount - 1) / 2) * spreadAngle;
            this.createBullet(angle);
        }
    }

    createBullet(angleOffset = 0) {
        const bullet = this.bullets.create(this.player.x, this.player.y - 30, 'bullet');
        bullet.setScale(1 + this.powerLevel * 0.2);

        const pointer = this.input.activePointer;
        const angle = Phaser.Math.Angle.Between(
            this.player.x, this.player.y,
            pointer.x, pointer.y
        ) + Phaser.Math.DegToRad(angleOffset);

        const speed = 600;
        bullet.setVelocity(
            Math.cos(angle) * speed,
            Math.sin(angle) * speed
        );
    }

    updateUI() {
        const hpPercent = this.playerHealth / this.playerMaxHealth;
        this.hpBar.width = 200 * hpPercent;
        this.hpBar.setFillStyle(hpPercent > 0.5 ? 0x00ff00 : hpPercent > 0.25 ? 0xffff00 : 0xff0000);
        this.hpText.setText(`${Math.ceil(this.playerHealth)}/${this.playerMaxHealth}`);

        const energyPercent = this.energy / this.maxEnergy;
        this.energyBar.width = 200 * energyPercent;
        this.energyBar.setFillStyle(energyPercent >= 1 ? 0xff00ff : 0x00aaff);

        this.scoreText.setText(`分數: ${this.score}`);

        const expPercent = Math.min(this.exp / this.maxExp, 1);
        this.expBar.width = 200 * expPercent;
        this.expText.setText(`LV.${this.playerLevel}`);

        const powerExpPercent = Math.min(this.powerExp / this.maxPowerExp, 1);
        this.powerExpBar.width = 146 * powerExpPercent;

        if (this.skillCountText) {
            this.skillCountText.setText(`x ${this.specialSkillCount}/${this.specialSkillMaxCount}`);
            if (this.specialSkillCount >= this.specialSkillMaxCount) {
                this.skillCountText.setColor('#00ff00');
            } else if (this.specialSkillCount > 0) {
                this.skillCountText.setColor('#ff00ff');
            } else {
                this.skillCountText.setColor('#666666');
            }
        }
        
        if (this.skillProgressBar) {
            const progressPercent = Math.min(this.specialSkillTotalUsed / this.specialSkillUnlockThreshold, 1);
            this.skillProgressBar.width = 96 * progressPercent;
        }
    }

    useSpecialSkill() {
        if (this.specialSkillCount <= 0) {
            this.showFloatingText(this.player.x, this.player.y - 50, '必殺技不足!', '#ff6666');
            return;
        }

        this.specialSkillCount--;
        this.specialSkillTotalUsed++;
        
        if (this.specialSkillTotalUsed >= this.specialSkillUnlockThreshold) {
            this.specialSkillTotalUsed = 0;
            if (this.specialSkillMaxCount < 9) {
                this.specialSkillMaxCount++;
                this.specialSkillUnlockThreshold = Math.floor(this.specialSkillUnlockThreshold * 1.5);
                this.showFloatingText(this.player.x, this.player.y - 100, `必殺技上限+1! 最大${this.specialSkillMaxCount}`, '#ff00ff');
            }
        }
        
        this.updateUI();

        this.cameras.main.flash(500, 255, 255, 255);
        
        const wave = this.add.circle(this.player.x, this.player.y, 50, 0xffff00, 0.5);
        
        this.tweens.add({
            targets: wave,
            scale: 10,
            alpha: 0,
            duration: 1000,
            onComplete: () => wave.destroy()
        });

        this.enemies.children.entries.forEach(enemy => {
            if (enemy.active) {
                enemy.health -= 50;
                if (enemy.health <= 0) {
                    this.defeatEnemy(enemy);
                }
            }
        });

        this.enemyBullets.clear(true, true);
        this.showFloatingText(this.player.x, this.player.y - 50, '必殺技！', '#ffff00');
        audioManager.playExplosionSound();

        this.activateShield(10000);
    }

    activateShield(duration) {
        this.player.invulnerable = true;
        this.player.setTint(0x00ffff);

        if (this.shieldCircle) this.shieldCircle.destroy();
        this.shieldCircle = this.add.circle(this.player.x, this.player.y, 60, 0x00ffff, 0.2);
        this.shieldCircle.setStrokeStyle(2, 0x00ffff, 0.8);

        this.shieldFollowEvent = this.time.addEvent({
            delay: 16,
            callback: () => {
                if (this.shieldCircle && this.player.active) {
                    this.shieldCircle.setPosition(this.player.x, this.player.y);
                }
            },
            loop: true
        });

        this.tweens.add({
            targets: this.shieldCircle,
            alpha: 0.1,
            duration: 500,
            yoyo: true,
            repeat: -1
        });

        this.showFloatingText(this.player.x, this.player.y - 80, '無敵 10秒！', '#00ffff');

        if (this.shieldTimer) this.shieldTimer.destroy();
        this.shieldTimer = this.time.delayedCall(duration, () => {
            this.player.invulnerable = false;
            this.player.clearTint();
            if (this.shieldCircle) {
                this.shieldCircle.destroy();
                this.shieldCircle = null;
            }
            if (this.shieldFollowEvent) {
                this.shieldFollowEvent.destroy();
                this.shieldFollowEvent = null;
            }
            this.showFloatingText(this.player.x, this.player.y - 50, '無敵結束', '#ff6666');
        });
    }

    getLevelEnemyCount() {
        return 5 + this.currentLevel * 3;
    }

    getLevelWaveCount() {
        return 2 + Math.floor(this.currentLevel / 3);
    }

    update(time, delta) {
        if (this.isGameOver) return;

        this.handlePlayerMovement(delta);

        if (Phaser.Input.Keyboard.JustDown(this.keys.space)) {
            this.useSpecialSkill();
        }

        if (Phaser.Input.Keyboard.JustDown(this.keys.esc)) {
            this.togglePause();
        }

        this.stars.forEach(star => {
            star.y += star.speed;
            if (star.y > GAME_CONFIG.height) {
                star.y = 0;
                star.x = Math.random() * GAME_CONFIG.width;
            }
        });

        this.cleanupObjects();
    }

    handlePlayerMovement(delta) {
        let vx = 0;
        let vy = 0;

        if (this.keys.left.isDown || this.keys.left2.isDown) vx = -1;
        if (this.keys.right.isDown || this.keys.right2.isDown) vx = 1;
        if (this.keys.up.isDown || this.keys.up2.isDown) vy = -1;
        if (this.keys.down.isDown || this.keys.down2.isDown) vy = 1;

        if (vx !== 0 || vy !== 0) {
            const len = Math.sqrt(vx * vx + vy * vy);
            vx /= len;
            vy /= len;

            this.player.setVelocity(vx * this.player.speed, vy * this.player.speed);

            if (Math.abs(vx) > 0.5) {
                this.player.setFlipX(vx < 0);
            }

            if (!this.player.anims.isPlaying || this.player.anims.currentAnim.key !== 'cat_run') {
                this.player.play('cat_run');
            }
        } else {
            this.player.setVelocity(0, 0);
            if (!this.player.anims.isPlaying || this.player.anims.currentAnim.key !== 'cat_idle') {
                this.player.play('cat_idle');
            }
        }
    }

    togglePause() {
        if (this.isGameOver) return;
        
        this.isPaused = !this.isPaused;
        
        if (this.isPaused) {
            this.physics.pause();
            this.showPauseMenu();
        } else {
            this.physics.resume();
            this.hidePauseMenu();
        }
    }

    showPauseMenu() {
        this.pauseOverlay = this.add.rectangle(0, 0, GAME_CONFIG.width, GAME_CONFIG.height, 0x000000, 0.7).setOrigin(0);
        this.pauseOverlay.setDepth(5000);

        this.pauseText = this.add.text(GAME_CONFIG.width / 2, GAME_CONFIG.height / 2 - 100, '遊戲暫停', {
            fontSize: '48px',
            fontFamily: 'Microsoft JhengHei',
            fontStyle: 'bold',
            color: '#ffffff'
        }).setOrigin(0.5);
        this.pauseText.setDepth(5001);

        this.resumeBtn = this.add.text(GAME_CONFIG.width / 2, GAME_CONFIG.height / 2, '繼續遊戲', {
            fontSize: '32px',
            fontFamily: 'Microsoft JhengHei',
            color: '#00ff00'
        }).setOrigin(0.5).setInteractive();
        this.resumeBtn.setDepth(5001);
        this.resumeBtn.on('pointerdown', () => this.togglePause());

        this.menuBtn = this.add.text(GAME_CONFIG.width / 2, GAME_CONFIG.height / 2 + 80, '返回主選單', {
            fontSize: '32px',
            fontFamily: 'Microsoft JhengHei',
            color: '#ffa500'
        }).setOrigin(0.5).setInteractive();
        this.menuBtn.setDepth(5001);
        this.menuBtn.on('pointerdown', () => {
            this.scene.start('MenuScene');
        });
    }

    hidePauseMenu() {
        if (this.pauseOverlay) this.pauseOverlay.destroy();
        if (this.pauseText) this.pauseText.destroy();
        if (this.resumeBtn) this.resumeBtn.destroy();
        if (this.menuBtn) this.menuBtn.destroy();
    }

    cleanupObjects() {
        this.bullets.children.entries.forEach(bullet => {
            if (bullet.y < -50 || bullet.y > GAME_CONFIG.height + 50 ||
                bullet.x < -50 || bullet.x > GAME_CONFIG.width + 50) {
                bullet.destroy();
            }
        });

        this.enemyBullets.children.entries.forEach(bullet => {
            if (bullet.y < -50 || bullet.y > GAME_CONFIG.height + 50 ||
                bullet.x < -50 || bullet.x > GAME_CONFIG.width + 50) {
                bullet.destroy();
            }
        });

        this.enemies.children.entries.forEach(enemy => {
            if (enemy.y > GAME_CONFIG.height + 100) {
                enemy.destroy();
                this.checkWaveComplete();
            }
        });

        this.items.children.entries.forEach(item => {
            if (item.y > GAME_CONFIG.height + 50) {
                item.destroy();
            }
        });
    }
}


// ==========================================
// BOSS戰場景 - 分階段BOSS戰系統
// ==========================================
class BossScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BossScene' });
    }

    init(data) {
        this.currentLevel = data.level || 1;
        this.score = data.score || 0;
        this.powerLevel = data.powerLevel || 1;
        this.playerMaxHealth = data.playerMaxHealth || GAME_CONFIG.playerHealth;
        this.playerHealth = data.playerHealth !== undefined ? data.playerHealth : this.playerMaxHealth;
        const baseMaxHp = GAME_CONFIG.playerHealth + (this.currentLevel - 1) * 10;
        if (this.playerMaxHealth < baseMaxHp) {
            const hpIncrease = baseMaxHp - this.playerMaxHealth;
            this.playerMaxHealth = baseMaxHp;
            this.playerHealth = Math.min(this.playerHealth + hpIncrease, this.playerMaxHealth);
        }
        this.energy = data.energy !== undefined ? data.energy : 50;
        this.maxEnergy = 100;
        this.lives = data.lives !== undefined ? data.lives : GAME_CONFIG.playerLives;
        this.consecutiveDeaths = data.consecutiveDeaths || 0;
        this.isGameOver = false;
        
        this.exp = data.exp || 0;
        this.maxExp = data.maxExp || 100;
        this.playerLevel = data.playerLevel || 1;
        
        this.powerExp = data.powerExp || 0;
        this.maxPowerExp = 100;
        
        this.specialSkillCount = data.specialSkillCount || 0;
        this.specialSkillMaxCount = data.specialSkillMaxCount || 3;
        this.specialSkillTotalUsed = data.specialSkillTotalUsed || 0;
        this.specialSkillUnlockThreshold = data.specialSkillUnlockThreshold || 5;

        // ========== 分階段戰鬥系統 ==========
        this.currentPhaseIndex = 0;
        this.phases = [];
        this.currentPhase = null;
        this.phaseEnemies = null;
        this.minionWavesRemaining = 0;
        this.currentWave = 0;
        this.phaseComplete = false;
        this.bossDefeated = false;
    }

    create() {
        audioManager.init();
        audioManager.playBossWarning();
        audioManager.startBGM(this.currentLevel);

        this.createBossBackground();
        this.createPlayer();

        this.bullets = this.physics.add.group();
        this.enemyBullets = this.physics.add.group();
        this.items = this.physics.add.group();
        this.phaseEnemies = this.physics.add.group();

        this.setupControls();
        this.createUI();
        this.setupCollisions();
        this.initializePhases();

        this.lastShotTime = 0;
        this.shotInterval = 200;
    }

    // ========== 分階段系統初始化 ==========
    initializePhases() {
        const levelConfig = LEVEL_CONFIG[this.currentLevel];
        
        if (levelConfig && levelConfig.phases && levelConfig.phases.length > 0) {
            this.phases = levelConfig.phases;
        } else {
            this.phases = [{
                type: 'boss',
                key: levelConfig?.bossKey || 'boss_fox',
                name: levelConfig?.bossName || 'BOSS',
                health: levelConfig?.bossHealth || 500,
                scale: 2
            }];
        }

        this.currentPhaseIndex = 0;
        this.startPhase();
    }

    // ========== 開始新階段 ==========
    startPhase() {
        if (this.currentPhaseIndex >= this.phases.length) {
            this.levelComplete();
            return;
        }

        this.currentPhase = this.phases[this.currentPhaseIndex];
        this.phaseComplete = false;

        this.showPhaseAnnouncement();

        this.time.delayedCall(2000, () => {
            switch (this.currentPhase.type) {
                case 'minions':
                    this.startMinionPhase();
                    break;
                case 'elite':
                    this.startElitePhase();
                    break;
                case 'miniboss':
                case 'midboss':
                case 'boss':
                    this.startBossPhase();
                    break;
                default:
                    this.startMinionPhase();
            }
        });
    }

    // ========== 顯示階段開始提示 ==========
    showPhaseAnnouncement() {
        const phaseNames = {
            'minions': '小怪波次',
            'elite': '精英來襲',
            'miniboss': '小BOSS戰',
            'midboss': '中BOSS戰',
            'boss': '最終決戰'
        };

        const phaseTypeName = phaseNames[this.currentPhase.type] || '未知階段';
        const phaseName = this.currentPhase.name || phaseTypeName;
        const phaseNum = this.currentPhaseIndex + 1;
        const totalPhases = this.phases.length;

        const overlay = this.add.rectangle(0, 0, GAME_CONFIG.width, GAME_CONFIG.height, 0x000000, 0.5).setOrigin(0);
        overlay.setDepth(3000);

        const titleText = this.add.text(GAME_CONFIG.width / 2, GAME_CONFIG.height / 2 - 60, 
            `第 ${phaseNum}/${totalPhases} 階段`, {
            fontSize: '36px',
            fontFamily: 'Microsoft JhengHei',
            fontStyle: 'bold',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5);
        titleText.setDepth(3001);

        const nameText = this.add.text(GAME_CONFIG.width / 2, GAME_CONFIG.height / 2, 
            phaseName, {
            fontSize: '48px',
            fontFamily: 'Microsoft JhengHei',
            fontStyle: 'bold',
            color: this.getPhaseColor(this.currentPhase.type),
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);
        nameText.setDepth(3001);

        const descText = this.add.text(GAME_CONFIG.width / 2, GAME_CONFIG.height / 2 + 60, 
            this.getPhaseDescription(this.currentPhase), {
            fontSize: '24px',
            fontFamily: 'Microsoft JhengHei',
            color: '#cccccc',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);
        descText.setDepth(3001);

        this.tweens.add({
            targets: [titleText, nameText, descText],
            scale: { from: 0.5, to: 1 },
            alpha: { from: 0, to: 1 },
            duration: 500,
            ease: 'Back.out'
        });

        this.time.delayedCall(2000, () => {
            this.tweens.add({
                targets: [overlay, titleText, nameText, descText],
                alpha: 0,
                duration: 500,
                onComplete: () => {
                    overlay.destroy();
                    titleText.destroy();
                    nameText.destroy();
                    descText.destroy();
                }
            });
        });
    }

    getPhaseColor(type) {
        const colors = {
            'minions': '#00ff00',
            'elite': '#ffaa00',
            'miniboss': '#ff6600',
            'midboss': '#ff3366',
            'boss': '#ff0000'
        };
        return colors[type] || '#ffffff';
    }

    getPhaseDescription(phase) {
        switch (phase.type) {
            case 'minions':
                return `擊退 ${phase.waves || 1} 波 ${phase.name || '小怪'}`;
            case 'elite':
                return `擊敗 ${phase.count || 1} 只 ${phase.name || '精英怪'}`;
            case 'miniboss':
                return `小BOSS: ${phase.name || '未知'}`;
            case 'midboss':
                return `中BOSS: ${phase.name || '未知'}`;
            case 'boss':
                return `最終BOSS: ${phase.name || '未知'}`;
            default:
                return '';
        }
    }

    startMinionPhase() {
        this.minionWavesRemaining = this.currentPhase.waves || 1;
        this.currentWave = 0;
        this.spawnMinionWave();
    }

    spawnMinionWave() {
        if (this.minionWavesRemaining <= 0 || this.phaseComplete) return;

        this.currentWave++;
        const count = this.currentPhase.count || 5;
        const enemyTypes = this.currentPhase.enemies || ['enemy_rat'];

        this.showFloatingText(
            GAME_CONFIG.width / 2, 
            150, 
            `第 ${this.currentWave}/${this.currentPhase.waves || 1} 波來襲!`, 
            '#00ff00'
        );

        for (let i = 0; i < count; i++) {
            this.time.delayedCall(i * 300, () => {
                if (this.phaseComplete) return;
                const enemyType = Phaser.Utils.Array.GetRandom(enemyTypes);
                this.spawnMinion(enemyType);
            });
        }

        this.minionWavesRemaining--;

        if (this.minionWavesRemaining > 0) {
            this.time.delayedCall(8000, () => {
                if (!this.phaseComplete) {
                    this.spawnMinionWave();
                }
            });
        }
    }

    spawnMinion(enemyType) {
        const x = Phaser.Math.Between(50, GAME_CONFIG.width - 50);
        const y = -50;

        const enemy = this.phaseEnemies.create(x, y, enemyType);
        enemy.setOrigin(0.5);
        enemy.setScale(0.8);
        
        enemy.health = 30;
        enemy.maxHealth = 30;
        enemy.scoreValue = 50;
        enemy.expValue = 10;
        enemy.isMinion = true;

        const speedX = Phaser.Math.Between(-50, 50);
        const speedY = Phaser.Math.Between(80, 150);
        enemy.setVelocity(speedX, speedY);

        enemy.setCollideWorldBounds(true);
        enemy.body.onWorldBounds = true;
    }

    startElitePhase() {
        const count = this.currentPhase.count || 2;
        const enemyTypes = this.currentPhase.enemies || ['enemy_dog'];

        for (let i = 0; i < count; i++) {
            this.time.delayedCall(i * 1000, () => {
                if (this.phaseComplete) return;
                const enemyType = enemyTypes[i % enemyTypes.length];
                this.spawnElite(enemyType);
            });
        }
    }

    spawnElite(enemyType) {
        const x = Phaser.Math.Between(100, GAME_CONFIG.width - 100);
        const y = 100;

        const enemy = this.phaseEnemies.create(x, y, enemyType);
        enemy.setOrigin(0.5);
        enemy.setScale(1.2);
        
        enemy.health = 100;
        enemy.maxHealth = 100;
        enemy.scoreValue = 200;
        enemy.expValue = 30;
        enemy.isElite = true;

        this.setupEliteMovement(enemy);

        enemy.attackTimer = this.time.addEvent({
            delay: 2000,
            callback: () => this.eliteAttack(enemy),
            loop: true
        });
    }

    setupEliteMovement(enemy) {
        const moveLeft = () => {
            if (!enemy.active) return;
            this.tweens.add({
                targets: enemy,
                x: Math.max(80, enemy.x - 150),
                duration: 2000,
                ease: 'Sine.easeInOut',
                onComplete: moveRight
            });
        };

        const moveRight = () => {
            if (!enemy.active) return;
            this.tweens.add({
                targets: enemy,
                x: Math.min(GAME_CONFIG.width - 80, enemy.x + 150),
                duration: 2000,
                ease: 'Sine.easeInOut',
                onComplete: moveLeft
            });
        };

        moveLeft();
    }

    eliteAttack(enemy) {
        if (!enemy.active || this.phaseComplete || this.isGameOver) return;

        const angle = Phaser.Math.Angle.Between(
            enemy.x, enemy.y,
            this.player.x, this.player.y
        );

        const bullet = this.enemyBullets.create(enemy.x, enemy.y + 30, 'enemyBullet');
        bullet.setScale(1.2);
        bullet.setVelocity(
            Math.cos(angle) * 200,
            Math.sin(angle) * 200
        );
        bullet.damage = 15;
    }

    startBossPhase() {
        this.spawnPhaseBoss();
    }

    spawnPhaseBoss() {
        const phase = this.currentPhase;
        
        this.boss = this.physics.add.sprite(GAME_CONFIG.width / 2, 200, phase.key);
        this.boss.setCollideWorldBounds(true);
        this.boss.setScale(phase.scale || 2);
        
        const baseHealth = phase.health || 500;
        this.boss.health = baseHealth + (this.currentLevel - 1) * 50;
        this.boss.maxHealth = this.boss.health;
        this.boss.scoreValue = phase.score || 1000;
        this.boss.bossName = phase.name || 'BOSS';
        this.boss.pattern = 0;
        this.boss.phase = 1;

        this.bossNameText.setText(this.boss.bossName);
        this.updateBossHpBar();

        this.bossFloatTween = this.tweens.add({
            targets: this.boss,
            y: 250,
            duration: 2000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        this.bossAttackTimer = this.time.addEvent({
            delay: 2000,
            callback: () => this.bossAttack(),
            loop: true
        });

        this.setupBossCollisions();
    }

    setupBossCollisions() {
        if (this.bossBulletOverlap) {
            this.bossBulletOverlap.destroy();
        }
        if (this.bossPlayerOverlap) {
            this.bossPlayerOverlap.destroy();
        }

        this.bossBulletOverlap = this.physics.add.overlap(this.bullets, this.boss, (bullet, boss) => {
            if (!boss.active || this.bossDefeated || this.phaseComplete) {
                bullet.destroy();
                return;
            }
            this.hitBoss(boss, bullet);
            bullet.destroy();
        });

        this.bossPlayerOverlap = this.physics.add.overlap(this.player, this.boss, (player, boss) => {
            if (!boss.active || this.bossDefeated || this.phaseComplete) return;
            if (!player.invulnerable) {
                this.hitPlayer(30);
            }
        });
    }

    bossAttack() {
        if (!this.boss || !this.boss.active || this.isGameOver || this.phaseComplete) return;

        this.boss.pattern = (this.boss.pattern + 1) % 4;

        switch(this.boss.pattern) {
            case 0:
                this.bossBulletSpread();
                break;
            case 1:
                this.bossBulletCircle();
                break;
            case 2:
                this.bossBulletAim();
                break;
            case 3:
                this.bossBulletRain();
                break;
        }

        const hpPercent = this.boss.health / this.boss.maxHealth;
        if (hpPercent < 0.5 && this.boss.phase === 1) {
            this.boss.phase = 2;
            this.bossEnterPhase2();
        }
    }

    bossBulletSpread() {
        const count = 5 + this.boss.phase * 3;
        const angleStep = 30;
        const startAngle = -angleStep * (count - 1) / 2;

        for (let i = 0; i < count; i++) {
            this.time.delayedCall(i * 100, () => {
                const angle = Phaser.Math.DegToRad(startAngle + i * angleStep + 90);
                this.createBossBullet(angle);
            });
        }
    }

    bossBulletCircle() {
        const count = 12;
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count;
            this.createBossBullet(angle);
        }
    }

    bossBulletAim() {
        for (let i = 0; i < 3; i++) {
            this.time.delayedCall(i * 300, () => {
                const angle = Phaser.Math.Angle.Between(
                    this.boss.x, this.boss.y,
                    this.player.x, this.player.y
                );
                this.createBossBullet(angle);
                this.createBossBullet(angle + 0.2);
                this.createBossBullet(angle - 0.2);
            });
        }
    }

    bossBulletRain() {
        for (let i = 0; i < 8; i++) {
            this.time.delayedCall(i * 150, () => {
                const x = Phaser.Math.Between(50, GAME_CONFIG.width - 50);
                const bullet = this.enemyBullets.create(x, -20, 'enemyBullet');
                bullet.setScale(1.5);
                bullet.setVelocityY(300);
                bullet.damage = 15;
            });
        }
    }

    bossEnterPhase2() {
        this.cameras.main.shake(500, 0.02);
        this.cameras.main.flash(500, 255, 0, 0);

        const warning = this.add.text(GAME_CONFIG.width / 2, GAME_CONFIG.height / 2, 'BOSS狂怒！', {
            fontSize: '48px',
            fontFamily: 'Microsoft JhengHei',
            fontStyle: 'bold',
            color: '#ff0000',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);
        warning.setDepth(4000);

        this.tweens.add({
            targets: warning,
            alpha: 0,
            scale: 2,
            duration: 1500,
            onComplete: () => warning.destroy()
        });

        if (this.bossAttackTimer) {
            this.bossAttackTimer.remove();
        }
        this.bossAttackTimer = this.time.addEvent({
            delay: 1500,
            callback: () => this.bossAttack(),
            loop: true
        });
    }

    createBossBullet(angle) {
        const bullet = this.enemyBullets.create(this.boss.x, this.boss.y + 50, 'enemyBullet');
        bullet.setScale(1.5);
        
        const speed = 250 + this.boss.phase * 50;
        bullet.setVelocity(
            Math.cos(angle) * speed,
            Math.sin(angle) * speed
        );
        
        bullet.damage = 15 + this.boss.phase * 5;

        const trail = this.add.circle(bullet.x, bullet.y, 4, 0xff00ff, 0.5);
        this.tweens.add({
            targets: trail,
            scale: 0,
            alpha: 0,
            duration: 300,
            onComplete: () => trail.destroy()
        });
    }

    checkPhaseComplete() {
        if (this.phaseComplete) return;

        switch (this.currentPhase.type) {
            case 'minions':
                if (this.minionWavesRemaining <= 0 && this.phaseEnemies.countActive() === 0) {
                    this.completeCurrentPhase();
                }
                break;
            case 'elite':
                if (this.phaseEnemies.countActive() === 0) {
                    this.completeCurrentPhase();
                }
                break;
            case 'miniboss':
            case 'midboss':
            case 'boss':
                if (this.bossDefeated) {
                    this.completeCurrentPhase();
                }
                break;
        }
    }

    completeCurrentPhase() {
        this.phaseComplete = true;

        if (this.bossAttackTimer) {
            this.bossAttackTimer.remove();
            this.bossAttackTimer = null;
        }

        if (this.bossFloatTween) {
            this.bossFloatTween.stop();
            this.bossFloatTween = null;
        }

        this.enemyBullets.clear(true, true);

        this.time.delayedCall(2000, () => {
            this.nextPhase();
        });
    }

    nextPhase() {
        this.currentPhaseIndex++;
        this.bossDefeated = false;
        
        if (this.boss) {
            if (this.boss.active) {
                this.boss.destroy();
            }
            this.boss = null;
        }

        this.phaseEnemies.clear(true, true);

        this.bossNameText.setText('');
        if (this.bossHpBar) {
            this.bossHpBar.width = 600;
            this.bossHpBar.setFillStyle(0xff0000);
        }

        this.startPhase();
    }

    updateBossHpBar() {
        if (!this.boss || !this.boss.active) return;
        
        const hpPercent = Math.max(0, this.boss.health / this.boss.maxHealth);
        this.bossHpBar.width = 600 * hpPercent;
        this.bossHpBar.setFillStyle(hpPercent > 0.5 ? 0xff0000 : hpPercent > 0.25 ? 0xffaa00 : 0xff00ff);
    }

    createBossBackground() {
        const colors = [0x2a0a0a, 0x0a0a2a];
        const graphics = this.add.graphics();
        graphics.fillGradientStyle(colors[0], colors[1], colors[0], colors[1], 1);
        graphics.fillRect(0, 0, GAME_CONFIG.width, GAME_CONFIG.height);

        const magicCircle = this.add.container(GAME_CONFIG.width / 2, GAME_CONFIG.height / 2);
        
        for (let i = 0; i < 3; i++) {
            const circle = this.add.circle(0, 0, 200 + i * 50, 0xff00ff, 0);
            circle.setStrokeStyle(2, 0xff00ff, 0.3 - i * 0.1);
            magicCircle.add(circle);
            
            this.tweens.add({
                targets: circle,
                rotation: i % 2 === 0 ? Math.PI * 2 : -Math.PI * 2,
                duration: 10000 + i * 2000,
                repeat: -1
            });
        }

        this.magicCircle = magicCircle;
    }

    createPlayer() {
        this.player = this.physics.add.sprite(GAME_CONFIG.width / 2, GAME_CONFIG.height - 100, 'catSprite', 0);
        this.player.setCollideWorldBounds(true);
        this.player.setScale(1);
        this.player.play('cat_idle');
        this.player.invulnerable = false;
        this.player.speed = GAME_CONFIG.playerSpeed;
    }

    setupControls() {
        this.keys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE,
            up2: Phaser.Input.Keyboard.KeyCodes.UP,
            down2: Phaser.Input.Keyboard.KeyCodes.DOWN,
            left2: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right2: Phaser.Input.Keyboard.KeyCodes.RIGHT
        });

        this.input.on('pointermove', (pointer) => {
            if (!this.player || this.isGameOver) return;
            if (pointer.x < this.player.x) {
                this.player.setFlipX(true);
            } else {
                this.player.setFlipX(false);
            }
        });

        this.input.on('pointerdown', (pointer) => {
            if (!this.isGameOver && pointer.leftButtonDown()) {
                this.fireBullet();
            }
        });
    }

    createUI() {
        this.uiContainer = this.add.container(0, 0);
        this.uiContainer.setDepth(1000);

        const warning = this.add.text(GAME_CONFIG.width / 2, 60, '⚠ BOSS戰 ⚠', {
            fontSize: '36px',
            fontFamily: 'Microsoft JhengHei',
            fontStyle: 'bold',
            color: '#ff0000',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5);
        
        this.tweens.add({
            targets: warning,
            alpha: 0.3,
            scale: 1.1,
            duration: 500,
            yoyo: true,
            repeat: -1
        });

        this.uiContainer.add(warning);

        const bossHpBg = this.add.rectangle(GAME_CONFIG.width / 2, 120, 604, 30, 0x000000, 0.8);
        this.uiContainer.add(bossHpBg);

        this.bossHpBar = this.add.rectangle(GAME_CONFIG.width / 2 - 300, 120, 600, 26, 0xff0000, 1);
        this.bossHpBar.setOrigin(0, 0.5);
        this.uiContainer.add(this.bossHpBar);

        this.bossNameText = this.add.text(GAME_CONFIG.width / 2, 120, '', {
            fontSize: '20px',
            fontFamily: 'Microsoft JhengHei',
            fontStyle: 'bold',
            color: '#ffffff'
        }).setOrigin(0.5);
        this.uiContainer.add(this.bossNameText);

        const hpBg = this.add.rectangle(20, 35, 204, 24, 0x000000, 0.8);
        hpBg.setOrigin(0, 0.5);
        this.uiContainer.add(hpBg);

        this.hpBar = this.add.rectangle(22, 35, 200, 20, 0xff0000, 1);
        this.hpBar.setOrigin(0, 0.5);
        this.uiContainer.add(this.hpBar);

        this.hpText = this.add.text(120, 35, `${this.playerHealth}/${this.playerMaxHealth}`, {
            fontSize: '16px',
            fontFamily: 'Microsoft JhengHei',
            color: '#ffffff'
        }).setOrigin(0.5);
        this.uiContainer.add(this.hpText);

        const energyBg = this.add.rectangle(250, 35, 204, 24, 0x000000, 0.8);
        energyBg.setOrigin(0, 0.5);
        this.uiContainer.add(energyBg);

        this.energyBar = this.add.rectangle(252, 35, 100, 20, 0x00aaff, 1);
        this.energyBar.setOrigin(0, 0.5);
        this.uiContainer.add(this.energyBar);

        this.scoreText = this.add.text(GAME_CONFIG.width - 20, 35, `分數: ${this.score}`, {
            fontSize: '24px',
            fontFamily: 'Microsoft JhengHei',
            fontStyle: 'bold',
            color: '#ffff00',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(1, 0.5);
        this.uiContainer.add(this.scoreText);

        this.livesText = this.add.text(20, 65, `❤ x ${this.lives}`, {
            fontSize: '20px',
            fontFamily: 'Microsoft JhengHei',
            fontStyle: 'bold',
            color: '#ff6688',
            stroke: '#000000',
            strokeThickness: 2
        });
        this.uiContainer.add(this.livesText);

        this.powerText = this.add.text(GAME_CONFIG.width - 20, 65, `威力 Lv.${this.powerLevel}`, {
            fontSize: '18px',
            fontFamily: 'Microsoft JhengHei',
            color: '#ff6600'
        }).setOrigin(1, 0.5);
        this.uiContainer.add(this.powerText);

        const expBg = this.add.rectangle(20, 95, 204, 16, 0x000000, 0.8);
        expBg.setOrigin(0, 0.5);
        this.uiContainer.add(expBg);

        this.expBar = this.add.rectangle(22, 95, 0, 12, 0x00ff00, 1);
        this.expBar.setOrigin(0, 0.5);
        this.uiContainer.add(this.expBar);

        this.expText = this.add.text(120, 95, `LV.${this.playerLevel}`, {
            fontSize: '14px',
            fontFamily: 'Microsoft JhengHei',
            fontStyle: 'bold',
            color: '#00ff00',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);
        this.uiContainer.add(this.expText);

        const powerExpBg = this.add.rectangle(GAME_CONFIG.width - 20, 95, 150, 16, 0x000000, 0.8);
        powerExpBg.setOrigin(1, 0.5);
        this.uiContainer.add(powerExpBg);

        this.powerExpBar = this.add.rectangle(GAME_CONFIG.width - 170, 95, 0, 12, 0xff6600, 1);
        this.powerExpBar.setOrigin(0, 0.5);
        this.uiContainer.add(this.powerExpBar);

        this.powerExpText = this.add.text(GAME_CONFIG.width - 95, 95, `威力值`, {
            fontSize: '12px',
            fontFamily: 'Microsoft JhengHei',
            color: '#ffffff'
        }).setOrigin(0.5);
        this.uiContainer.add(this.powerExpText);

        const skillBg = this.add.rectangle(20, 125, 40, 40, 0x330033, 0.9);
        skillBg.setOrigin(0, 0.5);
        skillBg.setStrokeStyle(2, 0xff00ff);
        this.uiContainer.add(skillBg);

        this.skillIcon = this.add.text(40, 125, '⚡', {
            fontSize: '24px'
        }).setOrigin(0.5);
        this.uiContainer.add(this.skillIcon);

        this.skillCountText = this.add.text(70, 125, `x ${this.specialSkillCount}/${this.specialSkillMaxCount}`, {
            fontSize: '20px',
            fontFamily: 'Microsoft JhengHei',
            fontStyle: 'bold',
            color: '#ff00ff',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0, 0.5);
        this.uiContainer.add(this.skillCountText);

        const skillProgressBg = this.add.rectangle(180, 125, 100, 12, 0x000000, 0.8);
        skillProgressBg.setOrigin(0, 0.5);
        this.uiContainer.add(skillProgressBg);

        const progressPercent = Math.min(this.specialSkillTotalUsed / this.specialSkillUnlockThreshold, 1);
        this.skillProgressBar = this.add.rectangle(182, 125, 96 * progressPercent, 8, 0xff00ff, 1);
        this.skillProgressBar.setOrigin(0, 0.5);
        this.uiContainer.add(this.skillProgressBar);
    }

    setupCollisions() {
        this.physics.add.overlap(this.bullets, this.phaseEnemies, (bullet, enemy) => {
            if (!enemy.active) {
                bullet.destroy();
                return;
            }
            this.hitPhaseEnemy(enemy, bullet);
            bullet.destroy();
        });

        this.physics.add.overlap(this.player, this.enemyBullets, (player, bullet) => {
            if (!player.invulnerable) {
                this.hitPlayer(bullet.damage || 10);
                bullet.destroy();
                this.createExplosion(bullet.x, bullet.y, 0.5);
            }
        });

        this.physics.add.overlap(this.player, this.phaseEnemies, (player, enemy) => {
            if (!enemy.active) return;
            if (!player.invulnerable) {
                this.hitPlayer(20);
            }
        });

        this.physics.add.overlap(this.player, this.items, (player, item) => {
            this.collectItem(item);
        });
    }

    hitPhaseEnemy(enemy, bullet) {
        if (!enemy.active) return;

        const dmg = this.powerLevel * 10 + 10;
        enemy.health -= dmg;

        audioManager.playExplosionSound();

        this.tweens.add({
            targets: enemy,
            alpha: 0.5,
            duration: 50,
            yoyo: true,
            repeat: 2
        });

        this.showDamageNumber(enemy.x, enemy.y - 30, dmg);
        this.createExplosion(bullet.x, bullet.y, 0.3);

        this.addExp(Math.floor(dmg / 10));
        this.addPowerExp(2);

        if (enemy.health <= 0) {
            this.defeatPhaseEnemy(enemy);
        }
    }

    defeatPhaseEnemy(enemy) {
        if (enemy.attackTimer) {
            enemy.attackTimer.remove();
        }

        this.tweens.killTweensOf(enemy);
        this.createExplosion(enemy.x, enemy.y, 0.8);
        this.score += enemy.scoreValue || 50;
        this.spawnItem(enemy.x, enemy.y);
        enemy.destroy();
        this.updateUI();

        this.time.delayedCall(500, () => {
            this.checkPhaseComplete();
        });
    }

    spawnItem(x, y) {
        const rand = Math.random();
        let itemType = null;

        if (rand < 0.15) {
            itemType = 'heart';
        } else if (rand < 0.40) {
            itemType = 'star';
        } else if (rand < 0.70) {
            itemType = 'fish';
        }

        if (itemType) {
            const item = this.items.create(x, y, itemType);
            item.itemType = itemType;
            item.setVelocity(0, 50);
        }
    }

    hitBoss(boss, bullet) {
        if (this.bossDefeated || !boss.active) {
            if (bullet) bullet.destroy();
            return;
        }

        const dmg = bullet ? (this.powerLevel * 15 + 15) : arguments[2] || 100;
        boss.health -= dmg;

        audioManager.playExplosionSound();
        this.updateBossHpBar();

        if (!this.bossDefeated) {
            this.tweens.add({
                targets: boss,
                alpha: 0.5,
                duration: 50,
                yoyo: true,
                repeat: 2
            });
        }

        this.showDamageNumber(boss.x, boss.y - 50, dmg);
        this.createExplosion(bullet ? bullet.x : boss.x, bullet ? bullet.y : boss.y, 0.5);

        if (boss.health <= 0 && !this.bossDefeated) {
            this.bossDefeated = true;
            this.bossDefeatedHandler();
            return;
        }

        this.addExp(Math.floor(dmg / 5));
        this.addPowerExp(5);
        this.updateUI();
    }

    bossDefeatedHandler() {
        if (this.bossAttackTimer) {
            this.bossAttackTimer.remove();
        }

        if (this.bossFloatTween) {
            this.bossFloatTween.stop();
        }

        if (this.bossBulletOverlap) {
            this.bossBulletOverlap.destroy();
        }
        if (this.bossPlayerOverlap) {
            this.bossPlayerOverlap.destroy();
        }

        const bossX = this.boss.x;
        const bossY = this.boss.y;
        const bossScore = this.boss.scoreValue || 1000;

        for (let i = 0; i < 10; i++) {
            this.time.delayedCall(i * 100, () => {
                const x = bossX + Phaser.Math.Between(-100, 100);
                const y = bossY + Phaser.Math.Between(-50, 50);
                this.createExplosion(x, y, 1.5);
            });
        }

        this.boss.destroy();
        this.score += bossScore;
        this.addExp(Math.floor(bossScore / 5));
        this.addPowerExp(50);
        this.updateUI();

        this.time.delayedCall(2000, () => {
            this.checkPhaseComplete();
        });
    }

    hitPlayer(damage) {
        this.playerHealth -= damage;
        this.player.invulnerable = true;

        audioManager.playHurtSound();
        this.player.play('cat_hurt');

        this.tweens.add({
            targets: this.player,
            alpha: 0,
            duration: 100,
            yoyo: true,
            repeat: 5,
            onComplete: () => {
                this.player.alpha = 1;
                this.player.invulnerable = false;
                this.player.play('cat_idle');
            }
        });

        this.cameras.main.shake(200, 0.01);
        this.createExplosion(this.player.x, this.player.y, 0.8);

        if (this.playerHealth <= 0) {
            this.lives--;
            if (this.livesText) this.livesText.setText(`❤ x ${this.lives}`);
            if (this.lives <= 0) {
                this.gameOver();
            } else {
                this.playerHealth = this.playerMaxHealth;
                this.player.invulnerable = true;
                this.showFloatingText(this.player.x, this.player.y - 50, `殘機 x ${this.lives}`, '#ff6688');
                this.consecutiveDeaths++;

                if (this.consecutiveDeaths >= 2) {
                    this.powerLevel = 1;
                    if (this.powerText) this.powerText.setText(`威力 Lv.${this.powerLevel}`);
                    this.showFloatingText(this.player.x, this.player.y - 80, '威力重置！', '#ff0000');
                    this.consecutiveDeaths = 0;
                }

                this.time.delayedCall(2000, () => {
                    if (this.player && this.player.active) {
                        this.player.invulnerable = false;
                        this.player.play('cat_idle');
                    }
                });
            }
        } else {
            this.consecutiveDeaths = 0;
        }

        this.updateUI();
    }

    collectItem(item) {
        switch(item.itemType) {
            case 'fish':
                this.score += 50;
                this.addEnergy(10);
                break;
            case 'heart':
                this.healPlayer(20);
                break;
            case 'star':
                this.addPowerExp(30);
                break;
        }
        item.destroy();
        this.updateUI();
    }

    healPlayer(amount) {
        this.playerHealth = Math.min(this.playerHealth + amount, this.playerMaxHealth);
        this.updateUI();
    }

    addEnergy(amount) {
        this.energy += amount;
        
        while (this.energy >= this.maxEnergy) {
            this.energy -= this.maxEnergy;
            
            if (this.specialSkillCount < this.specialSkillMaxCount) {
                this.specialSkillCount++;
                this.showFloatingText(this.player.x, this.player.y - 80, '必殺技 +1!', '#ff00ff');
            } else {
                this.score += 500;
                this.showFloatingText(this.player.x, this.player.y - 80, '能量溢出 +500分!', '#ffff00');
            }
        }
        
        this.updateUI();
    }

    showDamageNumber(x, y, damage) {
        const text = this.add.text(x, y, damage.toString(), {
            fontSize: '24px',
            fontFamily: 'Arial',
            fontStyle: 'bold',
            color: '#ffffff',
            stroke: '#ff0000',
            strokeThickness: 2
        }).setOrigin(0.5);

        this.tweens.add({
            targets: text,
            y: y - 60,
            alpha: 0,
            duration: 800,
            onComplete: () => text.destroy()
        });
    }

    showFloatingText(x, y, text, color) {
        const txt = this.add.text(x, y, text, {
            fontSize: '24px',
            fontFamily: 'Microsoft JhengHei',
            fontStyle: 'bold',
            color: color,
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);

        this.tweens.add({
            targets: txt,
            y: y - 60,
            scale: 1.2,
            alpha: 0,
            duration: 1000,
            onComplete: () => txt.destroy()
        });
    }

    createExplosion(x, y, scale = 1) {
        const colors = [0xff4400, 0xffaa00, 0xffff00, 0xff6600];
        
        for (let i = 0; i < 10 * scale; i++) {
            const angle = (Math.PI * 2 * i) / (10 * scale);
            const speed = 100 + Math.random() * 150;
            const color = Phaser.Utils.Array.GetRandom(colors);
            
            const particle = this.add.circle(x, y, 5 * scale, color, 0.8);
            
            this.tweens.add({
                targets: particle,
                x: x + Math.cos(angle) * speed,
                y: y + Math.sin(angle) * speed,
                scale: 0,
                alpha: 0,
                duration: 500 + Math.random() * 300,
                onComplete: () => particle.destroy()
            });
        }

        const flash = this.add.circle(x, y, 20 * scale, 0xffffff, 1);
        this.tweens.add({
            targets: flash,
            scale: 2 * scale,
            alpha: 0,
            duration: 200,
            onComplete: () => flash.destroy()
        });
    }

    updateUI() {
        const hpPercent = this.playerHealth / this.playerMaxHealth;
        this.hpBar.width = 200 * hpPercent;
        this.hpBar.setFillStyle(hpPercent > 0.5 ? 0x00ff00 : hpPercent > 0.25 ? 0xffff00 : 0xff0000);
        this.hpText.setText(`${Math.ceil(this.playerHealth)}/${this.playerMaxHealth}`);

        const energyPercent = this.energy / this.maxEnergy;
        this.energyBar.width = 200 * energyPercent;
        this.energyBar.setFillStyle(energyPercent >= 1 ? 0xff00ff : 0x00aaff);

        this.scoreText.setText(`分數: ${this.score}`);

        const expPercent = Math.min(this.exp / this.maxExp, 1);
        this.expBar.width = 200 * expPercent;
        this.expText.setText(`LV.${this.playerLevel}`);

        const powerExpPercent = Math.min(this.powerExp / this.maxPowerExp, 1);
        this.powerExpBar.width = 146 * powerExpPercent;

        if (this.skillCountText) {
            this.skillCountText.setText(`x ${this.specialSkillCount}/${this.specialSkillMaxCount}`);
            if (this.specialSkillCount >= this.specialSkillMaxCount) {
                this.skillCountText.setColor('#00ff00');
            } else if (this.specialSkillCount > 0) {
                this.skillCountText.setColor('#ff00ff');
            } else {
                this.skillCountText.setColor('#666666');
            }
        }
        
        if (this.skillProgressBar) {
            const progressPercent = Math.min(this.specialSkillTotalUsed / this.specialSkillUnlockThreshold, 1);
            this.skillProgressBar.width = 96 * progressPercent;
        }
    }

    fireBullet() {
        const now = this.time.now;
        if (now - this.lastShotTime < this.shotInterval) return;
        this.lastShotTime = now;

        audioManager.playShootSound();
        this.player.play('cat_attack');
        this.time.delayedCall(300, () => {
            if (!this.isGameOver) this.player.play('cat_idle');
        });

        const bulletCount = Math.min(this.powerLevel, 5);
        const spreadAngle = 15;

        for (let i = 0; i < bulletCount; i++) {
            const angle = (i - (bulletCount - 1) / 2) * spreadAngle;
            this.createBullet(angle);
        }
    }

    createBullet(angleOffset = 0) {
        const bullet = this.bullets.create(this.player.x, this.player.y - 30, 'bullet');
        bullet.setScale(1 + this.powerLevel * 0.2);

        const pointer = this.input.activePointer;
        const angle = Phaser.Math.Angle.Between(
            this.player.x, this.player.y,
            pointer.x, pointer.y
        ) + Phaser.Math.DegToRad(angleOffset);

        const speed = 600;
        bullet.setVelocity(
            Math.cos(angle) * speed,
            Math.sin(angle) * speed
        );
    }

    addExp(amount) {
        this.exp += amount;
        while (this.exp >= this.maxExp) {
            this.exp -= this.maxExp;
            this.playerLevel++;
            this.maxExp = Math.floor(this.maxExp * 1.2);
            this.playerMaxHealth += 10;
            this.playerHealth = this.playerMaxHealth;
            this.showLevelUpEffect();
        }
    }

    addPowerExp(amount) {
        if (this.powerLevel >= 5) return;
        
        this.powerExp += amount;
        if (this.powerExp >= this.maxPowerExp) {
            this.powerExp = 0;
            this.powerLevel = Math.min(this.powerLevel + 1, 5);
            this.powerText.setText(`威力 Lv.${this.powerLevel}`);
            this.showFloatingText(this.player.x, this.player.y - 80, '威力升級!', '#ff6600');
            audioManager.playPowerUpSound();
        }
    }

    showLevelUpEffect() {
        const levelUpText = this.add.text(this.player.x, this.player.y - 100, `★ 等級提升! LV.${this.playerLevel} ★`, {
            fontSize: '32px',
            fontFamily: 'Microsoft JhengHei',
            fontStyle: 'bold',
            color: '#00ff00',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);

        this.tweens.add({
            targets: levelUpText,
            y: levelUpText.y - 80,
            scale: 1.3,
            alpha: 0,
            duration: 1500,
            ease: 'Power2',
            onComplete: () => levelUpText.destroy()
        });

        const ring = this.add.circle(this.player.x, this.player.y, 50, 0x00ff00, 0.5);
        this.tweens.add({
            targets: ring,
            scale: 3,
            alpha: 0,
            duration: 800,
            onComplete: () => ring.destroy()
        });

        audioManager.playPowerUpSound();
    }

    useSpecialSkill() {
        if (this.specialSkillCount <= 0) {
            this.showFloatingText(this.player.x, this.player.y - 50, '必殺技不足!', '#ff6666');
            return;
        }

        this.specialSkillCount--;
        this.specialSkillTotalUsed++;
        
        if (this.specialSkillTotalUsed >= this.specialSkillUnlockThreshold) {
            this.specialSkillTotalUsed = 0;
            if (this.specialSkillMaxCount < 9) {
                this.specialSkillMaxCount++;
                this.specialSkillUnlockThreshold = Math.floor(this.specialSkillUnlockThreshold * 1.5);
                this.showFloatingText(this.player.x, this.player.y - 100, `必殺技上限+1! 最大${this.specialSkillMaxCount}`, '#ff00ff');
            }
        }
        
        this.updateUI();

        this.cameras.main.flash(500, 255, 255, 255);
        
        const wave = this.add.circle(this.player.x, this.player.y, 50, 0xffff00, 0.5);
        
        this.tweens.add({
            targets: wave,
            scale: 10,
            alpha: 0,
            duration: 1000,
            onComplete: () => wave.destroy()
        });

        if (this.boss && this.boss.active && !this.bossDefeated) {
            const megaDamage = Math.ceil(this.boss.maxHealth * 0.3);
            this.hitBoss(this.boss, null, megaDamage);
        }

        this.phaseEnemies.children.entries.forEach(enemy => {
            if (enemy.active) {
                enemy.health -= 50;
                if (enemy.health <= 0) {
                    this.defeatPhaseEnemy(enemy);
                }
            }
        });

        this.enemyBullets.clear(true, true);
        this.showFloatingText(this.player.x, this.player.y - 50, '必殺技！', '#ffff00');
        audioManager.playExplosionSound();

        this.activateShield(10000);
    }

    activateShield(duration) {
        this.player.invulnerable = true;
        this.player.setTint(0x00ffff);

        if (this.shieldCircle) this.shieldCircle.destroy();
        this.shieldCircle = this.add.circle(this.player.x, this.player.y, 60, 0x00ffff, 0.2);
        this.shieldCircle.setStrokeStyle(2, 0x00ffff, 0.8);

        this.shieldFollowEvent = this.time.addEvent({
            delay: 16,
            callback: () => {
                if (this.shieldCircle && this.player.active) {
                    this.shieldCircle.setPosition(this.player.x, this.player.y);
                }
            },
            loop: true
        });

        this.tweens.add({
            targets: this.shieldCircle,
            alpha: 0.1,
            duration: 500,
            yoyo: true,
            repeat: -1
        });

        this.showFloatingText(this.player.x, this.player.y - 80, '無敵 10秒！', '#00ffff');

        if (this.shieldTimer) this.shieldTimer.destroy();
        this.shieldTimer = this.time.delayedCall(duration, () => {
            this.player.invulnerable = false;
            this.player.clearTint();
            if (this.shieldCircle) {
                this.shieldCircle.destroy();
                this.shieldCircle = null;
            }
            if (this.shieldFollowEvent) {
                this.shieldFollowEvent.destroy();
                this.shieldFollowEvent = null;
            }
            this.showFloatingText(this.player.x, this.player.y - 50, '無敵結束', '#ff6666');
        });
    }

    levelComplete() {
        this.physics.pause();

        audioManager.playVictorySound();

        const overlay = this.add.rectangle(0, 0, GAME_CONFIG.width, GAME_CONFIG.height, 0x000000, 0.7).setOrigin(0);
        overlay.setDepth(4000);

        const container = this.add.container(GAME_CONFIG.width / 2, GAME_CONFIG.height / 2);
        container.setDepth(4001);

        const victoryText = this.add.text(0, -50, 'BOSS戰勝利！', {
            fontSize: '56px',
            fontFamily: 'Microsoft JhengHei',
            fontStyle: 'bold',
            color: '#00ff00',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);

        const scoreText = this.add.text(0, 30, `當前分數: ${this.score}`, {
            fontSize: '32px',
            fontFamily: 'Microsoft JhengHei',
            color: '#ffff00'
        }).setOrigin(0.5);

        container.add([victoryText, scoreText]);

        this.consecutiveDeaths = 0;

        this.time.delayedCall(3000, () => {
            if (this.currentLevel >= GAME_CONFIG.totalLevels) {
                this.scene.start('VictoryScene', { score: this.score });
            } else {
                this.scene.start('GameScene', {
                    level: this.currentLevel + 1,
                    score: this.score,
                    powerLevel: this.powerLevel,
                    lives: this.lives,
                    consecutiveDeaths: 0,
                    energy: this.energy,
                    powerExp: this.powerExp,
                    exp: this.exp,
                    maxExp: this.maxExp,
                    playerLevel: this.playerLevel,
                    playerHealth: this.playerHealth,
                    playerMaxHealth: this.playerMaxHealth,
                    specialSkillCount: this.specialSkillCount,
                    specialSkillMaxCount: this.specialSkillMaxCount,
                    specialSkillTotalUsed: this.specialSkillTotalUsed,
                    specialSkillUnlockThreshold: this.specialSkillUnlockThreshold
                });
            }
        });
    }

    gameOver() {
        this.isGameOver = true;
        this.physics.pause();
        if (this.bossAttackTimer) this.bossAttackTimer.remove();

        audioManager.stopBGM();

        this.player.play('cat_die');

        const overlay = this.add.rectangle(0, 0, GAME_CONFIG.width, GAME_CONFIG.height, 0x000000, 0.8).setOrigin(0);
        overlay.setDepth(5000);

        const container = this.add.container(GAME_CONFIG.width / 2, GAME_CONFIG.height / 2);
        container.setDepth(5001);

        const gameOverText = this.add.text(0, -80, '遊戲結束', {
            fontSize: '72px',
            fontFamily: 'Microsoft JhengHei',
            fontStyle: 'bold',
            color: '#ff0000',
            stroke: '#000000',
            strokeThickness: 5
        }).setOrigin(0.5);

        const scoreText = this.add.text(0, 30, `最終分數: ${this.score}`, {
            fontSize: '32px',
            fontFamily: 'Microsoft JhengHei',
            color: '#ffff00'
        }).setOrigin(0.5);

        const restartText = this.add.text(0, 100, '點擊重新開始', {
            fontSize: '28px',
            fontFamily: 'Microsoft JhengHei',
            color: '#ffa500'
        }).setOrigin(0.5);

        container.add([gameOverText, scoreText, restartText]);

        this.tweens.add({
            targets: restartText,
            alpha: 0.3,
            duration: 500,
            yoyo: true,
            repeat: -1
        });

        this.input.on('pointerdown', () => {
            this.scene.start('BossScene', {
                level: this.currentLevel,
                score: 0,
                lives: GAME_CONFIG.playerLives,
                powerLevel: this.consecutiveDeaths >= 2 ? 1 : this.powerLevel,
                consecutiveDeaths: this.consecutiveDeaths,
                playerHealth: undefined,
                playerMaxHealth: undefined,
                specialSkillCount: 0,
                specialSkillMaxCount: 3,
                specialSkillTotalUsed: 0,
                specialSkillUnlockThreshold: 5
            });
        });
    }

    update(time, delta) {
        if (this.isGameOver) return;

        this.handlePlayerMovement(delta);

        if (Phaser.Input.Keyboard.JustDown(this.keys.space)) {
            this.useSpecialSkill();
        }

        if (this.magicCircle) {
            this.magicCircle.rotation += 0.001;
        }

        this.cleanupObjects();
        this.updatePhaseEnemies();
    }

    handlePlayerMovement(delta) {
        let vx = 0;
        let vy = 0;

        if (this.keys.left.isDown || this.keys.left2.isDown) vx = -1;
        if (this.keys.right.isDown || this.keys.right2.isDown) vx = 1;
        if (this.keys.up.isDown || this.keys.up2.isDown) vy = -1;
        if (this.keys.down.isDown || this.keys.down2.isDown) vy = 1;

        if (vx !== 0 || vy !== 0) {
            const len = Math.sqrt(vx * vx + vy * vy);
            vx /= len;
            vy /= len;

            this.player.setVelocity(vx * this.player.speed, vy * this.player.speed);

            if (Math.abs(vx) > 0.5) {
                this.player.setFlipX(vx < 0);
            }

            if (!this.player.anims.isPlaying || this.player.anims.currentAnim.key !== 'cat_run') {
                this.player.play('cat_run');
            }
        } else {
            this.player.setVelocity(0, 0);
            if (!this.player.anims.isPlaying || this.player.anims.currentAnim.key !== 'cat_idle') {
                this.player.play('cat_idle');
            }
        }
    }

    updatePhaseEnemies() {
        this.phaseEnemies.children.entries.forEach(enemy => {
            if (!enemy.active) return;

            if (enemy.isMinion) {
                if (enemy.body.velocity.y < 50) {
                    enemy.setVelocityY(100);
                }
                if (enemy.y > GAME_CONFIG.height + 50) {
                    enemy.destroy();
                }
            }
        });
    }

    cleanupObjects() {
        this.bullets.children.entries.forEach(bullet => {
            if (bullet.y < -50 || bullet.y > GAME_CONFIG.height + 50 ||
                bullet.x < -50 || bullet.x > GAME_CONFIG.width + 50) {
                bullet.destroy();
            }
        });

        this.enemyBullets.children.entries.forEach(bullet => {
            if (bullet.y < -50 || bullet.y > GAME_CONFIG.height + 50 ||
                bullet.x < -50 || bullet.x > GAME_CONFIG.width + 50) {
                bullet.destroy();
            }
        });

        this.items.children.entries.forEach(item => {
            if (item.y > GAME_CONFIG.height + 50) {
                item.destroy();
            }
        });
    }
}


// ==========================================
// 勝利場景
// ==========================================
class VictoryScene extends Phaser.Scene {
    constructor() {
        super({ key: 'VictoryScene' });
    }

    init(data) {
        this.finalScore = data.score || 0;
    }

    create() {
        this.createCelebrationBackground();

        const container = this.add.container(GAME_CONFIG.width / 2, GAME_CONFIG.height / 2);

        const victoryTitle = this.add.text(0, -320, '🎉 通關！ 🎉', {
            fontSize: '72px',
            fontFamily: 'Microsoft JhengHei',
            fontStyle: 'bold',
            color: '#ffd700',
            stroke: '#ff6600',
            strokeThickness: 6,
            shadow: { blur: 20, color: '#ffaa00', fill: true }
        }).setOrigin(0.5);

        this.tweens.add({
            targets: victoryTitle,
            scale: 1.1,
            duration: 800,
            yoyo: true,
            repeat: -1
        });

        const scoreLabel = this.add.text(0, -200, '最終分數', {
            fontSize: '36px',
            fontFamily: 'Microsoft JhengHei',
            color: '#ffffff'
        }).setOrigin(0.5);

        const scoreValue = this.add.text(0, -140, this.finalScore.toString(), {
            fontSize: '72px',
            fontFamily: 'Microsoft JhengHei',
            fontStyle: 'bold',
            color: '#ffff00',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);

        this.tweens.add({
            targets: scoreValue,
            scale: 1.2,
            duration: 500,
            yoyo: true,
            repeat: -1
        });

        const thanksText = this.add.text(0, -20, '感謝遊玩！', {
            fontSize: '48px',
            fontFamily: 'Microsoft JhengHei',
            fontStyle: 'bold',
            color: '#00ff00',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5);

        const restartBtn = this.add.text(0, 120, '重新開始', {
            fontSize: '32px',
            fontFamily: 'Microsoft JhengHei',
            color: '#00aaff',
            backgroundColor: '#001133',
            padding: { x: 30, y: 15 }
        }).setOrigin(0.5).setInteractive();

        restartBtn.on('pointerdown', () => {
            this.scene.start('MenuScene');
        });

        restartBtn.on('pointerover', () => {
            restartBtn.setStyle({ color: '#ffffff', backgroundColor: '#0055aa' });
        });

        restartBtn.on('pointerout', () => {
            restartBtn.setStyle({ color: '#00aaff', backgroundColor: '#001133' });
        });

        container.add([victoryTitle, scoreLabel, scoreValue, thanksText, restartBtn]);

        this.input.keyboard.on('keydown-SPACE', () => {
            this.scene.start('MenuScene');
        });
    }

    createCelebrationBackground() {
        const graphics = this.add.graphics();
        graphics.fillGradientStyle(0x1a0033, 0x000000, 0x1a0033, 0x000000, 1);
        graphics.fillRect(0, 0, GAME_CONFIG.width, GAME_CONFIG.height);

        const colors = [0xff0000, 0xff6600, 0xffff00, 0x00ff00, 0x0066ff, 0x6600ff];

        for (let i = 0; i < 100; i++) {
            const x = Math.random() * GAME_CONFIG.width;
            const y = Math.random() * GAME_CONFIG.height;
            const size = Math.random() * 4 + 2;
            const color = Phaser.Utils.Array.GetRandom(colors);

            const star = this.add.star(x, y, 5, size, size * 2, color, 0.8);
            
            this.tweens.add({
                targets: star,
                y: y - 200 - Math.random() * 300,
                alpha: 0,
                rotation: Math.PI * 2,
                duration: 2000 + Math.random() * 2000,
                repeat: -1,
                delay: Math.random() * 2000
            });
        }

        for (let i = 0; i < 20; i++) {
            this.time.delayedCall(i * 200, () => {
                this.createFirework();
            });
        }

        this.time.addEvent({
            delay: 2000,
            callback: () => this.createFirework(),
            loop: true
        });
    }

    createFirework() {
        const x = Math.random() * GAME_CONFIG.width;
        const y = Math.random() * GAME_CONFIG.height * 0.7 + 100;
        const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff, 0xff6600];
        const color = Phaser.Utils.Array.GetRandom(colors);

        for (let i = 0; i < 30; i++) {
            const angle = (Math.PI * 2 * i) / 30;
            const speed = 100 + Math.random() * 100;

            const particle = this.add.circle(x, y, 4, color, 1);
            
            this.tweens.add({
                targets: particle,
                x: x + Math.cos(angle) * speed,
                y: y + Math.sin(angle) * speed,
                alpha: 0,
                scale: 0,
                duration: 1000 + Math.random() * 500,
                onComplete: () => particle.destroy()
            });
        }
    }
}

// ==========================================
// 菜單場景
// ==========================================
class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        this.createBackground();
        this.createMenu();
        audioManager.init();
        audioManager.startBGM(1);
    }

    createBackground() {
        const graphics = this.add.graphics();
        graphics.fillGradientStyle(0x1a1a3e, 0x2d2d5a, 0x1a1a3e, 0x2d2d5a, 1);
        graphics.fillRect(0, 0, GAME_CONFIG.width, GAME_CONFIG.height);

        for (let i = 0; i < 100; i++) {
            const star = this.add.circle(
                Math.random() * GAME_CONFIG.width,
                Math.random() * GAME_CONFIG.height,
                Math.random() * 2 + 1,
                0xffffff,
                0.8
            );
            
            this.tweens.add({
                targets: star,
                alpha: 0.2,
                duration: 1000 + Math.random() * 2000,
                yoyo: true,
                repeat: -1
            });
        }
    }

    createMenu() {
        const title = this.add.text(GAME_CONFIG.width / 2, 200, '🐱 貓咪射擊 🐱', {
            fontSize: '72px',
            fontFamily: 'Microsoft JhengHei',
            fontStyle: 'bold',
            color: '#ffa500',
            stroke: '#000000',
            strokeThickness: 6,
            shadow: { blur: 20, color: '#ff6600', fill: true }
        }).setOrigin(0.5);

        this.tweens.add({
            targets: title,
            y: 210,
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        const subtitle = this.add.text(GAME_CONFIG.width / 2, 300, 'Cat Shooter', {
            fontSize: '32px',
            fontFamily: 'Arial',
            fontStyle: 'italic',
            color: '#ffffff'
        }).setOrigin(0.5);

        const buttons = [
            { text: '開始遊戲', y: 450, action: () => this.startGame() },
            { text: '遊戲說明', y: 530, action: () => this.showInstructions() },
            { text: '關於遊戲', y: 610, action: () => this.showAbout() }
        ];

        buttons.forEach(btn => {
            const button = this.add.text(GAME_CONFIG.width / 2, btn.y, btn.text, {
                fontSize: '36px',
                fontFamily: 'Microsoft JhengHei',
                fontStyle: 'bold',
                color: '#00aaff',
                backgroundColor: '#001133',
                padding: { x: 40, y: 15 }
            }).setOrigin(0.5).setInteractive();

            button.on('pointerover', () => {
                button.setStyle({ color: '#ffffff', backgroundColor: '#0055aa' });
                button.setScale(1.1);
            });

            button.on('pointerout', () => {
                button.setStyle({ color: '#00aaff', backgroundColor: '#001133' });
                button.setScale(1);
            });

            button.on('pointerdown', btn.action);
        });

        const hint = this.add.text(GAME_CONFIG.width / 2, 900, '點擊按鈕或使用鍵盤數字鍵 1-3 選擇', {
            fontSize: '18px',
            fontFamily: 'Microsoft JhengHei',
            color: '#888888'
        }).setOrigin(0.5);

        this.input.keyboard.on('keydown-ONE', () => this.startGame());
        this.input.keyboard.on('keydown-NUMPAD_ONE', () => this.startGame());
        this.input.keyboard.on('keydown-TWO', () => this.showInstructions());
        this.input.keyboard.on('keydown-NUMPAD_TWO', () => this.showInstructions());
        this.input.keyboard.on('keydown-THREE', () => this.showAbout());
        this.input.keyboard.on('keydown-NUMPAD_THREE', () => this.showAbout());
    }

    startGame() {
        this.scene.start('GameScene', {
            level: 1,
            score: 0,
            powerLevel: 1,
            lives: GAME_CONFIG.playerLives,
            consecutiveDeaths: 0,
            energy: 0,
            powerExp: 0,
            exp: 0,
            maxExp: 100,
            playerLevel: 1,
            playerHealth: GAME_CONFIG.playerHealth,
            playerMaxHealth: GAME_CONFIG.playerHealth,
            specialSkillCount: 0,
            specialSkillMaxCount: 3,
            specialSkillTotalUsed: 0,
            specialSkillUnlockThreshold: 5
        });
    }

    showInstructions() {
        const overlay = this.add.rectangle(0, 0, GAME_CONFIG.width, GAME_CONFIG.height, 0x000000, 0.9).setOrigin(0);
        overlay.setDepth(1000);

        const container = this.add.container(GAME_CONFIG.width / 2, GAME_CONFIG.height / 2);
        container.setDepth(1001);

        const title = this.add.text(0, -350, '📖 遊戲說明', {
            fontSize: '48px',
            fontFamily: 'Microsoft JhengHei',
            fontStyle: 'bold',
            color: '#00ff00'
        }).setOrigin(0.5);

        const instructions = [
            '🎮 控制方式：',
            '',
            '• WASD 或 方向鍵 - 移動',
            '• 滑鼠 - 瞄準',
            '• 滑鼠左鍵 - 射擊',
            '• 空格鍵 - 必殺技',
            '• ESC - 暫停遊戲',
            '',
            '📦 物品說明：',
            '',
            '• 🐟 魚 - 分數 +50，能量 +10',
            '• ❤️ 愛心 - 恢復 20 HP',
            '• ⭐ 星星 - 威力值 +30',
            '',
            '⚡ 必殺技系統：',
            '',
            '• 能量滿時自動轉換為必殺技次數',
            '• 使用必殺技可清除敵人子彈並造成大量傷害',
            '• 使用必殺技後獲得 10 秒無敵時間',
            '',
            '💀 死亡懲罰：',
            '',
            '• 連續死亡 2 次會重置威力等級',
            '• 殘機歸零時遊戲結束'
        ];

        const text = this.add.text(0, 0, instructions, {
            fontSize: '20px',
            fontFamily: 'Microsoft JhengHei',
            color: '#ffffff',
            align: 'left',
            lineSpacing: 8
        }).setOrigin(0.5);

        const closeBtn = this.add.text(0, 400, '關閉 (ESC)', {
            fontSize: '28px',
            fontFamily: 'Microsoft JhengHei',
            color: '#ff6666',
            backgroundColor: '#330000',
            padding: { x: 30, y: 10 }
        }).setOrigin(0.5).setInteractive();

        closeBtn.on('pointerdown', () => {
            overlay.destroy();
            container.destroy();
        });

        container.add([title, text, closeBtn]);

        this.input.keyboard.once('keydown-ESC', () => {
            overlay.destroy();
            container.destroy();
        });
    }

    showAbout() {
        const overlay = this.add.rectangle(0, 0, GAME_CONFIG.width, GAME_CONFIG.height, 0x000000, 0.9).setOrigin(0);
        overlay.setDepth(1000);

        const container = this.add.container(GAME_CONFIG.width / 2, GAME_CONFIG.height / 2);
        container.setDepth(1001);

        const title = this.add.text(0, -300, 'ℹ️ 關於遊戲', {
            fontSize: '48px',
            fontFamily: 'Microsoft JhengHei',
            fontStyle: 'bold',
            color: '#00aaff'
        }).setOrigin(0.5);

        const content = [
            '🐱 貓咪射擊 Cat Shooter',
            '',
            '版本: 1.0',
            '',
            '一款使用 Phaser 3 開發的縱向卷軸射擊遊戲',
            '',
            '特色：',
            '• 37個精心設計的關卡',
            '• 多種敵人類型',
            '• 升級系統',
            '• 必殺技系統',
            '• 分階段BOSS戰',
            '',
            '按 ESC 或點擊關閉'
        ];

        const text = this.add.text(0, 0, content, {
            fontSize: '22px',
            fontFamily: 'Microsoft JhengHei',
            color: '#ffffff',
            align: 'center',
            lineSpacing: 10
        }).setOrigin(0.5);

        container.add([title, text]);

        const closeHandler = () => {
            overlay.destroy();
            container.destroy();
        };

        overlay.setInteractive();
        overlay.on('pointerdown', closeHandler);
        this.input.keyboard.once('keydown-ESC', closeHandler);
    }
}

// ==========================================
// 啟動場景 - 資源加載
// ==========================================
class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // 創建加載進度條
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 2 - 160, height / 2 - 30, 320, 50);

        const loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px Microsoft JhengHei',
                fill: '#ffffff'
            }
        }).setOrigin(0.5);

        const percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px Microsoft JhengHei',
                fill: '#ffffff'
            }
        }).setOrigin(0.5);

        const assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '14px Microsoft JhengHei',
                fill: '#aaaaaa'
            }
        }).setOrigin(0.5);

        // 加載進度事件
        this.load.on('progress', (value) => {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(width / 2 - 150, height / 2 - 20, 300 * value, 30);
        });

        this.load.on('fileprogress', (file) => {
            assetText.setText('Loading: ' + file.key);
        });

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });

        // 加載貓咪精靈圖
        this.load.spritesheet('catSprite', 'Gemini_Generated_Image_y3ookhy3ookhy3oo.png', {
            frameWidth: SPRITE_CONFIG.frameWidth,
            frameHeight: SPRITE_CONFIG.frameHeight
        });

        // 創建紋理（使用圖形代替外部圖片）
        this.load.setBaseURL('');
    }

    create() {
        // 創建動畫
        this.createAnimations();

        // 創建程序化紋理
        this.createProceduralTextures();

        // 隱藏 HTML 加載畫面
        const loading = document.getElementById('loading');
        if (loading) {
            loading.classList.add('hidden');
            setTimeout(() => loading.remove(), 500);
        }

        // 開始菜單場景
        this.scene.start('MenuScene');
    }

    createAnimations() {
        // 貓咪待機動畫
        this.anims.create({
            key: 'cat_idle',
            frames: this.anims.generateFrameNumbers('catSprite', { start: 0, end: 7 }),
            frameRate: 8,
            repeat: -1
        });

        // 貓咪走路動畫
        this.anims.create({
            key: 'cat_walk',
            frames: this.anims.generateFrameNumbers('catSprite', { start: 8, end: 15 }),
            frameRate: 10,
            repeat: -1
        });

        // 貓咪跑步動畫
        this.anims.create({
            key: 'cat_run',
            frames: this.anims.generateFrameNumbers('catSprite', { start: 16, end: 23 }),
            frameRate: 12,
            repeat: -1
        });

        // 貓咪攻擊動畫
        this.anims.create({
            key: 'cat_attack',
            frames: this.anims.generateFrameNumbers('catSprite', { start: 24, end: 31 }),
            frameRate: 12,
            repeat: 0
        });

        // 貓咪受傷動畫
        this.anims.create({
            key: 'cat_hurt',
            frames: this.anims.generateFrameNumbers('catSprite', { start: 32, end: 35 }),
            frameRate: 8,
            repeat: 0
        });

        // 貓咪死亡動畫
        this.anims.create({
            key: 'cat_die',
            frames: this.anims.generateFrameNumbers('catSprite', { start: 40, end: 47 }),
            frameRate: 8,
            repeat: 0
        });

        // 貓咪跳躍動畫
        this.anims.create({
            key: 'cat_jump',
            frames: this.anims.generateFrameNumbers('catSprite', { start: 48, end: 55 }),
            frameRate: 10,
            repeat: 0
        });
    }

    createProceduralTextures() {
        // 創建子彈紋理
        const bulletGraphics = this.make.graphics({ x: 0, y: 0, add: false });
        bulletGraphics.fillStyle(0xffff00, 1);
        bulletGraphics.fillCircle(8, 8, 8);
        bulletGraphics.generateTexture('bullet', 16, 16);

        // 創建敵人子彈紋理
        const enemyBulletGraphics = this.make.graphics({ x: 0, y: 0, add: false });
        enemyBulletGraphics.fillStyle(0xff0000, 1);
        enemyBulletGraphics.fillCircle(6, 6, 6);
        enemyBulletGraphics.generateTexture('enemyBullet', 12, 12);

        // 創建敵人紋理 - 老鼠
        const ratGraphics = this.make.graphics({ x: 0, y: 0, add: false });
        ratGraphics.fillStyle(0x808080, 1);
        ratGraphics.fillEllipse(20, 20, 30, 20);
        ratGraphics.fillStyle(0xffaaaa, 1);
        ratGraphics.fillCircle(12, 15, 3);
        ratGraphics.fillCircle(28, 15, 3);
        ratGraphics.fillStyle(0xff69b4, 1);
        ratGraphics.fillCircle(20, 22, 4);
        ratGraphics.generateTexture('enemy_rat', 40, 40);

        // 創建敵人紋理 - 鳥
        const birdGraphics = this.make.graphics({ x: 0, y: 0, add: false });
        birdGraphics.fillStyle(0x87CEEB, 1);
        birdGraphics.fillEllipse(20, 20, 35, 15);
        birdGraphics.fillStyle(0xffd700, 1);
        birdGraphics.fillTriangle(5, 20, 15, 15, 15, 25);
        birdGraphics.fillStyle(0x000000, 1);
        birdGraphics.fillCircle(30, 15, 3);
        birdGraphics.generateTexture('enemy_bird', 40, 40);

        // 創建敵人紋理 - 狗
        const dogGraphics = this.make.graphics({ x: 0, y: 0, add: false });
        dogGraphics.fillStyle(0x8B4513, 1);
        dogGraphics.fillEllipse(25, 25, 40, 30);
        dogGraphics.fillStyle(0xffd700, 1);
        dogGraphics.fillCircle(15, 18, 4);
        dogGraphics.fillCircle(35, 18, 4);
        dogGraphics.fillStyle(0xff0000, 1);
        dogGraphics.fillCircle(25, 30, 5);
        dogGraphics.generateTexture('enemy_dog', 50, 50);

        // 創建敵人紋理 - 豬
        const pigGraphics = this.make.graphics({ x: 0, y: 0, add: false });
        pigGraphics.fillStyle(0xffb6c1, 1);
        pigGraphics.fillEllipse(30, 30, 50, 40);
        pigGraphics.fillStyle(0x000000, 1);
        pigGraphics.fillCircle(18, 22, 4);
        pigGraphics.fillCircle(42, 22, 4);
        pigGraphics.fillStyle(0xff69b4, 1);
        pigGraphics.fillCircle(30, 35, 8);
        pigGraphics.generateTexture('enemy_pig', 60, 60);

        // 創建BOSS紋理 - 狐狸
        const foxGraphics = this.make.graphics({ x: 0, y: 0, add: false });
        foxGraphics.fillStyle(0xff6600, 1);
        foxGraphics.fillEllipse(50, 50, 80, 60);
        foxGraphics.fillTriangle(10, 30, 30, 10, 30, 50);
        foxGraphics.fillTriangle(90, 30, 70, 10, 70, 50);
        foxGraphics.fillStyle(0xffffff, 1);
        foxGraphics.fillCircle(35, 40, 8);
        foxGraphics.fillCircle(65, 40, 8);
        foxGraphics.fillStyle(0x000000, 1);
        foxGraphics.fillCircle(35, 40, 4);
        foxGraphics.fillCircle(65, 40, 4);
        foxGraphics.fillStyle(0x000000, 1);
        foxGraphics.fillTriangle(45, 55, 55, 55, 50, 65);
        foxGraphics.generateTexture('boss_fox', 100, 100);

        // 創建BOSS紋理 - 狼
        const wolfGraphics = this.make.graphics({ x: 0, y: 0, add: false });
        wolfGraphics.fillStyle(0x696969, 1);
        wolfGraphics.fillEllipse(60, 60, 100, 80);
        wolfGraphics.fillTriangle(10, 30, 40, 10, 40, 50);
        wolfGraphics.fillTriangle(110, 30, 80, 10, 80, 50);
        wolfGraphics.fillStyle(0xffff00, 1);
        wolfGraphics.fillCircle(40, 50, 10);
        wolfGraphics.fillCircle(80, 50, 10);
        wolfGraphics.fillStyle(0xff0000, 1);
        wolfGraphics.fillCircle(40, 50, 4);
        wolfGraphics.fillCircle(80, 50, 4);
        wolfGraphics.fillStyle(0xffffff, 1);
        wolfGraphics.fillTriangle(50, 70, 70, 70, 60, 85);
        wolfGraphics.generateTexture('boss_wolf', 120, 120);

        // 創建BOSS紋理 - 熊
        const bearGraphics = this.make.graphics({ x: 0, y: 0, add: false });
        bearGraphics.fillStyle(0x8B4513, 1);
        bearGraphics.fillEllipse(60, 60, 100, 90);
        bearGraphics.fillCircle(20, 20, 20);
        bearGraphics.fillCircle(100, 20, 20);
        bearGraphics.fillStyle(0x000000, 1);
        bearGraphics.fillCircle(40, 50, 8);
        bearGraphics.fillCircle(80, 50, 8);
        bearGraphics.fillStyle(0x000000, 1);
        bearGraphics.fillEllipse(60, 75, 30, 20);
        bearGraphics.generateTexture('boss_bear', 120, 120);

        // 創建BOSS紋理 - 龍
        const dragonGraphics = this.make.graphics({ x: 0, y: 0, add: false });
        dragonGraphics.fillStyle(0x4B0082, 1);
        dragonGraphics.fillEllipse(70, 70, 120, 100);
        dragonGraphics.fillTriangle(10, 40, 50, 10, 50, 70);
        dragonGraphics.fillTriangle(130, 40, 90, 10, 90, 70);
        dragonGraphics.fillStyle(0xff0000, 1);
        dragonGraphics.fillCircle(45, 60, 12);
        dragonGraphics.fillCircle(95, 60, 12);
        dragonGraphics.fillStyle(0xffff00, 1);
        dragonGraphics.fillCircle(45, 60, 5);
        dragonGraphics.fillCircle(95, 60, 5);
        dragonGraphics.fillStyle(0xff6600, 1);
        dragonGraphics.fillTriangle(55, 85, 85, 85, 70, 110);
        dragonGraphics.generateTexture('boss_dragon', 140, 140);

        // 創建物品紋理 - 魚
        const fishGraphics = this.make.graphics({ x: 0, y: 0, add: false });
        fishGraphics.fillStyle(0x4169E1, 1);
        fishGraphics.fillEllipse(15, 15, 20, 12);
        fishGraphics.fillTriangle(5, 15, 0, 10, 0, 20);
        fishGraphics.fillStyle(0xffffff, 1);
        fishGraphics.fillCircle(20, 12, 2);
        fishGraphics.generateTexture('fish', 30, 30);

        // 創建物品紋理 - 愛心
        const heartGraphics = this.make.graphics({ x: 0, y: 0, add: false });
        heartGraphics.fillStyle(0xff69b4, 1);
        heartGraphics.fillCircle(10, 10, 8);
        heartGraphics.fillCircle(22, 10, 8);
        heartGraphics.fillTriangle(2, 12, 30, 12, 16, 30);
        heartGraphics.generateTexture('heart', 32, 32);

        // 創建物品紋理 - 星星
        const starGraphics = this.make.graphics({ x: 0, y: 0, add: false });
        starGraphics.fillStyle(0xffd700, 1);
        const starPoints = [];
        for (let i = 0; i < 10; i++) {
            const radius = i % 2 === 0 ? 15 : 7;
            const angle = (Math.PI * 2 * i) / 10 - Math.PI / 2;
            starPoints.push(16 + Math.cos(angle) * radius);
            starPoints.push(16 + Math.sin(angle) * radius);
        }
        starGraphics.fillPoints(starPoints, true, true);
        starGraphics.generateTexture('star', 32, 32);
    }
}

// ==========================================
// 遊戲配置與初始化
// ==========================================
const config = {
    type: Phaser.AUTO,
    width: GAME_CONFIG.width,
    height: GAME_CONFIG.height,
    parent: 'game-container',
    backgroundColor: '#000000',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [BootScene, MenuScene, GameScene, BossScene, VictoryScene]
};

// 等待 DOM 加載完成後初始化遊戲
document.addEventListener('DOMContentLoaded', () => {
    const game = new Phaser.Game(config);
});