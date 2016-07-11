## Etapas de Esterilização
#### Etapas de Esterilização são possiveis Etapas para Esterilizar o Material
 - EtapaEsterilizacao
    - id: integer
    - Nome:string(60);
    - Descricao: String(120);
    - TipoEsterilizacao_id:integer;
    - AreasCME_id: integer;
    - Equipamento_id: integer; 
    - EtiquetaPreparo: string(20)
    - TempoCicloProcesso: integer;  //minutos
    - EtapaFlagString: string(120); // usar Enum EtapaFlag
    - Ativo:boolean;   
     
Exemplo:

     id: 1;
     Nome:Autoclave Cisa 2 (121o/30');
     Descricao: ;
     TipoEsterilizacao_id: 1;
     AreasCME_id: 1;
     Equipamento_id:  1; 
     EtiquetaPreparo: ;
     TempoCicloProcesso: 60;  //minutos
     EtapaFlagString: ; // usar Enum EtapaFlag
     Ativo: 1;
    
## DML

    USE [SATOR]
    GO
    
    /****** Object:  Table [dbo].[sterilizationtype]    Script Date: 04/02/2016 20:16:49 ******/
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
    
    ALTER TABLE [dbo].[sterilizationtype] ADD  CONSTRAINT [DF_sterilizationtype_prioritylevel]  DEFAULT ('N') FOR [prioritylevel]
    GO
    
    ALTER TABLE [dbo].[sterilizationtype] ADD  CONSTRAINT [DF_sterilizationtype_isactive]  DEFAULT ((1)) FOR [isactive]
    GO