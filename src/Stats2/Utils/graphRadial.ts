import { timerType } from "../../Common/Types/Types";
import { dicType, dataType } from "./graph";

export const getTagPieData = async (timerRecords: timerType[]) => {
  const tagStat: dicType = {};

  timerRecords.forEach((timerRecord) => {
    const tags = timerRecord.tags;
    if (tags && tags.length > 0) {
      tags.forEach((tag) => {
        if (tagStat[tag]) {
          tagStat[tag] += timerRecord.duration / tags.length;
        } else {
          tagStat[tag] = timerRecord.duration / tags.length;
        }
      });
    } else {
      if (tagStat["Unset"]) {
        tagStat["Unset"] += timerRecord.duration;
      } else {
        tagStat["Unset"] = timerRecord.duration;
      }
    }
  });

  const data = [];
  for (const entry in tagStat) {
    data.push({
      label: entry,
      time: tagStat[entry],
    } as dataType);
  }

  return data;
};

export const getStickerPieData = async (timerRecords: timerType[]) => {
  const stickerStat: dicType = {};

  timerRecords.forEach((timerRecord) => {
    let sticker = timerRecord.sticker;
    if (!sticker || sticker === "") {
      sticker = "Unset";
    }
    if (stickerStat[sticker]) {
      stickerStat[sticker] += timerRecord.duration;
    } else {
      stickerStat[sticker] = timerRecord.duration;
    }
  });

  const data = [];
  for (const entry in stickerStat) {
    data.push({
      label: entry,
      time: stickerStat[entry],
    } as dataType);
  }

  return data;
};
