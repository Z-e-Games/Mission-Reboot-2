if(storyMode === true){


    
    firstMessageFromRealWorld.style.display='block'

setTimeout(() =>{
    setTimeout(() => {
        monsters.forEach((index)=> {
            monsters.splice(index,1)
        });
        cancelAnimationFrame(animationId)

        secondMessage.style.display = 'block'
        setTimeout(() => {
            secondMessage.style.display = 'none'
            thirdMessage.style.display = 'block'
            setTimeout(() => {
                thirdMessage.style.display ='none'
                fourthMessage.style.display ='block'
                setTimeout(() => {
                    fourthMessage.style.display ='none'
                    fifthMessage.style.display = 'block'
                    setTimeout(() =>{
                        fifthMessage.style.display ='none'
                        sixthMessage.style.display ='block'
                        setTimeout(() => {
                            tripleShooterPlayer.x = player.x
                            tripleShooterPlayer.y = player.y
                            tripleShootPwrUp = true
                            animate()
                            sixthMessage.style.display ='none'
                            setTimeout(() => {
                                playerPowerUp.x = player.x
                                playerPowerUp.y = player.y
                                powerUpMode = true
                                setTimeout(() => {
                                    powerUpMode = false
                                },15000)
                                seventhMessage.style.display = 'block'
                                setInterval(() => {
                                    if(numberOfMonstersSpawnedInBossMode < 25){
                                    const radius = Math.random() * canvas.height + canvas.height/2
                            
                                    if (Math.random() < 0.5){
                                        x = Math.random() < 0.5 ? 0-radius : canvas.width + radius
                                        y = Math.random() * canvas.height
                                    }else{
                                        x = Math.random() * canvas.width
                                        y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
                                    }
                                    

                                    let angle = Math.atan2(playerY - y , playerX - x)

                                    const color = `hsl(${Math.random()*360},${Math.random()*100}%,50%)`
                                
                                    let velocity = {
                                        x:Math.cos(angle)*75/radius,
                                        y:Math.sin(angle)*75/radius
                                    }
                            
                                    monsters.push(new Monster(x,y,radius,color,velocity))
                                    numberOfMonstersSpawnedInBossMode += 1
                                    c.fillStyle ='rgba(24,0,36,0.5)'
                                    c.fillRect(0,0,canvas.width,canvas.height)
                                    }else{
                                        drawBoss = true
                                    }

                                        setInterval(() => {
                                            const radius = 7
                                            let x = canvas.width
                                            let y = randomNum(canvas.height/2-150,canvas.height/2+150)
                                    
                                    
                                            const color = `rgb(24,0,36)`
                                    
                                            const angle = Math.atan2(playerY - y , playerX - x)
                                        
                                            let velocity = {
                                                x:Math.cos(angle)*50/radius,
                                                y:Math.sin(angle)*50/radius
                                            }
                                    
                                            monsters.push(new Monster(x,y,radius,color,velocity))
                                
                                            },2000)
                                    

                                    setInterval(() => {
                                        tripleShooterPlayer.x = player.x
                                        tripleShooterPlayer.y = player.y
                                        tripleShootPwrUp = true
                                    }, 25000);
                                    setTimeout(() => {
                                        seventhMessage.style.display ='none'
                                    },3700);
                                },5000);
                            },1)
                        })
                    },13)
                },7)
            },10)
        },5)
    },300000)
    firstMessageFromRealWorld.style.display = 'none'


canvas.width = window.innerWidth
canvas.height = window.innerHeight

let drawBoss = false


class OnesAndZeros{
    constructor(x,y,color){
        this.x = x 
        this.y =y
        this.color = color 
    }

    draw(){
        c.font = "23px Ariel";
        c.fillStyle = 'green'
        c.fillText(`${parseInt(Math.random())}`,this.x,this.y);
    }
}
class Boss {
    constructor(x,y,sideLenght,color){
        this.x = x 
        this.y =y
        this.sideLenght = sideLenght
        this.color = color 
    }

    draw(){
        c.beginPath()
        c.rect(this.x,this.y,this.sideLenght,this.sideLenght)
        c.fillStyle = this.color
        c.fill()
    }
}


const onesAndZeros = []


    setInterval(() => {
        let oneZeroY = canvas.height
        let oneZeroX = canvas.width
        onesAndZeros.push(new OnesAndZeros(oneZeroX,oneZeroY,'green'))
        onesAndZeros.forEach((oneAndZero) => {
            oneAndZero.draw()
        })
    },500)

function spawnMonsters() {
        setInterval(() => {
        const radius = Math.random() * (70 - 10) + 10
        
        let x 
    let y 
    if (Math.random() < 0.5){
       x = Math.random() < 0.5 ? 0 + radius + 1 : canvas.width - radius -1
        y = Math.random() * canvas.height
    }else{
        x = Math.random() * canvas.width
        y = Math.random() < 0.5 ? 0 + 1 + radius : canvas.height -1 - radius 
    }

    let angle = Math.atan2(playerY - y , playerX - x)


        const color = `hsl(${Math.random()*360},${Math.random()*100}%,50%)`
    
        let velocity = {
            x:Math.cos(angle)*50/radius,
            y:Math.sin(angle)*50/radius
        }


        monsters.push(new Monster(x,y,radius,color,velocity))
    },2500 - time*time * 0.85)
}

function animate(){
    
    monsters.forEach(monster => {
    let firstTime = false
    const monsterWallDist = Math.hypot(canvas.width - monster.x , canvas.height - monster.y)
    if(firstTime === true && monster.x > canvas.width- monster.radius || monster.x<monster.radius){
        monster.velocity.x = -monster.velocity.x
        firstTime = false
    }
    if(firstTime === true && monster.x < canvas.width- monster.radius || monster.x < monster.radius){
        monster.velocity.x = -monster.velocity.x
        firstTime = false
    }
    if(firstTime === true && monster.y > canvas.height- monster.radius || monster.y<monster.radius ){
        monster.velocity.y = -monster.velocity.y
        firstTime = false
    }
    if(firstTime === true && monster.y < canvas.height- monster.radius || monster.y<monster.radius ){
        monster.velocity.y = -monster.velocity.y
        firstTime = false
    }
    });
    

    
    c.fillStyle ='rgba(0,0,0,0.1)'
    c.fillRect(0,0,canvas.width,canvas.height)

    if(drawBoss === true){
        boss.draw()
        }
        


    c.font = "23px Comic Sans MS";
    c.fillStyle = 'white'
    c.fillText(`Time survived: ${parseInt(time)} seconds`, 10, 50);

    animationId = requestAnimationFrame(animate)


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
    monsters.forEach((monster,index) => {
        monster.update()

        const dist = Math.hypot(player.x - monster.x , player.y - monster.y)

        if(dist -monster.radius - player.radius < 0){
            if(shieldPwrUp === true){
                shieldPwrUp = false 
                monsters.splice(index,1)
            }else if (invinceibleMode === true){
                monsters.splice(index,1)
            }
            else{
                cancelAnimationFrame(animationId)
                if(localStorage.getItem('high score') < time){
                    localStorage.setItem('high score', time)
                }
            }
        }

        bullets.forEach((bullet,bulletIndex) =>{
            const dist = Math.hypot(bullet.x - monster.x , bullet.y - monster.y)

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
                        if(localStorage.getItem('is signed in') === 'yes'){
                            localStorage.setItem('gold coins',parseInt(localStorage.getItem('gold coins')) + 1)
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

    bullets.forEach((bullet) => {
        bullet.update()
    })



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
        const angle = Math.atan2(event.clientY-playerY, event.clientX-playerX)
        
        const velocity = {
            x:Math.cos(angle)*5,
            y:Math.sin(angle)*5
        }
      body.requestFullscreen()
      if(tripleShootPwrUp === false){
        bullets.push(new Bullet(playerX,playerY,5,'white',velocity))
      }else if(tripleShootPwrUp === true){
        bullets.push(new Bullet(playerX,playerY,5,'rgb(0,255,0)',velocity))
      }else if(shieldPwrUp === true){
          bullets.push(new Bullet(playerX,playerY,0.5,'rgba(232, 172, 172, 1)',velocity))
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
        time += 0.1
    },100)


    addEventListener('mousemove',()=> {
        if(powerUpMode === true){
            
        const angle = Math.atan2(event.clientY-playerY, event.clientX-playerX)
        
        const velocity = {
            x:Math.cos(angle)*5,
            y:Math.sin(angle)*5
        }
        bullets.push(new Bullet(playerX,playerY,5,'rgba(0,0,255,0.5)',velocity))
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
                if(Math.round(Math.random()*200) === 200){
                    tripleShooterPlayer.x = player.x
                    tripleShooterPlayer.y = player.y
                    tripleShootPwrUp = true
                setTimeout(() => {
                    tripleShootPwrUp = false
                }, parseInt(localStorage.getItem('ms per pwr up')));
                }
            }, 1000);

        animate()
        spawnMonsters()
    },10)

}

addEventListener('keydown', function(e) {
	var key = e.key || e.keyCode;
	switch (key) {
		case 'a': case 87:
            playerX -= 10
            player.x -= 10
            player.draw()
            if(powerUpMode === true){
                playerPowerUp.x -= 10
                playerPowerUp.draw()
            }
            if(tripleShootPwrUp === true){
              tripleShooterPlayer.x -=10
              tripleShooterPlayer.draw()
            }
        
            if(shieldPwrUp === true){
                sheildPlayer.x -= 10
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
                
                let angle = Math.atan2(playerY - monster.y , playerX - monster.x)
                monster.velocity = {
                    x:Math.cos(angle)*50/radius,
                    y:Math.sin(angle)*50/radius
                }
        
            });
            break
		case 'w': case 38:
            playerY -= 10
            player.y -= 10
            player.draw()
            if(powerUpMode === true){
                playerPowerUp.y -= 10
                playerPowerUp.draw()
            }
            if(tripleShootPwrUp === true){
              tripleShooterPlayer.y -=10
              tripleShooterPlayer.draw()
            }
        
            if(shieldPwrUp === true){
                sheildPlayer.y -= 10
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
                
                let angle = Math.atan2(playerY - monster.y , playerX - monster.x)
                monster.velocity = {
                    x:Math.cos(angle)*50/radius,
                    y:Math.sin(angle)*50/radius
                }
        
            });
			break;
		case 'd': case 68:
            playerX += 10
            player.x += 10
            player.draw()
            if(powerUpMode === true){
                playerPowerUp.x += 10
                playerPowerUp.draw()
            }
            if(tripleShootPwrUp === true){
              tripleShooterPlayer.x +=10
              tripleShooterPlayer.draw()
            }
        
            if(shieldPwrUp === true){
                sheildPlayer.x += 10
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
                
                let angle = Math.atan2(playerY - monster.y , playerX - monster.x)
                monster.velocity = {
                    x:Math.cos(angle)*50/radius,
                    y:Math.sin(angle)*50/radius
                }
        
            });
			break;
		case 's': case 83:
            playerY += 10
            player.y += 10
            player.draw()
            if(powerUpMode === true){
                playerPowerUp.y += 10
                playerPowerUp.draw()
            }
            if(tripleShootPwrUp === true){
              tripleShooterPlayer.y +=10
              tripleShooterPlayer.draw()
            }
        
            if(shieldPwrUp === true){
                sheildPlayer.y += 10
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
                
                let angle = Math.atan2(playerY - monster.y , playerX - monster.x)
                monster.velocity = {
                    x:Math.cos(angle)*50/radius,
                    y:Math.sin(angle)*50/radius
                }
        
            });
            break;
            let hi = 'dummy text'

	}})