import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
const model = new ChatOpenAI({ model: 'gpt-4' });

export const generateDescription = async (title: string) => {
  const messages = [
    new SystemMessage(
      'Write a concise, user-friendly description for a TODO item titled:',
    ),
    new HumanMessage(title),
  ];
  const llmdescription = await model.invoke(messages);
  const description = llmdescription.content as string;
  return description;
};
