window.onload = function() {
    const selectedCharacter = localStorage.getItem('selectedCharacter');
  
    if (selectedCharacter) {
      const characterNameElement = document.getElementById('characterName');
      const characterImageElement = document.getElementById('characterImage');
  
      // Встановлюємо ім'я персонажа
      characterNameElement.textContent = selectedCharacter;
  
      // Встановлюємо відповідне зображення на основі обраного персонажа
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
  
  