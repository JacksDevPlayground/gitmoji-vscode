import * as cp from "child_process";

import { stderr } from "process";

export default async function predict(commit: string) {
  __dirname;
  return new Promise<string>((c, e)=> {
    cp.exec('dir');
    cp.exec(
      `${__dirname}\\..\\..\\dlls\\SSW.FireEmoji.Console.exe ${commit}`,
      (stderr, stdout) => {
        if (stderr) {
          return e(stderr);
        }

        return c(stdout);
      }
    );
  });
}

interface Emoji {
  Emoji: string;
  Score: number;
}
