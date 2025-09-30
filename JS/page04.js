<form id="formCadastro">
  <input type="text" id="nome" placeholder="Nome completo" required />
  <input type="email" id="email" placeholder="E-mail" required />
  <input type="password" id="senha" placeholder="Senha" required />
  <button type="submit">Cadastrar</button>
</form>

  const form = document.getElementById("formCadastro");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

   
    const usuario = {
      nome: document.getElementById("nome").value.trim(),
      email: document.getElementById("email").value.trim(),
      senha: document.getElementById("senha").value.trim()
    };

    try {
      const response = await fetch("http://localhost:3000/v1/controle-usuario/usuario/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
      });

      const result = await response.json();

      if (response.ok) {
        alert("Usuário cadastrado com sucesso!");
        console.log(result);
        form.reset();
      } else {
        alert(`Erro ao cadastrar: ${result.message || "Verifique os dados."}`);
        console.error(result);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro de conexão com o servidor.");
    }
  });

