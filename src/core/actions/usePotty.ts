import { CombinedAction } from "../../types/types";
import { abclPlayer } from "../player/player";
import { SendAction } from "../player/playerUtils";

const usePottyFunction = () => {
  const isGood = abclPlayer.stats.BladderFullness > 0.6 || abclPlayer.stats.BowelFullness > 0.6;
  const isTooEarly = abclPlayer.stats.BladderFullness < 0.3 && abclPlayer.stats.BowelFullness < 0.3;
  const isTooFarGone = abclPlayer.stats.MentalRegression > 0.9;
  const isEmbarrassed = abclPlayer.stats.MentalRegression < 0.3;
  if (isTooEarly) {
    SendAction("%NAME% tries to use the potty but can't seem to get anything out.", undefined, "usePotty");
    return;
  }
  abclPlayer.stats.BowelFullness = 0;
  abclPlayer.stats.BladderFullness = 0;
  let additionalText = "";
  if (isEmbarrassed) {
    additionalText = "and feels embarrased";
    abclPlayer.stats.MentalRegression += 0.04;
  }
  if (isGood && !isTooFarGone) {
    additionalText += isEmbarrassed ? " but is releaved" : "and feels releaved";

    abclPlayer.stats.Incontinence -= 0.02;
    abclPlayer.stats.MentalRegression -= 0.02;
  }
  SendAction("%NAME% sits down uses the potty " + additionalText + ".", undefined, "usePotty");
};

export const usePotty: CombinedAction = {
  activity: {
    ID: "potty",
    Name: "Sit and Use Potty",
    Image: `${publicURL}/activity/potty-temp.png`,
    OnClick: (player: Character) => usePottyFunction(),
    TargetSelf: ["ItemButt"],
  },
  command: {
    Tag: "use-potty",
    Action: (args, msg, parsed) => usePottyFunction(),
    Description: ` Sit down and use the potty.`,
  },
};
