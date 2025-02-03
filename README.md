# Income and Expense Calculator

This is a simple web application that tracks and calculates income and expenses. It allows users to input income or expense data, categorize the entry, and view a running total of all incomes, expenses, and net balance. The data is managed through a mock API.

## Features

- Add income and expenses, along with their respective categories.
- View real-time calculations of total income, expenses, and the remaining balance.
- Filter data based on categories like "Income," "Essential Expense," and "Non Essential Expense."
- Edit and delete individual records.
- Data stored and retrieved from a mock API for testing.

## Technologies Used

- HTML
- CSS (Tailwind CSS for styling)
- JavaScript
- Fetch API for handling requests to a mock server

## How to Use

1. **Homepage**:
   - Displays the total income, expenses, and remaining balance.

2. **Add Data**:
   - Enter an income or expense name.
   - Specify the amount.
   - Select the type of entry (`Income`, `Essential Expense`, or `Non Essential Expense`).
   - Click the "Add Row" button to add the data.

3. **View Data**:
   - The data is displayed in a table format with the ability to filter entries.
   - Filter options include viewing all entries or filtering by a specific type (income or expenses).

4. **Edit Data**:
   - Click the pencil icon next to an entry to edit the name, amount, and type.
   - Click the check icon to save the changes.

5. **Delete Data**:
   - Click the trash icon next to an entry to delete it.

## API

The app uses a mock API endpoint provided by `https://66d719d9006bfbe2e64fd766.mockapi.io/incomeexpence` for storing, updating, and deleting income and expense data.

### Endpoints:

- `GET`: Fetch all income and expense records.
- `POST`: Add a new income or expense record.
- `PUT`: Update an existing income or expense record.
- `DELETE`: Delete an income or expense record.

## Code Overview

- **`fetchdisplay()`**: Fetches the income/expense data from the API and displays it in a table. Filters the data based on the selected category. Handles the rendering of data, including edit and delete functionality.
- **`updateTotals()`**: Calculates and updates the totals for income, expenses, and the overall balance.
- **`postData()`**: Handles form submission to add new income/expense records to the API.
- **Radio buttons**: Allow filtering of income/expense data by category.
- **Buttons**:
  - **Trash icon**: Deletes an entry.
  - **Pencil icon**: Enables editing of an entry.

