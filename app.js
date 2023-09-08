import fs from "fs";
import fetch from "node-fetch";

export const textToImage = async () => {
  const path =
    "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image";

  const headers = {
    Accept: "application/json",
    Authorization: "Bearer sk-A5xCeuoDXexzoPGIO7BI7Tndam51hfl5QFWkByJCqGdUkNFL",
    "Content-type": "application/json",
  };

  const body = {
    steps: 40,
    width: 1024,
    height: 1024,
    seed: 0,
    cfg_scale: 5,
    samples: 1,
    text_prompts: [
      {
        text: "Generate an image of Australian Prime Minister Albanese shaking hands with the Chinese President during his visit, with trade agreements and fisheries represented in the background",
        weight: 1,
      },
    ],
  };

  const response = fetch(path, {
    headers,
    method: "POST",
    body: JSON.stringify(body),
  });

  const res = await response;

  const responseJSON = await res.json();
  console.log(responseJSON);

  responseJSON.artifacts.forEach((image, index) => {
    fs.writeFileSync(
      `./out/txt2img_${image.seed}.png`,
      Buffer.from(image.base64, "base64")
    );
  });
};

textToImage();
