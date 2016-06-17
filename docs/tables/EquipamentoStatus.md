## Equipament Status
#### (O Status atual do Equipamento)
 - EquipamentoStatus
    - id:integer;
    - Nome:string(60);
    - Bloqueia:boolean
    - Ativo:boolean
    
Exemplo:

    id: 1;
    Nome: Liberado;
    Bloqueia: 0;
    Ativo: 1;
    .....
    id: 2;
    Nome: Danificado;
    Bloqueia: 1;
    Ativo: 1;
    .....
    id: 3
    Nome: Em Manutenção;
    Bloqueia: 1;
    Ativo: 1;
    .....
    id: 4
    Nome: Descontinuado;
    Bloqueia: 1;
    Ativo: 1;

## DML
    USE [SATOR]
    GO
    
    /****** Object:  Table [dbo].[equipmentstatus]    Script Date: 04/06/2016 22:52:36 ******/
    SET ANSI_NULLS ON
    GO
    
    SET QUOTED_IDENTIFIER ON
    GO
    
    SET ANSI_PADDING ON
    GO
    
    CREATE TABLE [dbo].[equipmentstatus](
        [id] [int] IDENTITY(1,1) NOT NULL,
        [name] [varchar](80) NOT NULL,
        [blocks] [bit] NOT NULL,
        [isactive] [bit] NOT NULL,
     CONSTRAINT [PK_equipmentstatus] PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
    ) ON [PRIMARY]
    
    GO
    
    SET ANSI_PADDING OFF
    GO
    
    ALTER TABLE [dbo].[equipmentstatus] ADD  CONSTRAINT [DF_equipmentstatus_blocks]  DEFAULT ((0)) FOR [blocks]
    GO
    
    ALTER TABLE [dbo].[equipmentstatus] ADD  CONSTRAINT [DF_equipmentstatus_isactive]  DEFAULT ((1)) FOR [isactive]
    GO
    
    
