const axios = require("axios");

let GitHubSettings = {
  NEUTRAL_ERROR_CODE: process.env.GITHUB_WORKFLOW ? 78 : 0,
  actor: process.env.GITHUB_ACTOR || "",
  eventPath: process.env.GITHUB_EVENT_PATH || "",
  event: this.eventPath ? require(this.eventPath) : "",
  repo: process.env.GITHUB_REPOSITORY || "",
  repoUri: `https://api.github.com/repos/${this.repo}`,
  prCommentsUri: `${this.repoUri}/issues/${this.eventPath.number}/comments`,
  apiVersion: 'v3',
  token: process.env.GITHUB_TOKEN || "",
  acceptHeader: `application/vnd.github.${this.apiVersion}+json; application/vnd.github.antiope-preview+json`,
  authHeader: `token ${this.token}`,
  apiHeaders: {
    Accept: this.acceptHeader,
    Authorization: this.authHeader 
  },
  imageUrl: process.env.IMAGE_URL || "https://i.imgur.com/EQdmJcS.jpg",
  memeHeader: process.env.MEME_HEADER || `When @${this.actor} merges his own Pull Request`
}

/**
 * @return {Promise} Promise representing the HTTP POST of a comment.
 */
function postComment() {
  console.log("Posting image...");
  GitHubSettings.memeHeader = GitHubSettings.memeHeader.replace("<NAME>", `@${GitHubSettings.actor}`);
  return axios.post(
    GitHubSettings.prCommentsUri,
    { body: `# ${GitHubSettings.memeHeader} \n![pr_self_merge](${GitHubSettings.imageUrl})` },
    {
      headers: GitHubSettings.apiHeaders
    }
  );
}

if (
  !GitHubSettings.event ||
  (GitHubSettings.event.action !== "closed")
) {
  console.log(
    `GitHub event payload not found or Pull Request event does not have desired action. Action was ${GitHubSettings.event.action}.`
  );
  process.exit(GitHubSettings.NEUTRAL_ERROR_CODE);
}

postComment()
  .then(() => process.exit(0))
  .catch(error => {
    console.log(error);
    process.exit(1);
  });

setTimeout(() => {
  console.log("Reached maximum timeout.");
  process.exit(1);
}, 300000);
