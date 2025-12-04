import IDatabase from "../Interfaces/IDatabase.js";

export default class DatabaseMark extends IDatabase {
  constructor(db) {
    super(db)
  }

  async register(dataMark) {
    await this.#insertMark(dataMark);
  }

  async #insertMark({ marca, metodos }) {
    try {
      const [{cod_marca}] = await this.db`
        INSERT INTO lab_system.marca (nome)
        VALUES (${marca})
        RETURNING cod_marca 
      `;
      await metodos.forEach(metodo => {
        this.#insertMethodInMark(cod_marca, metodo);
      })
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async #insertMethodInMark(cod_marca, metodo) {
    try {
      await this.db`
        INSERT INTO lab_system.metodo (nome, descricao, cod_marca)
        VALUES (${metodo.name}, ${metodo.description}, ${cod_marca})
      `;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async readAll() {
    try {
      const marks = await this.db`
        SELECT a.nome as Marca, b.nome as Metodo, b.descricao as Descrição, b.cod_metodo
        FROM lab_system.marca a
        LEFT JOIN lab_system.metodo b ON a.cod_marca = b.cod_marca
      `
      return marks;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async readMethod() {
    try {
      const methods = await this.db`
        SELECT nome, descricao 
        FROM lab_system.metodo
      `;

      return methods
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async viewMarkForName(nome) {
    try {
      const marks = await this.db`
        SELECT a.nome as marca, b.nome as metodo, b.descricao as descrição, b.cod_metodo
        FROM lab_system.marca a
        LEFT JOIN lab_system.metodo b ON a.cod_marca = b.cod_marca
        WHERE a.nome = ${nome};
      `
      return marks;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async edit({marca, metodo = []}) {
    try {
      const cod_marca = await this.#getCodMarca(marca)
      metodo.forEach(metodo => {
        this.#updateMethodInMark(cod_marca, metodo)
      })
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async #getCodMarca(marca) {
    try {
      const [{cod_marca}] = await this.db`
        SELECT cod_marca
        FROM lab_system.marca
        WHERE nome = ${marca} 
      `
      return cod_marca;
    } catch (error) {
      throw new Error("Nome da marca não encontrado");
    }
  }

  async #updateMethodInMark(cod_marca, metodo) {
    try {
      if (metodo.cod_metodo == null) {
        await this.#insertMethodInMark(cod_marca, {name: metodo.nome, description: metodo.descricao})
      } else {
        await this.db`
          UPDATE lab_system.metodo
          SET nome = ${metodo.nome}, descricao = ${metodo.descricao}
          WHERE cod_marca = ${cod_marca} and cod_metodo = ${metodo.cod_metodo};
        `;
      }
    } catch (error) {
      throw new Error("Marca ou método inválidos");
    }
  }

  async delete(nome) {
    try {
      await this.db`
        DELETE FROM lab_system.marca
        WHERE nome = ${nome}
      `;
    } catch (error) {
      throw new Error("Nome da marca não encontrado");
    }
  }
  
  async deleteMethod(cod_metodo) {
    try {
      await this.db`
        DELETE FROM lab_system.metodo
        WHERE cod_metodo = ${cod_metodo}
      `
    } catch (error) {
      throw new Error("Método não encontrado");
    }
  }

  async listTypeTest() {
    try {
      const methods = await this.db`
        SELECT enumlabel
        FROM pg_enum
        JOIN pg_type ON pg_enum.enumtypid = pg_type.oid
        WHERE pg_type.typname = 'tipo_enum';
      `;
      return methods.map(m => m.enumlabel);
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async listTypeShoes() {
    try {
      const methods = await this.db`
        SELECT enumlabel
        FROM pg_enum
        JOIN pg_type ON pg_enum.enumtypid = pg_type.oid
        WHERE pg_type.typname = 'modelo_tipo';
      `;
      return methods.map(m => m.enumlabel);
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
