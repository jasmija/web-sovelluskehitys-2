<template>
  <div id="query-form">
    <form @submit.prevent="handleSubmit">
      <br/>
      <button>Hae tapahtumat</button>
      <b-table striped hover id="event-table" v-bind:items="items">
        <tbody>
        <tr :key="item.id"
            v-for="item in items">
        <td>
        {{item.name}}
        </td>
          <td>
            {{item.date}}
          </td>
          <td>
            {{item.place}}
          </td>
        </tr>
        </tbody>
      </b-table>
    </form>
  </div>
</template>
<script>
export default {
  name: 'ListEvent',
  props: ['items'],

  data(){
    return{
      item:{
        id: '',
        name: '',
        date: '',
        place: ''
      },
    }
  },

  methods: {
    async handleSubmit(){
      try{
        let string = 'http://localhost:3001/events'
        const response = await fetch(string)
        let data = await response.json()
        console.log(data)
        this.items = this.items.concat(data)
      }catch (error){
        console.log('error')
      }
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
</style>