import Favorite from '../models/Favourite.js';

// @desc Get all favorite cities
const getFavorites = async (req, res, next) => {
  try {
    const favorites = await Favorite.find();
    res.json(favorites);
  } catch (err) {
    next(err);
  }
};

// @desc Add a favorite city
const addFavorite = async (req, res, next) => {
  try {
    const { name } = req.body;
    const newCity = await Favorite.create({ name });
    res.status(201).json(newCity);
  } catch (err) {
    next(err);
  }
};

// @desc Remove a favorite city
const removeFavorite = async (req, res, next) => {
  try {
    await Favorite.findByIdAndDelete(req.params.id);
    res.json({ message: 'Favorite removed' });
  } catch (err) {
    next(err);
  }
};


export { getFavorites, addFavorite, removeFavorite };