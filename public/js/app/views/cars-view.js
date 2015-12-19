/**
 * Created by 40in on 16.10.14.
 */
define(['marionette'], function(Marionette) {

    var CarView = Marionette.ItemView.extend({

        template: '#car',

        tagName: 'tr',

        events: {
            'mouseover .small': function() {
                this.$('.big').show();
            },
            'mouseleave .small': function() {
                this.$('.big').hide();
            },
            'click button:not(disabled)': function(event) {
                $(event.target).prop('disabled', true);
                switch($(event.target).data('action')) {
                    case 'add': this.model.addToFavorite(); break;
                    case 'remove': this.model.removeFromFavorite(); break;
                }
                return false;
            }
        },

        serializeData: function() {
            return {
                model: this.model.toJSON(),
                options: this.options
            }
        }

    });

    var CarsListView = Marionette.CompositeView.extend({

        template: '#cars-list',

        tagName: 'table',

        childView: CarView,

        className: 'table',

        childViewContainer: 'tbody',

        initialize: function(options) {
            this.options = options;
            this.listenTo(this.collection, 'filtered', this.render, this);
        },

        childViewOptions: function() {
            return this.options;
        },

        filter: function (child, index, collection) {
            if (this.options.removeFromFavoriteButton) {
                return child.get('favorite');
            }
            if (!collection.options.filterBy) return true;
            return child.get('brand') === collection.options.filterBy;
        }

    });

    return CarsListView;

});