export const validatePaginationParams = (limit?: number | undefined | null, offset?: number | undefined | null): { limit: number; offset: number } => {
  limit = Number(limit);
  offset = Number(offset);
  if (isNaN(limit) || limit < 0 || limit === undefined || limit === null ) {
    limit = 100;
  }
  if (isNaN(offset) || offset < 0 ||  offset === undefined || offset === null) {
    offset = 0;
  }

  return { limit, offset };
}