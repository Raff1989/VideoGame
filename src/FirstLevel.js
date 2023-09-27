import { Enemy } from "./Enemy.js";
import { Enemy2 } from "./Enemy2.js";
import { Enemy3 } from "./Enemy3.js";
import { Enemy4 } from "./Enemy4.js";
import { Player } from "./Player.js";

export class FirstLevel extends Phaser.Scene{
    player;
    enemies;
    bullets;

    //serve per caricare gli asset(png) nel livello - primo ad essere eseguito
    preload(){
        this.load.spritesheet('player','assets/ship_0000.png',{frameWidth:200,frameHeight:200});
        this.load.spritesheet('enemy','assets/ship_0015.png',{frameWidth:300,frameHeight:300});
        this.load.spritesheet('enemy2','assets/ship_0016.png',{frameWidth:100,frameHeight:100});
        this.load.spritesheet('enemy3','assets/ship_0020.png',{frameWidth:100,frameHeight:100});
        this.load.spritesheet('enemy4','assets/ship_0022.png',{frameWidth:100,frameHeight:100});
        this.load.image('bullet','assets/spaceMissiles_001.png');
    }

    //eseguito subito dopo il preload
    //metodo utilizzato da Phaser per generare il livello
    create(){
        this.enemies = this.physics.add.group();
        this.bullets = this.physics.add.group();

        this.player = new Player(this,500,700,'player');
        this.player.setRotation(Phaser.Math.DegToRad(0)); // Imposta la rotazione iniziale
        
        /* this.cameras.main.startFollow(this.player) */

        

        this.time.addEvent({
            delay: 5000,
            loop: true,
            callback: ()=>{
                new Enemy(this,0,0,'enemy')
                new Enemy2(this,1000,0,'enemy2')
                new Enemy3(this,500,0,'enemy3')
                new Enemy4(this,0,1000,'enemy4')
                
            }
        });
       

        this.anims.create({
            key:'wolk',
            frames:this.anims.generateFrameNumbers('player',{frames:[0,1,2,3,4,5,6,7,8]}),
            frameRate:8,
            repeat:-1,


        })

        this.input.on('pointermove', (pointer) => {
            // Calcola l'angolo tra il giocatore e il mouse
            const angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, pointer.x, pointer.y);
        
            // Applica la rotazione al giocatore
            this.player.setRotation(angle);
        });

        

        
        
    }


    //eseguito in continuazione - game loop
    //gestisce la logica del gioco
    update(){

        
        this.enemies.children.iterate((enemy)=>{
            this.physics.moveToObject(enemy, this.player);
        });

        this.physics.collide(this.enemies,this.player, ()=>{
            this.scene.restart();
        });

       this.physics.collide(this.enemies,this.bullets, (enemy,bullet)=>{
            enemy.destroy();
            bullet.destroy();
        });
    
        this.bullets.children.iterate((bullet) => {
            let closestEnemy = null;
            let closestDistance = Number.MAX_VALUE;
        
            this.enemies.children.iterate((enemy) => {
                const distance = Phaser.Math.Distance.Between(bullet.x, bullet.y, enemy.x, enemy.y);
        
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestEnemy = enemy;
                }
            });
        
            if (closestEnemy) {
                const angle = Phaser.Math.Angle.Between(bullet.x, bullet.y, closestEnemy.x, closestEnemy.y);
                bullet.setRotation(angle);
            }
        });
        
       
        
    }


}

