const md = "# **bold**";
const blocks = md.split("\n");
const labeledBlocks = blocks.map((block) => {
  if (block.startsWith("#") && block[1] === " " && block[2]) {
    return {
      type: "heading1",
      content: [block.substring(2)],
    };
  }
  return {
    type: "block",
    content: [block],
  };
});
const newNewBlocks = labeledBlocks.map((block) => {
  const splittedBlock = block.content[0];
});
const result = findBoldMatches("**bold1****bold2**");
console.log(result);

function findBoldMatches(mdText) {
  const regex = /(\*\*|__)(.*?)\1/g; // Initialize the regex
  const boldTokens = []; // An array to store the matches with their start and end indices
  // Variable to hold each match result

  // Use the exec() method to find all matches
  let modifiedText = mdText;
  let match;
  while ((match = regex.exec(mdText)) !== null) {
    modifiedText = modifiedText.replace(match[0], "_b_");
    boldTokens.push({
      type: "bold",
      content: match[2],
    });
  }

  return { modifiedText, boldTokens }; // Return the array of matches
}

// result.boldTokens.forEach((token) => {

// });

// result.modifiedText.split("_");

// console.log("hello".substring(1, 2));

// console.log("hello_hello".replace("hello", "hi"));

const final = result.modifiedText.split("_").map((item) => {
  if (item === "b") {
    return result.boldTokens.shift();
  }
  return item;
});

console.log(final);
