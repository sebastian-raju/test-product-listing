/** Hierarchical query keys so related queries can be invalidated together. */
export const productKeys = {
  all: ['products'] as const,
  list: () => [...productKeys.all, 'list'] as const,
};
