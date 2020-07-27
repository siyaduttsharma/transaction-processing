# Transaction Processing Application

Built using: node.js, express, mongoDB, mongoose 

# NOTE
* NODE_ENV = environment variable
* DATABASE = the database containing the transactions

**Starting main file is : server.js**

# Starting the project

* The file import-dev-data.js imports or deletes the database.

  * Command to import data from the .json file to the database- 
       ```
       node import-dev-data.js --import
       ```

  * Command to delete data from the database-
       ```
       node import-dev-data.js --delete
       ```
       
 # API Testing
 **Transaction Features:**
  **Contains all the requests to create, read, update and delete a transaction.**
  
  * **Get all Transactions** 
       * Gets all the transactions in the database.
       * URL - /api/transactions
 
  * **Get one Transaction**
       * Gets a single transaction specified by the user.
       * URL - /api/transactions/:transactionID
  
  * **Post a Transaction**
       * Creates a new transaction.
       * URL - /api/transactions
         * Body--
      
         ```
              {
                "transactionId": 987,
                "sourceAccount": 11032646296092,
                "targetAccount": 13714581347891,
                "amount": 100000,
                "category": "eating_out",
                "time": "2018-03-01T12:20:00.000Z"
              }
         ```
      
 
 * **Patch a Transaction** 
      * Updates a specific transaction which is specified by the user.
      * URL - /api/transactions/:transactionID
         * Body-- 
        ```
              {
                
                "sourceAccount": 1103264629645552,
              }
        ```
 
 * **Delete a Transaction** 
      * Deletes a single transaction which is specified by the user.
      * URL - /api/transactions/:transactionID 
  
 * **Get Transcation Statistics**
      * Reviews transcations and gives the transaction statistics grouped by transaction category.
      * URL - /api/transactions/transaction-stats
    
 * **Get Debit Report**
      * Gets all the debit transactions grouped by transaction category.
      * URL - /api/transactions/debits
  
 * **Get Credit Report**
      * Gets all the credit transactions grouped by transaction category.
      * URL - /api/transactions/credits
      
 
  **Balance Report Features:**
  **Conatins all the requests to view daily, monthly, weekly and yearly balance reports.**
  
   * **View Daily Balance Report** 
      * Gives the balance report of a single day of a specific month and year.
      * URL - /api/dailyReport/:year/:month/:day 
  
  *  **View Weekly Balance Report**
      * Gives the balance report of a week.
      * URL - /api/transactions/weeklyReport/:year/:month/:day 
    
 * **View Monthly Balance Report**
      * Gives the balance report of a single month of a specific year.
      * URL - /api/transactions/monthlyReport/:year/:month
  
 * **View Yearly Balance Report**
      * Gives the yearly balance report to the user.
      * URL - /api/transactions/yearlyReport/:year
  
  
  
