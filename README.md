# 🎮 Despedida de Léo e Sônia: A Corrida Colaborativa

![Banner do Jogo - Exemplo: Uma imagem ou GIF do jogo em ação seria ótimo aqui!]

Este projeto é um jogo de corrida interativo e colaborativo, desenvolvido com o objetivo de proporcionar uma experiência divertida e única. Ele se destaca por permitir que dois jogadores controlem o carro simultaneamente usando seus smartphones como gamepads remotos, conectados em tempo real através de QR Codes.

## ✨ Funcionalidades

* **Controles Compartilhados via QR Code:** Dois jogadores escaneiam códigos QR exclusivos para se conectar como "Controle Esquerdo" e "Controle Direito", cada um controlando uma direção do carro.
* **Comunicação em Tempo Real:** Utiliza WebSockets (Socket.IO) para uma interação fluida e instantânea entre o jogo principal e os dispositivos de controle.
* **Progressão de Níveis:** Avance por diferentes fases, cada uma com sua própria dificuldade e desafios.
* **Evento Especial:** Surpresas e interações com personagens adicionais ao longo da jornada.
* **Elementos Multimídia:** Enriquecido com vídeos e efeitos sonoros para uma experiência imersiva.
* **Modo Solo (Teclado):** Opção para jogar sozinho usando as setas do teclado (ou 'A' e 'D' para simular os controles remotos), caso não haja dois celulares disponíveis.

## 🚀 Como Jogar

1.  **Acesse o Jogo:** Abra o link do jogo em seu navegador web (computador ou tablet).
    * **Link para o Jogo Online:** [Insira a URL do seu deploy aqui, ex: `https://seu-jogo.onrender.com`]
2.  **Conecte os Controles:**
    * Na tela inicial do jogo, você verá dois QR Codes.
    * Use a câmera do seu smartphone (ou um aplicativo de leitura de QR Code) para escanear um dos códigos: um para o **Controle Esquerdo** e outro para o **Controle Direito**.
    * Certifique-se de que ambos os celulares estejam na mesma rede que o computador/tablet onde o jogo está sendo executado, ou que tenham acesso à internet se o jogo estiver online.
3.  **Inicie a Viagem:** Assim que ambos os controles estiverem conectados, o jogo iniciará automaticamente ou você poderá pressionar "Iniciar Jogo".
4.  **Controle o Carro:**
    * O jogador do **Controle Esquerdo** move o carro para a esquerda.
    * O jogador do **Controle Direito** move o carro para a direita.
    * Colaborem para desviar dos obstáculos e avançar na estrada!
5.  **Modo Solo:** Se preferir jogar sozinho ou para testes, clique em "Pular e Jogar Sozinho" na tela do QR Code. O carro será controlado pelas teclas `←` (seta para esquerda) e `→` (seta para direita) do seu teclado.

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando uma stack Full-Stack com foco em comunicação em tempo real:

* **Frontend (Jogo & Controles):**
    * **HTML5:** Estrutura e marcação das páginas.
    * **CSS3:** Estilização e design responsivo.
    * **JavaScript (Vanilla JS):** Lógica do jogo, interatividade e manipulação do DOM.
    * **Socket.IO Client-side:** Biblioteca para comunicação WebSocket com o servidor.
    * **QRCode.js:** Geração de QR Codes dinamicamente no cliente.
* **Backend (Servidor):**
    * **Node.js:** Ambiente de execução para o servidor.
    * **Express.js:** Framework web para roteamento e serviço de arquivos estáticos.
    * **Socket.IO:** Implementação de WebSockets para comunicação bidirecional em tempo real.
    * **CORS:** Middleware para lidar com requisições de diferentes origens (domínios), essencial para o deploy.
    * **`qrcode` (Node.js library):** Para geração de QR Codes no lado do servidor, se necessário (atualmente usado para URLs de controle).

## ☁️ Deploy

O projeto é configurado para ser facilmente implantado em plataformas de PaaS (Platform as a Service) que suportam Node.js e WebSockets.

* **GitHub:** Gerenciamento de versionamento do código.
* **Render** (Recomendado): Plataforma utilizada para o deploy do servidor Node.js e dos arquivos estáticos. Oferece um plano gratuito ideal para projetos como este, com suporte a WebSockets.

### Instruções de Deploy (Render)

1.  **Crie uma conta no [Render](https://render.com/).**
2.  **Conecte seu repositório GitHub** ao Render.
3.  Crie um **Novo Serviço Web** (`Web Service`).
4.  Selecione o repositório deste projeto.
5.  Configure:
    * **Build Command:** `npm install`
    * **Start Command:** `node server.js`
    * **Instance Type:** `Free`
6.  Após o deploy, o Render fornecerá uma URL pública para o seu jogo (ex: `https://seu-nome-do-servico.onrender.com`).
7.  **Importante:** Atualize as URLs `const socket = io('SUA_URL_DO_RENDER');` nos arquivos `index.html`, `left-control.html` e `right-control.html` para apontar para a URL do seu serviço no Render. Também atualize `const baseUrl = 'SUA_URL_DO_RENDER';` na função `generateQRCodes` do `index.html`.

## 🤝 Contribuição

Contribuições são bem-vindas! Se você tiver sugestões, melhorias ou encontrar bugs, sinta-se à vontade para:

1.  Fazer um `fork` do projeto.
2.  Criar uma nova `branch` (`git checkout -b feature/minha-melhoria`).
3.  Fazer suas alterações e `commit`á-las (`git commit -m 'feat: adiciona nova funcionalidade'`).
4.  Fazer `push` para a `branch` (`git push origin feature/minha-melhoria`).
5.  Abrir um `Pull Request`.

## 📄 Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

### Agradecimentos Especiais

* À Léo e Sônia, por inspirarem esta jornada!
* À comunidade de desenvolvedores e recursos online que tornaram este projeto possível.

---
