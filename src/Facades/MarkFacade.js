export default class MarkFacade {
  static checkData(markData) {
    try {
      this.#isValidNameMark(markData);
    } catch (error) {
      throw error;
    }
  }

  static #isValidNameMark({marca}) {
    if (marca == null) throw new TypeError("O nome da marca está nulo");
    if (typeof marca != 'string') throw new TypeError("O nome da marca não é uma string");
  }

  static filterMethods({marca, metodo = []}) {
    const filters = metodo.filter(element => element.nome != '');
    return {
      marca,
      metodo: filters
    }
  }

  static formatedMark(marks) {
    const grouped = marks.reduce((acc, item) => {
      const existing = acc.find(el => el.marca === item.marca);

      const metodoObj = {
        nome: item.metodo,
        descricao: item['descrição'],
        cod_metodo: item.cod_metodo
      };

      if (existing) {
        existing.metodo.push(metodoObj);
      } else {
        acc.push({
          marca: item.marca,
          metodo: [metodoObj]
        });
      }

      return acc;
    }, []);

    return grouped;
  }
}
