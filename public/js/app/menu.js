/**
 * Created by 40in on 14.10.14.
 */
define(['app', 'marionette'], function(app, Marionette) {

    var structure = [{
        name: 'Cars',
        href: '/'
    }, {
        name: 'Favorite',
        href: '/favorite'
    }, {
        name: 'Statistics',
        href: '/stat'
    }];

    var MenuView = Marionette.ItemView.extend({

        template: '#menu',

        className: 'container-fluid',

        events: {
            'click a': function(event) {
                event.preventDefault();
                this.selectItem($(event.target));
            }
        },

        selectItem: function($a) {
            if (!$a || !$a.length) return;
            this.$('.nav li').removeClass('active');
            $a.parent().addClass('active');
        },

        onRender: function() {
            this.selectItem(this.$('a[href="' + window.location.pathname + '"]'));
        },

        serializeData: function() {
            return {
                structure: structure
            }
        }

    });

    return new MenuView();

});