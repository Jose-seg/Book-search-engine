const { User } = require('../models');
const { signToken } = require('../utils/auth')

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id);
                return user;
            }
            throw new Error('You need to be logged in!');
        },
    },

    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ $or: [{ email }, { username: email }] });
            if (!user) {
                throw new Error('No user found with this email address')
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new Error('Incorrect password.');
            }
            const token = signToken(user);
            return { token, user };
        },

        addUser: async (parent, { username, email, password}) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },

        saveBook: async (parent, { bookData }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: bookData } },
                    { new: true }
                );
                return {
                    _id: updatedUser._id,
                    username: updatedUser.username,
                    savedBooks: updatedUser.savedBooks
                }; 
            }
            throw new Error('You need to be logged in');
        },

        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true }
                );
                return {
                    _id: updatedUser._id,
            username: updatedUser.username,
            savedBooks: updatedUser.savedBooks
                }
            }
            throw new Error('You need to be logged in!');
        },
    },
};

module.exports = { resolvers };