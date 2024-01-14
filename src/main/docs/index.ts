import paths from "./paths";
import schemas from "./schemas";
import components from "./components";

export default {
  openapi: '3.0.0',
  info: {
    title: 'NODE Boilerplate',
    description: 'Api de Boilerplate',
    version: '1.0.0'
  },
  license: {
    name: 'GPL-3.0-or-later',
    url: 'https://spdx.org/licenses/GPL-3.0-or-later.html'
  },
  servers: [
    { url: '/api' }
  ],
  tags: [{ name: 'Authentication' }, {name: 'User'}],
  paths,
  schemas,
  components
}
