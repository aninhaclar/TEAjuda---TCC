document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
  
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
  
      const inputs = form.querySelectorAll('input');
      const Nome = inputs[0].value.trim();
      const nomeTutelado = inputs[1].value.trim();
      const email = inputs[2].value.trim();
      const senha = inputs[3].value;
      const confirmaSenha = inputs[4].value;
  
      // Validações
      if (!Nome || !email || !senha || !confirmaSenha) {
        alert('Por favor, preencha todos os campos.');
        return;
      }
  
      if (!validateEmail(email)) {
        alert('Por favor, insira um e-mail válido.');
        return;
      }
  
      if (senha.length < 6) {
        alert('A senha deve ter no mínimo 6 caracteres.');
        return;
      }
  
      if (senha !== confirmaSenha) {
        alert('As senhas não coincidem.');
        return;
      }
  
      const dadosCadastro = {
        nome: Nome,
       
        email: email,
        senha: senha
      };
  
      try {
        const response = await fetch('http://10.107.144.31:8080/v1/controle-usuario/usuario', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dadosCadastro)
        });
  
        const resultado = await response.json();
  
        if (response.ok) {
          alert(' Cadastro realizado com sucesso!');
          form.reset();
          // Opcional: redirecionar
          // window.location.href = 'login.html';
        } else {
          alert(` Erro ao cadastrar: ${resultado.message || 'Verifique os dados e tente novamente.'}`);
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
        alert(' Erro de conexão com o servidor. Tente novamente mais tarde.');
      }
    });
  
    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email.toLowerCase());
    }
  });
  