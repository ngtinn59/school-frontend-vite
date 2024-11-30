export const parseQueryParams = (search: string) => {
  if (!search) return null;
  const params = new URLSearchParams(search);
  const query: Record<string, string> = {};
  for (const [key, value] of params) {
    query[key] = value;
  }
  return query;
};

export const randomStringWithTimeStamp = (length: number) => {
  return (
    Math.random()
      .toString(10)
      .substring(2, length + 2) + Date.now()
  );
};
