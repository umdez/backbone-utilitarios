
Em alguns momentos nós teremos a necessidade de ler arquivos XML e transforma-los em templantes. Estes templantes então são carregados
para o DOM.

Por causa disso, eu acho importante adicionar este BoilerPlate para utilizar posteriormente.

# Como usar

```javascript
var umaLista = {
  'templante01.html': { template: null }
, 'templante02.html': { template: null }
, 'templante03.html': { template: null }
, 'templante04.html': { template: null }
};

var umDiretorio = '/o/local/onde/os/arquivos/se/encontram/';

var algunsArquivos = [
  'templante01.html'
, 'templante03.html'
, 'templante04.html'
];

LerXML.ler(umaLista, umDiretorio, algunsArquivos, function() {
  console.log('Arquivos de templantesforam carregados com sucesso!');
});
```
