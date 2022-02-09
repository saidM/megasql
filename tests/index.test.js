const build = require('../index');

describe('#build', () => {
  it('build simple query', () => {
    const options = {
      select: '*',
      from: 'users'
    };
    expect(build(options)).toBe('SELECT * FROM users');
  });
  it('build [where] query', () => {
    const options = {
      select: '*',
      from: 'users',
      where: {
        id: '1'
      }
    };
    expect(build(options)).toBe('SELECT * FROM users WHERE id = ${id}');
  });
  it('build [multiple where] query', () => {
    const options = {
      select: '*',
      from: 'users',
      where: {
        id: '1',
        name: 'Saïd'
      }
    };
    expect(build(options)).toBe('SELECT * FROM users WHERE id = ${id} AND name = ${name}');
  });
  it('build [where equal] query', () => {
    const options = {
      select: '*',
      from: 'users',
      where: {
        name: 'eq.Saïd'
      }
    };
    expect(build(options)).toBe('SELECT * FROM users WHERE name = ${name}');
  });
  it('build [where like] query', () => {
    const options = {
      select: '*',
      from: 'users',
      where: {
        name: 'like.Saïd'
      }
    };
    expect(build(options)).toBe('SELECT * FROM users WHERE name LIKE ${name}');
  });
  it('build [where ilike] query', () => {
    const options = {
      select: '*',
      from: 'users',
      where: {
        name: 'ilike.Saïd'
      }
    };
    expect(build(options)).toBe('SELECT * FROM users WHERE name ILIKE ${name}');
  });
  it('build [where less than] query', () => {
    const options = {
      select: '*',
      from: 'users',
      where: {
        id: 'lt.Saïd'
      }
    };
    expect(build(options)).toBe('SELECT * FROM users WHERE id < ${id}');
  });
  it('build [where less than or equal] query', () => {
    const options = {
      select: '*',
      from: 'users',
      where: {
        id: 'lte.Saïd'
      }
    };
    expect(build(options)).toBe('SELECT * FROM users WHERE id <= ${id}');
  });
  it('build [where greater than] query', () => {
    const options = {
      select: '*',
      from: 'users',
      where: {
        id: 'gt.Saïd'
      }
    };
    expect(build(options)).toBe('SELECT * FROM users WHERE id > ${id}');
  });
  it('build [where greater than or equal] query', () => {
    const options = {
      select: '*',
      from: 'users',
      where: {
        id: 'gte.Saïd'
      }
    };
    expect(build(options)).toBe('SELECT * FROM users WHERE id >= ${id}');
  });
  it('build [limit] query', () => {
    const options = {
      select: '*',
      from: 'users',
      limit: 1
    };
    expect(build(options)).toBe('SELECT * FROM users LIMIT 1');
  });
  it('build [limit + offset] query', () => {
    const options = {
      select: '*',
      from: 'users',
      limit: 1,
      offset: 2
    };
    expect(build(options)).toBe('SELECT * FROM users LIMIT 1 OFFSET 2');
  });
  it('build [order by] query', () => {
    const options = {
      select: '*',
      from: 'users',
      order_by: 'id',
    };
    expect(build(options)).toBe('SELECT * FROM users ORDER BY id');
  });
  it('build [order by asc] query', () => {
    const options = {
      select: '*',
      from: 'users',
      order_by: 'id.asc',
    };
    expect(build(options)).toBe('SELECT * FROM users ORDER BY id ASC');
  });
  it('build [order by desc] query', () => {
    const options = {
      select: '*',
      from: 'users',
      order_by: 'id.desc',
    };
    expect(build(options)).toBe('SELECT * FROM users ORDER BY id DESC');
  });
});
