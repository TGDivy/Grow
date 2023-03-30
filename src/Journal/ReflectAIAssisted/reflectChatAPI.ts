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
}

export type response = string;

export const reflectChatAPI = (query: queryType): Promise<response> => {
  return fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(query),
  }).then((response) => response.json());
};
