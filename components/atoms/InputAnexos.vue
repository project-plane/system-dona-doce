<template>
    <div>
      <label :for="label">{{ label }}</label>
      <input type="file" :id="label" @change="atualizarArquivos" :multiple="multiple" />
    </div>
  </template>
  
  <script>
  export default {
    props: {
      label: String,
      multiple: Boolean
    },
    data() {
      return {
        arquivos: []
      };
    },
    methods: {
      atualizarArquivos(event) {
        const novosArquivos = event.target.files;
  
        // Limpa a lista de arquivos ao selecionar novos arquivos
        this.arquivos = [];
  
        // Adiciona novos arquivos à lista
        for (let i = 0; i < novosArquivos.length; i++) {
          const leitor = new FileReader();
          leitor.onload = (e) => {
            this.arquivos.push({ file: novosArquivos[i], preview: e.target.result });
            // Emite um evento para cada arquivo
            this.enviarArquivo(novosArquivos[i]);
          };
          leitor.readAsDataURL(novosArquivos[i]);
        }
      },
      enviarArquivo(arquivo) {
        this.$emit('enviar-arquivo', arquivo);
      }
    }
  };
  </script>
  