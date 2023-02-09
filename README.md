## requirements
- `reports` directory inside project's root

## Usage
- `npm run start` generate report for current month
- `npm run start -- -m X` generate report for selected month (current year), where `X` is 1-indexed number of month
- `npm run start -- -y XXXX` generate report for selected year (current month), where `XXXX` is full year
- `npm run start -- -m X -y XXXX` generate report for selected month and year, where `X` is 1-indexed number of month and `XXXX` is full year