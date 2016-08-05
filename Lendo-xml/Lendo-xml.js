/* Oferece um suporte básico para realizar o carregamento de arquivos contendo XML */

define([
  'jquery'
, 'underscore'
], function(
  $
, _
) {
  'use strict';

  var LerXML = {
    
    /* @Método ler(). 
     * Faz a leitura de determinados arquivos em XML no diretório informado. 
     * Logo depois salva cada uma delas na lista informada.
     *
     * @Parametro {Objeto} [lista] Uma lista onde os arquivos serão amazenados.
     * @Parametro {Texto} [diretorio] O nome do diretorio onde serão lidos os arquivos.
     * @Parametro {Matriz} [arquivos] Contêm lista com os nomes de cada aquivo a ser lido.
     * @Parametro {Função} [cd] Ao terminar nós chamamos esta função fornecida.
     */
    ler: function(lista, diretorio, arquivos, cd) {
      var deferidos = [];
      
      deferidos = _.reduce(arquivos, function(listaDeDeferidos, arquivo) {
        if (lista[arquivo]) {
          listaDeDeferidos.push($.get(diretorio + arquivo, function(dados) {
            lista[arquivo].template = _.template(dados);
          }));
        } else {
           console.log(arquivo + ' não foi encontrado');
        }
        return listaDeDeferidos;
      }, deferidos, this);

      $.when.apply(null, deferidos).done(cd);
    }
  };
  
  return LerXML;
});