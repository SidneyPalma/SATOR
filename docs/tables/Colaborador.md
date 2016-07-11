## Colaboradores que atuam no CME
 - Colaborador
    - Id:integer;
    - Nome:string(6);
    - Matricula:integer;
    - DataAdmissao: datetime;
    - DataDemisao: datetime;
    - Unidade da Federação;
    - ConselhoClasseId:integer;
    - CodigoConselhoClasse:string(20)
    - Ativo:boolean;

Exemplo:

    Id: 1;
    Nome: Ana Paula Galvao;
    Matricula: 12345 ;
    DataAdmissao: 02/01/2010 ;
    DataDemisao: Null;
    UF: AM;
    **ConselhoClasseId: 1;
    **CodigoConselhoClasse: 5678;
    Ativo: 1;

## DML
    USE [SATOR]
    GO
    
    /****** Object:  Table [dbo].[collaborator]    Script Date: 04/12/2016 22:38:50 ******/
    SET ANSI_NULLS ON
    GO
    
    SET QUOTED_IDENTIFIER ON
    GO
    
    SET ANSI_PADDING ON
    GO
    
    CREATE TABLE [dbo].[collaborator](
        [id] [int] IDENTITY(1,1) NOT NULL,
        [name] [varchar](20) NOT NULL,
        [registration] [int] NOT NULL,
        [federationunit] [char](2) NOT NULL,
        [dateadmission] [date] NOT NULL,
        [dateresignation] [date] NULL,
        [classcouncilid] [int] NULL,
        [classcouncilcode] [varchar](20) NULL,
        [usersid] [int] NOT NULL,
        [isactive] [bit] NOT NULL,
     CONSTRAINT [PK_collaborator] PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
    ) ON [PRIMARY]
    
    GO
    
    SET ANSI_PADDING OFF
    GO
    
    ALTER TABLE [dbo].[collaborator]  WITH CHECK ADD  CONSTRAINT [FK_collaborator_classcouncil] FOREIGN KEY([classcouncilid])
    REFERENCES [dbo].[classcouncil] ([id])
    GO
    
    ALTER TABLE [dbo].[collaborator] CHECK CONSTRAINT [FK_collaborator_classcouncil]
    GO
    
    ALTER TABLE [dbo].[collaborator]  WITH CHECK ADD  CONSTRAINT [FK_collaborator_users] FOREIGN KEY([usersid])
    REFERENCES [dbo].[users] ([id])
    GO
    
    ALTER TABLE [dbo].[collaborator] CHECK CONSTRAINT [FK_collaborator_users]
    GO
    
    ALTER TABLE [dbo].[collaborator] ADD  CONSTRAINT [DF_collaborator_isactive]  DEFAULT ((1)) FOR [isactive]
    GO