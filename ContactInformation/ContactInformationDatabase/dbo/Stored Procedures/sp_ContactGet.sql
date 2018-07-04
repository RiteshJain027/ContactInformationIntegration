
/*================================================================================================================
Author		:	Ritesh Jain
Create Date	:	01 July 2018
Description	:	
Execution	:	EXEC [dbo].[sp_ContactGet]
Notes		:	

Date					Name					Description
-----------------------------------------------------------------------------------------------------------------
01 July 2018 			Ritesh Jain				Created Stored Procedure.
================================================================================================================*/
CREATE PROCEDURE [dbo].[sp_ContactGet] 
    @ContactId int = NULL
AS 	

	SELECT	ContactId,
			FirstName,
			LastName,
			Email,
			PhoneNumber,
			[Status],
			[FullName]
	FROM   [dbo].[Contact] 
	WHERE  ([ContactId] = @ContactId OR @ContactId IS NULL)