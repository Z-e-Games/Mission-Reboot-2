
function randomNumBetween0and100PerSec(){
    randomNumMonsterColor = randomNum(0,100)
    return randomNumMonsterColor
}


function spawnMonsters() {
        setInterval(() => {
        const radius = Math.random() * (70 - 10) + 10
        
        let x 
        let y 
        if (Math.random() < 0.5){
           x = Math.random() < 0.5 ? 0  : canvas.width
            y = Math.random() * canvas.height
        }else{
            x = Math.random() * canvas.width
            y = Math.random() < 0.5 ? 0  : canvas.height 
        }

    let angle = Math.atan2(player.y - y , player.x - x)

let color = `rgb(${randomNum(0,255)},${randomNum(0,255)},${randomNum(0,255)})`
    
        let velocity = {
            x:Math.cos(angle)*37/radius,
            y:Math.sin(angle)*37/radius
        }


        monsters.push(new Monster(x,y,radius,color,velocity))
    },2500)
}

function animate(){
     animationId = requestAnimationFrame(animate)
    
    
     c.fillStyle ='rgba(0,0,0,0.1)'
     c.fillRect(0,0,canvas.width,canvas.height)

    if(drawBoss === true){
        boss.update()
    }

    player.draw()


    if(powerUpMode === true){
        playerPowerUp.draw()
    }
    if(tripleShootPwrUp === true){
      tripleShooterPlayer.draw()
    }

    if(shieldPwrUp === true){
        sheildPlayer.draw()
    } 

    if(invinceibleMode === true){
        invinciblePlayer.draw()
    }

    if (shockwavePWRUp === true){
        shockwavePWRUpPlayer.draw()
    }
    if(localStorage.getItem('has elf skin') === 'yes'){
        elfSkin.draw()
    }
    if(boss.x >= canvas.width){
        boss.sideLenght = 0
        boss.velocity = 0
        if(bossLevel === true){
            score += 200
        }
        bossLevel = false
        guardLevel = true

    }
    monsters.forEach((monster,index) => {
        monster.update()

        const dist = Math.hypot(player.x - monster.x , player.y - monster.y)

        if(dist -monster.radius - player.radius < 0){
            if(shieldPwrUp === true){
                shieldPwrUp = false 
                monsters.splice(index,1)    
                score += randomNum(0,5)
            }else if (invinceibleMode === true){
                monsters.splice(index,1)
            }
            else{
                gameEnded = true
                cancelAnimationFrame(animationId)
                if(localStorage.getItem('high score') < time){
                    localStorage.setItem('high score', time)
                }
                localStorage.setItem('XP',parseInt(localStorage.getItem('XP')) + score)
                localStorage.setItem('has elf skin', 'no')
            }
        }

        

        bullets.forEach((bullet,bulletIndex) =>{
            const dist = Math.hypot(bullet.x - monster.x , bullet.y - monster.y)
            if(bullet.x >= boss.x && drawBoss === true){
                bullets.splice(bulletIndex,1)
                gsap.to(boss,{x:boss.x + 5})
            }
            if(dist -monster.radius - bullet.radius < 0){
                if (monster.radius - 10 > 10){
                    gsap.to(monster, {radius:monster.radius-5})
                    if(tripleShootPwrUp === true){
                      gsap.to(monster , {radius:monster.radius -15})
                    }
                    if(shockwavePWRUp === true){
                        gsap.to(monster,{radius:monster.radius - 17})
                    }
                    setTimeout(() => {
                        bullets.splice(bulletIndex ,1)
                    },0)
                }else{
                    setTimeout(() => {
                        monsters.splice(index,1)
                        bullets.splice(bulletIndex ,1)    
                	score += randomNum(0,5)
                        if(localStorage.getItem('is signed in') === 'yes'){
                            localStorage.setItem('gold coins',parseInt(localStorage.getItem('gold coins')) + parseInt(localStorage.getitem()))
                        }
                    },0)
                    

                }
                /*
                if (bullet.x - bullet.radius < 0){
                    bullets.splice(bulletIndex ,1)
                 }
                 */
            }
        })
    })

    bullets.forEach((bullet,index) => {
        bullet.update()
        if(bullet.x < 0 || bullet.y < 0 || bullet.x > canvas.width || bullet.y > canvas.height){
            bullets.splice(index,1)
        }

    })


    c.font = "23px Comic Sans MS";
    c.fillStyle = 'white'
    c.fillText(`Time survived: ${parseInt(time)} seconds`, 10, 50); 
	c.fillText(`Score: ${parseInt(score)}`,canvas.width/2,50)
}


addEventListener('mousemove',() => {
    yPos = event.clientY
    xPos = event.clientX
})/** addEventListener('click',() =>{
    for(let i = 0;i<4;i++){}
})
if(i >=3){
    clearInterval(shootInterval)
}*/


    addEventListener('click',() =>{
        const angle = Math.atan2(event.clientY-player.y, event.clientX-player.x)
        
        const velocity = {
            x:Math.cos(angle)*5,
            y:Math.sin(angle)*5
        }
      body.requestFullscreen()
      if(tripleShootPwrUp === false){
        bullets.push(new Bullet(player.x,player.y,5,'white',velocity))
      }else if(tripleShootPwrUp === true){
        bullets.push(new Bullet(player.x,player.y,5,'rgb(0,255,0)',velocity))
      }else if(shieldPwrUp === true){
          bullets.push(new Bullet(player.x,player.y,0.5,'rgba(232, 172, 172, 1)',velocity))
      }
      if(playAudio === true){
        clickAudio.play()
        if(localStorage.getItem('hasSquidGameMusic') === 'yes'){
        squidgameBackgroundAudio.loop = true
        squidgameBackgroundAudio.play()
        }
        }
    }
    )

    setInterval(() => {
        time += 1
        if(parseInt(time) === 200){
            bossLevel = true
            drawBoss = true
        }

        if(parseInt(time) === 500){
        }

        if(parseInt(time) === 200 ){
            setInterval(() => {
                if(bossLevel === true){
                const radius = 8
                
                let x = canvas.width
            let y = randomNum(0,canvas.height)
        
            let angle = Math.atan2(player.y - y , player.x - x)
        
            let color = '#66E6FF'
            
                let velocity = {
                    x:Math.cos(angle)*57/radius,
                    y:Math.sin(angle)*57/radius
                }
        
        
                monsters.push(new Monster(x,y,radius,color,velocity))
            }
            },2000)
        }
        
    },1000)

    setInterval(() => {
        if(guardLevel === true && guardsSpawned <= 5){
            guardsSpawned += 1
        const radius = 300
        
        let y 
        if (Math.random() < 0.5){
           x = Math.random() < 0.5 ? 0  : canvas.width
            y = Math.random() * canvas.height
        }else{
            x = Math.random() * canvas.width
            y = Math.random() < 0.5 ? 0  : canvas.height 
        }

    let angle = Math.atan2(player.y - y , player.x - x)

    let color = '#66E6FF'
    
        let velocity = {
            x:Math.cos(angle),
            y:Math.sin(angle)
        }


        monsters.push(new Monster(x,y,radius,color,velocity))
    }
    },2000)

    addEventListener('mousemove',()=> {
        if(powerUpMode === true){
            
        const angle = Math.atan2(event.clientY-player.y, event.clientX-player.x)
        
        const velocity = {
            x:Math.cos(angle)*5,
            y:Math.sin(angle)*5
        }
        bullets.push(new Bullet(player.x,player.y,5,'rgba(0,0,255,0.5)',velocity))
        }
    })

    setInterval(() => {
        if(Math.round(Math.random()*200) === 200){
            playerPowerUp.x = player.x
            playerPowerUp.y = player.y
            powerUpMode = true
        setTimeout(() => {
            powerUpMode = false
        }, parseInt(localStorage.getItem('ms per pwr up')));
        }
        
    }, 1000);

    
            setInterval(() => {
                if(Math.round(Math.random()*500) === 500){
                    sheildPlayer.x = player.x
                    sheildPlayer.y = player.y
            shieldPwrUp = true
                }
            }, 1000);
            
            setInterval(() => {
                gifts.push(new Gift(randomNum(0,canvas.width),randomNum(0,canvas.height)))
            }, 20000);

            setInterval(() => {
                if(Math.round(Math.random()) === 200){
                    tripleShootPwrUp = true
                    tripleShooterPlayer.x = player.x
                    tripleShooterPlayer.y = player.y
                setTimeout(() => {
                    tripleShootPwrUp = false
                }, parseInt(localStorage.getItem('ms per pwr up')));
                }
            }, 1000);

        animate()
        spawnMonsters()

addEventListener('keydown', function(e) {
	var key = e.key || e.keyCode;
 
	switch (key) {
        
		case 'a': case 87:
            if(gameEnded === false){
            gsap.to(player, {x:player.x - 100})
            gsap.to(playerPowerUp, {x:playerPowerUp.x - 100})
            gsap.to(tripleShooterPlayer, {x:tripleShooterPlayer.x - 100})
            gsap.to(sheildPlayer, {x:sheildPlayer.x - 100})
            player.draw()
            if(localStorage.getItem('has elf skin') === 'yes'){
                elfSkin = new ElfSkin(player.x-11,player.y-11)
                elfSkin.draw()
            }
            if(powerUpMode === true){
                playerPowerUp.draw()
            }
            if(tripleShootPwrUp === true){
            tripleShooterPlayer.draw()
            }
        
            if(shieldPwrUp === true){
                
                sheildPlayer.draw()
            } 
        
            if(invinceibleMode === true){
                invinciblePlayer.x -= 10
                invinciblePlayer.draw()
            }
        
            if (shockwavePWRUp === true){
                shockwavePWRUpPlayer.draw()
            }
            monsters.forEach(monster => {
                
                const radius = monster.radius
                
                let angle = Math.atan2(player.y - monster.y , player.x - monster.x)
                monster.velocity = {
                    x:Math.cos(angle)*50/radius,
                    y:Math.sin(angle)*50/radius
                }
        
            });
        }
            break
 
		case 'w': case 38:
            if(gameEnded ===false){
            gsap.to(player, {y:player.y - 50})
            gsap.to(playerPowerUp, {y:playerPowerUp.y - 50})
            gsap.to(tripleShooterPlayer, {y:tripleShooterPlayer.y - 50})
            gsap.to(sheildPlayer, {y:sheildPlayer.y - 50})
            player.draw()
            if(localStorage.getItem('has elf skin') === 'yes'){
                elfSkin = new ElfSkin(player.x-11,player.y-11)
                elfSkin.draw()
            }
            if(powerUpMode === true){
                playerPowerUp.draw()
            }
            if(tripleShootPwrUp === true){
              tripleShooterPlayer.draw()
            }
        
            if(shieldPwrUp === true){
                sheildPlayer.draw()
            } 
        
            if(invinceibleMode === true){
                invinciblePlayer.y -= 10
                invinciblePlayer.draw()
            }
        
            if (shockwavePWRUp === true){
                shockwavePWRUpPlayer.draw()
            }           
             monsters.forEach(monster => {
                
                const radius = monster.radius
                
                let angle = Math.atan2(player.y - monster.y , player.x - monster.x)
                monster.velocity = {
                    x:Math.cos(angle)*50/radius,
                    y:Math.sin(angle)*50/radius
                }
        
            });
        }
			break;
		case 'd': case 68:
            if(gameEnded ===false){
            gsap.to(player, {x:player.x + 50})
            gsap.to(playerPowerUp, {x:playerPowerUp.x + 50})
            gsap.to(tripleShooterPlayer, {x:tripleShooterPlayer.x + 50})
            gsap.to(sheildPlayer, {x:sheildPlayer.x + 50})
            player.draw()
            if(localStorage.getItem('has elf skin') === 'yes'){
                elfSkin = new ElfSkin(player.x-11,player.y-11)
                elfSkin.draw()
            }
            if(powerUpMode === true){
                playerPowerUp.draw()
            }
            if(tripleShootPwrUp === true){
              tripleShooterPlayer.draw()
            }
        
            if(shieldPwrUp === true){
                sheildPlayer.draw()
            } 
        
            if(invinceibleMode === true){
                invinciblePlayer.x += 10
                invinciblePlayer.draw()
            }
        
            if (shockwavePWRUp === true){
                shockwavePWRUpPlayer.draw()
            }
            monsters.forEach(monster => {
                
                const radius = monster.radius
                
                let angle = Math.atan2(player.y - monster.y , player.x - monster.x)
                monster.velocity = {
                    x:Math.cos(angle)*50/radius,
                    y:Math.sin(angle)*50/radius
                }
        
            });
        }
			break;
		case 's': case 83:
            if(gameEnded === false){
            gsap.to(player, {y:player.y + 50})
            gsap.to(playerPowerUp, {y:playerPowerUp.y + 50})
            gsap.to(tripleShooterPlayer, {y:tripleShooterPlayer.y + 50})
            gsap.to(sheildPlayer, {y:sheildPlayer.y + 50})
            player.draw()
            if(localStorage.getItem('has elf skin') === 'yes'){
                elfSkin = new ElfSkin(player.x-11,player.y-11)
                elfSkin.draw()
            }
            if(powerUpMode === true){
                playerPowerUp.draw()
            }
            if(tripleShootPwrUp === true){
                tripleShooterPlayer.draw()
            }
        
            if(shieldPwrUp === true){
                sheildPlayer.draw()
            }  
        
            if(invinceibleMode === true){
                invinciblePlayer.y += 10
                invinciblePlayer.draw()
            }
        
            if (shockwavePWRUp === true){
                shockwavePWRUpPlayer.draw()
            }
            monsters.forEach(monster => {
                
                const radius = monster.radius
                
                let angle = Math.atan2(player.y - monster.y , player.x - monster.x)
                monster.velocity = {
                    x:Math.cos(angle)*50/radius,
                    y:Math.sin(angle)*50/radius
                }
        
            });
        }
            break;
            let hi = 'dummy text'

	}})
