angular
  .module('Whatsapp')
  .controller('ChatsCtrl', ChatsCtrl);
 
function ChatsCtrl ($scope, $reactive, NewChat) {
  $reactive(this).attach($scope);

  this.remove = _remove;
  this.showNewChatModal = showNewChatModal;

  this.helpers({
    data(){
      return Chats.find();
    }
  });

  ////////////////////////////

  function showNewChatModal() {
    NewChat.showModal();
  }

  function _remove(chat) {
    Chats.remove(chat._id);
  } 
}
