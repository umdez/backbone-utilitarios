Em uma aplicação que utiliza o Backbone, nós frequentemente precisamos de lidar com a limpeza das visões 'zumbis'. Em algum outro
caso de uso, nós vamos querer reusar uma visão existente porque isso raramente sofre mudanças. Esse simples gerente de visões vai
cuidar destes dois casos sem mudar seus código existente.

# Como usar
Se na sua aplicação já desenvolvida, você estiver criando uma visão assim:

```javascript
var VisaoDoProduto = Backbone.View.extend({...});
VisaoDoProduto = new VisaoDoProduto({...});
$(this.el).append(VisaoDoProduto.render().el);
```

Este codigo, apesar de ser simples, vai criar uma 'visão zumbi', porque vai constantemente criar uma nova visão sem remover a
visão prévia. Se você não é familiar com o termo 'visão zumbi', você pode ler uma excelente explicação aqui:
http://lostechies.com/derickbailey/2011/09/15/zombies-run-managing-page-transitions-in-backbone-apps/

Entretando, não é muito conveniente chamarmos view.dispose() pra todas as visões do Backbone, especialmente aquelas visões criadas 
usando o laço for. 

Acho que a melhor maneira de limpar o código é fazendo isso antes de criar uma nova visão.Então, minha solução 
foi criar um gerente de visões que ajude nessa limpeza.

```javascript
var VisaoDoProduto = Backbone.View.extend({…});
VisaoDoProduto = GDV.criarVisao("VisaoDoProduto", function() {
  return new VisaoDoProduto({…});
});
$(this.el).append(VisaoDoProduto.render().el);
```

Usando essa pequena mudança, o GDV (Gerente de Visão) vai automaticamente olhar se já existe a visão VisaoDoProduto e, se 
já for existente, o GDV vai limpar a visão para você antes de criar uma nova instância dessa visão.

E se você tiver uma visão que raramente muda, (ex. visões que não possuem bind com nenhum modelo ou coleção), você pode
considerar o reuso desta visão já existente, isso vai fazer seu aplicativo muito mais rápido. É só tentar fazer isso:

```javascript
var VisaoDoProduto = Backbone.View.extend({…});
VisaoDoProduto = GDV.reusarVisao("VisaoDoProduto", function() {
  return new VisaoDoProduto({…});
});
$(this.el).append(VisaoDoProduto.render().el);
```

Dá pra ver que a diferença entre o GDV.criarVisao e o GDV.reusarVisao é que, o reusarVisao vai procurar inicialmente por
uma visão já existente com o nome de "VisaoDoProduto", se ele for encontrados ele é retornado pra você usar. Se não, ele vai
executar a função que você informou e salvar o valor. O GDV.criarVisao vai sempre executar a função informada e limpar 
a visão já existente. Você deverá preferir o método criarVisao naquelas visões dinâmicas que estão em frequente mudança.

Alguma hora você só vai querer fechar uma visão existente. Nesse caso uma simples função é fornecida para isso:

```javascript
GDV.fecharVisao("VisaoDoProduto");
```
