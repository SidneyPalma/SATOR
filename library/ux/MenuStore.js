Ext.define( 'Smart.ux.MenuStore', {
    extend: 'Ext.menu.Menu',

    alias: 'widget.menustore',

    loaded: false,
    
	loadMsg: 'Loading...',
	
    initComponent: function () {
        var me = this;
		
        me.callParent();
        me.store = Ext.getStore(me.store);
        me.on('show', me.onMenuLoad, me);
		
        listeners = {
            scope: me,
            load: me.onLoad,
            beforeload: me.onBeforeLoad
        };
		
        me.mon(me.store, listeners);
        me.onMenuLoad();
    },
    onMenuLoad: function () {
        var me = this;
        me.store.load();
    },
    onBeforeLoad: function (store) {
        this.updateMenuItems(false);
    },
    onLoad: function (store, records) {
        this.updateMenuItems(true, records);
    },
    updateMenuItems: function (loadedState, records) {
        var me = this;
        me.removeAll();
        if (loadedState) {
            me.setLoading(false, false);
            Ext.each(records, function (item, index, array) {
                me.add(item.raw);
            });
        }
        else {
            me.add({ width: 75, height: 40 });
            me.setLoading(me.loadMsg, false);
        }
        me.loaded = loadedState;
    }
});