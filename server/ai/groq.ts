import { SYSTEM_PROMPT } from "./system-prompt.ts";
import { toolDefinitions, executeToolCalls, type ChatProductCard } from "./tools.ts";

// ─── Types ─────────────────────────────────────────────────────────────────

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ConversationEntry {
  role: string;
  content?: string;
  tool_calls?: unknown[];
  tool_call_id?: string;
}

interface GroqResponseMessage {
  role: string;
  content: string | null;
  tool_calls?: Array<{
    id: string;
    function: { name: string; arguments: string };
  }>;
}

interface ChatResult {
  content: string;
  toolCallsUsed: string[];
  products: ChatProductCard[];
}

// ─── Configuration ─────────────────────────────────────────────────────────

const GROQ_BASE_URL = "https://api.groq.com/openai/v1";
const DEFAULT_MODEL = "meta-llama/llama-4-scout-17b-16e-instruct";

function getApiKey(): string {
  const key = process.env.GROQ_API_KEY;
  if (!key) {
    throw new Error("GROQ_API_KEY environment variable is not set");
  }
  return key;
}

// ─── Groq Client ───────────────────────────────────────────────────────────

class GroqClient {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(apiKey?: string, baseUrl?: string) {
    this.apiKey = apiKey ?? getApiKey();
    this.baseUrl = baseUrl ?? GROQ_BASE_URL;
  }

  async chatCompletion(
    messages: Array<{ role: string; content?: string; tool_calls?: unknown[]; tool_call_id?: string }>,
    options?: { temperature?: number; maxTokens?: number; responseFormat?: { type: string }; useTools?: boolean },
  ): Promise<GroqResponseMessage> {
    const useTools = options?.useTools ?? true;
    const body: Record<string, unknown> = {
      model: DEFAULT_MODEL,
      messages,
      temperature: options?.temperature ?? 0.7,
      max_tokens: options?.maxTokens ?? 1024,
    };
    if (useTools) {
      body.tools = toolDefinitions;
      body.tool_choice = "auto";
    }
    if (options?.responseFormat) {
      body.response_format = options.responseFormat;
    }

    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Groq API error: ${response.status} - ${err}`);
    }

    const data = await response.json();
    return data.choices[0].message as GroqResponseMessage;
  }

  async chat(messages: ChatMessage[]): Promise<ChatResult> {
    const toolCallsUsed: string[] = [];
    const allProducts: ChatProductCard[] = [];
    const conversation: ConversationEntry[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.map((m) => ({ role: m.role, content: m.content })),
    ];

    let assistantMessage = await this.chatCompletion(conversation);

    // Tool calling loop — up to 5 rounds
    let rounds = 0;
    while (assistantMessage.tool_calls && assistantMessage.tool_calls.length > 0 && rounds < 5) {
      rounds++;

      conversation.push({
        role: "assistant",
        content: assistantMessage.content ?? "",
        tool_calls: assistantMessage.tool_calls,
      });

      const { executed, products } = await executeToolCalls(
        assistantMessage.tool_calls,
        (entry: ConversationEntry) => conversation.push(entry),
      );
      toolCallsUsed.push(...executed);
      allProducts.push(...products);

      assistantMessage = await this.chatCompletion(conversation);
    }

    return {
      content: assistantMessage.content || "I apologise, I was unable to process that. Could you rephrase?",
      toolCallsUsed,
      products: allProducts,
    };
  }

  async generateCompletion(prompt: string, options?: { temperature?: number; maxTokens?: number; responseFormat?: { type: string } }): Promise<string> {
    const message = await this.chatCompletion(
      [{ role: "user", content: prompt }],
      {
        useTools: false,
        temperature: options?.temperature ?? 0.7,
        maxTokens: options?.maxTokens ?? 512,
        responseFormat: options?.responseFormat,
      },
    );
    return message.content ?? "";
  }

  async generateJsonCompletion<T>(prompt: string, fallback: T, options?: { temperature?: number; maxTokens?: number }): Promise<T> {
    try {
      const text = await this.generateCompletion(prompt, {
        temperature: options?.temperature ?? 0.3,
        maxTokens: options?.maxTokens ?? 400,
        responseFormat: { type: "json_object" },
      });
      return JSON.parse(text) as T;
    } catch {
      return fallback;
    }
  }
}

// ─── Singleton ─────────────────────────────────────────────────────────────

let clientInstance: GroqClient | null = null;

export function getGroqClient(): GroqClient {
  if (!clientInstance) {
    clientInstance = new GroqClient();
  }
  return clientInstance;
}

export { GroqClient };
export type { ChatMessage, ConversationEntry, GroqResponseMessage, ChatResult };
