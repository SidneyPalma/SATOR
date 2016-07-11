## ServicoRegistro
 - ServicoRegistro
    - id:integer;
    - DataHoraInicio: datetime;
    - DataHoraTermino: datetime
    - TipoServico_id: integer;
    - Colaborador_id: integer;
    - AreaCME_id: integer;
    - ItemBase_id: integer;
    - Observacao: string(120);
    - EstruturaResultado_id: 
    - EstruturaResultado: string(120)


Exemplo: 

    id:1;
    DataHoraInicio: 05/07/2015 20:33:00
    DataHoraTermino: 05/07/2015 20:34:00
    TipoServico_id: 1
    Colaborador_id: 10
    AreaCME_id: 1
    ItemBase__id: 1
    Observacao:
    EstruturaResultado_id
    EstruturaResultado    
    .....
    
## DML
    USE [SATOR]
    GO
    
    /****** Object:  Table [dbo].[serviceregistration]    Script Date: 05/03/2016 20:31:01 ******/
    SET ANSI_NULLS ON
    GO
    
    SET QUOTED_IDENTIFIER ON
    GO
    
    SET ANSI_PADDING ON
    GO
    
    CREATE TABLE [dbo].[serviceregistration](
        [id] [int] IDENTITY(1,1) NOT NULL,
        [itembaseid] [int] NOT NULL,
        [cmeareasid] [int] NOT NULL,
        [servicetype] [char](3) NOT NULL,
        [description] [varchar](max) NOT NULL,
        [observation] [varchar](max) NULL,
        [begintime] [datetime] NOT NULL,
        [begintimeusername] [varchar](80) NOT NULL,
        [enduptime] [datetime] NULL,
        [enduptimeusername] [varchar](80) NULL,
        [resultfield] [varchar](max) NULL,
        [resultvalue] [varchar](max) NULL,
        [resultstate] [char](1) NOT NULL,
     CONSTRAINT [PK_serviceregistration] PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
    ) ON [PRIMARY]
    
    GO
    
    SET ANSI_PADDING OFF
    GO
    
    ALTER TABLE [dbo].[serviceregistration]  WITH CHECK ADD  CONSTRAINT [FK_serviceregistration_cmeareas] FOREIGN KEY([cmeareasid])
    REFERENCES [dbo].[cmeareas] ([id])
    GO
    
    ALTER TABLE [dbo].[serviceregistration] CHECK CONSTRAINT [FK_serviceregistration_cmeareas]
    GO
    
    ALTER TABLE [dbo].[serviceregistration]  WITH CHECK ADD  CONSTRAINT [FK_serviceregistration_itembase] FOREIGN KEY([itembaseid])
    REFERENCES [dbo].[itembase] ([id])
    GO
    
    ALTER TABLE [dbo].[serviceregistration] CHECK CONSTRAINT [FK_serviceregistration_itembase]
    GO
    
    ALTER TABLE [dbo].[serviceregistration] ADD  CONSTRAINT [DF_serviceregistration_begintime]  DEFAULT (getdate()) FOR [begintime]
    GO
    
    ALTER TABLE [dbo].[serviceregistration] ADD  CONSTRAINT [DF_serviceregistration_resultstate]  DEFAULT ('L') FOR [resultstate]
    GO
    
    
