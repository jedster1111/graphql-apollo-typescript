import uuid = require("uuid/v1");
import PollInput from "../Polls/PollInput";

export interface StoredPolls {
  [key: string]: StoredPoll;
}

export interface StoredPoll {
  id: string;
  creatorId: string;
  description: string;
  title: string;
}

export const pollOps = {
  addPoll(data: PollInput): StoredPoll {
    const id = uuid();
    const newPoll = {
      title: data.title,
      description: data.description,
      id,
      creatorId: data.creatorId
    };
    polls[id] = newPoll;
    return newPoll;
  }
};

const polls: StoredPolls = {
  1: {
    id: "1",
    creatorId: "1",
    description: "desc",
    title: "title"
  },
  4: {
    id: "4",
    creatorId: "1",
    description: "desc4",
    title: "title4"
  }
};
export default polls;
