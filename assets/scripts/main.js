// Main desktop scripts - currently just a placeholder for other desktop icons

document.querySelectorAll('.icon').forEach(icon => {
  icon.addEventListener('click', () => {
    // Currently does nothing except alert except calculator handled separately
    if(icon.id !== 'calculator-icon') {
      alert("You clicked " + icon.textContent.trim());
    }
  });
});
