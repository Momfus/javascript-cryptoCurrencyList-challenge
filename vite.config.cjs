const copy = require("cpx");

module.exports = {
  // Agrega una tarea personalizada que se ejecutará antes de construir
  build: {
    before: async () => {
      // copia los archivos de la carpeta src a la carpeta dist
      copy.sync("./src/**", "./dist/src");
    }
  }
};