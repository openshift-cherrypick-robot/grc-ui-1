/* Copyright (c) 2021 Red Hat, Inc. */

const acmVersionClient = require('../lib/server/acmVersion')

module.exports.version = (req, res) => {
  acmVersionClient.getACMVersion(req, (err, response) => {
    if(err) {
      return res.status(500).send(err)
    }
    res.status(200).json({ version: response.status.currentVersion })
  })
}
