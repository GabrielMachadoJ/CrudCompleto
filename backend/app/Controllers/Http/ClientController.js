'use strict'

const Client = use('App/Models/Client')

class ClientController {

  async store({ request }) {

    const dataToCreate = request.only(['name', 'city', 'uf', 'birthday']);

    return await Client.create(dataToCreate);
  }

  async getAllClients() {
    return await Client.all();
  }

  async getOneClient({ params }) {
    return await Client.find(params.id);
  }

  async update({ params, request }) {

    const client = await Client.findOrFail(params.id);

    const dataToUpdate = request.only(['name', 'city', 'uf', 'birthday']);

    client.merge(dataToUpdate);

    await client.save();

    return client;
  }

  async delete({ params }) {

    const client = await Client.findOrFail(params.id);

    await client.delete();
  }

}

module.exports = ClientController
