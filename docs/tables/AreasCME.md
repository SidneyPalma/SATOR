## Áreas que compoem o CME
 - AreasCME
    - Id:integer;
    - Nome: string(60);
    - Descricao: string(100);
    - Sequencia: integer;
    - Fluxo?: boolean;
    - Ativo: boolean;
    SubAreaCME
      - Id: integer;
      - Nome: string(6);
      - Descricao: string(100);
      - Sequencia: integer;
      - Fluxo?: boolean;
      - FluxoLabel: string(20);
      

Exemplo:

    Id: 1;
    Nome: Expurgo;
    Descricao: Local para recepecao e lavagem do material sujo;
    Sequencia: 1;
    Ativo: 1
    .....
    Id: 2;
    Nome: Preparo;
    Descricao: Local para prepara os KIT e embalagem e processar;
    Sequencia: 2;
    Ativo: 1
    .....
    Id: 3;
    Nome: Arsenal;
    Descricao: Local para armazenamentos do materiais esterelizado;
    Sequencia: 3;
    Ativo: 1

## DML
    USE [SATOR]
    GO
    
    /****** Object:  Table [dbo].[cmeareas]    Script Date: 05/19/2016 22:38:04 ******/
    SET ANSI_NULLS ON
    GO
    
    SET QUOTED_IDENTIFIER ON
    GO
    
    SET ANSI_PADDING ON
    GO
    
    CREATE TABLE [dbo].[cmeareas](
        [id] [int] IDENTITY(1,1) NOT NULL,
        [name] [varchar](80) NOT NULL,
        [description] [varchar](80) NOT NULL,
        [sterilizationflow] [bit] NOT NULL,
        [sterilizationname] [varchar](20) NULL,
        [orderby] [int] NOT NULL,
        [isactive] [bit] NOT NULL,
     CONSTRAINT [PK_cmeareas] PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
    ) ON [PRIMARY]
    
    GO
    
    SET ANSI_PADDING OFF
    GO
    
    ALTER TABLE [dbo].[cmeareas] ADD  CONSTRAINT [DF_cmeareas_sterilizationflow]  DEFAULT ((0)) FOR [sterilizationflow]
    GO
    
    ALTER TABLE [dbo].[cmeareas] ADD  CONSTRAINT [DF_cmeareas_isactive]  DEFAULT ((1)) FOR [isactive]
    GO
   
    USE [SATOR]
    GO
    
    /****** Object:  Table [dbo].[cmesubareas]    Script Date: 05/19/2016 22:37:28 ******/
    SET ANSI_NULLS ON
    GO
    
    SET QUOTED_IDENTIFIER ON
    GO
    
    SET ANSI_PADDING ON
    GO
    
    CREATE TABLE [dbo].[cmesubareas](
        [id] [int] IDENTITY(1,1) NOT NULL,
        [name] [varchar](80) NOT NULL,
        [description] [varchar](80) NOT NULL,
        [cmeareasid] [int] NOT NULL,
        [sterilizationflow] [bit] NOT NULL,
        [sterilizationname] [varchar](20) NULL,
        [orderby] [int] NOT NULL,
        [isactive] [bit] NOT NULL,
     CONSTRAINT [PK_cmesubareas] PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
    ) ON [PRIMARY]
    
    GO
    
    SET ANSI_PADDING OFF
    GO
    
    ALTER TABLE [dbo].[cmesubareas]  WITH CHECK ADD  CONSTRAINT [FK_cmesubareas_cmeareas] FOREIGN KEY([cmeareasid])
    REFERENCES [dbo].[cmeareas] ([id])
    GO
    
    ALTER TABLE [dbo].[cmesubareas] CHECK CONSTRAINT [FK_cmesubareas_cmeareas]
    GO
    
    ALTER TABLE [dbo].[cmesubareas] ADD  CONSTRAINT [DF_cmesubareas_sterilizationflow]  DEFAULT ((0)) FOR [sterilizationflow]
    GO
    
    ALTER TABLE [dbo].[cmesubareas] ADD  CONSTRAINT [DF_cmesubareas_isactive]  DEFAULT ((1)) FOR [isactive]
    GO
    
