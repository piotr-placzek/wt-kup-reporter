import { openSync, writeFileSync } from 'fs-extra';
import { getCurrentDateString, getCurrentTimestamp } from './utils';

function tableHeader(delimiter) {
  return ['DATE', 'TIME', 'TASKS'].join(delimiter) + '\n';
}

function row(daily_summaries, delimiter) {
  return (
    [
      daily_summaries.date,
      daily_summaries.data.reduce((a, c) => a + parseFloat(c.time), 0),
      daily_summaries.data.reduce((a, c) => (c.branch !== 'Unknown' ? a.concat(c.branch) : a), []).join(', '),
    ].join(delimiter) + '\n'
  );
}

function filePath(target_directory_path) {
  return `${target_directory_path}/${getCurrentTimestamp()}_${getCurrentDateString()}.csv`;
}

export function generate(target_directory_path, data, delimiter = ';;') {
  try {
    const file_path = filePath(target_directory_path);
    const file = openSync(file_path, 'w');
    writeFileSync(file, tableHeader(delimiter));

    data.forEach((daily_summaries) => {
      if (daily_summaries.data?.length) {
        writeFileSync(file, row(daily_summaries, delimiter));
      }
    });
  } catch (error) {
    console.error(error.message);
  }
}
