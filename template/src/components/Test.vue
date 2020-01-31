<template>
  <div class="box">
    <img src="../assets/img/abc.jpeg" alt="" srcset=""><!--
    --><img src="../assets/img/abc.jpeg" alt="" srcset="">
    <input type="text" id="input">
    <p></p>
  </div>
</template>
<script>
/* eslint-disable */ 
  function *go(a){
    console.log(1,a);
    
    let b = yield (function(){
      console.log(1000);
      return 1000
      
    })()
    console.log(2,b);
    
    let c = yield (function(){
      console.log(2000);
      return 2000
      
    })()
    console.log(3,c);
    
    return 100
  }
  let iterator = go(100)
export default {
  data(){
    return{
      inputValue: '100'
    }
  },
  mounted(){
    const input = document.getElementById('input')
   const obj = {}
    input.addEventListener('input',(e) =>{
      console.log(e,input);
      console.log(e.target.value);
      obj.value=e.target.value
      // input.value = e.value
    })
    Object.defineProperty(input, 'value', {
          get:function(){
            return ''
          },
          set:(val) => {
            // this.inputValue = val
            console.log(val);

            
            // return val
          }
        })

    // console.log(input.value)
    // input.value = 200
    // console.log(input.value)
    // console.log(this.inputValue)

  },
  methods: {
    btnMethod () {
      console.log(2);
      
      let c = iterator.next()
      console.log('c',c);      
      // console.log(a.b.f)
    }
  }
}
</script>
<style scoped='scoped' lang="scss">
  @import '../style/test.scss';
</style>
