CREATE TABLE [dbo].[Contact] (
    [ContactId]   INT            IDENTITY (1, 1) NOT NULL,
    [FirstName]   NVARCHAR (255) NULL,
    [LastName]    NVARCHAR (255) NULL,
    [Email]       NVARCHAR (255) NULL,
    [PhoneNumber] NVARCHAR (20)  NULL,
    [Status]      BIT            NULL,
    [FullName]    NVARCHAR (255) NULL,
    [CreatedBy]   NVARCHAR (255) NULL,
    [CreatedOn]   DATETIME       NULL,
    [UpdateBy]    NVARCHAR (255) NULL,
    [UpdatedOn]   DATETIME       NULL,
    CONSTRAINT [PK_Contact] PRIMARY KEY CLUSTERED ([ContactId] ASC)
);

