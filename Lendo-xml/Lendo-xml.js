'use strict';

/* Oferece um suporte básico para realizar o carregamento de arquivos contendo XML */

define([
  'jquery'
, 'underscore'
], function(
  $
, _
) {
  
  var LerXML = {
    
    /* @Método ler(). 
     * Faz a leitura de determinados arquivos em XML no diretório informado. 
     * Logo depois salva cada uma delas na lista informada.
     *
     * @Parametro {Matriz} [lista] Uma lista onde os arquivos serão amazenados.
     * @Parametro {Texto} [diretorio] O nome do diretorio onde serão lidos os arquivos.
     * @Parametro {Matriz} [arquivos] Contêm lista com os nomes de cada aquivo a ser lido.
     * @Parametro {Função} [cd] Ao terminar nós chamamos está função fornecida.
     */
    ler: function(lista, diretorio, arquivos, cd) {
      var deferidos = [];
      
      $.each(arquivos, function(indice, arquivo) {
        if (lista[arquivo]) {
          deferidos.push($.get(diretorio + arquivo, function(dados) {
            lista[arquivo].template = _.template(dados);
          }));
        } else {
          console.log(arquivo + ' não foi encontrado');
        }
      });

      $.when.apply(null, deferidos).done(cd);
    }
  };
  
  return LerXML;
});