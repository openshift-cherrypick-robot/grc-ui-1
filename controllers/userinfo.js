/* Copyright (c) 2021 Red Hat, Inc. */

const userInfoClient = require('../lib/server/userInfo')

module.exports.userInfo = (req, res) => {
    let token
    if (req.headers.authorization || req.headers.Authorization) {
      token = req.headers.authorization ? req.headers.authorization : req.headers.Authorization
      const words = token.trim().split(/[\s,]+/)
      if (!(words[0].toLowerCase().match('bearer'))) {
        return res.status(403).send('No bearer in value')
      }
      if (words[1] && words[1].length > 1) {
        [, token] = words
      }
    } else if (req.cookies['acm-access-token-cookie']) {
      token = `${req.cookies['acm-access-token-cookie']}`
    }

    if (!token) {
      return res.status(401).send('The request is unauthorized, no token provided.')
    }

    userInfoClient.getUserInfo(req, token, (err, response, body) => {
        if (err) {
            console.log('--- ERROR ----')
            console.log(err)
            return res.status(500).send(err.details)
        } if (body && body.status && body.status.error) {
            return res.status(401).send(body.status.error)
        } if (body && body.status && body.status.user) {
            const name = body.status.user.username ? body.status.user.username : ''
            return res.status(200).json({ username: name })
        }
        return res.status(401).send('The token provided is not valid')
    })
}
