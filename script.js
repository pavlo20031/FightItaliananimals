window.onload = function() {
  const selectedCharacter = localStorage.getItem('selectedCharacter');

  if (selectedCharacter) {
    const characterNameElement = document.getElementById('characterName');
    const characterImageElement = document.getElementById('characterImage');

    characterNameElement.textContent = selectedCharacter;

    switch (selectedCharacter) {
      case 'Tralalero Tralala':
        characterImageElement.src = './img/character1.png';
        break;
      case 'Character 2':
        characterImageElement.src = './img/character2.png';
        break;
      case 'Character 3':
        characterImageElement.src = './img/character3.png';
        break;
      default:
        characterImageElement.src = '';
    }
  } else {
    const characterNameElement = document.getElementById('characterName');
    characterNameElement.textContent = 'No character selected.';
  }
};

  // Ініціалізуємо Акарії із початковим значенням 0
let akarii = parseInt(localStorage.getItem("akarii")) || 0;

// Елемент для відображення кількості Акаріїв
const akariiCount = document.getElementById("akariiCount");

// Оновлення кількості Акаріїв у HTML
function updateAkariiDisplay() {
  akariiCount.textContent = `Akarii: ${akarii}`;
}

// Приклад: Збільшення кількості Акаріїв
function addAkarii(amount) {
  akarii += amount;
  localStorage.setItem("akarii", akarii); // Зберігаємо значення
  updateAkariiDisplay(); // Оновлюємо відображення
}

// Початкове оновлення
updateAkariiDisplay();
  