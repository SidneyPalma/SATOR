//@charset UTF-8
Ext.define( 'Smart.ux.login.LoginController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Smart.util.Message'
    ],

    onComeInSend: function() {
        var me = this,
            view = me.getView(),
            form = view.down('logincomein');

        if(!form.isValid()) {
            return false;
        }

        view.setLoading('Autenticando usuário...');

        form.submit({
            scope: me,
            url: me.url,
            clientValidation: true,
            params: {
                action: 'select',
                method: 'selectComein',
                module: Ext.manifest.name,
                fields: Ext.encode(['id','username','fullname','password','filedata','fileinfo','isactive'])
            },
            success: me.onComeInSendSuccess,
            failure: me.onFormSubmitFailure
        });

    },

    onForgotSend: function() {
        var me = this,
            view = me.getView(),
            form = view.down('loginforgot');

        if(!form.isValid()) {
            return false;
        }

        view.setLoading('Gerando senha convite...');

        form.submit({
            scope: me,
            url: me.url,
            clientValidation: true,
            params: {
                action: 'select',
                method: 'selectUserForgot',
                rows: Ext.encode(form.getValues())
            },
            success: function() {
                me.onInviteGoView();
                view.setLoading(false);
                form.reset();
            },
            failure: me.onFormSubmitFailure
        });

    },

    onInviteSend: function() {
        var me = this,
            view = me.getView(),
            form = view.down('logininvite');

        if(!form.isValid()) {
            return false;
        }

        view.setLoading('Validando senha convite...');

        form.submit({
            scope: me,
            url: me.url,
            clientValidation: true,
            params: {
                action: 'select',
                method: 'selectUserInvite',
                rows: Ext.encode(form.getValues())
            },
            success: function() {
                me.onComeInGoView();
                view.setLoading(false);
                form.reset();
            },
            failure: me.onFormSubmitFailure
        });
    },

    onInviteGoView: function () {
        var me = this,
            layout = me.getView().down('container[name=userlogin]').getLayout();
        layout.setActiveItem(2);
    },

    onForgotGoView: function () {
        var me = this,
            layout = me.getView().down('container[name=userlogin]').getLayout();
        layout.setActiveItem(1);
    },

    onComeInGoView: function () {
        var me = this,
            layout = me.getView().down('container[name=userlogin]').getLayout();
        layout.setActiveItem(0);
    },

    onFormSubmitFailure: function (form, action) {
        var me = this,
            view = me.getView();

        view.setLoading(false);

        Smart.Msg.submitFailure(form, action);
    },

    onComeInSendSuccess: function (form, action) {
        var me = this,
            view = me.getView(),
            result = Ext.decode(action.response.responseText),
            rows = result.rows[0];

        view.setLoading(false);

        if(result.modulebuild != Ext.manifest.version) {
            Ext.Msg.show({
                title: 'Operação falhou!',
                msg: 'Você está executando uma versão diferente da atualmente homolagada!',
                buttons: Ext.Msg.CANCEL,
                icon: Ext.Msg.WARNING
            });
            return false;
        }

        localStorage.setItem(Ext.manifest.name + 'In', true);

        view.destroy();

        if(result.success) {
            var type = Ext.decode(rows.fileinfo),
                main = Ext.create({ xtype: 'app-main' }),
                image = Ext.String.format("data:{0};base64,{1}",type.fileType,rows.filedata);

            main.down('image[name=filelogo]').setSrc(image);
            main.down('tbtext[name=filelogo]').update(rows.legalname);
            main.down('tbtext[name=username]').update(Ext.String.format('<a>{0}</a>',rows.fullname));

            console.info(Ext.String.format('Is Test Base Access: {0}',result.isTest));

            if(result.isTest == true) {
                Ext.getBody().getById('marquee').show();
            }

        }
    }

});