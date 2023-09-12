const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

const router = express.Router();
const suitsPath = path.join(__dirname, '../data/suits.json');

const getData = async (req, res, next) => {
  try {
    const data = fs.readFileSync(suitsPath)
    const suitsData = JSON.parse(data)
    if (!suitsData) {
      const err = new Error('No data found');
      err.status = 404;
      throw err;
    }
    res.json(suitsData)
  } catch (e) {
    next(e)
  }
}

router.route('/suits').get(getData)

const getPeople = async (req, res, next) => {
  try {
    const data = fs.readFileSync(suitsPath);
    const peopleData = JSON.parse(data);
    const people = peopleData[1].people;
    if (!people) {
      const err = new Error('No people found');
      err.status = 404;
      throw err;
    }
    res.json(people)
  } catch (e) {
    next (e)
  }
};

router.route('/suits/people').get(getPeople);

const getPerson = async (req, res, next) => {
  try {
    const data = fs.readFileSync(suitsPath);
    const peopleData = JSON.parse(data);
    const people = peopleData[1].people;
    const person = people.find(person => person.id === Number(req.params.id));

    if (!person) {
      const err = new Error('No person found');
      err.status = 404;
      throw err;
    }
    res.json(person);
  } catch (e) {
    next(e)
  }
};

router.route('/suits/people/:id').get(getPerson);

module.exports = router;