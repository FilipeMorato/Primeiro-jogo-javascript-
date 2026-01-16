# Primeiro Jogo JavaScript - Debiloides Fighters

![Jogo Capa](menu.png)

Um jogo de luta 2D desenvolvido em JavaScript puro, inspirado em jogos clássicos de luta como Street Fighter e Mortal Kombat. O projeto foi originalmente criado por [FilipeMorato](https://github.com/FilipeMorato) e conta com contribuições de [PedroM2626](https://github.com/PedroM2626).

## 🎮 Sobre o Jogo

Debiloides Fighters é um jogo de luta onde você pode escolher entre diferentes personagens únicos, cada um com suas próprias habilidades especiais. O jogo oferece:

- **Modo Single Player**: Jogue contra a CPU com diferentes níveis de dificuldade
- **Modo Multiplayer Local**: Jogue com amigos no mesmo dispositivo
- **Seleção de Personagens**: 4 personagens jogáveis, cada um com animações únicas
- **Sistema de Combos**: Execute combos e ataques especiais
- **Efeitos Visuais e Sonoros**: Animações suaves e trilha sonora envolvente

## 🕹️ Personagens Disponíveis

| Personagem | Descrição | Ataques Especiais |
|------------|-----------|-------------------|
| **Pedro** | Guerreiro equilibrado com ataques rápidos | Soco Giratório, Chute Duplo |
| **Filipe** | Lutador de força com ataques pesados | Smash de Fogo, Uppercut Explosivo |
| **Lara** | Lutadora ágil com combos rápidos | Chute Voador, Bola de Energia |
| **Ane** | Mestra das artes marciais com magia elemental | Raio Mágico, Vento Cortante |

## 🚀 Tecnologias Utilizadas

- **HTML5 Canvas** - Renderização gráfica
- **JavaScript ES6+** - Lógica do jogo
- **CSS3** - Estilização e responsividade
- **Web Audio API** - Sistema de áudio
- **Sprite Animation** - Animações de personagens
- **Collision Detection** - Sistema de colisões preciso

## 📁 Estrutura do Projeto

```
Primeiro-jogo-javascript-/
├── index.html              # Ponto de entrada do jogo
├── Main.js                 # Loop principal do jogo
├── SceneManager.js         # Gerenciamento de cenas
├── Fighter.js              # Classe base dos lutadores
├── inputs.js               # Controles e input handling
├── collisions.js           # Sistema de colisões
├── SoundHandler.js         # Gerenciamento de áudio
├── musics.js              # Configuração das músicas
├── sprites.js             # Configuração dos sprites
├── settings.js            # Configurações do jogo
├── 
├── scenes/                # Cenas do jogo
│   ├── MenuScene.js       # Menu principal
│   ├── CharSelectScene.js # Seleção de personagens
│   └── ActionScenes.js    # Cenas de ação
├── characters/            # Sprites dos personagens
├── backgrounds/           # Cenários de luta
├── music/                 # Trilhas sonoras
└── sounds/                # Efeitos sonoros
```

## 🎯 Como Jogar

### Controles do P1 (Teclado)
- **WASD** - Movimento
- **F** - Soco
- **G** - Chute
- **H** - Magia/Especial
- **Espaco** - Pulo

### Controles do P2 (Teclado)
- **Setas** - Movimento
- **K** - Soco
- **L** - Chute
- **;** - Magia/Especial
- **Shift** - Pulo

### Comandos Básicos
- **Combo**: Soco + Soco + Chute
- **Especial**: Baixo, Frente, Ataque
- **Defesa**: Trás (no momento certo)
- **Super**: Quando a barra de energia estiver cheia

## 🛠️ Instalação e Execução

### Pré-requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Servidor web local (recomendado)

### Instalação Local

1. **Clone o repositório**
```bash
git clone https://github.com/PedroM2626/Primeiro-jogo-javascript-.git
cd Primeiro-jogo-javascript-
```

2. **Inicie um servidor local**

**Opção 1 - Python (se tiver instalado)**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Opção 2 - Node.js (com http-server)**
```bash
# Instale globalmente
npm install -g http-server

# Execute o servidor
http-server -p 8000
```

**Opção 3 - Live Server (VS Code)**
- Instale a extensão "Live Server" no VS Code
- Clique com o botão direito em `index.html`
- Selecione "Open with Live Server"

3. **Acesse o jogo**
- Abra seu navegador e acesse: `http://localhost:8000`

### Execução Direta

Você também pode abrir o arquivo `index.html` diretamente no navegador, mas algumas funcionalidades podem não funcionar corretamente devido às políticas de segurança do navegador.

## 🎵 Áudio e Música

O jogo inclui:
- **Trilhas sonoras** para cada fase
- **Efeitos sonoros** para ataques e ações
- **Música de fundo** adaptativa

### Controles de Áudio
- **M** - Mudo/Desmudo
- **+** - Aumentar volume
- **-** - Diminuir volume

## 🎨 Personalização

### Adicionar Novos Personagens

1. Crie os sprites seguindo o padrão: `{nome}{acao}.png`
2. Adicione as configurações em `sprites.js`
3. Atualize `CharSelectScene.js` para incluir o novo personagem

### Modificar Cenários

1. Adicione suas imagens na pasta `backgrounds/`
2. Atualize a lista de backgrounds em `settings.js`
3. Ajuste as dimensões se necessário

## 🤝 Contribuindo

Contribuições são bem-vindas! Siga os passos abaixo:

1. **Fork o projeto**
2. **Crie sua feature branch**
```bash
git checkout -b feature/AmazingFeature
```
3. **Commit suas mudanças**
```bash
git commit -m 'Add some AmazingFeature'
```
4. **Push para a branch**
```bash
git push origin feature/AmazingFeature
```
5. **Abra um Pull Request**

### Diretrizes de Contribuição

- Mantenha o código limpo e comentado
- Teste suas mudanças localmente
- Siga o padrão de código existente
- Documente novas funcionalidades

## 📋 Roadmap

- [ ] **Modo Online** - Multijogador via WebRTC
- [ ] **Novos Personagens** - Adicionar 4 personagens adicionais
- [ ] **Sistema de Rank** - Pontuação e leaderboard
- [ ] **Modo Torneio** - Competição estilo arcade
- [ ] **Customização** - Skins e acessórios
- [ ] **Mobile Support** - Controles touch

## 🐛 Bugs Conhecidos

- Colisão pode ser imprecisa em algumas animações
- Performance pode variar em dispositivos mais antigos
- Alguns sons podem ter delay no primeiro carregamento

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👥 Autores

- **Filipe Morato** - Desenvolvedor principal - [GitHub](https://github.com/FilipeMorato)
- **Pedro Moraes** - Contribuidor secundário - [GitHub](https://github.com/PedroM2626)

## 🙏 Agradecimentos

- Inspirado em jogos clássicos de luta
- Sprites criados com base em referências de jogos indie
- Áudio e efeitos sonoros de fontes gratuitas
- Comunidade JavaScript por recursos e tutoriais

## 📞 Contato

Se você tiver alguma dúvida ou sugestão, abra uma [issue](https://github.com/PedroM2626/Primeiro-jogo-javascript-/issues) ou entre em contato através dos perfis dos autores no GitHub.

---

**Divirta-se jogando Debiloides Fighters! 🎮**