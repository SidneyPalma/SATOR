//@charset UTF-8
Ext.define( 'iSterilization.view.traceability.TraceabilityView', {
    extend: 'Ext.form.Panel',

    xtype: 'traceabilityview',

    requires: [
        'Ext.view.View',
        'Ext.grid.Panel',
        'Ext.panel.Panel',
        'Ext.grid.column.*',
        'iSterilization.view.traceability.TraceabilityController'
    ],

    layout: 'border',

    controller: 'traceability',
    cls: 'panel-frame panel-frame-tpTree',
    iconCls: "fa fa-smile-o",
    showSmartAnimate: true,

    header: {
        title: 'Listar Processamentos',
        defaultType: 'button',
        defaults: {
            showSmartTheme: 'header'
        },
        items: [
            {
                handler: 'onHistoryBack',
                iconCls: "fa fa-arrow-left"
            }, {
                width: 5,
                xtype: 'splitter'
            }, {
                handler: 'onDestroyView',
                iconCls: "fa fa-times"
            }
        ]
    },

    initComponent: function () {
        var me = this;
        me.buildItems();
        me.callParent();
    },

    buildItems: function () {
        var me = this;

        Ext.define('Image', {
            extend: 'Ext.data.Model',
            fields: [
                { name:'src', type:'string' },
                { name:'caption', type:'string' }
            ]
        });

        Ext.create('Ext.data.Store', {
            id:'imagesStore',
            model: 'Image',
            data: [
                { src:'http://www.sencha.com/img/20110215-feat-drawing.png', caption:'Drawing & Charts' },
                { src:'http://www.sencha.com/img/20110215-feat-data.png', caption:'Advanced Data' },
                { src:'http://www.sencha.com/img/20110215-feat-html5.png', caption:'Overhauled Theme' },
                { src:'http://www.sencha.com/img/20110215-feat-perf.png', caption:'Performance Tuned' }
            ]
        });

        var imageTpl = new Ext.XTemplate(
            '<tpl for=".">',
                '<div style="margin-bottom: 10px;" class="thumb-wrap">',
                    '<img src="{src}" />',
                    '<br/><span>{caption}</span>',
                '</div>',
            '</tpl>'
        );

        me.items = [
            {
                width: 400,
                region: 'west',
                xtype: 'panel'
            }, {
                region: 'center',
                xtype: 'dataview',
                store: Ext.data.StoreManager.lookup('imagesStore'),
                tpl: imageTpl,
                itemSelector: 'div.thumb-wrap',
                emptyText: 'No images available'
            // }, {
            //     height: 100,
            //     region: 'south',
            //     xtype: 'container'
            }
        ];

    }

});