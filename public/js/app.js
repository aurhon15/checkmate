new Vue({
    el: '#app',
    data: {
        isShowingCart: false,
        showAdd: false,
        name: null,     
        description: null,
        price: null,
        inStock: null,
        products:[],
        cart: {
            items: []
        
        }

      
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
        

        // addItem:function(err){
            
        //     this.products.push({
                
        //         name: this.name,
        //         description: this.description,
        //         inStock: this.inStock,
        //         price: this.price,
               
        //     });
        //     err.preventDefault(err);
        // },

        addProd: function() {
            var self = this;
            var payload = {
              name: self.name,
              description: self.description,
              price: self.price,
              inStock: self.inStock
            };
            axios.post('/api/products', payload)
              .then(function(res) {
                self.products = res.data;
                self.clear();
              
              })
              .catch(function(err) {
              });
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
                self.clear();
              })
              .catch(function(err) {
              });
          },

        // delItem:function(product){
            
        //     this.products.splice(this.products.indexOf(product), 1);
                
             
        // },

        getProd: function(id,name,description,inStock,price) {
      
            let self = this;
            self.name = name;
            self.description = description;
            self.inStock = inStock;
            self.price = price;
           
    
    
              
          },
        
          updateProd: function(){
             {
              let uri = '/api/products/' + this.$route.params.id;
                this.axios.put(uri, this.products).then((response) => {
                  this.$router.put(
                      {
                          name: this.name,
                          description:this.description,
                          inStock: this.inStock,  
                          price: this.price   

                    
                     });
                });
            }

          },

          clear: function() {
            this.name = null;
            this.description = null;
            this.price = null;
            this.quantity = null;
            
          },

       
        
        addProductToCart: function(product) {
            var cartItem = this.getCartItem(product);

            if (cartItem != null) {
                cartItem.quantity++;
            } else {
                this.cart.items.push({
                    product: product,
                    quantity: 1
                });
            }

            product.inStock--;
        },

        increaseQuant: function(product) {
            cartItem.product.inStock--;
            cartItem.quantity++;
        },
        increaseQuantity: function(cartItem) {
            cartItem.product.inStock--;
            cartItem.quantity++;
        },

        decreaseQuantity: function(cartItem) {
            cartItem.quantity--;
            cartItem.product.inStock++;

            if (cartItem.quantity == 0) {
                this.removeItemFromCart(cartItem);
            }
        },

        removeItemFromCart: function(cartItem) {
            var index = this.cart.items.indexOf(cartItem);

            if (index !== -1) {
                this.cart.items.splice(index, 1);
            }
        },

        checkout: function() {
            if (confirm('Are you sure that you want to purchase these products?')) {
                this.cart.items.forEach(function(item) {
                    item.product.inStock += item.quantity;
                });

                this.cart.items = [];
            }
        },

        getCartItem: function(product) {
            for (var i = 0; i < this.cart.items.length; i++) {
                if (this.cart.items[i].product.id === product.id) {
                    return this.cart.items[i];
                }
            }

            return null;
        }
    },
    

    computed: {
        cartTotal: function() {
            var total = 0;

            this.cart.items.forEach(function(item) {
                total += item.quantity * item.product.price;
            });

            return total;
        },

      
    }
});
