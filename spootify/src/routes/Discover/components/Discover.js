import React, { Component } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import { getCategories, getPlaylists, getNewReleases} from '../api-handler';
import '../styles/_discover.scss';



export default class Discover extends Component {

  constructor() {
    super();

    this.state = {
      newReleases: [],
      playlists: [],
      categories: []
    };
  }

  componentDidMount = async () => {
    //wait for each to return: This will help front end all populate at the same time.
    await this.getCategories('categories');
    await this.getPlaylists('playlists');
    await this.getNewReleases('newReleases')
  }

  /**********************************************************************************************
  * I would like to combine these next three functions somehow. There is alot of duplicate code here.
  *
  **********************************************************************************************/
  getCategories(stateName) {
    return new Promise(async promiseReturn => {
        this.setState({ [stateName]: await getCategories()}, promiseReturn);
    })
  }

  getPlaylists(stateName) {
    return new Promise(async promiseReturn => {
        this.setState({[stateName]: await getPlaylists()}, promiseReturn);
    })
  }

  getNewReleases(stateName) {
    return new Promise(async promiseReturn => {
        this.setState({[stateName]: await getNewReleases()}, promiseReturn);
    })
  }

  render() {
    const { newReleases, playlists, categories } = this.state;

    return (
      <div className="discover">
        <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} />
        <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />
        <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" />
      </div>
    );
  }
}
