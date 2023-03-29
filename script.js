/**
 * GitHub API wrapper.
 * 
 * @see https://docs.github.com/en/rest/reference/issues
 */
class GitHub {
	/**
	 * Create a new GitHub instance.
	 * 
	 * @param {string} accessToken
	 * @param {string} repo
	 * @constructor
	 */
	constructor(accessToken, repo) {
		this.accessToken = accessToken;
		this.repo = repo;
	}

	/**
	 * Create a new issue.
	 * 
	 * @param {string} title
	 * @param {string} description
	 * @returns {{id: number, url: string}}
	 * @see https://docs.github.com/en/rest/reference/issues#create-an-issue
	 */
	createIssue(title, description) {
		const url = `https://api.github.com/repos/${this.repo}/issues`;
		const options = {
			method: 'post',
			headers: {
				'Authorization': `Bearer ${this.accessToken}`,
				'Accept': 'application/vnd.github+json'
			},
			payload: JSON.stringify({
				title: title,
				body: description
			}),
			contentType: 'application/json'
		};

		const response = UrlFetchApp.fetch(url, options);
		const json = JSON.parse(response.getContentText());

		return {
			id: json.number,
			url: json.html_url
		};
	}

	/**
	 * Update an existing issue.
	 * 
	 * @param {number} issueId
	 * @param {string} title
	 * @param {string} description
	 * @see https://docs.github.com/en/rest/reference/issues#update-an-issue
	 */
	updateIssue(issueId, title, description) {
		const url = `https://api.github.com/repos/${this.repo}/issues/${issueId}`;
		const options = {
			method: 'patch',
			headers: {
				'Authorization': `Bearer ${this.accessToken}`,
				'Accept': 'application/vnd.github+json'
			},
			payload: JSON.stringify({
				title: title,
				body: description
			}),
			contentType: 'application/json'
		};

		UrlFetchApp.fetch(url, options);
	}
}

/**
 * Google Sheet wrapper.
 */
class GoogleSheet {
	constructor(spreadsheetId, sheetName) {
		this.spreadsheet = SpreadsheetApp.openById(spreadsheetId);
		this.sheet = this.spreadsheet.getSheetByName(sheetName);
	}

	getData() {
		return this.sheet.getDataRange().getValues();
	}

	updateCell(row, col, value) {
		this.sheet.getRange(row, col).setValue(value);
	}
}

function createOrUpdateIssues() {
	const accessToken = '<YOUR_GITHUB_ACCESS_TOKEN>';
	const repo = 'your/repo';
	const github = new GitHub(accessToken, repo);

	const spreadsheetId = '<YOUR_SPREADSHEET_ID>';
	const sheetName = '<YOUR_SHEET_NAME>';
	const sheet = new GoogleSheet(spreadsheetId, sheetName);

	const data = sheet.getData();

	for (let i = 1; i < data.length; i++) {
		const row = data[i];
		const title = row[0];
		const description = row[1];
		const issueId = row[2];

		if (issueId) {
			github.updateIssue(issueId, title, description);
		} else {
			const newIssue = github.createIssue(title, description);
			sheet.updateCell(i + 1, 3, newIssue.id);
		}
	}
}
