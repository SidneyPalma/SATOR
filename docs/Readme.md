Lists of Tables
---------------

This is all tables necessary for system

But I have to admit, tasks lists are my favorite:

> **Note:**

> - StackEdit is accessible offline after the application has been loaded for the first time.
> - Your local documents are not shared between different browsers or computers.
> - Clearing your browser's data may **delete all your local documents!** Make sure your documents are synchronized with **Google Drive** or **Dropbox** (check out the [<i class="icon-refresh"></i> Synchronization](#synchronization) section).
> - ![](http://findicons.com/files/icons/2652/gentleface/16/checkbox_checked_icon.png) This is a complete item
> - ![](http://findicons.com/files/icons/2652/gentleface/16/checkbox_unchecked_icon.png) This is an incomplete item

# Tabelas para o Projeto SATOR(CME)
As tabelas a seguir apresentam o modelo de dados para os Sistemas SATOR

| Log | Table Name | DBName | Description for this table |
|:--: | :--------- | :----- | :------------------------- |
|   | ![](http://findicons.com/files/icons/2652/gentleface/16/checkbox_checked_icon.png)[`AreasCME`](tables/AreasCME.md) | cmeareas | Áreas que compoem o CME |
|   | ![](http://findicons.com/files/icons/2652/gentleface/16/checkbox_checked_icon.png)[`ConselhoClasse`](tables/ConselhoClasse.md) | classcouncil | Conselho de Classe |
|   | ![](http://findicons.com/files/icons/2652/gentleface/16/checkbox_checked_icon.png)[`Embalagem`](tables/Embalagem.md) | packing | Embalagens utilizadas para empacotar os materias |
|   | ![](http://findicons.com/files/icons/2652/gentleface/16/checkbox_checked_icon.png)[`MaterialStatus`](tables/MaterialStatus.md) | materialstatus | O Status atual do Material |
|   | ![](http://findicons.com/files/icons/2652/gentleface/16/checkbox_checked_icon.png)[`TipoCliente`](tables/TipoCliente.md) | EnumType(clienttype) | Tipos de Clientes do CME |
|   | ![](http://findicons.com/files/icons/2652/gentleface/16/checkbox_checked_icon.png)[`TipoLavagem`](tables/TipoLavagem.md) | EnumType(drytype) | Tipo de Lavagem  |
|   | ![](http://findicons.com/files/icons/2652/gentleface/16/checkbox_checked_icon.png)[`TipoEsterilização`](tables/TipoEsterilizacao.md) | sterilizationtype | Tipo (de Processo) de Esterilização. |
|   | ![](http://findicons.com/files/icons/2652/gentleface/16/checkbox_checked_icon.png)[`Circulante`](tables/Circulante.md) | flowing | Circula material nas salas cirurgicas |
|   | ![](http://findicons.com/files/icons/2652/gentleface/16/checkbox_checked_icon.png)[`Instrumentador`](tables/Instrumentador.md) | instrumentator | Realiza a instrumentação de material durante a realização da Cirurgia |
|   | ![](http://findicons.com/files/icons/2652/gentleface/16/checkbox_checked_icon.png)[`Fabricante`](tables/Fabricante.md) | manufacturer | Fabricantes de materiais ou insumos  |
|   | ![](http://findicons.com/files/icons/2652/gentleface/16/checkbox_checked_icon.png)[`Fornecedor`](tables/Fornecedor.md) | provider | Fornecedores de materiais ou insumos  |
|   | ![](http://findicons.com/files/icons/2652/gentleface/16/checkbox_checked_icon.png)[`Cliente`](tables/Cliente.md) | client | Os Clientes do CME |
|   | ![](http://findicons.com/files/icons/2652/gentleface/16/checkbox_checked_icon.png)[`Entidade`](tables/Entidade.md) | entity | Entidade, detalhes sobre o Hospital  |
|   | ![](http://findicons.com/files/icons/2652/gentleface/16/checkbox_checked_icon.png)[`Colaborador`](tables/Colaborador.md) | collaborator | Necessita fazer link com o cadastro de Usuários |
|   | ![](http://findicons.com/files/icons/2652/gentleface/16/checkbox_checked_icon.png)[`Proprietario`](tables/Proprietario.md) | proprietary | Poderão confundir-se com "Cliente", mas realizam papéis diferentes |
|   | ![](http://findicons.com/files/icons/2652/gentleface/16/checkbox_checked_icon.png)[`Local`](tables/Local.md) | place | Locais de origem e destino dos Materiais |
|   | ![](http://findicons.com/files/icons/2652/gentleface/16/checkbox_checked_icon.png)[`FluxoEsterilização`](tables/FluxoEsterilizacao.md) |  | Fluxo de Esterilização é a rota utlizada para Esterilizar o Material |
|   | ![](http://findicons.com/files/icons/2652/gentleface/16/checkbox_checked_icon.png)[`NivelPrioridade`](tables/NivelPrioridade.md) | EnumType(prioritylevel) | Nivel de Prioridade de Esterilização |
|   | ![](http://findicons.com/files/icons/2652/gentleface/16/checkbox_checked_icon.png)[`EtapaFlag`](tables/EtapaFlag.md) | EnumType(markflagstep) | Flags usadas nas  Etapas(Processos) de Esterilizar do Material |
|   | ![](http://findicons.com/files/icons/2652/gentleface/16/checkbox_checked_icon.png)[`EtapaEsterilização`](tables/EtapaEsterilizacao.md) | stepsterilization | Etapas de Esterilização são possiveis Etapas(Processos) para Esterilizar o Material |
|   | ![](http://findicons.com/files/icons/2652/gentleface/16/checkbox_checked_icon.png)[`Material`](tables/Material.md) | material | São os Materiasi, alvo das atividades do CME |
|   | ![](http://findicons.com/files/icons/2652/gentleface/16/checkbox_checked_icon.png)[`Kits`](tables/Kit.md) | materialbox | Conjunto de Materiais |
|   | ![](http://findicons.com/files/icons/2652/gentleface/16/checkbox_checked_icon.png)[`EquipamentoStatus`](tables/EquipamentoStatus.md) | equipmentstatus | Status do Equipamento |
|   | ![](http://findicons.com/files/icons/2652/gentleface/16/checkbox_checked_icon.png)[`Equipamento`](tables/Equipamento.md) | equipment | Equipamentos utilizados no processo de esterilização |
|   | ![](http://findicons.com/files/icons/2652/gentleface/16/checkbox_checked_icon.png)[`TipoServico`](tables/TipoServico.md) | EnumType(servicetype) | Tipos de Serviços realizados |
|   | ![](http://findicons.com/files/icons/2652/gentleface/16/checkbox_checked_icon.png)[`EstruturaResultado`](tables/EstruturaResultado.md) | servicestructure->servicestructurefield | Estrutura dos Resultados dos Serviços Realizados |
|   | ![](http://findicons.com/files/icons/2652/gentleface/16/checkbox_checked_icon.png)[`ServicoRegisto`](tables/ServicoRegistro.md) | serviceregistration | Registro dos Serviços Realizados |
|   | ![](http://findicons.com/files/icons/2652/gentleface/16/checkbox_checked_icon.png)[`ItemBase`](tables/ItemBase.md) | itembase | Dados base para Material e Equipamento |
|   | ![](http://findicons.com/files/icons/2652/gentleface/16/checkbox_checked_icon.png)[`Tamanho`](tables/Tamanho.md) | EnumType(itemsize) | Tamanhos para Materiais e Kits |
|   | ![](http://findicons.com/files/icons/2652/gentleface/16/checkbox_checked_icon.png)[`Deposito`](tables/Deposito.md) | cmesubareasdeposit | Depósitos para Insumos |
|   | ![](http://findicons.com/files/icons/2652/gentleface/16/checkbox_checked_icon.png)[`UnidadeMedida`](tables/UnidadeMedida.md) | unitmeasurement | Unidade de Medida para Insumos |
|   | ![](http://findicons.com/files/icons/2652/gentleface/16/checkbox_checked_icon.png)[`ResiduoDestino`](tables/ResiduoDestino.md) | EnumType(targetsediment) | Destino de Residuos dos Insumos |
|   | ![](http://findicons.com/files/icons/2652/gentleface/16/checkbox_checked_icon.png)[`Insumo`](tables/Insumo.md) | input | Insumos utilizados no processo de esterilização |


Here's our logo (hover to see the title text):

