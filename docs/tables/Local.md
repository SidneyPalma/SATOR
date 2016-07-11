## Local (Genérico) de origem e destino dos materiais
 - Local: 
    - Id:integer;
    - Sigla:string(20);
    - Descricao:string(60);
    - ClienteId:integer;
    - Ativo:boolean

Exemplo:

    id: 1
    Sigla: Sala 1
    Descricao: Sala Cirurgia !
    ClienteId: 1
    Ativo: 1
    .....
    id: 2
    Sigla: Posto III
    Descricao: Posto de Enfermagem III
    ClienteId: 5
    Ativo: 1    

## DML
    USE [SATOR]
    GO
    
    /****** Object:  Table [dbo].[place]    Script Date: 04/07/2016 17:16:20 ******/
    SET ANSI_NULLS ON
    GO
    
    SET QUOTED_IDENTIFIER ON
    GO
    
    SET ANSI_PADDING ON
    GO
    
    CREATE TABLE [dbo].[place](
        [id] [int] IDENTITY(1,1) NOT NULL,
        [name] [varchar](60) NOT NULL,
        [description] [varchar](80) NOT NULL,
        [clientid] [int] NOT NULL,
        [isactive] [bit] NOT NULL,
     CONSTRAINT [PK_place] PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
    ) ON [PRIMARY]
    
    GO
    
    SET ANSI_PADDING OFF
    GO
    
    ALTER TABLE [dbo].[place]  WITH CHECK ADD  CONSTRAINT [FK_place_client] FOREIGN KEY([clientid])
    REFERENCES [dbo].[client] ([id])
    GO
    
    ALTER TABLE [dbo].[place] CHECK CONSTRAINT [FK_place_client]
    GO
    
    ALTER TABLE [dbo].[place] ADD  CONSTRAINT [DF_place_isactive]  DEFAULT ((1)) FOR [isactive]
    GO