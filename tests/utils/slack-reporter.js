/** *****************************************************************************
 * Licensed Materials - Property of Red Hat, Inc.
 * Copyright (c) 2020 Red Hat, Inc.
 ****************************************************************************** */
/* Copyright Contributors to the Open Cluster Management project */


/* eslint-disable no-console */
const fs = require('fs')
const path = require('path')
const { WebClient } = require('@slack/web-api')
const { SLACK_TOKEN, SLACK_CHANNEL_NAME='#grc-pr-github-status', /*USER,*/ TRAVIS_BUILD_WEB_URL, TRAVIS_PULL_REQUEST, TRAVIS_REPO_SLUG, TRAVIS_BRANCH } = process.env

const web = new WebClient(SLACK_TOKEN)

async function reportFailure() {
  if (!process.env.SLACK_TOKEN) {
    return console.error('Missing SLACK_TOKEN environment variable; skipping slack reporting...')
  }

  try {
    const userId = SLACK_CHANNEL_NAME
    const screenshotDir = path.join(process.cwd(), 'test-output', 'e2e', 'screenshots')
    if (fs.existsSync(screenshotDir)) {
      const screenshots = recFindByExt(screenshotDir, 'png')
      screenshots.forEach(screenshot => {
        const pathArray = screenshot.split('/')
        const filename = pathArray[pathArray.length-1]
        const searchIndex = filename.indexOf('_')
        const testName = filename.slice(0, searchIndex).replace(/-/g, ' ')
        postScreenshot(filename, screenshot, buildComment(testName), userId)
      })
    } else {
      console.log('No nightwatch failure screenshots exist.')
    }
    const cypressDir = path.join(process.cwd(), 'test-output', 'cypress')
    const cypressScreenshotsDir = path.join(cypressDir, 'screenshots')
    const cypressVideosDir = path.join(cypressDir, 'videos')
    if (fs.existsSync(cypressScreenshotsDir)) {
      // screenshot dir exists means there are test failures
      // upload only videos with failures
      const failureTestNames = getDirectories(cypressScreenshotsDir)
      failureTestNames.forEach(testName => {
        const filename = path.join(cypressVideosDir, testName + '.mp4')
        console.log('Uploading video ' + filename)
        postScreenshot(filename, filename, buildComment(testName), userId)
        // upload screenshot for the test as well
        const screenshots = recFindByExt(path.join(cypressScreenshotsDir, testName), 'png')
        screenshots.forEach(screenshot => {
          console.log('Uploading screenshot ' + screenshot)
          const pathArray = screenshot.split('/')
          const filename = pathArray[pathArray.length-2]+'/'+pathArray[pathArray.length-1]
          postScreenshot(screenshot, screenshot, buildComment(filename), userId)
        })
      })
    } else {
      console.log('No cypress failure screenshots/videos exist.')
    }
  } catch(e) {
    console.error(e)
  }
}

function getDirectories(source) {
  return fs.readdirSync(source, { withFileTypes: true })
          .filter(dirent => dirent.isDirectory())
          .map(dirent => dirent.name)
}

function recFindByExt(base,ext,files,result) {
  files = files || fs.readdirSync(base)
  result = result || []

  files.forEach(
    (file) => {
      var newbase = path.join(base,file)
      if ( fs.statSync(newbase).isDirectory() )
      {
        result = recFindByExt(newbase,ext,fs.readdirSync(newbase),result)
      }
      else
      {
        if ( file.substr(-1*(ext.length+1)) == '.' + ext )
        {
          result.push(newbase)
        }
      }
    }
  )
  return result
}

function buildComment(testName) {
  return `:failed: *FAILED: ${TRAVIS_REPO_SLUG} -- ${TRAVIS_PULL_REQUEST == 'false' ? 'Branch: '+TRAVIS_BRANCH : 'PR: '+TRAVIS_PULL_REQUEST} -- ${testName}.* \n ${TRAVIS_BUILD_WEB_URL}`
}

// async function mapSlackUserByGitEmail() {
//   try {
//     const userProfile = await web.users.lookupByEmail({ email: USER })
//     return userProfile.user.id
//   } catch (e) {
//     console.log('Failed to map user\'s git e-mail to Slack')
//   }
// }

async function postScreenshot(fileName, filePath, comment, userId) {
  await web.files.upload({
    channels: userId,
    filename: fileName,
    file: fs.createReadStream(filePath),
    initial_comment: comment
  })
}

reportFailure()
