## requirements

- `reports` directory inside project's root

## Usage

- `npm install`
- `npm run build`
- `npm run start -- [options]`

Options:

| Flag           | Description                      | Type     | Required | Default            |
| -------------- | -------------------------------- | -------- | -------- | ------------------ |
| -m, --month    | Set month [1-indexed]            | [number] |          | [default: current] |
| -y, --year     | Set year                         | [number] |          | [default: current] |
| -f, --furlough | Set furlough days count          | [number] |          | [default: 0]       |
| -o, --output   | Set report output format         | [string] |          | [default: xlsx]    |
| -p, --file     | Use exported json as data source | [string] |          |                    |

### Options values

Available output values:

- xlsx (default)
- console


### JSON as input
To get all activities from WakaTime as JSON file:

- WakaTime Dashboard -> Account Settings -> Export