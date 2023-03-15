export async function streamToBuffer(stream: any) {
  const convertStreamPromise = new Promise<Uint8Array[]>((resolve) => {
    const data: any[] | PromiseLike<Uint8Array[]> = [];

    stream.on('data', function (chunk: any) {
      data.push(chunk);
    });

    stream.on('end', function () {
      resolve(data);
    });
  });

  const data = await convertStreamPromise;
  const buffer = Buffer.concat(data);

  return buffer;
}
