import IDatabase from "../Interfaces/IDatabase.js";

export default class DatabaseModel extends IDatabase {
  constructor(db) {
    super(db);
  }

  async register({ nome, tipo, marca, especificacoes }) {
    try {
      const cod_marca = await this.#getBrandForName(marca);

      // 1️⃣ Inserir modelo
      const [{ cod_modelo }] = await this.db`
        INSERT INTO lab_system.modelo (nome, tipo, cod_marca)
        VALUES (${nome}, ${tipo}, ${cod_marca})
        RETURNING cod_modelo;
      `;

      // 2️⃣ Inserir especificações vinculadas ao modelo
      for (const esp of especificacoes) {
        await this.db`
          INSERT INTO lab_system.especificacao (cod_modelo, tipo, valor_especificacao)
          VALUES (${cod_modelo}, ${esp.tipo}, ${esp.valor});
        `;
      }

      return cod_modelo;

    } catch (error) {
      throw new Error(error.message);
    }
  }

  async #getBrandForName(marca) {
    try {
      const [{ cod_marca }] = await this.db`
        SELECT cod_marca
        FROM lab_system.marca
        WHERE nome = ${marca};
      `;

      return cod_marca;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async search(id) {
    try {
      const modelo = await this.db`
        SELECT a.nome, a.tipo, b.nome as marca
        FROM lab_system.modelo a
        JOIN lab_system.marca b ON a.cod_marca = b.cod_marca
        WHERE a.nome = ${id};
      `;

      return modelo;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async edit({ id, nome, tipo, marca, especificacoes }) {
    try {
      let cod_marca = null;

      if (marca) {
        cod_marca = await this.#getBrandForName(marca);
      }

      // 1. Atualizar o modelo
      await this.db`
        UPDATE lab_system.modelo
        SET 
          nome = COALESCE(${nome}, nome),
          tipo = COALESCE(${tipo}, tipo),
          cod_marca = COALESCE(${cod_marca}, cod_marca)
        WHERE cod_modelo = ${id};
      `;

      // 2. Remover especificações antigas
      await this.db`
        DELETE FROM lab_system.especificacao
        WHERE cod_modelo = ${id};
      `;

      // 3. Inserir as novas
      for (const esp of especificacoes) {
        await this.db`
          INSERT INTO lab_system.especificacao (cod_modelo, tipo, valor_especificacao)
          VALUES (${id}, ${esp.tipo}, ${esp.valor});
        `;
      }

    } catch (error) {
      throw new Error(error.message);
    }
  }

  async delete({ id }) {
    try {
      await this.db`
        DELETE FROM lab_system.modelo
        WHERE cod_modelo = ${id};
      `;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async readAll() {
    try {
      const modelos = await this.db`
        SELECT a.nome, a.tipo, b.nome as marca
        FROM lab_system.modelo a
        JOIN lab_system.marca b ON a.cod_marca = b.cod_marca;
      `;

      return modelos;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
