// Завантаження збережених налаштувань
window.onload = function() {
    const savedLanguage = localStorage.getItem('language');
  
    if (savedLanguage !== null) {
      document.getElementById('language').value = savedLanguage;
    }
  };
  
  // Збереження налаштувань
  function saveSettings() {
    const language = document.getElementById('language').value;
  
    // Зберігання в Local Storage
    localStorage.setItem('language', language);
  
    alert(`Settings saved!\nLanguage: ${language}`);
  }
  