import { FileUpload } from 'graphql-upload-minimal';
const { createClient } = require('webdav');

const client = createClient(
  'https://tou.uat.godital.com/remote.php/dav/files/admin/',
  {
    username: 'admin',
    password: 'Godital@168',
  },
);

export const nextCloudSingleUploadMutation = async (
  _: any,
  { file }: { file: FileUpload },
): Promise<boolean> => {
  try {
    const { createReadStream, filename, mimetype } = await file;

    // Check if the file already exists
    const exists = await client.exists(filename);
    if (exists) {
      throw new Error(`A file with the name "${filename}" already exists.`);
    }

    // Upload the file
    await client.putFileContents(filename, createReadStream(), {
      headers: { 'Content-Type': mimetype },
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
