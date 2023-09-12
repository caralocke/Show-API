const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

const router = express.Router();
const lawandorderPath = path.join(__dirname, '../data/lawandorder.json');

const getData = async (req, res, next) => {
  try {
    const data = fs.readFileSync(lawandorderPath)
    const lawandorderData = JSON.parse(data)
    if (!lawandorderData) {
      const err = new Error('No data found');
      err.status = 404;
      throw err;
    }
    res.json(lawandorderData)
  } catch (e) {
    next(e)
  }
}

router.route('/lawandorder').get(getData)

module.exports = router;