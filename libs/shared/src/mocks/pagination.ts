export const paginationMock = <T>(entityMock: T) => ({
  items: [entityMock as T],
  hasMore: true,
  total: 10,
});
