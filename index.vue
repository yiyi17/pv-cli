<template>
    <div>
        hello world
        <el-rate
        v-model="value2"
        :colors="colors">
      </el-rate>
        <div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            value2:null,colors: ['#99A9BF', '#F7BA2A', '#FF9900'] 
        }
    }
}
</script>
<style lang="css">
   div{
       background-color: red;
   }
</style>