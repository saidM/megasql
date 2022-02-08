const validate = (options) => {
  if (!options.select) {
    throw new Error('Missing select from query');
  }
  if (!options.from) {
    throw new Error('Missing from from query');
  }
  if (!options.limit && options.offset) {
    throw new Error('Missing limit from query');
  }
};

const build = (options) => {
  validate(options);
  let query = `SELECT ${options.select} FROM ${options.from}`;
  if (options.where) {
    Object.entries(options.where).forEach(([key, value], index) => {
      const keyword = index == 0 ? 'WHERE' : 'AND';
      const condition = value.split('.')[0].toLowerCase();
      let symbol = '=';
      if (condition == 'like') {
        symbol = 'LIKE';
      } else if (condition == 'ilike') {
        symbol = 'ILIKE';
      } else if (condition == 'lt') {
        symbol = '<';
      } else if (condition == 'lte') {
        symbol = '<=';
      } else if (condition == 'gt') {
        symbol = '>';
      } else if (condition == 'gte') {
        symbol = '>=';
      }
      query += ` ${keyword} ${key} ${symbol} :${key}`;
    });
  }
  if (options.order_by) {
    let [column, direction] = options.order_by.split('.');
    query += ` ORDER BY ${column}`;
    if (direction) {
      direction = direction.toUpperCase();
      query += ` ${direction}`
    }
  }
  if (options.limit) {
    query += ` LIMIT ${options.limit}`;
  }
  if (options.offset) {
    query += ` OFFSET ${options.offset}`;
  }
  return query;
}

module.exports = build;
