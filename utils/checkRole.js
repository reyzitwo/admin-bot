module.exports = function checkRole(context, roleId, users, isReplay) {
	const user = users.filter(x => x.id === context.senderId)[0]

	if (user.role < roleId) {
		return true
	}

	if (context.replyMessage !== undefined) {
		const userReplay = users.filter(x => x.id === context.replyMessage.senderId)[0]
		if (user.id === userReplay.id || userReplay.role >= user.role) {
			return true
		}
	} else {
		if (isReplay) {
			return true
		}
	}

	return false
}