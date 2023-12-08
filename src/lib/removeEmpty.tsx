export const removeEmpty = (arr: any) => {
  return arr.filter((value: any) => value !== undefined && value !== null);
};

export const removeEmptyFile = (arr: any) => {
  return arr.filter(
    (value: any) => value.file !== undefined && value.file !== null
  );
};
