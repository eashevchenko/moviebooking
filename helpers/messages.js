const messages = {
    removedMovieMessage: 'movie was removed !',
    removedUserMessage: 'user was removed !'
};

module.exports = {
    messages: messages,
    initMessageObj: (message) => {
        return {
            "message": message
        }
    }
};