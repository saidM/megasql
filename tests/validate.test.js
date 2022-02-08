const { build } = require('../index');

describe('#build', () => {
  describe('when missing select', () => {
    it('raises error', () => {
      const options = {
        from: 'users'
      };
      expect(() => {
        build(options);
      }).toThrow('Missing select from query');
    });
  });
  describe('when missing from', () => {
    it('raises error', () => {
      const options = {
        select: '*'
      };
      expect(() => {
        build(options);
      }).toThrow('Missing from from query');
    });
  });
  describe('when offset but missing limit', () => {
    it('raises error', () => {
      const options = {
        select: '*',
        from: 'users',
        offset: '1'
      };
      expect(() => {
        build(options);
      }).toThrow('Missing limit from query');
    });
  });
});
