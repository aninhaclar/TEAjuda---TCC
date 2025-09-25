document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
  
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
  
      const inputs = form.querySelectorAll('input');
      const email = inputs[0].value.trim();
      const senha = inputs[1].value;
  
      // Validações
      if (!email || !senha) {
        alert('Por favor, preencha todos os campos.');
        return;
      }
  
      if (!validateEmail(email)) {
        alert('Por favor, insira um e-mail válido.');
        return;
      }
  
      try {
        const response = await fetch('http://10.107.144.31:8080/v1/controle-usuario/usuario', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, senha })
        });
  
        const resultado = await response.json();
  
        if (response.ok) {
          alert('Login realizado com sucesso!');
          form.reset();
          // Redirecionar para a página inicial ou dashboard
          window.location.href = 'home.html';
        } else {
          alert(`Erro ao logar: ${resultado.message || 'Verifique os dados e tente novamente.'}`);
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro de conexão com o servidor. Tente novamente mais tarde.');
      }
    });
  
    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email.toLowerCase());
    }
  });
  