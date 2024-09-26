const { Charity, Donation, User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const { model } = require("mongoose");

const resolvers = {
  // QUERY
  Query: {
   

    users: async () => {
      return await User.find()
        .populate({
          path: 'donations', // Path to the donations array
          select: 'donationAmount' // Only select the donationAmount field
        });
    },




    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },

    // GET one User (populate subschemas)
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id })
          .populate({
            path: "donations",
            populate: { path: "charity" },
          })
          .populate("charities")
          .populate("categories")
          .populate({
            path: "donations.charity",
            populate: { path: "category" },
          });
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    // GET one Charity, based on charity id
    charity: async (parent, { charityId }) => {
      return Charity.findOne({ _id: charityId });
    },

    // GET all Charities
    charities: async () => {
      return Charity.find().populate("categories");
    },

    // GET all Donations
    donations: async () => {
      return await Donation.find()
        .populate({
          path: 'user',  // Populate the user associated with the donation
          select: '_id username',  // Select only the fields you need
        })
        .populate({
          path: 'charity',  // Populate the charity associated with the donation
          
        });
    }
},



  
  // MUTATIONS
  Mutation: {
    //POST: Adding a new user
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    // POST new Donation to User
    // addDonation: async (
    //   parent,
    //   { donationAmount, donationDate, charity },
    //   context
    // ) => {
    //   if (context.user) {
    //     const donation = await Donation.create({
    //       donationAmount: donationAmount,
    //       donationDate: donationDate,
    //       user: context.user._id,
    //       charity: charity,
    //     });
    //     console.log("donation", donation);
    //     await User.findByIdAndUpdate(context.user._id, {
    //       $push: { donations: donation._id },
    //     });

    //     return donation;
    //   }

    //   throw new AuthenticationError("Not logged in!");
    // },
    addDonation: async (parent, { donationAmount, donationDate, charity }, context) => {
      // Check if the user is logged in
      if (context.user) {
        // Create a new donation
        const donation = await Donation.create({
          donationAmount,
          donationDate,
          user: context.user._id, // Automatically use the logged-in user's ID
          charity,
        });
    
        console.log('Donation created:', donation);
    
        // Add the donation ID to the user's donations array
        await User.findByIdAndUpdate(
          context.user._id, // The logged-in user's ID
          { $push: { donations: donation._id } }, // Push the donation ID to the user's donations array
          { new: true }
        );
    
        // Return the donation with populated user and charity info
        return await Donation.findById(donation._id)
          .populate('user', 'username') // Populate user with username
          .populate('charity', 'name'); // Populate charity with name
      }
    
      // Throw an error if the user is not logged in
      throw new AuthenticationError("You need to be logged in!");
    },
    
    
    // PUT login verification
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user with this email found!");
      }

      // password validation
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(user);
      return { token, user };
    },

    // PUT Save Charity to User
    saveCharity: async (parent, { charityId }, context) => {
      // Finding all the info for a charity
      const charity = await Charity.findOne({ _id: charityId });

      // Saving all the categories from the charity found above in variable
      const categoryIds = await charity.categories;

      // Updating the user to have that charity added to their portfolio
      const updateUserCharity = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { charities: charityId } },
        { new: true }
      );

      // Updating User Categories from Added Charity
      const updateUserCategories = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { categories: [...categoryIds] } },
        { new: true }
      );

      return updateUserCategories;
    },

    // DELETE Charity from User Portfolio (unsaving)
    unsaveCharity: async (parent, { charityId }, context) => {
      const charity = await Charity.findOne({ _id: charityId });
      const updateUserCharity = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { charities: charityId } },
        { new: true }
      );

      return updateUserCharity;
    },

    // add a friend to the users friends list

    // addFriend: async (parent, { friendId }, context) => {
    //   // Updating the user to have that friend added to their friends list
    //   const updatedUser = await User.findOneAndUpdate(
    //     { _id: context.user._id },
    //     { $addToSet: { friends: friendId } },
    //     { new: true }
    //   );

    //   return updatedUser;
    // },

    // // ADD FRIEND TO USER (without JWT token)
    // addFriend: async (parent, { userId, friendId }) => {
    //   // Updating the specified user to have that friend added to their friends list
    //   const updatedUser = await User.findOneAndUpdate(
    //     { _id: userId },
    //     { $addToSet: { friends: friendId } },
    //     { new: true }
    //   );

    //   return updatedUser;
    // },

    // ADD FRIEND TO USER (without JWT token)
    addFriend: async (parent, { userId, friendId }) => {
      // Updating the specified user to have that friend added to their friends list
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { $addToSet: { friends: friendId } },
        { new: true }
      );

      // Fetching the details of the updated user's friends
      const populatedUser = await User.findById(userId).populate("friends");

      return populatedUser;
    },
  },
};

module.exports = resolvers;
