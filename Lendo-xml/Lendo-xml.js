'use strict';

/* Oferece um suporte b�sico para realizar o carregamento de arquivos contendo XML */

define([
  'jquery'
, 'underscore'
], function(
  $
, _
) {
  
  var LerXML = {
    
    /* @M�todo ler(). 
     * Faz a leitura de determinados arquivos em XML no diret�rio informado. 
     * Logo depois salva cada uma delas na lista informada.
     *
     * @Parametro {Matriz} [lista] Uma lista onde os arquivos ser�o amazenados.
     * @Parametro {Texto} [diretorio] O nome do diretorio onde ser�o lidos os arquivos.
     * @Parametro {Matriz} [arquivos] Cont�m lista com os nomes de cada aquivo a ser lido.
     * @Parametro {Fun��o} [cd] Ao terminar n�s chamamos est� fun��o fornecida.
     */
    ler: function(lista, diretorio, arquivos, cd) {
      var deferidos = [];
      
      $.each(arquivos, function(indice, arquivo) {
        if (lista[arquivo]) {
          deferidos.push($.get(diretorio + arquivo, function(dados) {
            lista[arquivo].template = _.template(dados);
          }));
        } else {
          console.log(arquivo + ' n�o foi encontrado');
        }
      });

      $.when.apply(null, deferidos).done(cd);
    }
  };
  
  return LerXML;
});