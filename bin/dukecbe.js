import { copy } from "fs-extra";
import { createInterface } from "readline";
import editJsonFile from "edit-json-file";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("What is the extention name? ", async function (answer) {
    
  rl.question("Enter a description ", async function (Description) {
    const src = "../tmp/";
    const dest = `../${answer}/`;
    const ff = `../${answer}/firefox/manifest.json`;
    const chrome = `../${answer}/chrome/manifest.json`;
    // With promises
    copy(src, dest)
      .then(() => {
        editManifest(ff, chrome, answer, Description);
        console.log("Done");
      })
      .catch((err) => {
        console.error(err);
      });
      rl.close();
  });
});

const editManifest = (path, path2, name, description) => {
  let file = editJsonFile(path);
  file.set("name", name);
  file.set("description", description);
  file.save();
  let file2 = editJsonFile(path2);
  file2.set("name", name);
  file2.set("description", description);
  file2.save();
};
