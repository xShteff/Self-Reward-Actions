const axios = require("axios");

const GitHubSettings = {
  NEUTRAL_ERROR_CODE: process.env.GITHUB_WORKFLOW ? 78 : 0,
  actor: process.env.GITHUB_ACTOR || "",
  eventPath: process.env.GITHUB_EVENT_PATH || "",
  event: GitHubSettings.eventPath ? require(GitHubSettings.eventPath) : "",
  repo: process.env.GITHUB_REPOSITORY || "",
  repoUri: `https://api.github.com/repos/${GitHubSettings.repo}`,
  prCommentsUri: `${GitHubSettings.repoUri}/issues/${GitHubSettings.eventPath.number}/comments`,
  apiVersion: 'v3',
  token: process.env.GITHUB_TOKEN || "",
  acceptHeader: `application/vnd.github.${GitHubSettings.apiVersion}+json; application/vnd.github.antiope-preview+json`,
  authHeader: `token ${GitHubSettings.token}`,
  apiHeaders: {
    Accept: GitHubSettings.acceptHeader,
    Authorization: GitHubSettings.authHeader 
  },
  imageUrl: process.env.IMAGE_URL || "https://i.imgur.com/EQdmJcS.jpg",
  memeHeader: process.env.MEME_HEADER || `When @${GitHubSettings.actor} merges his own Pull Request`
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
  process.exit(NEUTRAL_ERROR_CODE);
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
