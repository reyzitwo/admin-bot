const { VK } = require('vk-io');
const users = require('./users.json');
const fs = require('fs');

const checkRole = require('./utils/checkRole');
const warnUser = require('./utils/warnUser');
const unwarnUser = require('./utils/unwarnUser');
const kickUser = require('./utils/kickUser');
const howWarnsUser = require('./utils/howWarnsUser');

const vk = new VK({ token: '' }); //token группы
const idGroup = -1 //id группы

setInterval(async () => {
  fs.writeFileSync("./users.json", JSON.stringify(users, null, "\t"))
}, 500);

vk.updates.on('message', (next, context) => {
  const user = users.filter(x => x.id === next.senderId)[0]
  if(user) return context()
  users.push({
    id: next.senderId,
    warns: 0,
    role: 1,
    ban: false
  })
  return context()
})

vk.updates.on([ 'chat_invite_user', 'chat_invite_user_by_link' ], async (context) => {
  if ((context.eventMemberId || context.senderId) === idGroup) {
    await context.send(`Всем привет я новенький.`)
  }
})

vk.updates.on('message_new', (context) => {
  if (context.text !== undefined) {
    if (context.text.toLowerCase() === 'пред') {
      if (checkRole(context, 2, users, true)) return console.log(`${context.senderId} - лох`)
      warnUser(context, vk.api, users)
    }

    if (context.text.toLowerCase() === 'снять пред') {
      if (checkRole(context, 2, users, true)) return console.log(`${context.senderId} - лох`)
      unwarnUser(context, users)
    }

    if (context.text.toLowerCase() === 'кик') {
      if (checkRole(context, 3, users, true)) return console.log(`${context.senderId} - лох`)
      kickUser(context, vk.api)
    }

    if (context.text.toLowerCase() === 'че там') {
      if (checkRole(context, 3, users, true)) return console.log(`${context.senderId} - лох`)
      howWarnsUser(context, users)
    }

    if (context.text.toLowerCase() === 'бот') {
      if (checkRole(context, 3, users)) return console.log(`${context.senderId} - лох`)
      context.send('Работаю!')
    }
  }
})

console.log("Работаю!");
vk.updates.start().catch(console.error); 