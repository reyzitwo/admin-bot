module.exports = function unwarnUser(context, users) {
  const user = users.filter(x => x.id === context.replyMessage.senderId)[0]

  if (user.warns == 0) {
    return console.log(`${context.senderId} - лох`)
  }

  if (user.warns - 1 == 0) {
    context.send(`У @id${user.id}(пользователя) теперь нет предупреждений.`)
  } else {
    context.send(`У @id${user.id}(пользователя) ${user.warns - 1}/3 предупреждений.`)
  }

  user.warns--
}