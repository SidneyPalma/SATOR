//@charset UTF-8
Ext.define( 'iSterilization.view.flowprocessing.FlowProcessingController', {
    extend: 'Smart.app.ViewControllerBase',

    alias: 'controller.flowprocessing',

    routes: {
        'flowprocessingview/:id': {
            action: 'getFlowProcessingId'
        }
    },

    listen: {
        store: {
            '#flowprocessingstepmaterial': {
                datachanged: 'onChangedMaterial'
            }
        }
    },

    url: '../iSterilization/business/Calls/Heart/HeartFlowProcessing.php',

    fetchField: function (search, button) {
        Ext.getStore('flowprocessing').setParams({
            query: search.getValue()
        }).load();
    },

    //routes ===================================>>
    getFlowProcessingId: function (id) {
        var me = this,
            app = Smart.app.getController('App');

        Ext.Ajax.request({
            scope: me,
            url: me.url,
            params: {
                action: 'select',
                method: 'selectFlowDash',
                query: id
            },
            callback: function (options, success, response) {
                var result = Ext.decode(response.responseText);

                if(!success || !result.success) {
                    return false;
                }

                app.onMainPageView({xtype: 'flowprocessingview', xdata: result});
            }
        });
    },

    //routes ===================================>>

    onKeyDownDash: function (view, e, eOpts) {
        var me = this,
            view = me.getView();

        if (e.getKey() === e.ENTER) {
            console.info(e.getKey());
        }
    },

    onSelectAction : function () {
        var me = this,
            store = Ext.getStore('flowprocessingstepaction');

        if(!Smart.workstation) {
            return false;
        }

        Ext.Ajax.request({
            scope: me,
            url: store.getUrl(),
            params: {
                action: 'select',
                method: 'selectArea',
                query: Smart.workstation.areasid
            },
            callback: function (options, success, response) {
                var result = Ext.decode(response.responseText);

                if(!success || !result.success) {
                    return false;
                }

                store.removeAll();

                if(result.rows) {
                    store.loadData(result.rows);
                }
            }
        });
    },

    onAfterRenderStep: function () {
        var me = this,
            view = me.getView();

        if(!Smart.workstation) {
             
            return false;
        }

        view.down('label[name=labelareas]').setText(Smart.workstation.areasname);

        Ext.getStore('flowprocessingstepaction').setParams({
            method: 'selectArea',
            query: Smart.workstation.areasid
        }).load();
    },

    /**
     * Controles para Rastreabilidade
     */
    onAfterRenderDash: function () {
        var me = this,
            date = new Date(),
            view = me.getView(),
            datepicker = view.down('datepicker'),
            traceability = view.down('combobox[name=traceability]');

        datepicker.focus();
        traceability.setValue(0);
        datepicker.setValue(date);
        me.selectDatePicker(datepicker,datepicker.getValue());

        // view.keyMap = new Ext.util.KeyMap({
        //     target: view.getEl(),
        //     binding: [
        //         {
        //             key: [
        //                 Ext.event.Event.HOME,
        //                 Ext.event.Event.PAGE_UP
        //             ],
        //             fn: function(){
        //                 me.flowProcessingRead();
        //             }
        //         }
        //     ],
        //     scope: me
        // });
    },

    flowProcessingRead: function () {
        var me = this;

        me.onAfterRenderDash();
        me.flowProcessingOpen('flowopen')
    },

    flowProcessingOpen: function (flowtype) {
        var me = this,
            view = me.getView();

        if(!Smart.workstation) {
            Smart.Msg.showToast('Estação de Trabalho Não Configurada, Operação Não pode ser Realizada!','error');
            return false;
        }

        if(flowtype == 'flowuser') {
            var sm = view.down('dataview[name=flowprocessingstepaction]').getSelectionModel(),
                md = sm.getSelection()[0];
        }

        Ext.widget('flowprocessinguser').show(null,function () {
            this.xdata = md ? md : null;
            this.down('form').reset();
            this.flowtype = flowtype ? flowtype : 'flowopen';
            this.down('textfield[name=usercode]').focus(false,200);
        });
    },

    onSelectUserCode: function (win,field,eOpts) {
        var me = this,
            view = me.getView(),
            form = view.down('form');

        if(!field.isValid()) {
            return false;
        }

        Ext.Ajax.request({
            scope: me,
            url: me.url,
            params: {
                action: 'select',
                method: 'selectUserCode',
                query: field.getValue()
            },
            callback: function (options, success, response) {
                var result = Ext.decode(response.responseText);

                if(!success || !result.success) {
                    return false;
                }

                form.down('hiddenfield[name=id]').setValue(result.rows[0].id);
                form.down('textfield[name=fullname]').setValue(result.rows[0].fullname);
                form.down('hiddenfield[name=username]').setValue(result.rows[0].username);
            }
        });
    },

    selectUserFlow: function () {
        var me = this,
            view = me.getView(),
            form = view.down('form');

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
                method: 'selectUserFlow'
            },
            success: me.onComeInSendSuccess,
            failure: me.onFormSubmitFailure
        });
    },

    onComeInSendSuccess: function (form, action) {
        var me = this,
            result = Ext.decode(action.response.responseText),
            view = me.getView(),
            rows = result.rows[0];

        view.setLoading(false);

        if(result.success) {

            if(!Smart.workstation) {
                view.close();
                Smart.Msg.showToast('Estação de Trabalho Não Configurada, Operação Não pode ser Realizada!','error');
                return false;
            }

            switch(view.flowtype) {
                case 'flowopen': // Abrir Novo Processamento/Leitura
                    me.onFireTypeOpenFlow(rows,{});
                    break;
                case 'flowuser': // Usuário do Processamento/Leitura
                    me.onFireTypeOpenUser(rows,{});
                    break;
            }
        }
    },

    onFireTypeOpenFlow: function (userRows,eOpts) {
        var me = this,
            view = me.getView();

        view.close();

        Ext.widget('flowprocessingopen').show(null,function () {
            this.down('searchmaterial').focus(false,200);
            this.down('textfield[name=username]').setValue(userRows.username);
            this.down('hiddenfield[name=areasid]').setValue(Smart.workstation.areasid);
            this.down('textfield[name=areasname]').setValue(Smart.workstation.areasname);
        });
    },

    onFireTypeOpenUser: function (userRows,eOpts) {
        var me = this,
            view = me.getView(),
            id = view.xdata.get('id'),
            flowprocessingstepid = view.xdata.get('flowprocessingstepid');

        view.close();

        Ext.Ajax.request({
            scope: me,
            url: me.url,
            params: {
                action: 'select',
                method: 'updateUserStep',
                username: userRows.username,
                flowprocessingstepid: flowprocessingstepid
            },
            callback: function (options, success, response) {
                var result = Ext.decode(response.responseText);

                if(!success || !result.success) {
                    return false;
                }
                me.redirectTo( 'flowprocessingview/' + id );
            }
        });
    },

    onFormSubmitFailure: function (form, action) {
        var me = this,
            view = me.getView();

        view.setLoading(false);
        Smart.Msg.showToast(action.result.text,'info');
        view.down('textfield[name=password]').focus(false,200);
    },

    selectDatePicker: function (datePicker, date, eOpts) {
        var me = this,
            view = me.getView(),
            labelperiod = view.down('label[name=labelperiod]');

        labelperiod.setText(me.getDateFormated(date));

        Ext.getStore('flowprocessing').setParams({
            method: 'selectDashFlow',
            dateof: Ext.util.Format.date(date,'Y-m-d')
        }).load({
            scope: me,
            callback: function(records, operation, success) {
            }
        });

        Ext.getStore('flowprocessingstep').removeAll();
    },

    selectTraceability: function (combo,record,eOpts) {
        var me = this,
            view = me.getView(),
            traceability = view.down('container[name=traceability]');

        traceability.getLayout().setActiveItem(record.get('traceability_type'));
    },

    onSelectMaterial: function (combo,record,eOpts) {
        var me = this,
            view = me.getView(),
            flow = view.down('searchsterilizationtype');

        flow.setReadColor(false);
        flow.setValue(record.get('sterilizationtypeid'));
        flow.setRawValue(record.get('sterilizationpriority'));

        view.down('hiddenfield[name=prioritylevel]').setValue(record.get('prioritylevel'));
        view.down('hiddenfield[name=materialboxid]').setValue(record.get('materialboxid'));
        view.down('hiddenfield[name=sterilizationtypeid]').setValue(record.get('sterilizationtypeid'));
    },

    showClearMaterial: function (field, eOpts) {
        var me = this,
            view = me.getView(),
            flow = view.down('searchsterilizationtype');

        flow.reset();
        flow.setReadColor(true);
        view.down('clientsearch').reset();
    },

    onSelectSterilization: function (combo,record,eOpts) {
        var me = this,
            view = me.getView();

        view.down('hiddenfield[name=prioritylevel]').setValue(record.get('prioritylevel'));
    },

    onBeforeQuerySterilization: function (queryPlan , eOpts) {
        var me = this,
            view = me.getView(),
            combo = queryPlan.combo,
            rec = view.down('searchmaterial').foundRecord();

        delete combo.lastQuery;
        combo.store.removeAll();

        combo.store.setParams({ materialid: rec.get('id') });
    },

    onSelectClient: function (combo,record,eOpts) {
        var me = this,
            view = me.getView(),
            clienttype = record.get('clienttype'),
            placesearch = view.down('placesearch'),
            localization = view.down('fieldcontainer[name=localization]');

        localization.hide();
        localization.setDisabled(true);

        placesearch.reset();
        placesearch.setReadColor(clienttype != '004');

        placesearch.allowBlank = true;

        if(clienttype == '004') {
            localization.show();
            placesearch.allowBlank = false;
            localization.setDisabled(false);
        }

        placesearch.validate();
        view.down('hiddenfield[name=clienttype]').setValue(clienttype);
    },

    showClearClient: function (field, eOpts) {
        var me = this,
            view = me.getView(),
            placesearch = view.down('placesearch'),
            localization = view.down('fieldcontainer[name=localization]');

        placesearch.allowBlank = true;
        localization.setDisabled(true);
        placesearch.setReadColor(true);

        localization.hide();
        placesearch.reset();
        placesearch.validate();
    },

    onSelectPatient: function (combo,record,eOpts) {
        var me = this,
            view = me.getView();

        view.down('hiddenfield[name=healthinsurance]').setValue(record.get('health_insurance'));
    },

    insertFlow: function () {
        var me = this,
            date = new Date(),
            view = me.getView(),
            form = view.down('form'),
            data = form.getValues();

        if(!form.isValid()) {
            return false;
        }

        var patient = form.down('searchpatient').foundRecord();

        data.patientname = patient.get('name');

        view.setLoading('Gerando estrutura de leitura de materiais...');

        Ext.Ajax.request({
            scope: me,
            url: me.url,
            params: {
                action: 'select',
                method: 'newFlowView',
                query: Ext.encode(data)
            },
            callback: function (options, success, response) {
                view.setLoading(false);

                var result = Ext.decode(response.responseText);

                if(!success || !result.success) {
                    Smart.Msg.showToast(result.text,'error');
                    return false;
                }

                view.close();

                Ext.getStore('flowprocessing').setParams({
                    method: 'selectDashFlow',
                    dateof: Ext.util.Format.date(date,'Y-m-d')
                }).load();

                Ext.getStore('flowprocessingstep').removeAll();
            }
        });
    },

    onSelectFlowStatus: function (combo,record,eOpts) {
        var store = Ext.getStore('flowprocessing');

        store.clearFilter();
        store.filter('flowstatus', combo.getValue());
    },

    showClearFlowStatus: function (field, eOpts) {
        var store = Ext.getStore('flowprocessing');

        store.removeFilter('flowstatus');
        store.clearFilter();
    },

    onSelectFlowStepStatus: function (combo,record,eOpts) {
        var store = Ext.getStore('flowprocessingstep');

        store.clearFilter();
        store.filter('flowstepstatus', combo.getValue());
    },

    showClearFlowStepStatus: function (field, eOpts) {
        var store = Ext.getStore('flowprocessingstep');

        store.removeFilter('flowstepstatus');
        store.clearFilter();
    },

    setMessageText: function (msgType,protocol) {
        var me = this,
            store = Ext.getStore('flowprocessingstepmessage'),
            msgText = {
                MSG_DUPLICATED: {
                    readercode: '001',
                    readershow: 'warning',
                    readertext: 'O Material selecionado já foi atualizado!'
                },
                MSG_UNKNOWN: {
                    readercode: '002',
                    readershow: 'info',
                    readertext: 'O Material não faz parte do Kit selecionado!'
                },
                MSG_PROTOCOL: {
                    readercode: '003',
                    readershow: 'info',
                    readertext: Ext.String.format('{0} - Solicitado execução de protocolo!',protocol)
                },
                MSG_PROTOCOL_ERROR: {
                    readercode: '004',
                    readershow: 'error',
                    readertext: 'MSG_PROTOCOL_ERROR - O protocolo solicitado não foi reconhecido pelo sistema!'
                },
                MSG_PROTOCOL_ERROR: {
                    readercode: '004',
                    readershow: 'error',
                    readertext: 'MSG_PROTOCOL_ERROR - O protocolo solicitado não foi reconhecido pelo sistema!'
                }
            },
            msgItem = msgText[msgType];

        Smart.Msg.showToast(msgItem.readertext,msgItem.readershow);

        store.add({
            readercode: msgItem.readercode,
            readershow: msgItem.readershow,
            readertext: protocol || msgItem.readertext,
            flowprocessingstepid: me.getView().down('hiddenfield[name=id]').getValue()
        });

        store.sync({
            callback: function () {
                store.sort([{property : 'id', direction: 'DESC'}]);
            }
        });
    },

    /**
     * Controles para Processamento e Leitura
     *
     * - Verificar Mensagem [value]
     *      É protocolo .. seguir protocolo
     *      Não é protocolo, seguir [Verificar é Kit ?]
     *
     *
     * - Verificar é Kit ?
     *      Sim é Kit, [isMaterialBox]
     *          Já foi lançado ?
     *              Sim -> Mensagem de duplicidade
     *              Não -> Update Status do Item na Lista
	 *
     *      Não é Kit,
     *          Já foi lançado ?
     *              Sim -> Mensagem de duplicidade
     *              Não -> Pesquisa e Insert (Depende do Status do Material)
     */
    onStartReaderView: function (field, e, eOpts) {
        var me = this,
            value = field.getValue();

        field.reset();

        if(value && value.length != 0) {
            // Sim é protocolo .. seguir workProtocol
            if(value.indexOf('SATOR') != -1) {
                me.workProtocol(value);
				return false;
            }

			// Não é protocolo .. seguir workReadArea
			me.workReadArea(value);
        }
    },
	
	workProtocol: function (value) {
	    var me = this,
            call = {
                SATOR_INICIAR_LEITURA: me.callSATOR_INICIAR_LEITURA,
                SATOR_ENCERRAR_LEITURA: me.callSATOR_ENCERRAR_LEITURA,
                SATOR_INFORMAR_INSUMOS: me.callSATOR_INFORMAR_INSUMOS,
                SATOR_IMPRIMIR_ETIQUETA: me.callSATOR_IMPRIMIR_ETIQUETA,
                SATOR_CANCELAR_LEITURAS: me.callSATOR_CANCELAR_LEITURAS,
                SATOR_LANCAMENTO_MANUAL: me.callSATOR_LANCAMENTO_MANUAL,
                SATOR_CONSULTAR_MATERIAL: me.callSATOR_CONSULTAR_MATERIAL,
                SATOR_CANCELAR_ULTIMA_LEITURA: me.callSATOR_CANCELAR_ULTIMA_LEITURA
            };

	    try {
	        call[value](me);
            me.setMessageText('MSG_PROTOCOL',value);
	    }
	    catch (e) {
	        me.setMessageText('MSG_PROTOCOL_ERROR');
	    }
	},

    callSATOR_INICIAR_LEITURA: function (scope) {
        var me = scope,
            view = me.getView();
        console.info(scope);
    },

    callSATOR_ENCERRAR_LEITURA: function (scope) {
        console.info(scope);
    },

    callSATOR_INFORMAR_INSUMOS: function (scope) {
        console.info(scope);
    },

    callSATOR_IMPRIMIR_ETIQUETA: function (scope) {
        console.info(scope);
    },

    callSATOR_CANCELAR_LEITURAS: function (scope) {
        var me = scope,
            view = me.getView(),
            store = Ext.getStore('flowprocessingstepmaterial');

        Ext.Ajax.request({
            scope: me,
            url: me.url,
            params: {
                action: 'select',
                method: 'updatetUnconformities',
                unconformities: '001',
                flowprocessingstepid: view.xdata.rows[0].id
            },
            callback: function (options, success, response) {
                var result = Ext.decode(response.responseText);

                if(!success || !result.success) {
                    return false;
                }

                store.load();
            }
        });
    },

    callSATOR_LANCAMENTO_MANUAL: function (scope) {
        var me = scope;
        Ext.widget('call_SATOR_LANCAMENTO_MANUAL').show(null,function () {
            this.outherScope = scope;
            this.master = me.getView();
            this.down('searchmaterial').focus(false,200);
        });
    },

    callSATOR_CONSULTAR_MATERIAL: function (scope) {
        console.info(scope);
    },

    callSATOR_CANCELAR_ULTIMA_LEITURA: function (scope) {
        var me = scope,
            data = null,
            store = Ext.getStore('flowprocessingstepmaterial');

        store.each(function (item) {
            if(item.get('unconformities') != '001'){
                data = item;
            }
        },me);

        if(!data) {
            // TODO: ShowToast->Não há lançamentos a serem Cancelados!
            return false;
        }

        data.set('unconformities','001');
        store.sync({
            callback: function () {
                data.commit();
            }
        });
    },

    manualLancamento: function () {
        var me = this,
            view = me.getView(),
            master = view.master,
            record = view.down('searchmaterial').foundRecord();

        view.close();
        me.setView(master);
        me.workReadArea(record.get('barcode'));
    },

	workReadArea: function (value) {
        var me = this,
			view = me.getView(),
            store = Ext.getStore('flowprocessingstepmaterial'),
            model = view.down('flowprocessingmaterial').getSelectionModel(),
            materialboxid = view.down('hiddenfield[name=materialboxid]').getValue(),
			isMaterialBox = ( materialboxid && materialboxid.length != 0 );
			
		/**
          * - Verificar é Kit ?
          *      Não é Kit,
          *          Já foi lançado ?
          *              Sim -> Mensagem de duplicidade
          *              Não -> Pesquisa e Insert (Depende do Status do Material)
          */
		if(!isMaterialBox) {
            return false;
		}

		/**
          * - Verificar é Kit ?
          *      Sim é Kit, [isMaterialBox]
          *			Não foi encontrado no Kit ?
          *          Já foi lançado ?
          *              Sim -> Mensagem de duplicidade
          *              Não -> Update Status do Item na Lista
          */
        var data = store.findRecord('barcode',value);

		// Não foi encontrado no Kit ?
		if(!data) {
			me.setMessageText('MSG_UNKNOWN');
			return false;
		}			

		// Já foi lançado ?
		// Sim -> Mensagem de duplicidade
		if(data.get('unconformities') != '001') {
			me.setMessageText('MSG_DUPLICATED');
            // model.select(data);
			return false;
		}

		// Já foi lançado ?
		// Não -> Update Status do Item na Lista
		data.set('unconformities','010');
		store.sync({
			callback: function () {
				data.commit();
				model.select(data);
			}
		});
	},
	
    /**
     * Leitura de Materias
     *  - Kit
     *      Material Status 'A'
     *      Material no Kit
     *      Material no Status '001'
     *
     *  - Avulso
     *      Material IsActive = 1
     *      Material no Status '001'
     *      Material fora de Kit
     *
     *  - Outras Leituras
     *      Protocolos
     *          -   Encerrar Leitura                SATOR_ENCERRAR_LEITURA
     *          -   Ler Insumos                     SATOR_INFORMAR_INSUMOS
     *          -   Cancelar Leituras Relizadas     SATOR_CANCELAR_LEITURAS
     *          -   Imprimir Etiquetas              SATOR_IMPRIMIR_ETIQUETA
     *          -   Consultar Material              SATOR_CONSULTAR_MATERIAL
     *          -   Cancelar Ultima Leitura         SATOR_CANCELAR_ULTIMA_LEITURA
     *          -   Solictar Quebra de Fluxo
     *          -   Relatar uso de EPI
     *              -   SIM Usa EPI
     *              -   NÂO Usa EPI
     *          -
     */

    /**
     * Controles para Processamento e Leitura
     */

    onAfterRenderView: function () {
        var me = this,
            list = '',
            view = me.getView(),
            data = view.xdata,
            text = 'Material ({0})',
            // search = view.down('readerflowprocessing'),
            search = view.down('textfield[name=search]'),
            colorschema = data.rows[0].colorschema.split(","),
            schema = "<div style='width: 20px; background: {0}; height: 26px; float: right; border: 1px solid #111214; margin-left: 5px;'></div>";

        search.focus(false,200);

        Ext.getStore('flowprocessingstepmaterial').setParams({
            method: 'selectCode',
            query: data.rows[0].id
        }).load();

        Ext.getStore('flowprocessingstepmessage').setParams({
            method: 'selectCode',
            query: data.rows[0].id
        }).load();

        if(colorschema) {
            Ext.each(colorschema,function(item) {
                list += Ext.String.format(schema,item);
            });
        }

        view.down('container[name=colorschema]').update(list);
        view.down('textfield[name=username]').setValue(data.rows[0].username);
        view.down('textfield[name=areasname]').setValue(data.rows[0].areasname);
        view.down('textfield[name=clientname]').setValue(data.rows[0].clientname);
        view.down('textfield[name=equipmentname]').setValue(data.rows[0].equipmentname);
        view.down('textfield[name=sterilizationtypename]').setValue(data.rows[0].sterilizationtypename);
        view.down('textfield[name=priorityleveldescription]').setValue(data.rows[0].priorityleveldescription);
        view.down('label[name=materialboxname]').setText(Ext.String.format(text,data.rows[0].materialboxname));
        view.down('hiddenfield[name=materialboxid]').setValue(data.rows[0].materialboxid);
        view.down('hiddenfield[name=id]').setValue(data.rows[0].id);
    },

    onChangedMaterial: function (store, eOpts) {
        var me = this,
            count = 0,
            score = '{0}/{1}';

        store.each(function (item) {
            count += item.get('unconformities') == '010' ? 1 : 0;
        });

        me.getView().down('label[name=materialaccount]').setText(Ext.String.format(score,count,store.getCount()));
    },

    onSelectDataView: function (view,record,eOpts) {
        var me = this,
            view = me.getView();

        Ext.getStore('flowprocessingstep').setParams({
            method: 'selectCode',
            query: record.get('id')
        }).load();
    },

    onDeSelectDataView: function (view,record,eOpts) {
        Ext.getStore('flowprocessingstep').removeAll();
        Ext.getStore('flowprocessingstepaction').removeAll();
    },

    onSelectFlowProcessingStep: function (rowModel, record, index, eOpts) {
        var me = this,
            view = me.getView(),
            label = view.down('label[name=processlabel]');

        label.setText(record.get('elementname'));

        Ext.getStore('flowprocessingstepaction').setParams({
            method: 'selectCode',
            query: record.get('id')
        }).load();
    },

    onDeSelectFlowProcessingStep: function ( rowModel, record, index, eOpts ) {
        Ext.getStore('flowprocessingstepaction').removeAll();
    },

    onFlowStepSelect: function (view,record,eOpts) {
        var me = this,
            view = me.getView(),
            store = Ext.getStore('flowprocessing'),
            propertygrid = view.down('propertygrid');

        store.setParams({
            method: 'selectDashStep',
            query: record.get('flowprocessingid')
        }).load({
            scope: me,
            callback: function(records, operation, success) {
                var source = {},
                    record = records[0],
                    fields = [
                        'patientname',
                        'materialboxname',
                        'surgicalwarning',
                        'healthinsurance',
                        'sterilizationtypename'
                    ];

                Ext.each(fields,function(item) {
                    source[item] = record.get(item);
                });

                propertygrid.setSource(source);
                propertygrid.getColumns()[0].hide();
            }
        });
    },

    onFlowStepDeSelect: function () {
        var me = this,
            view = me.getView(),
            store = Ext.getStore('flowprocessing'),
            propertygrid = view.down('propertygrid');

        store.removeAll();
        propertygrid.setSource({});
    },

    onFlowStepAction: function ( viewView, record, item, index, e, eOpts ) {
        var me = this,
            stepid = record.get('id'),
            userid = record.get('username'),
            action = record.get('flowstepaction');

        switch(action) {
            case '001':
                    if(!userid) {
                        me.flowProcessingOpen('flowuser');
                    } else {
                        me.redirectTo( 'flowprocessingview/' + stepid);
                    }
                break;
        }
    },

    onSelectMaterialFlowStepAction: function ( rowModel, record, index, eOpts) {
        var me = this,
            view = me.getView(),
            portrait = view.down('portrait');

        portrait.beFileData(record.get('filetype'));
        portrait.update(Ext.String.format('<div class="portrait-label">{0}</div>',record.get('materialname')));
    },

    onFlowTaskAction: function () {
        var me = this,
            url = 'business/Calls/Quick/FlowProtocol.php?id=1';

        window.open(url);
    }

});