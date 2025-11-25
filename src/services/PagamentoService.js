import { api } from "boot/axios";

export default class PagamentoService {

  static registrar(data) {
    const obj = { ...data };
    delete obj.id;
    return api.post("/pagamentos", obj);
  }

  static listar() {
    return api.get("/pagamentos");
  }
}
