export interface SystemMessage {
  role: "system";
  content: string;
}

export interface UserMessage {
  role: "user";
  content: string;
}

export interface AssistantMessage {
  role: "assistant";
  content: string;
}

export type messagesType = (SystemMessage | UserMessage | AssistantMessage)[];

const endpoint =
  "https://europe-west1-focus-2ad73.cloudfunctions.net/reflect_chat";

export interface queryType {
  messages: messagesType;
  type: "journalling" | "summarising";
}

export type response = string;

export const reflectChatAPI = (
  query: Pick<queryType, "messages">
): Promise<response> => {
  const queryFull: queryType = {
    ...query,
    type: "journalling",
  };
  return fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(queryFull),
  }).then((response) => response.json());
};

export const summariseChatAPI = (
  query: Pick<queryType, "messages">
): Promise<response> => {
  const queryFull: queryType = {
    ...query,
    type: "summarising",
  };
  return fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(queryFull),
  }).then((response) => response.json());
};
