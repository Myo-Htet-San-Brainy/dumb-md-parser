const exampleMd =
  "# header\n# header**bold****bold\n**bold****bold**\n**bold**";
main(exampleMd);
export function main(markdown) {
  //   console.log(markdown);
  if (!markdown || markdown === "\n") return;

  const blocks = markdown.split("\n");
  //labelling blocks
  const labelledBlocks = blocks.map((block) => {
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
  //bold parsing labelled blocks
  const boldParsedBlocks = labelledBlocks.map((block) => {
    const contentStr = block.content[0];
    const boldParsed = ParseBold(contentStr);
    return {
      ...block,
      content: boldParsed,
    };
  });
  console.log(boldParsedBlocks);
  return boldParsedBlocks;
}

function ParseBold(str) {
  const regex = /(\*\*|__)(.*?)\1/g;
  const boldTokens = [];
  let modifiedText = str;
  let match;
  while ((match = regex.exec(str)) !== null) {
    modifiedText = modifiedText.replace(match[0], "_b_");
    boldTokens.push({
      type: "bold",
      content: [match[2]],
    });
  }

  const final = modifiedText.split("_").map((item) => {
    if (item === "b") {
      return boldTokens.shift();
    }
    return item;
  });
  return final;
}
