/**
 * Created by 40in on 16.10.14.
 */
define(['app', 'backbone', 'underscore'], function(app, Backbone, _) {

    var CarModel = Backbone.Model.extend({

        idAttribute: 'id',

        defaults: {
            stat: 0,
            favorite: false
        },

        addToFavorite: function() {
            var stat = localStorage.getItem('stat:' + this.get('brand')) ? +localStorage.getItem('stat:' + this.get('brand')) + 1 : 1;
            this.set('favorite', true);
            localStorage.setItem('favorite:' + this.id, '1');
            localStorage.setItem('stat:' + this.get('brand'), stat);

        },

        removeFromFavorite: function() {
            this.set('favorite', false);
            localStorage.setItem('favorite:' + this.id, '');
        },

        parse: function(response) {
            response.favorite = localStorage.getItem('favorite:' + response.id);
            return response;
        }

    });

    var CarsCollection = Backbone.Collection.extend({

        model: CarModel,

        url: '/api/cars',

        initialize: function() {
            this.options = {
                filterBy: ''
            };
        },

        filterProcess: function(brand) {
            this.options.filterBy = brand;
            this.trigger('filtered');
        },

        getBrands: function() {
            return _.unique(this.pluck('brand'));
        }

    });

    return CarsCollection;

});