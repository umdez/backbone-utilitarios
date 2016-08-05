Em alguns momentos fica necessário carregarmos as coleções aninhadas de alguns modelos. Este boilerplate ajudará de forma simples 
e elegante realizarmos esta tarefa.

# O problema

Imagine por um momento que tenhamos um modelo de 'Exames' ficticio. Este modelo possui uma coleção aninhada chamada 'orientacoesDeExames'.

```javascript
var ModeloDeExame = Backbone.Model.extend({

  initialize: function () {
  
    // Ok. agora nós só precisamos adicionar uma referencia para sabermos quais coleções nós temos.
    // A partir de agora, nós conseguimos saber quais coleções serão necessárias carregar.
    colecaoAninhada.adicionar(this, ['orientacoesDeExames']);
  
    this.orientacoesDeExames = new ColecaoDeOrientacaoDeExames();
  
    // Adicionamos aqui o endereço onde iremos carregar as nossas orientações dos exames.
    this.orientacoesDeExames.url = '/exames/' + this.id + '/OrientacoesDeExames';
  }
});

var ColecaoDeExames = Backbone.Collection.extend({

  model: ModeloDeExame
});
```

# A solução

Depois de informarmos quais coleções aninhadas nós temos. Agora fica fácil realizar a tarefa de requisita-las. O código abaixo 
exemplifica como fazer isso.

```javascript
var colecaoDeExames = new ColecaoDeExames();

colecaoAninhada.carregar(colecaoDeExames, false, function() {
  // Ok! nossas coleções foram carregadas e já podem ser utilizadas!
});
```

E caso você queira carregar somente algumas coleções em específico.

```javascript
var colecaoDeExames = new ColecaoDeExames();

colecaoAninhada.carregar(colecaoDeExames, ['colecao1', 'colecao2', ...], function() {
  // Ok! aqui as coleções especificadas já estão carregadas!
});
```
