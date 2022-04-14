import cislio from '@cisl/io';
import '@cisl/io-display';

import fetch from 'node-fetch';

const io = cislio();

const wait = (milliseconds: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds)
  })
}

(async () => {
  const displayContext = await io.display.create('main', {
    main: {
      contentGrid: {
        row: 2,
        col: 2
      },
    },
  });

  const webview = await displayContext.displayUrl('main', 'http://localhost:4200', {
    position: {
      gridLeft: 1,
      gridTop: 1,
    },
    widthFactor: 2,
    heightFactor: 2,
  });

  await wait(3000);

  const req = await fetch('http://localhost:4200', {
    method: 'POST',
    body: JSON.stringify({ foo: true }),
  });
  const res = await req.text();

  await wait(1000);

  webview.setBounds({
    heightFactor: 1,
    widthFactor: 1,
  });

  await wait(1000);

  webview.setBounds({
    gridLeft: 2,
    gridTop: 2,
  });

  await wait(5000);

  displayContext.close();
})();
