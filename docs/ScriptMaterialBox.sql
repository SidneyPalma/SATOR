USE [SATOR]
GO
/****** Object:  Table [dbo].[targecolor]    Script Date: 06/17/2016 11:09:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[targecolor](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](80) NOT NULL,
	[colorschema] [varchar](20) NOT NULL,
	[isactive] [bit] NOT NULL,
 CONSTRAINT [PK_targecolor] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[materialbox]    Script Date: 06/17/2016 11:09:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[materialbox](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](80) NOT NULL,
	[barcode] [varchar](20) NOT NULL,
	[restriction] [varchar](max) NULL,
	[itemsize] [char](3) NOT NULL,
	[statusbox] [char](3) NOT NULL,
	[packingid] [int] NOT NULL,
	[requirepatient] [bit] NOT NULL,
 CONSTRAINT [PK_materialbox] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[materialboxtarge]    Script Date: 06/17/2016 11:09:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[materialboxtarge](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[materialboxid] [int] NOT NULL,
	[targecolorid] [int] NOT NULL,
 CONSTRAINT [PK_materialboxtarge] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[materialboxitem]    Script Date: 06/17/2016 11:09:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[materialboxitem](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[materialboxid] [int] NOT NULL,
	[materialid] [int] NOT NULL,
 CONSTRAINT [PK_materialboxitem] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Default [DF_materialbox_statusbox]    Script Date: 06/17/2016 11:09:20 ******/
ALTER TABLE [dbo].[materialbox] ADD  CONSTRAINT [DF_materialbox_statusbox]  DEFAULT ((0)) FOR [statusbox]
GO
/****** Object:  Default [DF_materialbox_requirepatient]    Script Date: 06/17/2016 11:09:20 ******/
ALTER TABLE [dbo].[materialbox] ADD  CONSTRAINT [DF_materialbox_requirepatient]  DEFAULT ((0)) FOR [requirepatient]
GO
/****** Object:  Default [DF_targecolor_isactive]    Script Date: 06/17/2016 11:09:20 ******/
ALTER TABLE [dbo].[targecolor] ADD  CONSTRAINT [DF_targecolor_isactive]  DEFAULT ((0)) FOR [isactive]
GO
/****** Object:  ForeignKey [FK_materialbox_packing]    Script Date: 06/17/2016 11:09:20 ******/
ALTER TABLE [dbo].[materialbox]  WITH CHECK ADD  CONSTRAINT [FK_materialbox_packing] FOREIGN KEY([packingid])
REFERENCES [dbo].[packing] ([id])
GO
ALTER TABLE [dbo].[materialbox] CHECK CONSTRAINT [FK_materialbox_packing]
GO
/****** Object:  ForeignKey [FK_materialboxitem_material]    Script Date: 06/17/2016 11:09:20 ******/
ALTER TABLE [dbo].[materialboxitem]  WITH CHECK ADD  CONSTRAINT [FK_materialboxitem_material] FOREIGN KEY([materialid])
REFERENCES [dbo].[material] ([id])
GO
ALTER TABLE [dbo].[materialboxitem] CHECK CONSTRAINT [FK_materialboxitem_material]
GO
/****** Object:  ForeignKey [FK_materialboxitem_materialbox]    Script Date: 06/17/2016 11:09:20 ******/
ALTER TABLE [dbo].[materialboxitem]  WITH CHECK ADD  CONSTRAINT [FK_materialboxitem_materialbox] FOREIGN KEY([materialboxid])
REFERENCES [dbo].[materialbox] ([id])
GO
ALTER TABLE [dbo].[materialboxitem] CHECK CONSTRAINT [FK_materialboxitem_materialbox]
GO
/****** Object:  ForeignKey [FK_materialboxtarge_materialbox]    Script Date: 06/17/2016 11:09:20 ******/
ALTER TABLE [dbo].[materialboxtarge]  WITH CHECK ADD  CONSTRAINT [FK_materialboxtarge_materialbox] FOREIGN KEY([materialboxid])
REFERENCES [dbo].[materialbox] ([id])
GO
ALTER TABLE [dbo].[materialboxtarge] CHECK CONSTRAINT [FK_materialboxtarge_materialbox]
GO
/****** Object:  ForeignKey [FK_materialboxtarge_targecolor]    Script Date: 06/17/2016 11:09:20 ******/
ALTER TABLE [dbo].[materialboxtarge]  WITH CHECK ADD  CONSTRAINT [FK_materialboxtarge_targecolor] FOREIGN KEY([targecolorid])
REFERENCES [dbo].[targecolor] ([id])
GO
ALTER TABLE [dbo].[materialboxtarge] CHECK CONSTRAINT [FK_materialboxtarge_targecolor]
GO
