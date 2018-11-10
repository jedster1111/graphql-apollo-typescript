export interface StoredPolls {
  [key: string]: StoredPoll;
}

export interface StoredPoll {
  id: string;
  creatorId: string;
  description: string;
  title: string;
}

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
