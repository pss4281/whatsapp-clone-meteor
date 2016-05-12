Chats    = new Mongo.Collection('chats');
Messages = new Mongo.Collection('messages');


Chats.helpers({
  unreadMessagesCount(){
    let currentUserId = Meteor.userId();
    return Messages.find({ chatId: this._id, readAt: { $exists: false }, userId: {$ne: currentUserId} }).count();
  }
});
