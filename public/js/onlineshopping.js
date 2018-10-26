(function() {
  var shopvue = new Vue({
    el: '#shopvue',
    data: {
      showTable: false,
      name: null,
      price: null,
      description: null,
      quantity: null,
      products: []
    },
    created: function() {
      var self = this;
      axios.get('http://localhost:3300/api/products')
        .then(function(res) {
          self.products = res.data;
        })
        .catch(function(err) {
          self.products = [];
        });
    },
    methods: {
      addProd: function() {
        var self = this;
        var payload = {
          name: self.name,
          description: self.description,
          price: self.price,
          quantity: self.quantity
        };
        axios.post('/api/products', payload)
          .then(function(res) {
            self.products = res.data;
            self.clear();
         
          })
          .catch(function(err) {
          });
      },
      clear: function() {
        this.name = null;
        this.description = null;
        this.price = null;
        this.quantity = null;
        
      },
      deleteProd: function(product) {
        var self = this;
        axios.delete('/api/products/' + product.id)
          .then(function(res) {
            // self.notes = res.data;
            var index = -1;
            for(var i = 0; i < self.products.length; ++i) {
              if(Number(self.products[i].id) === Number(product.id)) {
                index = i;
                break;
              }
            }
            self.products.splice(index, 1);
          })
          .catch(function(err) {
          });
      },
      getProd: function() {
        
        var self = this;
        // Make a request for a user with a given ID
            axios.get('api/products/', + product.id)
            .then(function (response) {
              this.name = products.name;
              this.description = products.description;
              this.price = products.price;
              this.quantity = products.quantity;
              // handle success
              console.log(response);
            })
            .catch(function (error) {
              // handle error
              console.log(error);
            })
           

      },

      

     
    

    }
  });
  console.log(shopvue);
})();


