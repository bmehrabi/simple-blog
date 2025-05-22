import QUERY_KEYS from '@app/api/queryKeys';

describe('queryKeys', () => {
  it('returns correct query key', () => {
    expect(QUERY_KEYS.POSTS).toBe('POSTS');
  });
});
