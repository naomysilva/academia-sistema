const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Configuração da conexão com o MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'todo_db' // nome do seu banco de dados MySQL
});

connection.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return;
    }
    console.log('Conectado ao MySQL');
});

// Rota para obter todos os treinos
app.get('/treinos', (req, res) => {
    const query = 'SELECT * FROM treinos';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao obter treinos do MySQL:', err);
            return res.status(500).json({ error: 'Erro ao obter treinos' });
        }
        // Obter também os exercícios para cada treino
        const treinosComExercicios = [];
        const promises = results.map(treino => {
            return new Promise((resolve, reject) => {
                const exerciciosQuery = 'SELECT * FROM exercicios WHERE treino_id = ?';
                connection.query(exerciciosQuery, [treino.id], (err, exercicios) => {
                    if (err) {
                        console.error('Erro ao obter exercícios do treino:', err);
                        reject(err);
                    } else {
                        treino.exercicios = exercicios;
                        treinosComExercicios.push(treino);
                        resolve();
                    }
                });
            });
        });

        Promise.all(promises)
            .then(() => {
                res.json(treinosComExercicios);
            })
            .catch(error => {
                console.error('Erro ao processar promessas:', error);
                res.status(500).json({ error: 'Erro ao processar promessas' });
            });
    });
});

// Rota para salvar um novo treino
app.post('/treinos', (req, res) => {
    const novoTreino = req.body; // Dados do novo treino enviados no corpo da requisição
    const { data, tipo, exercicios } = novoTreino;

    // Inserir o novo treino na tabela 'treinos'
    const insertTreinoQuery = 'INSERT INTO treinos (data, tipo) VALUES (?, ?)';
    connection.query(insertTreinoQuery, [data, tipo], (err, result) => {
        if (err) {
            console.error('Erro ao inserir novo treino:', err);
            return res.status(500).json({ error: 'Erro ao inserir novo treino' });
        }

        const treinoId = result.insertId; // ID do treino inserido

        // Inserir os exercícios relacionados ao treino na tabela 'exercicios'
        const insertExerciciosQuery = 'INSERT INTO exercicios (treino_id, nome, series, repeticoes, peso) VALUES ?';
        const exerciciosValues = exercicios.map(exercicio => [treinoId, exercicio.nome, exercicio.series, exercicio.repeticoes, exercicio.peso]);

        connection.query(insertExerciciosQuery, [exerciciosValues], (err, result) => {
            if (err) {
                console.error('Erro ao inserir exercícios do treino:', err);
                return res.status(500).json({ error: 'Erro ao inserir exercícios do treino' });
            }

            res.status(201).json({ message: 'Treino salvo com sucesso!' });
        });
    });
});


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
