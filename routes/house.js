const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

const router = express.Router();
const housePath = path.join(__dirname, '../data/house.json');

const getData = async (req, res, next) => {
  try {
    const data = fs.readFileSync(housePath)
    const houseData = JSON.parse(data)
    if (!houseData) {
      const err = new Error('No data found');
      err.status = 404;
      throw err;
    }
    res.json(houseData)
  } catch (e) {
    next(e)
  }
}

router.route('/house').get(getData)

module.exports = router;