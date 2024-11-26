import 'dotenv/config';
// Esta linha importa a função 'conectarAoBanco' do arquivo 'dbConfig.js', que provavelmente contém a lógica para conectar ao banco de dados.
import { ObjectId } from 'mongodb';
import conectarAoBanco from '../config/dbConfig.js';

// A função 'conectarAoBanco' é chamada com a string de conexão obtida da variável de ambiente 'process.env.STRING_CONEXAO'.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para obter todos os posts do banco de dados.
export async function getTodosPosts() {
    // Seleciona o banco de dados 'imersao-instabytes'.
    const db = conexao.db('imersao-instabytes');
    // Seleciona a coleção 'posts' dentro do banco de dados.
    const colecao = db.collection("posts");
    // Executa uma consulta para encontrar todos os documentos (posts) na coleção e retorna os resultados como um array.
    return colecao.find().toArray();
}

export async function criarPost(novoPost) {
    const db = conexao.db('imersao-instabytes');
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, novoPost) {
    const db = conexao.db('imersao-instabytes');
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});
}

