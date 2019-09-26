import DataLoader from "dataloader";
import {
  connectionFromMongoCursor,
  mongooseLoader
} from "@entria/graphql-mongoose-loader";

import EventModel from "./EventModel";

export default class Event {
  constructor(data) {
    this.id = data.id || data._id;
    this._id = data._id;
    this.title = data.title;
    this.date = data.date;
    this.description = data.description;
    this.author = data.author;
  }
}

export const getLoader = () =>
  new DataLoader(ids => mongooseLoader(EventModel, ids));

const viewerCanSee = () => true;

export const load = async (context, id) => {
  if (!id) {
    return null;
  }

  let data;
  try {
    data = await context.dataloaders.EventLoader.load(id);
  } catch (err) {
    console.log(err);
    return null;
  }

  return viewerCanSee() ? new Event(data, context) : null;
};

export const clearCache = ({ dataloaders }, id) =>
  dataloaders.EventLoader.clear(id.toString());
export const primeCache = ({ dataloaders }, id, data) =>
  dataloaders.EventLoader.prime(id.toString(), data);
export const clearAndPrimeCache = (context, id, data) =>
  clearCache(context, id) && primeCache(context, id, data);

export const loadEvents = async (context, args) => {
  const where = args.search
    ? { title: { $regex: new RegExp(`^${args.search}`, "ig") } }
    : {};
  const event = EventModel.find(where).sort({ createdAt: -1 });
  return connectionFromMongoCursor({
    cursor: event,
    context,
    args,
    loader: load
  });
};
