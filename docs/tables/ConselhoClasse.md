## Conselho de Classe
  - ConselhoClasse
    - Id:integer;
    - Sigla:string(20);
    - UF:string(2);
    - Nome:string(40);
    - CNES:string(7)

Exemplo:

    Id: 1;
    Sigla: COREN;
    Nome: Conselho Regional de Enfermagem;
    CNES: 11111111
    .....
    Id: 2;
    Sigla: CRM;
    Nome: Conselho Regional de Medicina;
    CNES: 22222222


## DML
	USE [SATOR]
	GO
	
	/****** Object:  Table [dbo].[classcouncil]    Script Date: 04/12/2016 22:38:01 ******/
	SET ANSI_NULLS ON
	GO
	
	SET QUOTED_IDENTIFIER ON
	GO
	
	SET ANSI_PADDING ON
	GO
	
	CREATE TABLE [dbo].[classcouncil](
		[id] [int] IDENTITY(1,1) NOT NULL,
		[name] [varchar](80) NOT NULL,
		[cnes] [char](7) NOT NULL,
		[acronym] [varchar](60) NOT NULL,
	 CONSTRAINT [PK_classcouncil] PRIMARY KEY CLUSTERED 
	(
		[id] ASC
	)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
	) ON [PRIMARY]
	
	GO
	
	SET ANSI_PADDING OFF
	GO
	
