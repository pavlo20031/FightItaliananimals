const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

// Завантажуємо вибраного персонажа
const selectedCharacter = localStorage.getItem("selectedCharacter");

// Гравець
const player = {
  x: canvas.width / 2 - 25,
  y: canvas.height - 50,
  width: 50,
  height: 50,
  speed: 5,
  sprite: new Image(), // Зображення персонажа
};

// Встановлюємо зображення залежно від вибраного персонажа
if (selectedCharacter === "Tralalero Tralala") {
  player.sprite.src = "./img/character1.png";
} else if (selectedCharacter === "Bombardiro Crocodilo") {
  player.sprite.src = "./img/character2.png";
} else if (selectedCharacter === "Bobrito Bandito") {
  player.sprite.src = "./img/character3.png";
} else {
  player.sprite.src = ""; // Якщо персонаж не обраний, залишаємо пустим
}

// Снаряди
const bullets = [];
const bulletSpeed = 7;

// "Капці" Tralalero Tralala
const blueSlippers = [];
const slipperSpeed = 5;

// Вороги
const enemies = [];
const enemySpeed = 2;
let spawnInterval = 1500;

// Рахунок
let score = 0;

// Управління клавішами
const keys = {};
document.addEventListener("keydown", (e) => {
  keys[e.key] = true;
});
document.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

// Створення ворогів
function spawnEnemy() {
  const enemy = {
    x: Math.random() * (canvas.width - 50),
    y: -50,
    width: 50,
    height: 50,
    color: "red",
  };
  enemies.push(enemy);
}

// Оновлення снарядів
function updateBullets() {
  bullets.forEach((bullet, index) => {
    bullet.y -= bulletSpeed;
    if (bullet.y + bullet.height < 0) {
      bullets.splice(index, 1);
    }
  });
}

// Оновлення "синіх капців"
function updateSlippers() {
  blueSlippers.forEach((slipper, index) => {
    slipper.y -= slipperSpeed;
    slipper.angle += 0.1;

    if (slipper.y + slipper.height < 0) {
      blueSlippers.splice(index, 1);
    }
  });
}

// Оновлення ворогів
function updateEnemies() {
  enemies.forEach((enemy, index) => {
    enemy.y += enemySpeed;

    if (enemy.y > canvas.height) {
      enemies.splice(index, 1);
      endGame();
    }

    if (
      enemy.x < player.x + player.width &&
      enemy.x + enemy.width > player.x &&
      enemy.y < player.y + player.height &&
      enemy.y + enemy.height > player.y
    ) {
      endGame();
    }
  });
}

// Перевірка зіткнень
function checkCollisions() {
  bullets.forEach((bullet, bIndex) => {
    enemies.forEach((enemy, eIndex) => {
      if (
        bullet.x < enemy.x + enemy.width &&
        bullet.x + bullet.width > enemy.x &&
        bullet.y < enemy.y + enemy.height &&
        bullet.y + bullet.height > enemy.y
      ) {
        bullets.splice(bIndex, 1);
        enemies.splice(eIndex, 1);
        score += 10;
      }
    });
  });

  blueSlippers.forEach((slipper, sIndex) => {
    enemies.forEach((enemy, eIndex) => {
      if (
        slipper.x < enemy.x + enemy.width &&
        slipper.x + slipper.width > enemy.x &&
        slipper.y < enemy.y + enemy.height &&
        slipper.y + slipper.height > enemy.y
      ) {
        blueSlippers.splice(sIndex, 1);
        enemies.splice(eIndex, 1);
        score += 20; // Унікальна атака дає більше очок
      }
    });
  });
}

// Оновлення гравця
function updatePlayer() {
  if (keys["ArrowLeft"] && player.x > 0) {
    player.x -= player.speed;
  }
  if (keys["ArrowRight"] && player.x + player.width < canvas.width) {
    player.x += player.speed;
  }
}

// Малювання гравця
function drawPlayer() {
  if (player.sprite.src) {
    ctx.drawImage(player.sprite, player.x, player.y, player.width, player.height);
  } else {
    ctx.fillStyle = "green";
    ctx.fillRect(player.x, player.y, player.width, player.height);
  }
}

// Малювання "синіх капців"
function drawSlippers() {
  blueSlippers.forEach((slipper) => {
    ctx.save();
    ctx.translate(slipper.x + slipper.width / 2, slipper.y + slipper.height / 2);
    ctx.rotate(slipper.angle);
    ctx.fillStyle = slipper.color;
    ctx.fillRect(-slipper.width / 2, -slipper.height / 2, slipper.width, slipper.height);
    ctx.restore();
  });
}

// Оновлення стану гри
function update() {
  updatePlayer();
  updateBullets();
  updateEnemies();
  if (selectedCharacter === "Tralalero Tralala") {
    updateSlippers();
  }
  checkCollisions();
}

// Малювання
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPlayer();
  bullets.forEach((bullet) => {
    ctx.fillStyle = bullet.color;
    ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
  });

  if (selectedCharacter === "Tralalero Tralala") {
    drawSlippers();
  }

  enemies.forEach((enemy) => {
    ctx.fillStyle = enemy.color;
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
  });

  document.getElementById("score").textContent = "Score: " + score;
}

// Кінець гри
function endGame() {
  alert("Game Over! Final Score: " + score);

  const highScore = parseInt(localStorage.getItem("highScore")) || 0;

  if (score > highScore) {
    localStorage.setItem("highScore", score);
  }

  const gamesPlayed = parseInt(localStorage.getItem("gamesPlayed")) || 0;
  localStorage.setItem("gamesPlayed", gamesPlayed + 1);

  window.location.href = "index.html";
}

// Цикл гри
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// Початок гри
setInterval(spawnEnemy, spawnInterval);

// Стрільба на пробіл
document.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    if (selectedCharacter === "Tralalero Tralala") {
      blueSlippers.push({
        x: player.x + player.width / 2 - 15,
        y: player.y,
        width: 30,
        height: 10,
        color: "blue",
        angle: 0,
      });
    } else {
      bullets.push({
        x: player.x + player.width / 2 - 2.5,
        y: player.y,
        width: 5,
        height: 10,
        color: "yellow",
      });
    }
  }
});

gameLoop();
