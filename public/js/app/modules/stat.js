/**
 * Created by 40in on 08.10.14.
 */
define(['app', 'marionette', 'js/app/routing-module', 'highcharts'], function(app, Marionette, RoutingModule) {

    var ChartView = Marionette.ItemView.extend({

        template: '#chart',

        onRender: function() {
            var brandsStat = [];
            this.collection.getBrands().forEach(function(brand) {
                brandsStat.push([brand, localStorage.getItem('stat:' + brand) ? +localStorage.getItem('stat:' + brand) : 0]);
            }.bind(this));

            this.$el.highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Favorite cars statistics'
                },
                subtitle: {
                    text: 'Based on localstorage data'
                },
                xAxis: {
                    //categories: this.collection.getBrands(),
                    //crosshair: true
                    type: 'category'
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Favorite count'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: [{
                    name: 'Stat',
                    data: brandsStat
                }]
                //series: [{
                //    name: 'Tokyo',
                //    data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
                //
                //}, {
                //    name: 'New York',
                //    data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
                //
                //}, {
                //    name: 'London',
                //    data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
                //
                //}, {
                //    name: 'Berlin',
                //    data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
                //
                //}]
            });
        }

    });

    var StatModule = RoutingModule.extend({

        startWithParent: false,

        routesList: {
            'stat': 'main'
        },

        views: {},

        initialize: function() {
            RoutingModule.prototype.initialize.apply(this, arguments);
            console.log('StatModule initialize');
        },

        onStart: function() {
            console.log('StatModule start');
        },

        onStop: function() {
            console.log('StatModule stop');
        },

        main: function() {
            this.views.chart = new ChartView({
                collection: app.models.cars
            });
            app.content(this.views.chart.render());
        }

    });

    return app.module('stat', StatModule);

});