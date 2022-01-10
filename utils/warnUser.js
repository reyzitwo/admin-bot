module.exports = function warnUser(context, api, users) {
	const user = users.filter(x => x.id === context.replyMessage.senderId)[0]

	if (user.warns + 1 == 1) {
		context.send(`@id${user.id}(Пользователь) получает 1 из 3 предов.`)
	}

	if (user.warns + 1 == 2) {
		context.send(`@id${user.id}(Пользователь) получает 2 из 3 предов.`)
	}

	if (user.warns + 1 == 3) {
		context.send(`@id${user.id}(Пользователь) получает 3 пред и исключается из беседы.`)
		api.messages.removeChatUser({ chat_id: context.chatId, user_id: user.id })
		return
	}

	user.warns++
}