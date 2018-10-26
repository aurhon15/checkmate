new Vue({
    el: '#app',
    data: {
        isShowingCart: false,
        showAdd: false,
        name: null,
        price: null,
        description: null,
        quantity: null,
        cart: {
            items: []
        
        },
      
      
        products: [
            {
                id: 1,
                name: 'Lorem ipsum dolor sit amet.',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse cursus.',
                price: 1000,
                inStock: 50
            },
            {
                id: 2,
                name: 'Lorem ipsum dolor sit amet.',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse cursus.',
                price: 2000,
                inStock: 100
            },
            {
                id: 3,
                name: 'Lorem ipsum dolor sit amet.',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse cursus.',
                price: 2000,
                inStock: 4
            },
            {
                id: 4,
                name: 'Lorem ipsum dolor sit amet.',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse cursus.',
                price: 2000,
                inStock: 42
            },
           
            
        ]
    },

  

    methods: {
        

        addItem:function(err){
            
            this.products.push({
                
                name: this.name,
                description: this.description,
                price: this.price,
                inStock: this.inStock
            });
            err.preventDefault(err);
        },

        delItem:function(product){
            
            this.products.splice(this.products.indexOf(product), 1);
                
             
        },

        getItem:function(product){
           
            this.products.find(check => check.id === parseFloat (req.params.id));
            
            res.send(product);
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

        // taxAmount: function() {
        //     return ((this.cartTotal * 10) / 100);
        // }
    }
});