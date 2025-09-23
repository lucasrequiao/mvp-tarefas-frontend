// Função para alternar entre as abas
function showTab(tabName) {
    // Remove a classe active de todas as abas e conteúdos
    document.querySelectorAll('.nav-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Adiciona a classe active na aba e conteúdo selecionados
    document.querySelectorAll('.nav-tab').forEach(tab => {
        if (tab.getAttribute('onclick') === `showTab('${tabName}')`) {
            tab.classList.add('active');
        }
    });
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
        let url = 'http://127.0.0.1:5000/tarefas'
        const response = await fetch(url, {method: 'GET'});
        const data = await response.json();
        
        if (data.tarefas && data.tarefas.length > 0) {
            container.innerHTML = data.tarefas.map(tarefa => listTarefas(tarefa)).join('');
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
                method: 'DELETE',
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

// Função para listar tarefas (template)
function listTarefas(tarefa) {
    return `
        <div class="tarefa" id="tarefa-${tarefa.id}">
            <div class="view-mode">
                <h3>${tarefa.titulo}</h3>
                <div class="tarefa-meta">
                    <p><strong>Descrição:</strong> ${tarefa.descricao || 'Não informada'}</p>
                    <p><strong>Prazo:</strong> ${tarefa.prazo ? new Date(tarefa.prazo).toLocaleDateString('pt-BR') : 'Não definido'}</p>
                    <p><strong>Prioridade:</strong> <span class="prioridade ${tarefa.prioridade}">${tarefa.prioridade.charAt(0).toUpperCase() + tarefa.prioridade.slice(1)}</span></p>
                    <p><strong>Status:</strong> <span class="status ${tarefa.status}">${tarefa.status.charAt(0).toUpperCase() + tarefa.status.slice(1)}</span></p>
                    <p><strong>Criado em:</strong> ${new Date(tarefa.data_criacao).toLocaleString('pt-BR')}</p>
                </div>
                <div class="actions">
                    <button class="btn btn-info" onclick="editarInLine(${tarefa.id})">✏️ Editar</button>
                    <button class="btn btn-danger" onclick="deleteTarefa(${tarefa.id}, '${tarefa.titulo}')">🗑️ Deletar</button>
                </div>
            </div>
        </div>
    `;
}

// Função para editar tarefa inline
function editarInLine(id) {
    const tarefaDiv = document.getElementById(`tarefa-${id}`);
    const viewMode = tarefaDiv.querySelector('.view-mode');
    
    // Busca os dados da tarefa
    const titulo = viewMode.querySelector('h3').textContent;
    const descricao = viewMode.querySelector('.tarefa-meta p:nth-child(1)').textContent.replace('Descrição: ', '');
    const prazo = viewMode.querySelector('.tarefa-meta p:nth-child(2)').textContent.replace('Prazo: ', '');
    const prioridade = viewMode.querySelector('.prioridade').textContent.toLowerCase();
    const status = viewMode.querySelector('.status').textContent.toLowerCase();
    
    // Cria o formulário de edição
    const editForm = `
        <div class="edit-mode">
            <h3>Editar Tarefa</h3>
            <form id="edit-form-${id}">
                <div class="form-group">
                    <label for="edit-titulo-${id}">Título</label>
                    <input type="text" id="edit-titulo-${id}" value="${titulo}" required>
                </div>
                <div class="form-group">
                    <label for="edit-descricao-${id}">Descrição</label>
                    <textarea id="edit-descricao-${id}">${descricao}</textarea>
                </div>
                <div class="form-group">
                    <label for="edit-prazo-${id}">Prazo</label>
                    <input type="date" id="edit-prazo-${id}" value="${prazo}">
                </div>
                <div class="form-group">
                    <label for="edit-prioridade-${id}">Prioridade</label>
                    <select id="edit-prioridade-${id}">
                        <option value="baixa" ${prioridade === 'baixa' ? 'selected' : ''}>Baixa</option>
                        <option value="media" ${prioridade === 'media' ? 'selected' : ''}>Média</option>
                        <option value="alta" ${prioridade === 'alta' ? 'selected' : ''}>Alta</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="edit-status-${id}">Status</label>
                    <select id="edit-status-${id}">
                        <option value="pendente" ${status === 'pendente' ? 'selected' : ''}>Pendente</option>
                        <option value="concluida" ${status === 'concluida' ? 'selected' : ''}>Concluída</option>
                    </select>
                </div>
                <div class="actions">
                    <button type="button" class="btn btn-success" onclick="updateTarefa(${id})">💾 Salvar</button>
                    <button type="button" class="btn btn-info" onclick="cancelEdit(${id})">❌ Cancelar</button>
                </div>
            </form>
        </div>
    `;
    
    tarefaDiv.innerHTML = editForm;
}

// Função para atualizar tarefa
async function updateTarefa(id) {
    // Coleta os valores atuais
    const titulo = document.getElementById(`edit-titulo-${id}`).value;
    const descricao = document.getElementById(`edit-descricao-${id}`).value;
    const prazo = document.getElementById(`edit-prazo-${id}`).value;
    const prioridade = document.getElementById(`edit-prioridade-${id}`).value;
    const status = document.getElementById(`edit-status-${id}`).value;
    
    // Cria objeto com todos os campos (backend trata strings vazias como null)
    const data = {
        titulo: titulo.trim(),
        descricao: descricao.trim(),
        prazo: prazo, 
        prioridade: prioridade,
        status: status
    };
    
    try {
        let url = 'http://127.0.0.1:5000/tarefa?id=' + id;
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            showMessage('✅ Tarefa atualizada com sucesso!', 'success');
            loadTarefas();
        } else {
            const errorData = await response.json();
            showMessage(`❌ Erro ao atualizar tarefa: ${errorData.message || 'Erro desconhecido'}`, 'error');
        }
    } catch (error) {
        showMessage('❌ Erro ao atualizar tarefa.', 'error');
        console.error('Erro ao atualizar tarefa:', error);
    }
}

// Função para cancelar edição
function cancelEdit(id) {
    loadTarefas();
}

// Carrega as tarefas quando a página é carregada
document.addEventListener('DOMContentLoaded', function() {
    // Define a data de hoje como padrão no campo de prazo
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('prazo').value = today;
});