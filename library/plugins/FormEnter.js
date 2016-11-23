//@charset UTF-8
/**
 * autor: Rodrigo Krummenauer do Nascimento
 * site: www.rkn.com.br
 * email: rodrigoknascimento@gmail.com
 * https://github.com/rodrigok/ExtJS4-TextMask
 *
 * Version: 1.0
 * License: GPLv3
 **/
Ext.define( 'Smart.plugins.FormEnter', {
    extend: 'Ext.AbstractPlugin',

    alias : 'plugin.formenter',

    init: function (form) {
        this.form = form;
        this.form.on('render', this.onFormRender, this);
    },

    onFormRender: function()  {
        this.form.getEl().on('keyup', this.onFormElKeyUp, this)
    },

    onFormElKeyUp: function(e, el) {
        if (e.getKey() === e.ENTER) {
            var nField = null,
                fields = this.form.getForm().getFields(),
                // index  = fields.findIndex('id', el.getAttribute('data-componentid'));
                index = fields.findIndex('name', el.getAttribute('name'));

            // do {
            //     if (e.hasModifier())
            //         index = index - 1;
            //     else
            //         index = index + 1;
            //
            //     nField = fields.getAt(index);
            // } while (nField.xtype == 'hidden')
            //
            // if (nField)
            //     nField.focus(true, true);

            do {
                nField = fields.getAt(e.hasModifier() ? --index : ++index);
            } while (!this.focusIf(nField, false, 200) && index < fields.length && index >= 0)
        }
    },

    focusIf: function(field, select, delay) {
        if(!(Ext.isEmpty(field) || field.isHidden() || field.isDisabled() || field.isXType('hiddenfield'))) {
            return field.focus(select, delay);
        }
        return false;
    }

});