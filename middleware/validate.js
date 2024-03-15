const validator = require('../helpers/validate');

const savePatient = (req, res, next) => {
  const validationRule = {
    firstName: ['required', 'regex:/^[A-Za-z]{2,}$'],
    lastName: ['required', 'regex:/^[A-Za-z]{3,}$'],
    diagnosis: ['required', 'regex:/^[A-Za-z ]{3,}$'],
    birthday: ['required', 'regex:/^[0-3]?[0-9]/[0-3]?[0-9]/(?:[0-9]{2})?[0-9]{2}$'],
    weightBearingStatus: ['required', 'regex:/^[A-Za-z ]{3,}$'],
    therapyOrderEndDate: ['required', 'regex:/^[0-3]?[0-9]/[0-3]?[0-9]/(?:[0-9]{2})?[0-9]{2}$'],
    lastVisit: ['required', 'regex:/^[0-3]?[0-9]/[0-3]?[0-9]/(?:[0-9]{2})?[0-9]{2}$'],
    nextVisit: ['required', 'regex:/^[0-3]?[0-9]/[0-3]?[0-9]/(?:[0-9]{2})?[0-9]{2}$'],
    therapyGoals: ['required', 'regex:/^[A-Za-z ]{3,}$'],
    assignedNurse: ['required', 'regex:/^[A-Za-z]{2,}$'],
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};


const saveUser = (req, res, next) => {
  const validationRule = {
    googleId: 'string',
    firstName: ['required', 'regex:/^[A-Za-z]{2,}$'],
    lastName: ['required', 'regex:/^[A-Za-z]{3,}$'],
    displayName: ['required', 'regex:/^[A-Za-z ]{5,}$'],
    image: 'string',
    createdAt: 'string',
    assignedJournals: []
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};


module.exports = {
  savePatient,
  saveUser
};
