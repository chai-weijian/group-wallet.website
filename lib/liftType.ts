export const liftType = <T>(input: T | T[]) => {
  if (Array.isArray(input)) {
    return input;
  } else {
    return [input];
  }
};
