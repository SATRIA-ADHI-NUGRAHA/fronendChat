<template>
  <div class="container-fluit" style="overflow-x: hidden;">
    <div class="row">
      <div class="col-md-3">
        <div class="m-3 d-flex justify-content-between">
          <h3 class="telegram">Telegram</h3>
          <div class="hamburger-menu">
            <button class="hamburger-animation btn btn-inline" @click="navToggle" style="margin-right: -32px;"><img class="menu-icon" src="../assets/Menu.png" alt=""></button>
          </div>
          <div class="aplication-menu">
            <p @click="settingApp"><img src="../assets/Settings.png" alt="setting" class="mr-3"> Settings</p>
            <p><router-link to="/about"><img src="../assets/Contacts.png" alt="Contact" class="mr-3"></router-link>Maps</p>
            <p><img src="../assets/Vector.png" alt="Cals" style="margin-left: -5px; margin-right: 11px;"> Calls</p>
            <p><img src="../assets/Rectangle 37.png" alt="Save" style="margin-left: 2px; margin-right: 19px;"> Save Message</p>
            <p><img src="../assets/Invite friends.png" alt="invite" style="margin-left: -10px; margin-right: 19px;"> Invite Friends</p>
            <p><img src="../assets/FAQ.png" alt="faq" style="margin-left: -2px; margin-right: 18px;"> Telegram FAQ</p>
          </div>
        </div>
        <div class="chat-search">
          <form class="search-message">
            <button><b-icon icon="search"></b-icon></button>
            <input type="text" placeholder="Type your message...">
          </form>
          <img class="pl-3" src="../assets/Plus.png" alt="plus">
        </div>
        <div class="m-3" style="padding-left: 21px">
          <button class="m-2 btn btn-outline-primary" type="submit">All</button>
          <button class="m-2 btn btn-outline-primary" type="submit">Importan</button>
          <button class="m-2 btn btn-outline-primary" type="submit">Unread</button>
        </div>
        <div class="m-3" v-for="(item, index) in listUsers" :key="index">
          <img src="../assets/Rectangle 8.png" alt="">
          <button v-if="email !== item.email" class="btn btn-link" @click="selectUsers(item.email)">
            {{item.username}}
            <p>Galau...</p>
          </button>
          <button v-else class="ml-3 btn btn-success">
            {{item.username}}
          </button>
        </div>
      </div>
      <div class="col-md-9">
        <div class="card">
          <div class="card-header">
            <div v-if="userReceiver !== null">
              <img src="../assets/Rectangle 8.png" alt="">
              {{userReceiver}}
            </div>
          </div>
          <div class="card-body">
            <div class="message">
              <div v-for="(item, index) in historyMessages" :key="index">
                <img src="../assets/Rectangle 8.png" alt="">
                {{item.message}}
              </div>
              <div v-if="userReceiver !== null">
                <div v-for="(item, index) in privateMessages" :key="index">
                  <img src="../assets/Rectangle 8.png" alt="">
                  {{item.message}}
                </div>
              </div>
              <div v-else>
                <div v-for="(item, index) in listMessages" :key="index">
                  {{item.message}}
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <form @submit.prevent="sendMessage()">
              <div class="input-group mb-3">
                <input v-model="message" type="text" class="form-control" placeholder="message">
                <div class="input-icon">
                  <button class="btn btn-success" type="submit" id="button-addon2"><img class="send-img" src="../assets/send.png" alt=""></button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'

export default {
  name: 'Home',
  data () {
    return {
      message: '',
      // username: this.$route.query.username,
      username: this.$route.query.email,
      // room: this.$route.query.room,
      // receiverName: '',
      socket: io('http://localhost:3000'),
      listUsers: [],
      userReceiver: null,
      listMessages: [],
      privateMessages: [],
      historyMessages: []
    }
  },
  methods: {
    selectUsers (users) {
      this.listMessages = []
      this.privateMessages = []
      // this.receiverName = users.username
      this.userReceiver = users
      // get private message from array
      this.getPrivateMessage()
      // request get private message from database
      this.socket.emit('get-history-message', {
        sender: this.email,
        receiver: users
      })
      // // get private message from database
      this.getCau()
    },
    getCau () {
      this.socket.on('get', (data) => {
        this.historyMessages = data
      })
    },
    getPrivateMessage () {
      const privateMessage = this.listMessages
        .filter((item) => item.sender === this.userReceiver || item.sender === this.email)
      this.privateMessages = privateMessage
      // console.log(this.privateMessages)
    },
    sendMessage () {
      if (this.userReceiver == null) {
        alert('Please select a chat to start messaging')
      } else {
        const msg = `${this.email} : ${this.message}`
        this.listMessages = [...this.listMessages, {
          sender: this.email,
          receiver: this.userReceiver,
          message: msg
        }]
        // console.log(this.listMessages)
        this.getPrivateMessage()
        this.socket.emit('send-message', {
          sender: this.email,
          receiver: this.userReceiver,
          message: this.message
        })
        this.message = ''
      }
    },
    navToggle () {
      const menu = document.querySelector('.aplication-menu')
      menu.classList.toggle('aplication-menu-toggle')
    },
    settingApp () {
      const setting = document.querySelector('.edit-profile-page')
      setting.classList.toggle('edit-profile-page-toggle')
    }
  },
  mounted () {
    this.socket.emit('get-all-user', [])
    this.socket.on('list-users', (data) => {
      this.listUsers = data
    })
    this.socket.emit('join-room', {
      users: this.email
    })
    this.socket.on('list-messages', async (data) => {
      this.listMessages = await [...this.listMessages, data]
      if (this.userReceiver !== null) {
        this.getPrivateMessage()
      }
    })
    // this.getCau()
  },
  components: {
  }
}
</script>

<style scoped>
  .message {
    min-height: 70vh;
  }
  .telegram {
    color: #7E98DF;
  }
  .send-img {
    width: 30px;
    height: 30px;
  }
  form .input-icon{
    position:relative;
  }
  .hamburger-menu span:nth-child(2) {
    transform-origin: 0 0;
  }
  .hamburger-menu span:nth-child(3) {
    width: 15px;
  }
  .hamburger-menu span:nth-child(4) {
    transform-origin: 0 100%;
  }
  .hamburger-menu input:checked ~ span:nth-child(2) {
    transform: rotate(45deg) translate(1.5px, -1.4px);
  }
  .hamburger-menu input:checked ~ span:nth-child(3) {
    transform: scale(0);
  }
  .hamburger-menu input:checked ~ span:nth-child(4) {
    transform: rotate(-45deg) translate(1px, 2px);
  }
  .aplication-menu {
    position: absolute;
    background-color: #7E98DF;
    width: 200px;
    border-radius: 35px 10px 35px 35px;
    padding: 20px;
    margin-top: 30px;
    margin-left: 110px;
    height: 0;
    transform: scale(0);
  }
  .aplication-menu p {
    color: white;
    cursor: pointer;
  }
  .aplication-menu p:hover {
    color: #e1e8ff;
  }
  .aplication-menu-toggle {
    height: 270px;
    transform: scale(1);
  }
  /* search-message */
  .chat-search {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
  }
  .search-message button {
    background-color: transparent;
    border: none;
    outline: none;
    position: absolute;
    font-size: 20px;
    margin-left: 5px;
    margin-top: 10px;
  }
  .search-message input[type="text"] {
    outline: none;
    border: none;
    background-color: #fafafa;
    padding: 15px 40px;
    border-radius: 15px;
    width: 260px;
  }
  @media (max-width: 768px) {
    .hamburger-menu img {
      padding-right: 25px;
    }
    .aplication-menu {
      margin-left: 200px;
    }
  }
</style>
