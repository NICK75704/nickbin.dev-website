class Ball {
    constructor(x, y, vel, r, id) {
        this.x = x;
        this.y = y;
        this.vel = vel;
        this.r = r; 
        this.id = id; 

        this.maxSpeed = 50; 
        this.red = random(100, 255); 
        this.green = random(100, 255); 
        this.blue = random(100, 255); 
    } 

    ballDraw() { 
        fill(this.red, this.green, this.blue); 
        ellipse(this.x, this.y, this.r, this.r); 
    } 

    update() { 
        // max speed 
        if (this.vel.mag() > this.maxSpeed) { 
            this.vel.setMag(this.maxSpeed); 
        } 

        this.vel.x *= 0.99; 
        this.vel.y += 0.3; 
        this.x += this.vel.x; 
        this.y += this.vel.y; 
    } 

    checkCollision() { 
        // collision with other balls 
        for (let i = 0; i < balls.length; i++) { 
            if (balls[i].id != this.id) { 
                // let d = dist(this.x, this.y, balls[i].x, balls[i].y); 
                // if (d < (this.r + balls[i].r)/2) { 
                //     let temp = this.vel.copy(); 
                //     this.vel = balls[i].vel.copy(); 
                //     balls[i].vel = temp.copy(); 
                    
                // } 
                let dx = balls[i].x - this.x;  
                let dy = balls[i].y - this.y;  
                let distance = sqrt(dx * dx + dy * dy); 
                let minDist = this.r/2 + balls[i].r/2; 

                if (distance < minDist) { 
                    let angle = atan2(dy, dx); // angle between the two objects 
                    let targetX = this.x + cos(angle) * minDist; // x position of the target 
                    let targetY = this.y + sin(angle) * minDist; // y position of the target 
                    let ax = (targetX - balls[i].x) * 1; // acceleration x 
                    let ay = (targetY - balls[i].y) * 1; // acceleration y 

                    this.vel.x -= ax; // apply acceleration 
                    this.vel.x *= 0.85; 
                    this.vel.y -= ay; // apply acceleration 
                    this.vel.y *= 0.85; 
                    balls[i].vel.x += ax; // apply acceleration 
                    balls[i].vel.x *= 0.85; 
                    balls[i].vel.y += ay; // apply acceleration 
                    balls[i].vel.y *= 0.85; 
                } 
            } 
        } 

        if (this.x < 0) {
            this.vel.x *= -0.85; 
            this.x = 0; 
        }
        if (this.x > width) { 
            this.vel.x *= -0.85; 
            this.x = width; 
        } 
        if (this.y < 0) { 
            this.vel.y *= -0.85; 
            this.y = 0; 
        } 
        if (this.y > height) { 
            this.vel.y *= -0.85; 
            this.y = height; 
        } 
    } 
}

class Brick {
    constructor(x, y, vel, r, id) {
        this.x = x;
        this.y = y;
        this.vel = vel;
        this.r = r; 
        this.id = id; 

        this.maxSpeed = 50; 
        this.red = random(100, 255); 
        this.green = random(100, 255); 
        this.blue = random(100, 255); 
    } 

    brickDraw() { 
        fill(this.red, this.green, this.blue); 
        rect(this.x, this.y, this.r, this.r); 
    } 

    update() { 
        // max speed 
        if (this.vel.mag() > this.maxSpeed) { 
            this.vel.setMag(this.maxSpeed); 
        } 

        this.vel.x *= 0.99; 
        this.vel.y += 0.3; 
        this.x += this.vel.x; 
        this.y += this.vel.y; 
    } 

    checkCollision() { 
        // collision with other bricks 
        for (let i = 0; i < bricks.length; i++) { 
            if (bricks[i].id != this.id) { 
                // let d = dist(this.x, this.y, bricks[i].x, bricks[i].y); 
                // if (d < (this.r + bricks[i].r)/2) { 
                //     let temp = this.vel.copy(); 
                //     this.vel = bricks[i].vel.copy(); 
                //     bricks[i].vel = temp.copy(); 
                    
                // } 
                let dx = bricks[i].x - this.x;  
                let dy = bricks[i].y - this.y;  
                let distance = sqrt(dx * dx + dy * dy); 
                let minDist = this.r/2 + bricks[i].r/2; 

                if (distance < minDist) { 
                    let angle = atan2(dy, dx); // angle between the two objects 
                    let targetX = this.x + cos(angle) * minDist; // x position of the target 
                    let targetY = this.y + sin(angle) * minDist; // y position of the target 
                    let ax = (targetX - bricks[i].x) * 1; // acceleration x 
                    let ay = (targetY - bricks[i].y) * 1; // acceleration y 

                    this.vel.x -= ax; // apply acceleration 
                    this.vel.x *= 0.85; 
                    this.vel.y -= ay; // apply acceleration 
                    this.vel.y *= 0.85; 
                    bricks[i].vel.x += ax; // apply acceleration 
                    bricks[i].vel.x *= 0.85; 
                    bricks[i].vel.y += ay; // apply acceleration 
                    bricks[i].vel.y *= 0.85; 
                } 
            } 
        } 

        if (this.x < 0) {
            this.vel.x *= -0.85; 
            this.x = 0; 
        }
        if (this.x > width) { 
            this.vel.x *= -0.85; 
            this.x = width; 
        } 
        if (this.y < 0) { 
            this.vel.y *= -0.85; 
            this.y = 0; 
        } 
        if (this.y > height) { 
            this.vel.y *= -0.85; 
            this.y = height; 
        } 
    } 
}

let currMousePos; 
let balls = [];
let bricks = []; 

function setup() {
    createCanvas(800, 400); 
} 

function draw() {
    background(0); 
    noStroke(); 

    if (mouseIsPressed) {
        gradientLine(currMousePos.x, currMousePos.y, mouseX, mouseY, 9, 1, 50); 
        // line(currMousePos.x, currMousePos.y, mouseX, mouseY);  
    } 

    balls.forEach(ball => {
        ball.checkCollision(); 
        ball.update();  
        ball.ballDraw(); 
    })
    bricks.forEach(brick => {
        brick.checkCollision(); 
        brick.update();  
        brick.brickDraw(); 
    });
} 

// function brickDraw() {
//     background(0); 
//     noStroke(); 

//     if (mouseIsPressed) {
//         gradientLine(currMousePos.x, currMousePos.y, mouseX, mouseY, 9, 1, 50); 
//         // line(currMousePos.x, currMousePos.y, mouseX, mouseY);  
//     } 
//     bricks.forEach(brick => {
//         brick.checkCollision(); 
//         brick.update();  
//         brick.brickDraw(); 
//     });
// } 

function gradientLine(start_x, start_y, end_x, end_y, start_weight, end_weight, segments) {
    let prev_loc_x = start_x;
    let prev_loc_y = start_y;
    for (let i = 1; i <= segments; i++) {
        let cur_loc_x = lerp(start_x, end_x, i / segments);
        let cur_loc_y = lerp(start_y, end_y, i / segments);
        push();
        strokeWeight(lerp(start_weight, end_weight, i / segments)); 
        stroke(lerp(255, 0, i / segments)); 
        line(prev_loc_x, prev_loc_y, cur_loc_x, cur_loc_y);
        pop();
        prev_loc_x = cur_loc_x;
        prev_loc_y = cur_loc_y;
    }
}

function mousePressed() {
    currMousePos = createVector(mouseX, mouseY); 
}

function mouseReleased() {
    let vel = createVector(currMousePos.x - mouseX, currMousePos.y - mouseY).mult(0.25); 
    console.log(vel); 
    let ball = new Ball(currMousePos.x, currMousePos.y, vel, 35, balls.length); 
    balls.push(ball); 
} 

function keyTyped() {
    if (key === " "){
        let brick = new brick(10, 10, 1, 35, 10);
        bricks.push(bricks);
    }
}