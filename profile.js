// Завантаження даних профілю під час відкриття сторінки
window.onload = function() {
  // Завантаження збережених даних з localStorage
  const savedIcon = localStorage.getItem("icon");
  const savedUsername = localStorage.getItem("username");
  const savedGamesPlayed = localStorage.getItem("gamesPlayed");
  const savedHighScore = localStorage.getItem("highScore");

  // Встановлення збережених даних у DOM елементи
  if (savedIcon !== null) {
    document.getElementById("icon").value = savedIcon;
  }

  if (savedUsername !== null) {
    document.getElementById("username").value = savedUsername;
  }

  if (savedGamesPlayed !== null) {
    document.getElementById("gamesPlayed").textContent = savedGamesPlayed;
  } else {
    // Якщо значення немає, встановлюємо значення за замовчуванням
    document.getElementById("gamesPlayed").textContent = 0;
    localStorage.setItem("gamesPlayed", 0);
  }

  if (savedHighScore !== null) {
    document.getElementById("highScore").textContent = savedHighScore;
  } else {
    // Встановлення значення за замовчуванням для рекорду
    document.getElementById("highScore").textContent = 0;
    localStorage.setItem("highScore", 0);
  }
};

// Функція для збереження змін профілю (іконки та ніку)
function saveProfileChanges() {
  const newIcon = document.getElementById("icon").value;
  const newUsername = document.getElementById("username").value;

  // Збереження змін у localStorage
  localStorage.setItem("icon", newIcon);
  localStorage.setItem("username", newUsername);

  // Підтвердження успішного збереження
  alert("Changes have been saved!");
}

// Функція для оновлення профілю після гри
function updateStatsFromGame(score) {
  // Отримуємо поточну кількість зіграних ігор
  const gamesPlayed = parseInt(localStorage.getItem("gamesPlayed")) || 0;
  const currentHighScore = parseInt(localStorage.getItem("highScore")) || 0;
  const highScore = Math.max(currentHighScore, score);

  // Оновлення значень у localStorage
  localStorage.setItem("gamesPlayed", gamesPlayed + 1);
  localStorage.setItem("highScore", highScore);

  // Оновлення DOM елементів
  document.getElementById("gamesPlayed").textContent = gamesPlayed + 1;
  document.getElementById("highScore").textContent = highScore;

  // Повідомлення про оновлення
  alert(`Stats updated!\nGames Played: ${gamesPlayed + 1}\nHigh Score: ${highScore}`);
}

