const generateRandomID = (num, type) => {
  let letterList = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomId = ""

  for(let i = 0; i < num; i++) {
    randomId += letterList[Math.floor(Math.random() * letterList.length)]
  }

  return randomId;
}

module.exports = {
  generateRandomID
}