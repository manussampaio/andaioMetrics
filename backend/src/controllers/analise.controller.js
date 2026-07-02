import * as AnaliseModel from "../models/analise.model.js";

export async function listar(req, res) {
  const analises = await AnaliseModel.listarAnalises();
  return res.json(analises);
}

export async function buscar(req, res) {
  const id = req.params.id;
  const analise = await AnaliseModel.buscarAnalisePorId(id);
  if (!analise) {
    return res.status(404).json({ error: "Analise não encontrada." });
  }
  return res.json(analise);
}

export async function criar(req, res) {
  console.log(req.body);
  
  const { nome, data, pesoGema, pesoCasca, pesoOvo } = req.body;
  const userId = req.user.id;

  if (
    !nome ||
    !data ||
    pesoCasca == null ||
    pesoGema == null ||
    pesoOvo == null
  ) {
    return res.status(400).json({
      error: "Todos os campos são obrigatórios.",
    });
  }

  const analise = await AnaliseModel.criarAnalise({
    nome,
    data: new Date(data),
    pesoCasca,
    pesoGema,
    pesoOvo,
    userId,
  });

  return res.status(201).json(analise);
}

export async function atualizar(req, res) {
  const id = req.params.id;
  const { pesoCasca, pesoGema, pesoOvo } = req.body;

  const analise = await AnaliseModel.buscaranalisePorId(id);
  if (!analise) {
    return res.status(404).json({ error: "Analise não encontrada." });
  }

  const atualizado = await AnaliseModel.atualizarAnalise(id, {
    pesoCasca,
    pesoGema,
    pesoOvo,
  });
  return res.json(atualizado);
}

export async function deletar(req, res) {
  const id = req.params.id;
  

  const analise = await AnaliseModel.buscarAnalisePorId(id);
  if (!analise) {
    return res.status(404).json({ error: "Analise não encontrada." });
  }

  await AnaliseModel.deletarAnalise(id);
  return res.status(204).send();
}
