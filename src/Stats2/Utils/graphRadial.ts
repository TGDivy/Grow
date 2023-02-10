import { timerType } from "../../Common/Types/Types";
import { dicType, dataType } from "./graph";

export const getTagPieData = async (
  timerRecords: timerType[],
  values: string[]
) => {
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

  // If tagStat only has Unset, use values to populate it
  if (Object.keys(tagStat).length === 1 && tagStat["Unset"] === 0) {
    values.forEach((value) => {
      tagStat[value] = 1;
    });
  }

  const data = [];
  for (const entry in tagStat) {
    data.push({
      label: entry,
      time: tagStat[entry],
    } as dataType);
  }

  return data;
};

export const getStickerPieData = async (
  timerRecords: timerType[],
  values: string[]
) => {
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

  // If stickerStat only has Unset, use values to populate it
  if (Object.keys(stickerStat).length === 1 && stickerStat["Unset"] === 0) {
    values.forEach((value) => {
      stickerStat[value] = 1;
    });
  }

  const data = [];
  for (const entry in stickerStat) {
    data.push({
      label: entry,
      time: stickerStat[entry],
    } as dataType);
  }

  return data;
};
