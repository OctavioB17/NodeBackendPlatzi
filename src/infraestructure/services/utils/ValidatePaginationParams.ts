export const validatePaginationParams = (limit?: number, offset?: number): { limit: number; offset: number } => {
  limit = Number(limit);
  offset = Number(offset);
  if (isNaN(limit) || limit < 0) {
    limit = 100;
  }
  if (isNaN(offset) || offset < 0) {
    offset = 0;
  }

  return { limit, offset };
}