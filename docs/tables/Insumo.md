## Insumos utilizados no processo de esterilização
 - Insumo
    - Id:integer;
    - Nome: string(60);
    - Descricao: string(120);
    - CodigoBarra: string(20);
    - CodigoERP: string(20);
    - UnidadeMedida_id: integer;
    - QtdeEmbalagem: decimal(18,3);
    - ControlarEstoque?: boolean;
    - Fabricante_id: integer;
    - Fornecedor_id: integer;
    - RegistroANVISA: string(50);
    - EstoqueMaximo: decimal(18,3);
    - EstoqueMinimo: decimal(18,3);
    - PontoReposicao: decimal(18,3);
    - PrazoEntregaDias: integer;
    - ValidadeAposAtivacaoDias: integer;
    - ObrigatorioTesteInsumo?: integer;
    - ProcessosQtde: integer;
    - Ativo: boolean;
       - SaldoInsumo
          - Id: integer;
          - Insumo_id: integer;
          - Deposito_id: integer;
          - Lote: string(20);
          - QtdeInicial: decimal(18,3);
          - QtdeDisponivel: decimal(18,3);
          - DataFabricacao: date;
          - DataValidade: date;
          - PrecoVendaMedio: decimal(18,2);
       - MovimentoInsumo
          - Id: integer;
          - Insumo_id: integer;
          - Colaborador_id: integer;
          - FlagEntradaSaida: char(1);
          - DataHora: datetime;
          - Quantidade: decimal(18,3);
          - Lote: string(20);
          - DataFabricacao: date;
          - DataValidade: date;
          - NumNotaFiscal: string(20);
          - PreçoNotaFiscal: decimal(18,2);
          - PrecoCusto: decimal(18,2);
          - PrecoVenda: decimal(18,2);
          - ResiduoDestino_id: integer;
          - Equipamento_id: integer;

Exemplo:

    Id: 1;
    Nome: Ácido Peracítico - Anioxyde 1000
    Descricao: Ácido Peracítico - Anioxide 1000 Desinfetante de alto nível.
    CodigoBarra: 1
    CodigoERP:
    UnidadeMedida_id: 1
    Embalagem_id: 1
    QtdeEmbalagem: 5,000
    ControlarEstoque?: 1
    Fabricante_id: 1
    Fornecedor_id: 1
    RegistroANVISA: 327210004
    EstoqueMaximo: 30,000
    EstoqueMinimo:  5,000
    ProntoReposicao: 15,000
    PrazoEntregaDias: 30
    ValidadeAposAtivacaoDias: 22
    ObrigatorioTesteInsumo?: 0
    ProcessoQtde: 10
    Ativo: 1
    
    
#DML
    USE [SATOR_TEST]
    GO
    
    /****** Object:  Table [dbo].[input]    Script Date: 11/07/2016 22:07:30 ******/
    SET ANSI_NULLS ON
    GO
    
    SET QUOTED_IDENTIFIER ON
    GO
    
    SET ANSI_PADDING ON
    GO
    
    CREATE TABLE [dbo].[input](
        [id] [int] NOT NULL,
        [presentation] [char](3) NOT NULL,
        [providerid] [int] NOT NULL,
        [hasbatch] [bit] NOT NULL,
        [hasstock] [bit] NOT NULL,
        [minstock] [decimal](12, 3) NOT NULL,
        [maxstock] [decimal](12, 3) NOT NULL,
        [resetpoint] [decimal](12, 3) NOT NULL,
        [deadline] [int] NOT NULL,
        [validityactivation] [int] NOT NULL,
        [reactive] [bit] NOT NULL,
     CONSTRAINT [PK_input] PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
    ) ON [PRIMARY]
    
    GO
    
    SET ANSI_PADDING OFF
    GO
    
    ALTER TABLE [dbo].[input] ADD  CONSTRAINT [DF_input_hasbatch]  DEFAULT ((0)) FOR [hasbatch]
    GO
    
    ALTER TABLE [dbo].[input] ADD  CONSTRAINT [DF_input_hasstock]  DEFAULT ((1)) FOR [hasstock]
    GO
    
    ALTER TABLE [dbo].[input] ADD  CONSTRAINT [DF_input_minstock]  DEFAULT ((0)) FOR [minstock]
    GO
    
    ALTER TABLE [dbo].[input] ADD  CONSTRAINT [DF_input_maxstock]  DEFAULT ((0)) FOR [maxstock]
    GO
    
    ALTER TABLE [dbo].[input] ADD  CONSTRAINT [DF_input_resetpoint]  DEFAULT ((0)) FOR [resetpoint]
    GO
    
    ALTER TABLE [dbo].[input] ADD  CONSTRAINT [DF_input_validityactivation]  DEFAULT ((0)) FOR [validityactivation]
    GO
    
    ALTER TABLE [dbo].[input] ADD  CONSTRAINT [DF_input_reactive]  DEFAULT ((0)) FOR [reactive]
    GO
    
    ALTER TABLE [dbo].[input]  WITH CHECK ADD  CONSTRAINT [FK_input_itembase] FOREIGN KEY([id])
    REFERENCES [dbo].[itembase] ([id])
    GO
    
    ALTER TABLE [dbo].[input] CHECK CONSTRAINT [FK_input_itembase]
    GO
    
    ALTER TABLE [dbo].[input]  WITH CHECK ADD  CONSTRAINT [FK_input_provider] FOREIGN KEY([providerid])
    REFERENCES [dbo].[provider] ([id])
    GO
    
    ALTER TABLE [dbo].[input] CHECK CONSTRAINT [FK_input_provider]
    GO
    
    USE [SATOR_TEST]
    GO
    
    /****** Object:  Table [dbo].[inputpresentation]    Script Date: 11/07/2016 22:07:59 ******/
    SET ANSI_NULLS ON
    GO
    
    SET QUOTED_IDENTIFIER ON
    GO
    
    SET ANSI_PADDING ON
    GO
    
    CREATE TABLE [dbo].[inputpresentation](
        [id] [int] IDENTITY(1,1) NOT NULL,
        [inputid] [int] NOT NULL,
        [presentation] [char](3) NOT NULL,
        [acronym] [char](3) NOT NULL,
        [measurebase] [decimal](12, 3) NOT NULL,
     CONSTRAINT [PK_inputpresentation] PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
    ) ON [PRIMARY]
    
    GO
    
    SET ANSI_PADDING OFF
    GO
    
    ALTER TABLE [dbo].[inputpresentation] ADD  CONSTRAINT [DF_inputpresentation_measurebase]  DEFAULT ((0)) FOR [measurebase]
    GO
    
    ALTER TABLE [dbo].[inputpresentation]  WITH CHECK ADD  CONSTRAINT [FK_inputpresentation_input] FOREIGN KEY([inputid])
    REFERENCES [dbo].[input] ([id])
    GO
    
    ALTER TABLE [dbo].[inputpresentation] CHECK CONSTRAINT [FK_inputpresentation_input]
    GO
    

    USE [SATOR_TEST]
    GO
    
    /****** Object:  Table [dbo].[inputstock]    Script Date: 11/07/2016 22:08:13 ******/
    SET ANSI_NULLS ON
    GO
    
    SET QUOTED_IDENTIFIER ON
    GO
    
    SET ANSI_PADDING ON
    GO
    
    CREATE TABLE [dbo].[inputstock](
        [id] [int] IDENTITY(1,1) NOT NULL,
        [inputid] [int] NOT NULL,
        [datevalidity] [date] NULL,
        [presentation] [char](3) NOT NULL,
        [lotpart] [varchar](20) NULL,
        [lotamount] [decimal](12, 3) NOT NULL,
     CONSTRAINT [PK_inputstock] PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
    ) ON [PRIMARY]
    
    GO
    
    SET ANSI_PADDING OFF
    GO
    
    ALTER TABLE [dbo].[inputstock] ADD  CONSTRAINT [DF_inputstock_lotamount]  DEFAULT ((0)) FOR [lotamount]
    GO
    
    ALTER TABLE [dbo].[inputstock]  WITH CHECK ADD  CONSTRAINT [FK_inputstock_input] FOREIGN KEY([inputid])
    REFERENCES [dbo].[input] ([id])
    GO
    
    ALTER TABLE [dbo].[inputstock] CHECK CONSTRAINT [FK_inputstock_input]
    GO
    
