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

export const findAllMessageService = tryCatch(async (req) => {
  const { page = 1, sender, recipient } = req.query;
  const userId = req.user._id;

  const query = {};
  if (sender) query.sender = sender;
  if (recipient) query.recipient = recipient;

  const messages = await MessageModel.find(query)
    .populate({
      path: "sender",
      select: "name email",
    })
    .populate({
      path: "recipient",
      select: "name email",
    })
    .populate({
      path: "reactions.user",
      select: "name email",
    })
    .skip((page - 1) * 50)
    .limit(50)
    .sort({ createdAt: -1 });

  // if (!messages.length) {
  //   throw new NotFoundError("No messages found");
  // }

  const messageDetails = messages?.map((message) => {
    const totalReactions = message.reactions.length;

    if (
      message.recipient._id.toString() === userId.toString() &&
      !message.isRead
    ) {
      message.isRead = true;
      message.save();
    }

    return {
      ...message.toObject(),
      totalReactions,
    };
  });

  return {
    page,
    limit: 50,
    totalMessages: messageDetails.length,
    messages: messageDetails,
  };
});
