if(localStorage.getItem('mode') === 'endless mode'){
    alert('endless')
    let clearHighScore = confirm('Would you like to clear your high score. Your current high score is'+ parseInt(localStorage.getItem('high score')))

    if(clearHighScore === true){
        localStorage.setItem('high score', 0)
    }

canvas.width = window.innerWidth
canvas.height = window.innerHeight

class GlitchDrift{
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

class Turret {
    constructor(x,y,radius,color){
        this.x = x 
        this.y =y
        this.radius = radius
        this.color = color 
    }

    draw(){
        c.beginPath()
        c.arc(this.x,this.y,this.radius,0,Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }
}

class Player {
    constructor(x,y,radius,color){
        this.x = x 
        this.y =y
        this.radius = radius
        this.color = color 
    }

    draw(){
        c.beginPath()
        c.arc(this.x,this.y,this.radius,0,Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }
}

class Bullet {
    constructor(x,y,radius,color,velocity){
        this.x = x
        this.y = y 
        this.radius = radius 
        this.color = color 
        this.velocity = velocity
    }

    draw(){
        c.beginPath()
        c.arc(this.x,this.y,this.radius,0,Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }

    update (){
        this.draw()
        this.x+=this.velocity.x 
        this.y+=this.velocity.y
    }
}

class Monster {
    constructor(x,y,radius,color,velocity){
        this.x = x
        this.y = y 
        this.radius = radius 
        this.color = color 
        this.velocity = velocity
    }

    draw(){
        c.beginPath()
        c.arc(this.x,this.y,this.radius,0,Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }

    update (){
        this.draw()
        this.x+=this.velocity.x 
        this.y+=this.velocity.y
    }
}

class Particle {
    constructor(x,y,radius,color,velocity){
        this.x = x
        this.y = y 
        this.radius = radius 
        this.color = color 
        this.velocity = velocity
    }

    draw(){
        c.beginPath()
        c.arc(this.x,this.y,this.radius,0,Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }

    update (){
        this.draw()
        this.x+=this.velocity.x 
        this.y+=this.velocity.y
    }
}




function spawnMonsters() {
    setInterval(() => {
        const radius = Math.random() * (70 - 10) + 10
        let x 
        let y 

        if (Math.random() < 0.5){
            x = Math.random() < 0.5 ? 0-radius : canvas.width + radius
            y = Math.random() * canvas.height
        }else{
            x = Math.random() * canvas.width
            y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
        }

        const color = `hsl(${Math.random()*360},${Math.random()*100}%,50%)`

        const angle = Math.atan2(canvas.height/2 - y , canvas.width/2 - x)
    
        let velocity = {
            x:Math.cos(angle)*50/radius,
            y:Math.sin(angle)*50/radius
        }

        monsters.push(new Monster(x,y,radius,color,velocity))
    },3000 - (parseInt(localStorage.getItem('high score'))*2))
}
let animationId
function animate(){
    c.font = "23px Comic Sans MS";
    c.fillStyle = 'white'
    c.fillText(`Time survived: ${parseInt(time)} seconds`, 10, 50);

    c.fillText(`Longest Survived: ${parseInt(localStorage.getItem('high score'))} seconds`,canvas.width - 375, 50)

    animationId = requestAnimationFrame(animate)
    c.fillStyle ='rgba(0,0,0,0.1)'
    c.fillRect(0,0,canvas.width,canvas.height)
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
                      gsap.to(monster , {radius:monster.radius -10})
                    }
                    setTimeout(() => {
                        bullets.splice(bulletIndex ,1)
                    },0)
                }else{
                    setTimeout(() => {
                        monsters.splice(index,1)
                        bullets.splice(bulletIndex ,1)
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

let yPos
let xPos

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
        const angle = Math.atan2(event.clientY-canvas.height/2, event.clientX-canvas.width/2)
        
        const velocity = {
            x:Math.cos(angle)*5,
            y:Math.sin(angle)*5
        }
      body.requestFullscreen()
      if(tripleShootPwrUp === false){
        bullets.push(new Bullet(canvas.width/2,canvas.height/2,5,'white',velocity))
      }else if(tripleShootPwrUp === true){
        bullets.push(new Bullet(canvas.width/2,canvas.height/2,5,'rgb(0,255,0)',velocity))
      }
      if(playAudio === true){
        clickAudio.play()
        }
    }
    )
/**
    addEventListener('click',() =>{
      if(tripleShootPwrUp === true){
        const angle = Math.atan2(event.clientY-canvas.height/2, event.clientX-canvas.width/2)
        
        const velocity = {
            x:Math.cos(angle)*5,
            y:Math.sin(angle)*5
        }
      body.requestFullscreen()
        setTimeout(() => {
        bullets.push(new Bullet(canvas.width/2,canvas.height/2,5,'rgb(0,255,0)',velocity))
        },0)
        setTimeout(() => {
          bullets.push(new Bullet(canvas.width/2,canvas.height/2.5,'rgb(0,255,0)',velocity))
        },100)
        setTimeout(() => {
          bullets.push(new Bullet(canvas.width/2,canvas.height/2.5,'rgb(0,255,0)',velocity))
        },200)
      }
                
    }
    )**/
    setInterval(() => {
        time += 0.1
    },100)


    addEventListener('mousemove',()=> {
        if(powerUpMode === true){
            
        const angle = Math.atan2(event.clientY-canvas.height/2, event.clientX-canvas.width/2)
        
        const velocity = {
            x:Math.cos(angle)*5,
            y:Math.sin(angle)*5
        }
        bullets.push(new Bullet(canvas.width/2,canvas.height/2,5,'rgba(0,0,255,0.5)',velocity))
        }
    })

    setInterval(() => {
        if(Math.round(Math.random()*200) === 200){
            powerUpMode = true
        setTimeout(() => {
            powerUpMode = false
        }, 25000);
        }
    }, 1000);

    
    setInterval(() => {
        if(Math.round(Math.random()*500) === 500){
            shieldPwrUp = true
        }
    }, 1000);


        setInterval(() => {
        if(Math.round(Math.random()*200) === 200){
            tripleShootPwrUp = true
        setTimeout(() => {
            tripleShootPwrUp = false
        }, 25000);
        }
    }, 1000);

animate()
spawnMonsters()
}
