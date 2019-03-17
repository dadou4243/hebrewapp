(function () {
  'use strict';

  // External dependencies
  const lodash = require('lodash');

  // Internal dependencies
  // core
  const AuthCore = require('../core/auth.core');
  // dao
  const CollectionDAO = require('../dao/collection.dao');
  // service
  const ContextSvc = require('./context.service');
  const FavoriteSvc = require('./favorite.service');


  // Interface du service
  module.exports = {
    createCollection: createCollection,
    updateCollection: updateCollection,
    getCollection: getCollection,
    getAllCollections: getAllCollections,
    deleteCollection: deleteCollection
  };

  // Implémentation


  /**
   * @description Création d'un collection
   *
   * @param {string} collectionData - data du collection
   *
   * @return {Promise<object>} - Les data du collection
   */
  async function createCollection(collectionData) {

    console.log("collectionData", collectionData);

    if (!lodash.get(collectionData, 'name')) {
      throw new Error({
        error: ('Invalid parameters')
      });
    }


    // IMPORTANT NOTE
    // In here, if the user wants to create a collection but there already is an existing one with the same field name,
    // the collection is automatically updated to the new params
    const existingCollection = await checkExistingCollection(lodash.get(collectionData, 'name'));
    if (existingCollection) {
      return await updateCollection(collectionData);
    }

    return await CollectionDAO.createCollection(collectionData);

  }


  /**
   * @description Update d'un collection
   *
   * @param {string} collectionData - data du collection
   *
   * @return {Promise<object>} - Les data du collection
   */
  async function updateCollection(collectionData) {

    if (!lodash.get(collectionData, 'hebrew') || !lodash.get(collectionData, 'french')) {
      throw new Error({
        error: ('Invalid parameters')
      });
    }

    const existingCollection = await checkExistingHebrewCollection(lodash.get(collectionData, 'hebrew'));
    if (!existingCollection) {
      throw new Error({
        error: ('Invalid parameters')
      });
    }

    return await CollectionDAO.updateCollection(collectionData);

  }


  /**
   * @description Récupère les data d'un collection par son ID
   *
   * @param {string} uid - id du collection
   *
   * @return {Promise<object>} - Le collection
   */
  async function getCollection(collectionID) {

    return await CollectionDAO.getCollection(collectionID);

  }

  /**
   * @description Récupère les data de tous les collections
   *
   * @param {string} uid - id du collection
   *
   * @return {Promise<object>} - Les data de tous les collections
   */
  async function getAllCollections() {

    return await CollectionDAO.getAllCollections();

  }


  /**
   * @description Suppression d'un collection par son ID
   *
   * @param {string} uid - id du collection
   *
   * @return {Promise<object>} - Confirmation delete
   */
  async function deleteCollection(collectionID) {

    console.log('deleteCollection collectionID', collectionID);

    const collectionContexts = await ContextSvc.getAllContextsForCollection(collectionID);

    if (collectionContexts.length > 0) {
      console.log('WORD IS USED IN CONTEXTS');
      throw new Error('Not allowed, collection is used in Contexts');
    }

    await FavoriteSvc.deleteAllFavoritesWithCollection(collectionID);

    return await CollectionDAO.deleteCollection(collectionID);

  }




  /* private function */

  // Check si un mot contenant le champ name est déjà présent
  // Renvoie true or false
  async function checkExistingCollection(nameCollection) {
    const existingCollection = await CollectionDAO.checkExistingCollection(nameCollection);
    return !!existingCollection;

  }


})();