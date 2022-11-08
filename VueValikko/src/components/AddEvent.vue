<template>
  <div>
    <form @add:event="handleSubmit" @submit.prevent="handleSubmit">
      <br/>
      <label>Nimi</label>
      <br/>
      <input v-bind:class="{'has-error': submit && invalidName}" v-model="eventt.name">
      <br/>
      <label>Aika</label>
      <br/>
      <input :class="{'has-error': submit && invalidDate}" v-model="eventt.date">
      <br/>
      <label>Paikka</label>
      <br/>
      <input :class="{'has-error': submit && invalidPlace}" v-model="eventt.place" @focus="clearStatus" @keypress="clearStatus">
      <br/>
      <p v-if="error && submit" class="error-message">Täytä kaikki kentät!</p>
      <p v-if="success" class="success-message">Tapahtuma lisätty onnistuneesti!</p>
      <br/>
      <button>Lisää</button>
    </form>
  </div>
</template>
<script>
  import axios from 'axios';
    export default {
    name: 'AddEvent',

      computed:{
        invalidPlace(){
          return this.eventt.place === '';
        },
        invalidName(){
          return this.eventt.name ==='';
        },
        invalidDate(){
          return this.eventt.date === '';
        }
      },

      data(){
        return{
          submit: false, //kun painetaan lisää painiketta katsotaan onko error true/false
          error: false, //tietojen lähetys ei onnistunut -> kentissä ei tarpeellisia tietoja
          success: false, //ilmoitus onnistunesta tapahtuman lisäyksestä

          eventt:{
            name: '',
            date: '',
            place: ''
          },
          events: []
          }
      },

      methods: {
        async handleSubmit(){
          this.submit = true;
          this.clearStatus();

          if(this.invalidPlace || this.invalidDate || this.invalidName){
            this.error = true;
            return
          }

          const newEvent = this.eventt;
          axios
            .post('http://localhost:3001/events', newEvent)
            .then(response => {
              console.log(response)
            })
              this.eventt={
                name: '',
                date: '',
                place: ''
              },

          /*const event = '{"name": "' + this.name + '", "date": "' + this.date + '", "place": "' + this.place + '"}';
          const xmlhttp = new XMLHttpRequest();
          console.log(event);
          xmlhttp.open('POST', 'http://localhost:3001/events', true);
          xmlhttp.setRequestHeader('Content-Type', 'application/json');
          xmlhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
          xmlhttp.send(event);*/

          this.error = false
          this.submit = false
          this.success = true
        },
        clearStatus() {
          this.success = false
          this.error = false
        }
      }
};

</script>
<style scoped>
    .homeText{
    font-size: 35px;
    color: red;
    text-align: center;
    position: relative;
    top:30px;
    text-shadow: 2px 2px 2px gray;
    }

    [class*='-message'] {
      font-weight: 500;
    }

    .error-message {
      color: #d33c40;
    }

    .success-message {
      color: #32a95d;
    }
</style>