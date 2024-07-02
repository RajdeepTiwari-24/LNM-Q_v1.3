import React from "react";
import Wordcloud from "@visx/wordcloud/lib/Wordcloud";
import { Text } from "@visx/text";
import { scaleLog } from "@visx/scale";
import { Separator } from "./ui/separator";

const WordCloud = ({ posts }) => {
  const words = wordFreq(posts);
  const colors = ["#EC63C4", "#73F2A3", "#8EEEFB"];

  function wordFreq(posts) {
    const freqMap = {};

    for (const post of posts) {
      const word = post.topic.replace(/\./g, "").split(/\s/);

      if (!freqMap[word]) freqMap[word] = 0;
      freqMap[word] += 1;
    }
    return Object.keys(freqMap).map((word) => ({
      text: word,
      value: freqMap[word],
    }));
  }

  const fontScale = scaleLog({
    domain: [
      Math.min(...words.map((w) => w.value)),
      Math.max(...words.map((w) => w.value)),
    ],
    range: [25, 75],
  });
  const fontSizeSetter = (data) => fontScale(data.value);

  return (
    <div className="grid grid-cols-1 space-y-2 p-12 rounded-md bg-[#1E1E1E]">
      <p className="text-left text-gray-200 text-2xl">Talks About:</p>
      <Separator orientation="horizontal" className="bg-gray-600" />
      <div className="grid grid-cols-1 justify-items-center">
        <Wordcloud
          words={words}
          width={300}
          height={400}
          fontSize={fontSizeSetter}
          font={"Impact"}
          padding={2}
          spiral={"archimedean"}
          rotate={0}
          random={() => 0.5}
        >
          {(cloudWords) =>
            cloudWords.map((w, i) => (
              <Text
                key={w.text}
                fill={colors[i % colors.length]}
                textAnchor={"middle"}
                transform={`translate(${w.x}, ${w.y}) rotate(${w.rotate})`}
                fontSize={w.size}
                fontFamily={w.font}
              >
                {w.text}
              </Text>
            ))
          }
        </Wordcloud>
      </div>
    </div>
  );
};

export default WordCloud;
