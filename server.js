// server.js
const express = require('express'); // Corrigido de 'expresso' para 'express'
const http = require('http');
const socketIo = require('socket.io');
const path = require('path'); // Corrigido de 'caminho' para 'path'
const QRCode = require('qrcode'); // Corrigido de 'Const QRCode' para 'const QRCode' e removido espaço

const app = express(); // Corrigido de 'expresso()' para 'express()'
const server = http.createServer(app); // Corrigido de 'aplicativo' para 'app'
const io = socketIo(server); // Corrigido de 'servidor' para 'server'

const PORT = process.env.PORT || 3000; // Corrigido de 'PORTO' para 'PORT'

// Servir arquivos estáticos da pasta atual (onde está index.html, img, videos, etc.)
app.use(express.static(path.join(__dirname))); // Corrigido de 'aplicativo' para 'app', e 'caminho.join' para 'path.join'

// Rota para o controle esquerdo
app.get('/left-control.html', (req, res) => { // Corrigido de 'aplicativo' para 'app'
    res.sendFile(path.join(__dirname, 'left-control.html')); // Corrigido de 'caminho.conjunta' e '«left-control.html»'
});

// Rota para o controle direito
app.get('/right-control.html', (req, res) => { // Corrigido de 'aplicativo' para 'app'
    res.sendFile(path.join(__dirname, 'right-control.html')); // Corrigido de 'caminho.joint'
});

// Armazenar os IDs dos sockets conectados para cada controle
let leftControlSocketId = null;
let rightControlSocketId = null;

io.on('connection', (socket) => { // Corrigido de 'conexão' e 'soquete' para 'connection' e 'socket'
    console.log('Um usuário conectado:', socket.id);

    // server.js (trecho corrigido)
// ... dentro de io.on('connection', (socket) => { ...
    socket.on('register-control', (data) => {
        if (data.type === 'left' && !leftControlSocketId) {
            leftControlSocketId = socket.id;
            socket.controlType = 'left';
            console.log('Controle ESQUERDO conectado:', socket.id);
            io.emit('control-connected', { type: 'left' }); // Corrigido para 'left'
        } else if (data.type === 'right' && !rightControlSocketId) {
            rightControlSocketId = socket.id;
            socket.controlType = 'right';
            console.log('Controle DIREITO conectado:', socket.id);
            io.emit('control-connected', { type: 'right' }); // Corrigido para 'right'
        } else {
            console.log(`Tentativa de conectar um segundo controle ${data.type} ou tipo inválido.`);
            socket.emit('error', 'Este tipo de controle já está conectado ou tipo inválido.');
        }
    });
// ...

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