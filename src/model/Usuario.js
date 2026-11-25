import axios from "axios";

export class Usuario {
  constructor(turno, email) {
    this.turno = turno;
    this.email = email;
  }

  static async all() {
    const resp = await axios.get("https://servidor/Usuarios");
    return resp.data.map((item) => {
      const obj = JSON.parse(item);
      return new Usuario(obj.turno, obj.email);
    });
  }
}
