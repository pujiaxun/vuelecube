import Datastore from 'nedb-promise';

import path from 'path';

/* eslint-disable import/no-extraneous-dependencies */
import { remote } from 'electron';

export default new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/data.db'),
});
