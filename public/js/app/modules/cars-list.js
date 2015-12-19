/**
 * Created by 40in on 08.10.14.
 */
define(['app', 'backbone', 'marionette', 'js/app/routing-module', 'view/cars-view'], function(app, Backbone, Marionette, RoutingModule, CarsView) {

    var CarsListLayout = Marionette.LayoutView.extend({

        template: '#cars-list-layout',

        regions: {
            Filter: '.cars-filter',
            Table: '.cars-table'
        }

    });

    var FilterView = Marionette.ItemView.extend({

        template: '#filter',

        className: 'btn-group',

        events: {
            'click button': 'filterProcess'
        },

        serializeData: function() {
            return {
                brands: this.collection.getBrands()
            }
        },

        filterProcess: function(event) {
            var brand = $(event.target).data('value');
            this.$('button').removeClass('active');
            if (this.collection.options.filterBy === brand) {
                this.collection.filterProcess('');
                return;
            }
            $(event.target).addClass('active');
            this.collection.filterProcess(brand);
        }

    });



    var CarsListModule = RoutingModule.extend({

        startWithParent: false,

        routesList: {
            '': 'main'
        },

        models: {},

        views: {},

        initialize: function() {
            RoutingModule.prototype.initialize.apply(this, arguments);
            console.log('CarsListModule initialize');
        },

        onStart: function() {
            console.log('CarsListModule start');
        },

        onStop: function() {
            console.log('CarsListModule stop');
        },

        main: function() {
            this.views.cars = new CarsView({
                collection: app.models.cars,
                addToFavoriteButton: true
            });
            this.views.filter = new FilterView({
                collection: app.models.cars
            });
            this.views.layout = new CarsListLayout();
            app.content(this.views.layout.render());
            this.views.layout.Table.show(this.views.cars.render());
            this.views.layout.Filter.show(this.views.filter.render());
        }

    });

    return app.module('cars-list', CarsListModule);

});