module.exports = function howWarnsUser(context, users) {
  const user = users.filter(x => x.id === context.replyMessage.senderId)[0]
  context.send(`Предупреждений: ${user.warns}/3`)
}