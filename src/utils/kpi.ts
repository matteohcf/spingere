export const getKpi = (userId: string, data: any[], index = 0): any[] => {
  if (!data) {
    return []
  }
  const item = data[index];
  if (index >= data.length) {
    return [];
  }
  const id = item?.userId;
  if (userId !== id) {
    return getKpi(userId, data, index + 1);
  }
  return item?.counts || [];
};
