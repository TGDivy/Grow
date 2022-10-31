import React from "react";
import SvgIcon from "@mui/material/SvgIcon";
import { SvgIconProps } from "@mui/material";

import { ReactComponent as SadEmoji } from "./sad.svg";
import { ReactComponent as HappyEmoji } from "./happy.svg";
import { ReactComponent as AngryEmoji } from "./angry.svg";
import { ReactComponent as ExhaustedEmoji } from "./exhausted.svg";
import { ReactComponent as CravingEmoji } from "./craving.svg";
import { ReactComponent as NervousEmoji } from "./nervous.svg";
import { ReactComponent as AnxiousEmoji } from "./anxious.svg";
import { ReactComponent as ScaredEmoji } from "./scared.svg";
import { ReactComponent as LonelyEmoji } from "./lonely.svg";
import { ReactComponent as PeacefulEmoji } from "./peaceful.svg";
import { ReactComponent as SickEmoji } from "./sick.svg";

export const AngryIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <AngryEmoji />
    </SvgIcon>
  );
};

export const SadIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <SadEmoji />
    </SvgIcon>
  );
};

export const HappyIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <HappyEmoji />
    </SvgIcon>
  );
};

export const ExhaustedIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <ExhaustedEmoji />
    </SvgIcon>
  );
};

export const CravingIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <CravingEmoji />
    </SvgIcon>
  );
};

export const NervousIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <NervousEmoji />
    </SvgIcon>
  );
};

export const AnxiousIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <AnxiousEmoji />
    </SvgIcon>
  );
};

export const ScaredIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <ScaredEmoji />
    </SvgIcon>
  );
};

export const LonelyIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <LonelyEmoji />
    </SvgIcon>
  );
};

export const PeacefulIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <PeacefulEmoji />
    </SvgIcon>
  );
};

export const SickIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <SickEmoji />
    </SvgIcon>
  );
};

const EmotionIcons = [
  {
    label: "Peaceful",
    icon: PeacefulIcon,
    description: "Feelings of peace, calm, and tranquility",
  },
  {
    label: "Happy",
    icon: HappyIcon,
    description: "Feelings of joy, satisfaction, contentment, and fulfillment",
  },
  {
    label: "Craving",
    icon: CravingIcon,
    description: "Feelings of craving, desire, and longing",
  },
  {
    label: "Tired",
    icon: ExhaustedIcon,
    description: "Feelings of exhaustion, fatigue, and weariness",
  },
  {
    label: "Anxious",
    icon: AnxiousIcon,
    description: "Feelings of anxiety, worry, and unease",
  },
  {
    label: "Sad",
    icon: SadIcon,
    description: "Feelings of sadness, grief, sorrow, and unhappiness",
  },
  {
    label: "Lonely",
    icon: LonelyIcon,
    description: "Feelings of loneliness, isolation, and solitude",
  },
  {
    label: "Angry",
    icon: AngryIcon,
    description: "Feelings of anger, rage, fury, and frustration",
  },

  // {
  //   label: "Nervous",
  //   icon: NervousIcon,
  //   description: "Feelings of nervousness, anxiety, and worry",
  // },

  // {
  //   label: "Scared",
  //   icon: ScaredIcon,
  //   description: "Feelings of fear, fright, and terror",
  // },

  {
    label: "Sick",
    icon: SickIcon,
    description: "Feelings of sickness, illness, and disease",
  },
];

export default EmotionIcons;
