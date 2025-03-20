// Завантаження профілю та статистики
window.onload = function() {
    const savedIcon = localStorage.getItem('icon');
    const savedUsername = localStorage.getItem('username');
    const savedGamesPlayed = localStorage.getItem('gamesPlayed');
    const savedHighScore = localStorage.getItem('highScore');
  
    if (savedIcon !== null) {
      document.getElementById('icon').value = savedIcon;
    }
  
    if (savedUsername !== null) {
      document.getElementById('username').value = savedUsername;
    }
  
    if (savedGamesPlayed !== null) {
      document.getElementById('gamesPlayed').textContent = savedGamesPlayed;
    }
  
    if (savedHighScore !== null) {
      document.getElementById('highScore').textContent = savedHighScore;
    }
  
    document.getElementById('globalRank').textContent = '#1'; // Тимчасово завжди 1
  };
  
  // Функція для оновлення статистики після гри
  function updateStatsFromGame(score) {
    const gamesPlayed = parseInt(document.getElementById('gamesPlayed').textContent) + 1;
    const currentHighScore = parseInt(document.getElementById('highScore').textContent);
    const highScore = Math.max(currentHighScore, score);
  
    // Оновлюємо DOM
    document.getElementById('gamesPlayed').textContent = gamesPlayed;
    document.getElementById('highScore').textContent = highScore;
  
    // Зберігаємо зміни в Local Storage
    localStorage.setItem('gamesPlayed', gamesPlayed);
    localStorage.setItem('highScore', highScore);
  
    alert(`Stats updated!\nGames Played: ${gamesPlayed}\nHigh Score: ${highScore}`);
  }
  