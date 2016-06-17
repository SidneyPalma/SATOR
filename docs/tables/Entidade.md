## Entidade
 - Entidade
    - Id:integer;
    - CNPJ:string(14);
    - RazaoSocial:string(100);
    - NomeFantasia:string(60);
    - CNES:string(07);
    - Colaborador_id: integer;  //ResponsavelCME

Exemplo:

    Id: 1;
    CNPJ: 83367342000767;
    RazaoSocial: Associacao Adventista Norte Brasileira de Prevensão e Assistência a Saúde;
    NomeFantasia: Hospital Adventista de Manaus;
    CNES: 2017245;
    Colaborador_id: 1;  //ResponsavelCME   
        
## DML
    USE [SATOR]
    GO
    
    /****** Object:  Table [dbo].[entity]    Script Date: 04/12/2016 06:32:27 ******/
    SET ANSI_NULLS ON
    GO
    
    SET QUOTED_IDENTIFIER ON
    GO
    
    SET ANSI_PADDING ON
    GO
    
    CREATE TABLE [dbo].[entity](
        [id] [int] IDENTITY(1,1) NOT NULL,
        [name] [varchar](80) NOT NULL,
        [legalname] [varchar](80) NOT NULL,
        [collaboratorid] [int] NOT NULL,
        [cnpjnumber] [varchar](14) NOT NULL,
        [cnesnumber] [varchar](20) NOT NULL,
     CONSTRAINT [PK_entity] PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
    ) ON [PRIMARY]
    
    GO
    
    SET ANSI_PADDING OFF
    GO
    
    ALTER TABLE [dbo].[entity]  WITH CHECK ADD  CONSTRAINT [FK_entity_collaborator] FOREIGN KEY([collaboratorid])
    REFERENCES [dbo].[collaborator] ([id])
    GO
    
    ALTER TABLE [dbo].[entity] CHECK CONSTRAINT [FK_entity_collaborator]
    GO