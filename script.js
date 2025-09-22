
// Função para alternar entre as abas
function showTab(tabName) {
    // Remove a classe active de todas as abas e conteúdos
    document.querySelectorAll('.nav-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Adiciona a classe active na aba e conteúdo selecionados
    document.querySelector(`.nav-tab[onclick="showTab('${tabName}')"]`).classList.add('active');
    document.getElementById(tabName).classList.add('active');
    
    // Se for a aba de tarefas, carrega as tarefas
    if (tabName === 'tarefas') {
        loadTarefas();
    }
}

// Função para carregar tarefas
async function loadTarefas() {
    const container = document.getElementById('tarefas-container');
    container.innerHTML = '<div class="loading">Carregando tarefas...</div>';
    
    try {
        let url = 'http://127.0.0.1:5000/tarefas';
        const response = await fetch(url, {method: 'GET'});
        const data = await response.json();
        console.log(data);
        
        if (data.tarefas && data.tarefas.length > 0) {
            container.innerHTML = data.tarefas.map(tarefa => listTarefas(tarefa));
        } else {
            container.innerHTML = `
                <div class="empty-state">
                    <h3>📝 Nenhuma tarefa encontrada</h3>
                    <p>Que tal criar sua primeira tarefa?</p>
                    <button class="btn btn-success" onclick="showTab('cadastrar')">➕ Criar Primeira Tarefa</button>
                </div>
            `;
        }
    } catch (error) {
        container.innerHTML = `
            <div class="message error">
                ❌ Erro ao carregar tarefas. Tente novamente.
            </div>
        `;
        console.error('Erro ao carregar tarefas:', error);
    }
}

// Função para cadastrar tarefa
document.getElementById('tarefa-form').addEventListener('submit', async function(e) {
    e.preventDefault();// previne o recarregamento da página
    
    const formData = new FormData(this);
    formData.append('titulo', document.getElementById('titulo').value);
    formData.append('descricao', document.getElementById('descricao').value);
    formData.append('prazo', document.getElementById('prazo').value);
    formData.append('prioridade', document.getElementById('prioridade').value);
    
    try {
        let url = 'http://127.0.0.1:5000/add_tarefa';
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            showMessage('✅ Tarefa cadastrada com sucesso!', 'success');
            this.reset();
            showTab('tarefas');
        } else {
            showMessage('❌ Erro ao cadastrar tarefa. Tente novamente.', 'error');
        }
    } catch (error) {
        showMessage('❌ Erro ao cadastrar tarefa. Tente novamente.', 'error');
        console.error('Erro ao cadastrar tarefa:', error);
    }
});

// Função para deletar tarefa
async function deleteTarefa(id, titulo) {
    if (confirm(`Tem certeza que deseja deletar a tarefa "${titulo}"?`)) {
        try {
            let url = 'http://127.0.0.1:5000/del_tarefa?id=' + id;
            const response = await fetch(url, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                showMessage('✅ Tarefa deletada com sucesso!', 'success');
                loadTarefas();
            } else {
                showMessage('❌ Erro ao deletar tarefa.', 'error');
            }
        } catch (error) {
            showMessage('❌ Erro ao deletar tarefa.', 'error');
            console.error('Erro ao deletar tarefa:', error);
        }
    }
}

// Função para editar tarefa (simplificada - apenas mostra mensagem)
function editTarefa(id) {
    showMessage('✏️ Funcionalidade de edição será implementada em breve!', 'info');
}

// Função para mostrar mensagens
function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    const container = document.querySelector('.container');
    container.insertBefore(messageDiv, container.firstChild);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

function listTarefas(tarefa){
    return `
        <div class="tarefa">
                    <h3>${tarefa.titulo}</h3>
                    <div class="tarefa-meta">
                        <p><strong>Descrição:</strong> ${tarefa.descricao || 'Não informada'}</p>
                        <p><strong>Prazo:</strong> ${tarefa.prazo ? new Date(tarefa.prazo).toLocaleDateString('pt-BR') : 'Não definido'}</p>
                        <p><strong>Prioridade:</strong> <span class="prioridade ${tarefa.prioridade}">${tarefa.prioridade.charAt(0).toUpperCase() + tarefa.prioridade.slice(1)}</span></p>
                        <p><strong>Status:</strong> <span class="status ${tarefa.status}">${tarefa.status.charAt(0).toUpperCase() + tarefa.status.slice(1)}</span></p>
                        <p><strong>Criado em:</strong> ${new Date(tarefa.data_criacao).toLocaleString('pt-BR')}</p>
                    </div>
                    <div class="actions">
                        <button class="btn btn-info" onclick="editTarefa(${tarefa.id})">✏️ Editar</button>
                        <button class="btn btn-danger" onclick="deleteTarefa(${tarefa.id}, '${tarefa.titulo}')">🗑️ Deletar</button>
                    </div>
        </div>
    `;
}

// Carrega as tarefas quando a página é carregada
document.addEventListener('DOMContentLoaded', function() {
    // Define a data de hoje como padrão no campo de prazo
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('prazo').value = today;
});
