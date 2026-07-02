import { prisma } from "../lib/prisma.js";

export async function listarAnalises() {
  return prisma.analise.findMany();
}

export async function buscarAnalisePorId(id) {
  return prisma.analise.findUnique({ where: { id } });
}

export async function criarAnalise(data) {
  return prisma.analise.create({ data });
}

export async function atualizarAnalise(id, data) {
  return prisma.analise.update({ where: { id }, data });
}

export async function deletarAnalise(id) {
  return prisma.analise.delete({ where: { id } });
}