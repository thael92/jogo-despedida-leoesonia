const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Armazenar IDs de controle e suas conexões
const controls = {};

io.on('connection', (socket) => {
    console.log('Novo cliente conectado:', socket.id);

    // Quando um controle se registra
    socket.on('register-control', (data) => {
        const { controlId, type } = data;
        controls[controlId] = {
            socketId: socket.id,
            type: type // 'left' ou 'right'
        };
        console.log(`Controle ${type} registrado: ${controlId}`);
        
        // Notificar o jogo principal que um controle foi conectado
        io.emit('control-connected', { controlId, type });
    });

    // Quando um controle envia comando
    socket.on('control-input', (data) => {
        const { controlId, action, active } = data;
        // Repassar o comando para o jogo principal
        io.emit('game-control', { controlId, action, active });
    });

    // Quando um cliente se desconecta
    socket.on('disconnect', () => {
        console.log('Cliente desconectado:', socket.id);
        
        // Encontrar e remover o controle desconectado
        for (const controlId in controls) {
            if (controls[controlId].socketId === socket.id) {
                const type = controls[controlId].type;
                io.emit('control-disconnected', { controlId, type });
                delete controls[controlId];
                break;
            }
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});