export const getFormatedAmount = (amount) => {
  return parseFloat(amount).toFixed(2).toString().replace(".", ",");
};
