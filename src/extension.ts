import * as vscode from "vscode";

import { GitExtension, Repository } from "./api/git";

import FireEmoji from "./ssw/fireEmoji";
import Gitmoji from "./gitmoji/gitmoji";

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand(
        "extension.Gitmoji",
        (uri?) => {
            const git = getGitExtension();

            if (!git) {
                vscode.window.showErrorMessage("Unable to load Git Extension");
                return;
            }

            if (uri) {
                let selectedRepository = git.repositories.find((repository) => {
                    return repository.rootUri.path === uri._rootUri.path;
                });
                if (selectedRepository) {
                    prefixCommit(selectedRepository);
                }
            } else {
                for (let repo of git.repositories) {
                    prefixCommit(repo);
                }
            }
        }
    );

    context.subscriptions.push(disposable);
}

function getEnvLanguage() {
    const language = vscode.env.language;
    return language;
}

async function prefixCommit(repository: Repository) {
    const emoji = await (await FireEmoji(repository.inputBox.value)).trim();
    repository.inputBox.value = `${emoji} ${repository.inputBox.value}`;
}
function getGitExtension() {
    const vscodeGit =
        vscode.extensions.getExtension<GitExtension>("vscode.git");
    const gitExtension = vscodeGit && vscodeGit.exports;
    return gitExtension && gitExtension.getAPI(1);
}

export function deactivate() {}
