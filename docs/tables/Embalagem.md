## Embalagem
#### (Embalagens utilizadas para empacotar os materias)
 - Embalagem
    - id:integer;
    - Nome:string(60);
    - ValidadeDias:integer;
    - Ativo:boolean;
    
Exemplo:

    id: 1;
    Nome: SMS;
    ValidadeDias: 60;
    Ativo: 1;
    .....
    id: 2
    Nome: Grau Cirúrgico;
    ValidadeDias: 60;
    Ativo: 1;
    .....
    id: 3;
    Nome: Tecido;
    ValidadeDias: 7;
    Ativo: 1;
    .....
    id: 4;
    Nome: Tyvek;
    ValidadeDias: 60;
    Ativo: 1;
    .....
    id: 5;
    Nome: Saco Plástico;
    ValidadeDias: 7;
    Ativo: 1;
    
## DML
    USE [SATOR]
    GO
    
    /****** Object:  Table [dbo].[packing]    Script Date: 03/30/2016 20:57:42 ******/
    SET ANSI_NULLS ON
    GO
    
    SET QUOTED_IDENTIFIER ON
    GO
    
    SET ANSI_PADDING ON
    GO
    
    CREATE TABLE [dbo].[packing](
        [id] [int] IDENTITY(1,1) NOT NULL,
        [name] [varchar](50) NOT NULL,
        [isactive] [bit] NOT NULL,
        [validitydays] [int] NOT NULL,
     CONSTRAINT [PK_packing] PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
    ) ON [PRIMARY]
    
    GO
    
    SET ANSI_PADDING OFF
    GO
    
    ALTER TABLE [dbo].[packing] ADD  CONSTRAINT [DF_packing_isactive]  DEFAULT ((1)) FOR [isactive]
    GO
    
    ALTER TABLE [dbo].[packing] ADD  CONSTRAINT [DF_packing_validitydays]  DEFAULT ((0)) FOR [validitydays]
    GO
    
    
