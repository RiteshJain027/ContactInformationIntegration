/*================================================================================================================
Author		:	Ritesh Jain
Create Date	:	01 July 2018
Description	:	
Execution	:	EXEC [dbo].[sp_ContactDelete] 1
Notes		:	

Date					Name					Description
-----------------------------------------------------------------------------------------------------------------
01 July 2018 			Ritesh Jain				Created Stored Procedure.
================================================================================================================*/
CREATE PROCEDURE [dbo].[sp_ContactDelete]
    @ContactId		INT
AS 
BEGIN
	DECLARE @ErrorMessage NVARCHAR(255), 
			@ErrorSPName NVARCHAR(255) , 
			@ErrorCode INT, 
			@StatusCode INT, 
			@Status NVARCHAR(255);
	BEGIN TRANSACTION

	BEGIN TRY
		
		DELETE
		FROM   [dbo].[Contact]
		WHERE  ContactId = @ContactId

		COMMIT TRANSACTION
		SET @Status = 'SUCCESS';
		SET @StatusCode = 0;

		SELECT @StatusCode AS StatusCode, @Status AS [Status]
	END TRY
	BEGIN CATCH

		IF @@TRANCOUNT > 0
		BEGIN
			ROLLBACK TRANSACTION;
		END
		SET @Status = 'FAIL';
		SET @StatusCode = 1;
		SET @ErrorMessage = ERROR_MESSAGE();
		SET @ErrorSPName = ERROR_PROCEDURE();
		SET @ErrorCode = ERROR_NUMBER();
		
		SELECT	@StatusCode AS StatusCode, 
				@Status AS Status, 
				@ErrorMessage AS [ErrorMessage];
	END CATCH
END