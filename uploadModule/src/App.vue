<template>
  <div id="app">
    <v-app>
    <v-form v-model="valid">
      <v-text-field 
      label="Partner Name" 
      v-model="name" 
      :disabled="checkbox"
      ></v-text-field>
      <v-text-field 
      label="Partner Phone Number" 
      :rules="telephoneRules"
      v-model="tel" 
      :disabled="checkbox"
      ></v-text-field>
      <v-text-field 
      label="Partner License Number"
       v-model="licenseNumber" 
       :rules="licenseRules"
       :disabled="checkbox"
       ></v-text-field>
      <v-text-field 
      label="Partner Car Model" 
      v-model="carModel"
      :disabled="checkbox"
      ></v-text-field>
      <v-checkbox
      label="Upload via CSV ?"
      v-model="checkbox"
       ></v-checkbox> 
      <v-text-field prepend-icon="attach_file" 
        single-line v-model="filename" 
        :label="label" :required="required" 
        @click.native="onFocus" 
        :disabled="!checkbox" ref="fileTextField"
        ></v-text-field>
        <input type="file" 
        accept=".csv" 
        :multiple="false" 
        ref="fileInput" 
        @change="onFileChange"
      >     
      <v-btn @click="submit">submit</v-btn>
      <v-btn @click="clear">clear</v-btn>
    </v-form>

    <div>
       
    </div>

    <div v-if="onSubmit">
      <file-upload-data 
      :name="name" 
      :contact="tel" 
      :licenseNumber="licenseNumber" 
      :carModel="carModel" 
      />
    </div>

    </v-app>
  </div>
</template>

<script>
import FileUploadData from './FileUploadData.vue';
export default {
  name: 'app',
  components: {
    FileUploadData
  },
  data() {
    return {
      valid: true,
      onSubmit: false,
      filename: '',
      checkbox: false,
      name: '',
      tel: '',
      licenseNumber: '',
      carModel: '',
      telephoneRules: [
        v => !!v || 'Telephone Number is required',
        v => /([6-9]{1}[0-9]{9})/.test(v) || 'Telephone Number must be valid'
      ],
      licenseRules: [
        v => !!v || 'License Number is required',
        v => /([0-9a-zA-Z]{6,20})/.test(v) || 'License Number must be valid'
      ]
    }
  },
  watch: {
    value(v) {
      this.filename = v;
    }
  },
  mounted() {
    this.filename = this.value;
  },
  props: {
    value: {
      type: [Array, String]
    },
    accept: {
      type: String,
      default: "*"
    },
    label: {
      type: String,
      default: "Please choose..."
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    submit() {
      this.onSubmit = true;
    },
    clear() {
      this.name = '';
      this.tel = '';
      this.licenseNumber = '';
      this.carModel = '';
    },
    disableAllFields() {
      if (this.checkbox) {
        this.isDisabled = !this.isDisabled;
      }
    },
    getFormData(files) {
      const data = new FormData();
      [...files].forEach(file => {
        data.append('data', file, file.name);
      });
      return data;
    },
    onFocus() {
      if (!this.disabled) {
        this.$refs.fileInput.click();
      }
    },
    onFileChange($event) {
      const files = $event.target.files || $event.dataTransfer.files;
      const form = this.getFormData(files);
      this.getAsText(files[0]);
      if (files) {
        if (files.length > 0) {
          this.filename = [...files].map(file => file.name).join(', ');
        } else {
          this.filename = null;
        }
      } else {
        this.filename = $event.target.value.split('\\').pop();
      }
      this.$emit('input', this.filename);
      this.$emit('formData', form);
    },
    handleFiles(files) {
      if (window.FileReader) {
        getAsText(files[0]);
      } else {
        alert('FileReader are not supported in this browser.');
      }
    },
    // HTML 5 API reader uses Async reading 
    getAsText(fileToRead) {
      var reader = new FileReader();
      reader.onload = this.loadHandler;
      reader.onerror = this.errorHandler;
      reader.readAsText(fileToRead);
    },
    loadHandler(event) {
      var csv = event.target.result;
      this.processData(csv);
    },
    errorHandler(evt) {
      if (evt.target.error.name == "NotReadableError") {
        alert("Canno't read file !");
      }
    },
    processData(csv) {
      var allTextLines = csv.split(/\r\n|\n/);
      var lines = [];
      while (allTextLines.length) {
        lines.push(allTextLines.shift().split(','));
      }
      console.log(lines);
       this.name = lines[0][0];
       this.tel =  lines[0][1];
       this.licenseNumber = lines[0][2];
       this.carModel = lines[0][3];
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

input[type=file] {
  position: absolute;
  left: -99999px;
}
</style>
