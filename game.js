// Налаштування канвасу
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

// Ініціалізуємо Акарії із початковим значенням 0
let akarii = parseInt(localStorage.getItem("akarii")) || 0;
const selectedCharacter = localStorage.getItem("selectedCharacter");

// Елемент для відображення Акаріїв
const akariiDisplay = document.getElementById("akariiDisplay");

// Гравець
const player = {
  x: canvas.width / 2 - 25,
  y: canvas.height - 50,
  width: 50,
  height: 50,
  speed: 4, // Помірна швидкість гравця
  sprite: new Image(),
  isAlive: true,
};



// Завантаження спрайту гравця
if (selectedCharacter === "Tralalero Tralala") {
  player.sprite.src = "./img/character1.png";
} else if (selectedCharacter === "Bombardiro Crocodilo") {
  player.sprite.src = "./img/character2.png";
} else if (selectedCharacter === "Bobrito Bandito") {
  player.sprite.src = "./img/character3.png";
}

// Масиви для ворогів, снарядів і атак
const bullets = [];
const enemies = [];
const spinningSneakers = [];
const nuclearBombs = [];

// Управління клавішами
const keys = {};
document.addEventListener("keydown", (e) => {
  keys[e.key] = true;
});
document.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

// Створення ворога
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

// Оновлення ворогів
function updateEnemies() {
  enemies.forEach((enemy, index) => {
    enemy.y += 2; // Помірна швидкість ворогів

    if (enemy.y > canvas.height) {
      enemies.splice(index, 1);
      endGame(); // Програш якщо ворог досягнув кінця
    }
  });
}

// Малювання ворогів
function drawEnemies() {
  enemies.forEach((enemy) => {
    ctx.fillStyle = enemy.color;
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
  });
}

// Оновлення обертових капців
function updateSneakers() {
  spinningSneakers.forEach((sneaker, index) => {
    sneaker.y -= 2.5; // Помірна швидкість капців
    sneaker.rotation += 0.04; // Швидше обертання

    if (sneaker.y < 0) {
      spinningSneakers.splice(index, 1);
    }
  });
}


// Малювання капців
function drawSneakers() {
  spinningSneakers.forEach((sneaker) => {
    ctx.save();
    ctx.translate(sneaker.x + sneaker.width / 2, sneaker.y + sneaker.height / 2);
    ctx.rotate(sneaker.rotation);

    ctx.fillStyle = sneaker.color || "blue";
    ctx.beginPath();
    ctx.moveTo(-sneaker.width / 2, sneaker.height / 2);
    ctx.lineTo(0, -sneaker.height / 2);
    ctx.lineTo(sneaker.width / 2, sneaker.height / 2);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  });
}

// Оновлення ядерних бомб
function updateNuclearBombs() {
  nuclearBombs.forEach((bomb, index) => {
    bomb.y -= 1.5;

    if (bomb.y < 0) {
      createExplosion(bomb.x, bomb.y, bomb.explosionRadius);
      nuclearBombs.splice(index, 1);
    }
  });
}

// Малювання ядерних бомб
function drawNuclearBombs() {
  nuclearBombs.forEach((bomb) => {
    ctx.fillStyle = bomb.color;
    ctx.beginPath();
    ctx.arc(bomb.x + bomb.width / 2, bomb.y + bomb.height / 2, bomb.width / 2, 0, Math.PI * 2);
    ctx.fill();
  });
}

// Створення вибуху
function createExplosion(x, y, radius) {
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();

  enemies.forEach((enemy, index) => {
    const distance = Math.sqrt((enemy.x - x) ** 2 + (enemy.y - y) ** 2);
    if (distance < radius) {
      enemies.splice(index, 1);
      akarii += 5; // Бонус за знищення ворога
      localStorage.setItem("akarii", akarii);
      updateAkariiDisplay();
    }
  });
}

// Оновлення снарядів
function updateBullets() {
  bullets.forEach((bullet, index) => {
    bullet.y -= 3; // Помірна швидкість руху снарядів

    if (bullet.y < 0) {
      bullets.splice(index, 1);
    }
  });
}


// Малювання снарядів
function drawBullets() {
  bullets.forEach((bullet) => {
    ctx.fillStyle = "yellow";
    ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
  });
}

// Оновлення відображення Акаріїв
function updateAkariiDisplay() {
  akariiDisplay.textContent = `Akarii: ${akarii}`;
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

// Перевірка зіткнень
function checkCollisions() {
  enemies.forEach((enemy, eIndex) => {
    if (
      enemy.x < player.x + player.width &&
      enemy.x + enemy.width > player.x &&
      enemy.y < player.y + player.height &&
      enemy.y + enemy.height > player.y
    ) {
      endGame(); // Програш при зіткненні з ворогом
    }

    bullets.forEach((bullet, bIndex) => {
      if (
        bullet.x < enemy.x + enemy.width &&
        bullet.x + bullet.width > enemy.x &&
        bullet.y < enemy.y + enemy.height &&
        bullet.y + bullet.height > enemy.y
      ) {
        bullets.splice(bIndex, 1);
        enemies.splice(eIndex, 1);
        akarii += 1;
        localStorage.setItem("akarii", akarii);
        updateAkariiDisplay();
      }
    });

    spinningSneakers.forEach((sneaker, sIndex) => {
      if (
        sneaker.x < enemy.x + enemy.width &&
        sneaker.x + sneaker.width > enemy.x &&
        sneaker.y < enemy.y + enemy.height &&
        sneaker.y + sneaker.height > enemy.y
      ) {
        spinningSneakers.splice(sIndex, 1);
        enemies.splice(eIndex, 1);
        akarii += 3;
        localStorage.setItem("akarii", akarii);
        updateAkariiDisplay();
      }
    });

    nuclearBombs.forEach((bomb, bIndex) => {
      const distance = Math.sqrt((enemy.x - (bomb.x + bomb.width / 2)) ** 2 + (enemy.y - (bomb.y + bomb.height / 2)) ** 2);
      if (distance < bomb.explosionRadius) {
        enemies.splice(eIndex, 1);
        akarii += 5;
        localStorage.setItem("akarii", akarii);
        updateAkariiDisplay();
      }
    });
  });
}

// Кінець гри
function endGame() {
  player.isAlive = false;

  let gamesPlayed = parseInt(localStorage.getItem("gamesPlayed")) || 0;
  gamesPlayed++;
  localStorage.setItem("gamesPlayed", gamesPlayed);

  localStorage.setItem("akarii", akarii);

  alert(`Гра завершена! Загальні Акариі: ${akarii}`);
  window.location.href = "index.html";
}

// Оновлення гри
function updateGame() {
  if (!player.isAlive) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  updatePlayer();
  drawPlayer();

  updateBullets();
  drawBullets();

  updateSneakers();
  drawSneakers();

  updateNuclearBombs();
  drawNuclearBombs();

  updateEnemies();
  drawEnemies();

  checkCollisions();
}

// Основний цикл гри
function gameLoop() {
  updateGame();
  requestAnimationFrame(gameLoop);
}

// Обробка стрільби
document.addEventListener("keydown", (e) => {
  if (e.key === " " && selectedCharacter === "Tralalero Tralala") {
    spinningSneakers.push({
      x: player.x + player.width / 2 - 15,
      y: player.y,
      width: 30,
      height: 30,
      rotation: 0,
      color: "blue",
    });
  } else if (e.key === " " && selectedCharacter === "Bombardiro Crocodilo") {
    nuclearBombs.push({
      x: player.x + player.width / 2 - 20,
      y: player.y,
      width: 40,
      height: 40,
      explosionRadius: 100, // Радіус вибуху
      color: "orange", // Колір бомби
    });
  } else if (e.key === " ") {
    bullets.push({
      x: player.x + player.width / 2 - 2.5,
      y: player.y,
      width: 5,
      height: 10,
      color: "yellow",
    });
  }
  });
  
  // Інтервали для створення ворогів
  setInterval(spawnEnemy, 1500); // Довший інтервал створення ворогів
  
  // Запуск гри
  updateAkariiDisplay(); // Ініціалізуємо відображення Акаріїв
  gameLoop(); // Запускаємо основний цикл гри