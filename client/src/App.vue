<template>
  <div id="app">
    <div v-if="!login">
      <form @submit.prevent="enterName()">
        <input v-model="name" placeholder="Adınız">
        <input type="submit" value="Giriş Yap">
      </form>
    </div>
    <div v-else>
      Online kullanıcılar
      <ul>
        <li v-bind:key="user.id" v-for="user in users">{{ user.name }}</li>
      </ul>
      <form @submit.prevent="sendMessage()">
        <input v-model="message" placeholder="Mesajınız">
        <input type="submit">
      </form>
      Mesajlar
      <ul class="messages">
        <li v-bind:key="message.name" v-for="message in messages" :class="{'my-messages': message.name == username}"><b>{{ message.name }} : </b> {{ message.message }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      login: false,
      name: "",
      users: [],
      message: "",
      messages: [],
      username: "",
    }
  },
  sockets: {
    users(data) {
      this.users = data;
    },
    messages(data) {
      this.messages = data;
    },
    username(data) {
      this.username = this.name;
    }
  },
  methods: {
    enterName() {
      this.login = true;
      this.$socket.emit('new_user', this.name);
    },
    sendMessage() {
      this.$socket.emit('new_message', {
        name: this.name,
        message: this.message
      });
      this.message = '';
    }
  }
}
</script>

<style scoped>

ul.messages li{
  display: block;
  width: calc( 100% - 30px );
  border-bottom: 1px solid gray;
  padding: 15px;
}

ul.messages li.my-messages{
  text-align: right;
}

</style>