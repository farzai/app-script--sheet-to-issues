# Google Sheets to GitHub Issues

A Google Apps Script library to create and update GitHub issues using data from a Google Sheet.

## Features

- Create new GitHub issues from Google Sheet rows
- Update existing GitHub issues using issue IDs stored in the Google Sheet

## Classes

- `GitHub`: A simple GitHub API wrapper for creating and updating issues
- `GoogleSheet`: A Google Sheet wrapper for fetching data and updating cells

## Usage

1. Create a new Google Apps Script project and paste the code from the provided JavaScript file.

2. Replace the following placeholders with your own values:

   - `<YOUR_GITHUB_ACCESS_TOKEN>`: Your GitHub personal access token. Learn how to create one [here](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
   - `your/repo`: The repository where you want to create or update issues (e.g., `username/repository`)
   - `<YOUR_SPREADSHEET_ID>`: The ID of the Google Sheet containing the data (found in the sheet's URL)
   - `<YOUR_SHEET_NAME>`: The name of the sheet within the Google Sheet containing the data

3. In the Google Sheet, create columns for "Title", "Description", and "Issue ID". Add your issue data to the sheet, and leave the "Issue ID" column empty for new issues.

4. Run the `createOrUpdateIssues()` function in the Google Apps Script editor. The script will create new issues for rows with an empty "Issue ID" column and update existing issues for rows with an "Issue ID" value.

## Notes

- The `createOrUpdateIssues()` function assumes the first row in the sheet contains headers and starts processing data from the second row.
- The code uses the GitHub REST API v3. For more information, visit the [GitHub REST API documentation](https://docs.github.com/en/rest/).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.