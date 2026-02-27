require('dotenv').config();
const axios = require('axios');

const github = axios.create({
  baseURL: 'https://api.github.com', // O "URL" deve ser MAIÚSCULO
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: 'application/vnd.github+json'
  }
});

module.exports = github;