<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 md6 offset-md3>
        <v-card>
          <v-toolbar color="indigo" dark>
            <v-toolbar-title>Partner Application</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <span class="title">Personal Info</span>
            <v-text-field label="Legal Name" class="mt-5" v-model="name"></v-text-field>
            <v-text-field label="Contact Number" v-model="contact"></v-text-field>
            <v-text-field label="License Number" v-model="licenseNumber"></v-text-field>
            <v-text-field label="Partner Car Model" v-model="carModel"></v-text-field>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: 'FileUploadData',
  props: [
   'name',
   'contact',
   'licenseNumber',
   'carModel' 
  ],
  data() {
    return {

    };
  },
  methods: {
  }
};
</script>
<style scoped>

</style>