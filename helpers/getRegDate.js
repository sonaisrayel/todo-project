const getRegDate = () => {
  const regYear = new Date().getFullYear();
  const regMonth = new Date().getMonth() + 1;
  const regDay = new Date().getDate();

  return `${regYear}-${regMonth}-${regDay}`;
};

module.exports = getRegDate;
