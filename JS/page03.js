'use strict'

const buttonCadastrar = document.getElementById('cadastrar')
const modal = document.getElementById('modal')
const modalMensagem = document.getElementById('modalMensagem')
const fecharModal = document.getElementById('fecharModal')

// Função para abrir modal com mensagem
const abrirModal = (mensagem) => {
    modalMensagem.textContent = mensagem
    modal.style.display = 'block'
}

// Fecha o modal ao clicar no X
fecharModal.addEventListener('click', () => {
    modal.style.display = 'none'
})

// Fecha o modal se clicar fora do conteúdo
window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none'
})

// Função de cadastro
const cadastrarUser = async () => {
    const user = document.getElementById('user').value
    const email = document.getElementById('email').value
    const senha = document.getElementById('senha1').value
    const confirmar = document.getElementById('senha2').value

    if (!user || !email || !senha || !confirmar) {
        abrirModal('Preencha todos os campos')
        return
    }

    if (senha !== confirmar) {
        abrirModal('As senhas não coincidem')
        return
    }

    try {
        const response = await fetch('http://localhost:3000/v1/controle-usuario/usuario', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user, email, senha })
        })

        const data = await response.json()

        if (response.ok) {
            abrirModal('Cadastro realizado com sucesso!')
            document.getElementById('user').value = ''
            document.getElementById('email').value = ''
            document.getElementById('senha1').value = ''
            document.getElementById('senha2').value = ''
        } else {
            abrirModal(`Erro: ${data.message}`)
        }
    } catch (err) {
        console.error(err)
        abrirModal('Erro ao conectar com o servidor')
    }
}

buttonCadastrar.addEventListener('click', cadastrarUser)
