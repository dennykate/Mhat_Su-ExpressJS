import { now } from "mongoose";
import { BadRequestError, NotFoundError } from "../helper/custom-errors.js";
import MessageModel from "../models/message.model.js";
import tryCatch from "../helper/try-catch.js";

export const findMessageService = tryCatch(async (messageId) => {
  const message = await MessageModel.findById(messageId);

  if (!message) {
    throw new NotFoundError("Message not found");
  }

  return message;
});

export const createMessageService = tryCatch(
  async ({ from, recipient, content }) => {
    const message = new MessageModel({
      from,
      recipient,
      content,
    });

    message.save();

    return message;
  }
);

export const deleteMessageService = async (messageId) => {
  const message = await MessageModel.findById(messageId);

  if (!message) {
    throw new NotFoundError("Message not found");
  }

  const deleteMessage = message;

  await message.deleteOne();

  return deleteMessage;
};

export const updateMessageService = tryCatch(async (data) => {
  const message = await MessageModel.findById(data.messageId);

  if (!message) {
    throw new NotFoundError("Message not found");
  }

  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

  if (message.createdAt > fiveMinutesAgo) {
    throw new BadRequestError(
      "Message can't be updated within 5 minutes of creation"
    );
  }

  message.content = data.content;
  message.updatedAt = new Date();

  await message.save();

  return message;
});
