//@charset UTF-8
Ext.define( 'Ext.overrides.form.Label', {
    override: 'Ext.form.Label',

    labelAlign: 'top',
    labelSeparator: '',
    useLabelBold: false,

    initComponent: function () {
        var me = this;

        me.callParent();

        me.setLabelBold(me.useLabelBold);

        me.on({
            afterrender: { fn: 'fnAfterRender', scope: me }
        });

    },

    fnAfterRender: function (label, eOpts) {
        var me = this,
            eOpts = {},
            el = me.getEl();

        el.on('click', function(){ me.fireEvent('click', me, el, eOpts); }, me);

    },

    /**
     * Muda o Label para Style Bold
     *
     * @param value boolean
     */
    setLabelBold: function ( value ) {
        var me = this,
            labelBold = 'font-weight: bold;';

        if(value) {
            me.style = me.style ? (me.style + labelBold) : labelBold;
        }
    }

});