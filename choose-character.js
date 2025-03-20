let selectedCharacter = null;

// Вибір персонажа
function selectCharacter(characterName) {
  selectedCharacter = characterName;
  alert(`You selected: ${characterName}`);
}

// Підтвердження вибору
function confirmSelection() {
  if (!selectedCharacter) {
    alert('Please select a character before confirming!');
    return;
  }

  localStorage.setItem('selectedCharacter', selectedCharacter);
  alert(`Character ${selectedCharacter} confirmed!`);
  window.location.href = 'index.html'; // Повернення на головну сторінку
}
