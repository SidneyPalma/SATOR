## Estrutura Resultado
 - EstruturaResultado
    - id:integer;
    - Descricao:string(60);
    - Ativo:boolean;
      - DetalheEstruturaResultado
        - EstruturaResultado_id: integr;
        - Seq: integer
        - Descricao: string(60);
        - FormatoResultado: string(120);
        - ValorReferenciaMin: string(60);
        - ValorReferencia: string(60);
        - ValorReferenciaMax: string(60)

Exemplo: (EnumTypeList)

    id: 1	
    Descricao: Temperatura	
    Ativo: 1
        
## DML
    USE [SATOR]
    GO
    
    /****** Object:  Table [dbo].[servicestructure]    Script Date: 04/26/2016 23:32:02 ******/
    SET ANSI_NULLS ON
    GO
    
    SET QUOTED_IDENTIFIER ON
    GO
    
    SET ANSI_PADDING ON
    GO
    
    CREATE TABLE [dbo].[servicestructure](
        [id] [int] IDENTITY(1,1) NOT NULL,
        [description] [varchar](80) NOT NULL,
        [isactive] [bit] NOT NULL,
     CONSTRAINT [PK_servicestructure] PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
    ) ON [PRIMARY]
    
    GO
    
    SET ANSI_PADDING OFF
    GO
    
    ALTER TABLE [dbo].[servicestructure] ADD  CONSTRAINT [DF_servicestructure_isactive]  DEFAULT ((1)) FOR [isactive]
    GO
    
    
    USE [SATOR]
    GO
    
    /****** Object:  Table [dbo].[servicestructurefield]    Script Date: 04/26/2016 23:32:51 ******/
    SET ANSI_NULLS ON
    GO
    
    SET QUOTED_IDENTIFIER ON
    GO
    
    SET ANSI_PADDING ON
    GO
    
    CREATE TABLE [dbo].[servicestructurefield](
        [id] [int] IDENTITY(1,1) NOT NULL,
        [orderby] [int] NOT NULL,
        [servicestructureid] [int] NOT NULL,
        [resultfield] [varchar](max) NOT NULL,
     CONSTRAINT [PK_servicestructurefield] PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
    ) ON [PRIMARY]
    
    GO
    
    SET ANSI_PADDING OFF
    GO
    
    ALTER TABLE [dbo].[servicestructurefield]  WITH CHECK ADD  CONSTRAINT [FK_servicestructurefield_servicestructure] FOREIGN KEY([servicestructureid])
    REFERENCES [dbo].[servicestructure] ([id])
    GO
    
    ALTER TABLE [dbo].[servicestructurefield] CHECK CONSTRAINT [FK_servicestructurefield_servicestructure]
    GO
    
    ALTER TABLE [dbo].[servicestructurefield] ADD  CONSTRAINT [DF_servicestructurefield_orderby]  DEFAULT ((0)) FOR [orderby]
    GO
    
