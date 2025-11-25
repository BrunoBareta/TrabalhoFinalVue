import { api } from "boot/axios";

export default class OrdemServicoService {

  static listar() {
    return api.get("/ordensServico");
  }

  static criar(data) {
    const obj = { ...data };
    delete obj.id;

    return api.post("/ordensServico", obj);
  }

  static atualizar(id, data) {
    return api.put(`/ordensServico/${id}`, data);
  }

  static excluir(id) {
    return api.delete(`/ordensServico/${id}`);
  }

}
