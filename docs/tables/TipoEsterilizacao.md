## Tipo (de Processo) de Esterilização.
 - TipoEsterilização
    - id:integer;
    - Nome:string(60);
    - Descricao: String(120);
    - NivelPrioridade_id: integer;
    - EtapaEstelizacao_id: integer; //Indica a etapa inicial do processo
    - PrazoValidadeDias: integer;
    - Ativo:boolean;

Exemplo:

    id:1;
    Nome: Rotulados - Vapor Saturado;
    Descricao: Montagem e Processamento de enxoval a ser esterilizado;
    NivelPrioridade: 1;
    EtapaEsterilizacao_id: 1; 
    PrazoValidadeDias: 30;
    Ativo: 1;
    .....
    id:2;
    Nome: Vapor Saturado;
    Descricao: Montagem e Processamento de itens Críticos e Semicríticos termoresistentes a serem esterilizados;
    NivelPrioridade: 1;
    EtapaEsterilizacao_id: 7; 
    PrazoValidadeDias: 180;
    Ativo: 1;
    .....
    id:3;
    Nome: Peróxido;
    Descricao: Montagem e Processamento de itens Críticos e Semicríticos termosensíveis a serem esterilizados;
    NivelPrioridade: 1;
    EtapaEsterilizacao_id: 16; 
    PrazoValidadeDias: 180;
    Ativo: 1;
    .....
    id:4;
    Nome: Desinfecção;
    Descricao: Montagem e Processamento de Desinfecção de Alto Nível de itens Semicríticos termosensíveis;
    NivelPrioridade: 1;
    EtapaEsterilizacao_id: 21; 
    PrazoValidadeDias: 30;
    Ativo: 1;    

## DML
    USE [SATOR]
    GO
    
    /****** Object:  Table [dbo].[sterilizationtype]    Script Date: 04/02/2016 20:24:15 ******/
    SET ANSI_NULLS ON
    GO
    
    SET QUOTED_IDENTIFIER ON
    GO
    
    SET ANSI_PADDING ON
    GO
    
    CREATE TABLE [dbo].[sterilizationtype](
        [id] [int] IDENTITY(1,1) NOT NULL,
        [name] [varchar](80) NOT NULL,
        [description] [varchar](80) NOT NULL,
        [validdays] [int] NOT NULL,
        [stepsterilizationid] [int] NOT NULL,
        [prioritylevel] [char](1) NOT NULL,
        [isactive] [bit] NOT NULL,
     CONSTRAINT [PK_sterilizationtype] PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
    ) ON [PRIMARY]
    
    GO
    
    SET ANSI_PADDING OFF
    GO
    
    ALTER TABLE [dbo].[sterilizationtype]  WITH CHECK ADD  CONSTRAINT [FK_sterilizationtype_stepsterilization] FOREIGN KEY([stepsterilizationid])
    REFERENCES [dbo].[stepsterilization] ([id])
    GO
    
    ALTER TABLE [dbo].[sterilizationtype] CHECK CONSTRAINT [FK_sterilizationtype_stepsterilization]
    GO
    
    ALTER TABLE [dbo].[sterilizationtype] ADD  CONSTRAINT [DF_sterilizationtype_validdays]  DEFAULT ((1)) FOR [validdays]
    GO
    
    ALTER TABLE [dbo].[sterilizationtype] ADD  CONSTRAINT [DF_sterilizationtype_prioritylevel]  DEFAULT ('N') FOR [prioritylevel]
    GO
    
    ALTER TABLE [dbo].[sterilizationtype] ADD  CONSTRAINT [DF_sterilizationtype_isactive]  DEFAULT ((1)) FOR [isactive]
    GO