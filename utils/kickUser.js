module.exports = function kickUser(context, api) {
	context.send(`@id${context.replyMessage.senderId}(Пользователь) исключается.`)
	api.messages.removeChatUser({ chat_id: context.chatId, user_id: context.replyMessage.senderId })
}