/**
 * Created by 40in on 08.10.14.
 */
define(['app', 'backbone', 'marionette', 'js/app/routing-module', 'view/cars-view', 'underscore'], function(app, Backbone, Marionette, RoutingModule, CarsView, _) {

    var CarsListLayout = Marionette.LayoutView.extend({

        template: '#cars-list-layout',

        regions: {
            Filter: '.cars-filter',
            Table: '.cars-table'
        }

    });

    var FavoriteCounter = Marionette.ItemView.extend({

        template: '#favorite-counter',

        initialize: function() {
            this.listenTo(this.collection, 'change:favorite', this.render, this);
        },

        serializeData: function() {
            var grouppedCount = app.models.cars.countBy(function(model) {return model.get('favorite') ? 'f' : 'n'});
            return {
                counter: grouppedCount.f
            }
        }

    });

    var FavoriteModule = RoutingModule.extend({

        startWithParent: false,

        routesList: {
            'favorite': 'main'
        },

        models: {},

        views: {},

        initialize: function() {
            RoutingModule.prototype.initialize.apply(this, arguments);
            console.log('FavoriteModule initialize');
        },

        onStart: function() {
            console.log('FavoriteModule start');
        },

        onStop: function() {
            console.log('FavoriteModule stop');
        },

        main: function() {
            this.views.cars = new CarsView({
                collection: app.models.cars,
                removeFromFavoriteButton: true
            });
            this.views.counter = new FavoriteCounter({
                collection: app.models.cars
            });
            this.views.layout = new CarsListLayout();
            app.content(this.views.layout.render());
            this.views.layout.Table.show(this.views.cars);
            this.views.layout.Filter.show(this.views.counter);
        }

    });

    return app.module('favorite', FavoriteModule);

});