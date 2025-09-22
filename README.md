# 🎨 Sistema de Tarefas - Frontend

Interface web moderna e responsiva para gerenciamento de tarefas, desenvolvida com HTML5, CSS3 e JavaScript vanilla.

## 🛠️ Tecnologias

- **HTML5** - Estrutura semântica
- **CSS3** - Estilização moderna com Flexbox e Grid
- **JavaScript (ES6+)** - Funcionalidades interativas
- **Fetch API** - Comunicação com backend
- **Responsive Design** - Funciona em desktop, tablet e mobile

## 📁 Estrutura do Projeto

```
tarefas-frontend/
├── index.html          # Página principal (SPA)
├── styles.css          # Estilos CSS
├── script.js           # JavaScript
└── README.md           # Este arquivo
```

## 🚀 Como Executar

### Pré-requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Backend da API rodando em `http://127.0.0.1:5000`

### 1. Clone o repositório
```bash
git clone <https://github.com/lucasrequiao/mvp-tarefas-frontend>
cd tarefas-frontend
```

### 2. Execute o backend
Certifique-se de que o backend está rodando:
```bash
# No repositório do backend
pip install -r requirements.txt
```

### 3. Abra o frontend
Abra o arquivo `index.html` no seu navegador ou use um servidor local:

#### Abrir diretamente
```bash
# No navegador, abra:
file:///caminho/para/tarefas-frontend/index.html
```

### 4. Acesse a aplicação
- **Local**: `http://localhost:5000`
- **Backend**: `http://127.0.0.1:5000`

## 🎨 Funcionalidades

### 🏠 Página Inicial
- **Dashboard** com cards informativos
- **Navegação rápida** para as principais funcionalidades
- **Design limpo** e profissional

### 📝 Lista de Tarefas
- **Visualização completa** de todas as tarefas
- **Cards organizados** com informações detalhadas
- **Status coloridos** (pendente, concluída, atrasada)
- **Prioridades coloridas** (alta, média, baixa)
- **Botões de ação** para editar e deletar
- **Estado vazio** quando não há tarefas

### ➕ Cadastro de Tarefas
- **Formulário completo** com validação
- **Campos**: título, descrição, prazo, prioridade, status
- **Feedback visual** de sucesso/erro
- **Limpeza automática** do formulário

### ⚡ Funcionalidades JavaScript
- **Navegação por abas** sem recarregar a página
- **Carregamento dinâmico** das tarefas via API
- **Cadastro de tarefas** via AJAX
- **Exclusão de tarefas** com confirmação
- **Mensagens de feedback** para o usuário
- **Tratamento de erros** da API

## 🎯 Interface e UX

### 🎨 Design System
- **Cores**: Gradientes modernos (#667eea, #764ba2)
- **Tipografia**: Arial, sans-serif
- **Espaçamento**: Sistema consistente de margins e paddings
- **Bordas**: Border-radius de 5px e 10px
- **Sombras**: Box-shadow para profundidade

### ✨ Animações
- **Transições suaves** em hover e focus
- **Fade-in** ao carregar conteúdo
- **Transform** em botões (translateY)
- **Duração**: 0.3s ease

## 🔧 Configuração

### 🌐 URL do Backend
Por padrão, o frontend se conecta ao backend em:
```javascript
const API_BASE_URL = 'http://127.0.0.1:5000';
```

Para alterar, edite o arquivo `script.js`:
```javascript
// Linha 61
let url = 'http://SEU_BACKEND_URL:PORTA/add_tarefa';
```

### 🔒 CORS
Certifique-se de que o backend está configurado para aceitar requisições do frontend:
```python
# No backend (app.py)
CORS(app, origins=["http://localhost:5000", "http://127.0.0.1:5000"])
```

## 📊 Estrutura do Código

### 🏗️ HTML (index.html)
- **Estrutura semântica** com tags apropriadas
- **Sistema de abas** para navegação
- **Formulário** com validação HTML5
- **Container responsivo** para layout

### 🎨 CSS (styles.css)
- **Reset básico** para consistência
- **Variáveis CSS** para cores e espaçamentos
- **Flexbox e Grid** para layout
- **Media queries** para responsividade
- **Animações** e transições

### ⚡ JavaScript (script.js)
- **Funções modulares** para cada funcionalidade
- **Async/await** para requisições HTTP
- **Event listeners** para interatividade
- **Tratamento de erros** robusto
- **Feedback visual** para o usuário

## 🧪 Testes

### Teste Manual
1. **Criar tarefa**: Preencha o formulário e verifique se aparece na lista
2. **Listar tarefas**: Verifique se todas as tarefas são exibidas
3. **Deletar tarefa**: Confirme a exclusão e verifique se foi removida
4. **Erros**: Teste com backend desligado

### 🔧 Configuração de Produção
1. **Altere a URL da API** para o backend em produção
2. **Configure CORS** no backend para aceitar o domínio do frontend
3. **Use HTTPS** em produção
4. **Configure cache** para arquivos estáticos

## 🎨 Customização

### 🎨 Cores
Edite as variáveis CSS no arquivo `styles.css`:
```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --success-color: #4caf50;
  --danger-color: #f44336;
  --info-color: #2196f3;
}
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 🔗 Links Relacionados

- **Backend**: [Repositório do Backend](<https://github.com/lucasrequiao/mvp-tarefas-backend>)
- **API Docs**: `http://127.0.0.1:5000/openapi`
- **MDN Web Docs**: https://developer.mozilla.org/
- **CSS Grid Guide**: https://css-tricks.com/snippets/css/complete-guide-grid/

## 🐛 Problemas Conhecidos

- **CORS**: Certifique-se de que o backend está configurado corretamente
- **Cache**: Limpe o cache do navegador se houver problemas
- **JavaScript**: Verifique o console para erros

---

**Desenvolvido usando HTML, CSS e JavaScript**
