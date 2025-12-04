export const generatePrice = () => {
  return Math.floor(Math.random() * (25000000 - 5000) + 5000);
};

export const generateYear = () => {
  return Math.floor(Math.random() * (2025 - 1940) + 1940);
};
