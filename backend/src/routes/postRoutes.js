import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";
import cors from "cors";

const corsOptions = {
    origin: "http://localhost:8000", optionsSuccessStatus: 200
}

// Configura o armazenamento para o multer
const storage = multer.diskStorage({
  // Define o diretório de destino para os arquivos
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  // Define o nome do arquivo
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})

// Cria uma instância do multer com a configuração de armazenamento
const upload = multer({ dest: "./uploads" , storage})

const routes = (app) => {
  // Habilita o Express a entender requisições com corpo no formato JSON.
  app.use(express.json());
  app.use(cors(corsOptions));

  // Define uma rota para pegar todos os posts
  app.get("/posts", listarPosts);

  // Rota para criar um post
  app.post("/posts", postarNovoPost);

  // Rota para criar um post e fazer upload de uma imagem
  // O middleware `upload.single('imagem')` é usado para processar o upload de uma única imagem
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost);
}

export default routes;