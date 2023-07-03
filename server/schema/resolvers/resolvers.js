const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {

            }
            throw new Error('You need to be logged in!');
        }
    }
};

module.exports = resolvers;