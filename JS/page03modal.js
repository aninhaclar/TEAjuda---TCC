document.addEventListener('DOMContentLoaded', () => {
  const btnLogin = document.getElementById('btn-login');
  const emailInput = document.getElementById('email-login');
  const senhaInput = document.getElementById('senha-login');
  const loginMessage = document.getElementById('login-message');

  btnLogin.addEventListener('click', async (e) => {
    e.preventDefault();
    loginMessage.textContent = ''; 

    const email = emailInput.value.trim();
    const senha = senhaInput.value.trim();

    if (!email || !senha) {
      loginMessage.textContent = 'Preencha todos os campos.';
      loginMessage.style.color = 'red';
      return;
    }

    const dados = { email, password: senha };

    try {
      const response = await fetch('http://10.107.140.25:8080/v1/controle-usuario/usuario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      });

      const resultado = await response.json();

      if (response.ok) {
        loginMessage.textContent = 'Login realizado com sucesso!';
        loginMessage.style.color = 'green';

        if (resultado.token) {
          localStorage.setItem('token', resultado.token);
        }

        // redirecionar após 1 segundo
        setTimeout(() => {
          window.location.href = '../HTML/page06.html';
        }, 1000);
      } else {
        loginMessage.textContent = resultado.message || 'Email ou senha incorretos';
        loginMessage.style.color = 'red';
      }

    } catch (error) {
      console.error(error);
      loginMessage.textContent = 'Erro ao conectar com a API';
      loginMessage.style.color = 'red';
    }
  });

  // ===== MODAL =====
  const openModal = document.getElementById('open-modal');
  const modal = document.getElementById('modal1');
  const closeModalBtn = modal.querySelector('.close-modal');
  const formRecuperar = document.getElementById('form-recuperar');
  const recoverMessage = document.getElementById('recover-message');

  openModal.addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = 'flex';
  });

  closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    recoverMessage.textContent = '';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });

  formRecuperar.addEventListener('submit', async (e) => {
    e.preventDefault();
    recoverMessage.textContent = '';

    const email = formRecuperar.email.value.trim();
    if (!email) {
      recoverMessage.textContent = 'Digite seu email';
      recoverMessage.style.color = 'red';
      return;
    }

    try {
      const response = await fetch('https://suaapi.com/recover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const result = await response.json();

      if (response.ok) {
        recoverMessage.textContent = 'Email enviado com sucesso!';
        recoverMessage.style.color = 'green';
      } else {
        recoverMessage.textContent = result.message || 'Erro ao enviar email';
        recoverMessage.style.color = 'red';
      }

    } catch (error) {
      console.error(error);
      recoverMessage.textContent = 'Erro ao conectar com a API';
      recoverMessage.style.color = 'red';
    }
  });
});
