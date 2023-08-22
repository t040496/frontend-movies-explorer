export const convertDur = (dur: number) => {
  const hours = Math.floor(dur / 60);
  const minutes = dur % 60;
  return hours + "ч " + minutes + "м ";
};

export const wait = (delay: number) =>
  new Promise((res) => setTimeout(res, delay));
