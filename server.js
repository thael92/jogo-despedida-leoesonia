// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const QRCode = require('qrcode');
const cors = require('cors'); // Adicionado para lidar com requisições de domínios diferentes

const app = express();
const server = http.createServer(app);

// Configuração do Socket.IO com CORS
// IMPORTANTE: Substitua 'http://localhost:PORTA_DO_SEU_JOGO_PRINCIPAL' pela URL onde o index.html estará hospedado
// Se você for hospedar tudo no Render, pode deixar 'http://localhost:3000' para testes locais ou usar um curinga '*'
// Para produção, é altamente recomendável especificar a URL exata do seu frontend.
const io = socketIo(server, {
    cors: {
        // Exemplo para ambiente de desenvolvimento:
        // origin: ["http://localhost:3000", "http://192.168.x.x:3000"],
        // Exemplo para deploy online no Render:
        // Se o Render hospedar tudo, esta configuração pode não ser estritamente necessária
        // mas é boa prática ter se os controles forem acessados de outros IPs/domínios.
        // Se você for hospedar o index.html em outro lugar (ex: Vercel), coloque a URL do Vercel aqui.
        origin: "*", // Curinga para desenvolvimento, MUDE ISSO EM PRODUÇÃO PARA A URL ESPECÍFICA DO SEU FRONTEND!
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 3001;

// Servir arquivos estáticos da pasta atual (onde está index.html, img, videos, etc.)
app.use(express.static(path.join(__dirname)));
app.use(cors()); // Para rotas HTTP regulares (se houver, mas para este projeto, o CORS do socket.io é mais relevante)

// Rota para o controle esquerdo
app.get('/left-control.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'left-control.html'));
});

// Rota para o controle direito
app.get('/right-control.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'right-control.html'));
});

// Armazenar os IDs dos sockets conectados para cada controle
let leftControlSocketId = null;
let rightControlSocketId = null;

io.on('connection', (socket) => {
    console.log('Um usuário conectado:', socket.id);

    // Lidar com a conexão de um controle (identificado pelo 'type' enviado pelo cliente)
    socket.on('register-control', (data) => {
        // Verifica se o tipo é 'left' ou 'right' e se o controle correspondente já não está conectado
        if (data.type === 'left' && !leftControlSocketId) {
            leftControlSocketId = socket.id;
            socket.controlType = 'left'; // Armazena o tipo no socket para referência futura
            console.log('Controle ESQUERDO conectado:', socket.id);
            io.emit('control-connected', { type: 'left' }); // Corrigido para 'left'
        } else if (data.type === 'right' && !rightControlSocketId) {
            rightControlSocketId = socket.id;
            socket.controlType = 'right'; // Armazena o tipo no socket para referência futura
            console.log('Controle DIREITO conectado:', socket.id);
            io.emit('control-connected', { type: 'right' }); // Corrigido para 'right'
        } else {
            // Se já houver um controle desse tipo conectado ou tipo inválido
            console.log(`Tentativa de conectar um segundo controle ${data.type} ou tipo inválido. ID do socket: ${socket.id}`);
            socket.emit('error', 'Este tipo de controle já está conectado ou tipo inválido.');
            // Opcional: desconectar o socket que tentou conectar como um controle já existente
            // socket.disconnect(true);
        }
    });

    // Lidar com o evento de pressionar/soltar botão do controle
    socket.on('control-press', (data) => {
        // Verifica se o socket que enviou o evento é um controle registrado
        if (socket.id === leftControlSocketId || socket.id === rightControlSocketId) {
            // Reenvia o evento para o jogo principal (index.html)
            io.emit('game-control', { action: data.action, active: data.active });
        }
    });

    socket.on('disconnect', () => {
        console.log('Usuário desconectado:', socket.id);
        if (socket.id === leftControlSocketId) {
            leftControlSocketId = null;
            console.log('Controle ESQUERDO desconectado.');
            io.emit('control-disconnected', { type: 'left' });
        } else if (socket.id === rightControlSocketId) {
            rightControlSocketId = null;
            console.log('Controle DIREITO desconectado.');
            io.emit('control-disconnected', { type: 'right' });
        }
    });
});

server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});