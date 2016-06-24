/*
Run this script on:

        (local).CME    -  This database will be modified

to synchronize it with:

        (local).SATOR

You are recommended to back up your database before running this script

Script created by SQL Compare version 11.1.3 from Red Gate Software Ltd at 23/06/2016 22:28:13

*/
DROP TABLE cmesubareasdeposit;

/****** Object:  Table [dbo].[cmeareasdeposit]    Script Date: 23/06/2016 22:32:44 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[cmeareasdeposit](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[cmeareasid] [int] NOT NULL,
	[name] [varchar](80) NOT NULL,
	[barcode] [varchar](20) NOT NULL,
	[isactive] [bit] NOT NULL,
 CONSTRAINT [PK_cmeareasdeposit] PRIMARY KEY CLUSTERED
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[cmeareasdeposit] ADD  CONSTRAINT [DF_cmeareasdeposit_isactive]  DEFAULT ((1)) FOR [isactive]
GO

ALTER TABLE [dbo].[cmeareasdeposit]  WITH CHECK ADD  CONSTRAINT [FK_cmeareasdeposit_cmeareas] FOREIGN KEY([cmeareasid])
REFERENCES [dbo].[cmeareas] ([id])
GO

ALTER TABLE [dbo].[cmeareasdeposit] CHECK CONSTRAINT [FK_cmeareasdeposit_cmeareas]
GO