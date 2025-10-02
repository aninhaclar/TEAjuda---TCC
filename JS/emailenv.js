// Recupera o email do localStorage e exibe completo
window.addEventListener('DOMContentLoaded', function() {
  const userEmail = localStorage.getItem('userEmail');
  const emailElement = document.getElementById('emailMasked');
  
  if (userEmail) {
    emailElement.textContent = userEmail;
  }
});
