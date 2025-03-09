import { CombinedAction } from "../../types/types";
import { abclPlayer } from "../player/player";

export const toPee: CombinedAction = {
  activity: {
    ID: "pee",
    Name: "Pee",
    Image: `${publicURL}/activity/wetDiaper.svg`,
    OnClick: (player: Character, group: AssetGroupItemName) => {
      abclPlayer.wet();
    },
    TargetSelf: ["ItemPelvis"],
  },
  command: {
    Tag: "pee",
    Description: ` Lets go of your bladder.`,
    Action: (args, msg, parsed) => {
      abclPlayer.wet();
    },
  },
};
