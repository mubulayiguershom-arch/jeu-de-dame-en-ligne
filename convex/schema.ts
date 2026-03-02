import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // ===== UTILISATEURS =====
  users: defineTable({
    userId: v.string(),
    username: v.string(),
    email: v.string(),
    balance: v.number(), // Solde en FC
    totalDeposits: v.number(),
    totalWithdrawals: v.number(),
    createdAt: v.number(),
    isAdmin: v.optional(v.boolean()),
  })
    .index("by_userId", ["userId"])
    .index("by_email", ["email"]),

  // ===== PARTIES =====
  games: defineTable({
    gameId: v.string(),
    player1Id: v.string(),
    player2Id: v.optional(v.string()), // None si contre IA
    player1Username: v.string(),
    player2Username: v.optional(v.string()),
    mode: v.union(v.literal("ai"), v.literal("pvp")), // Type de jeu
    stake: v.number(), // Mise (0 pour IA)
    winnerId: v.optional(v.string()),
    winnerUsername: v.optional(v.string()),
    board: v.array(v.array(v.number())), // État du plateau
    moves: v.array(
      v.object({
        from: v.object({ row: v.number(), col: v.number() }),
        to: v.object({ row: v.number(), col: v.number() }),
        capturedPiece: v.optional(v.object({ row: v.number(), col: v.number() })),
        timestamp: v.number(),
      })
    ),
    status: v.union(
      v.literal("pending"),
      v.literal("active"),
      v.literal("finished")
    ),
    commissionTaken: v.number(), // Commission (5%)
    createdAt: v.number(),
    finishedAt: v.optional(v.number()),
  })
    .index("by_player1", ["player1Id"])
    .index("by_status", ["status"])
    .index("by_gameId", ["gameId"]),

  // ===== MATCHMAKING =====
  matchmakingQueue: defineTable({
    queueId: v.string(),
    playerId: v.string(),
    playerUsername: v.string(),
    stake: v.number(),
    status: v.union(v.literal("waiting"), v.literal("matched")),
    createdAt: v.number(),
    matchedGameId: v.optional(v.string()),
  })
    .index("by_playerId", ["playerId"])
    .index("by_status", ["status"])
    .index("by_stake", ["stake"]),

  // ===== TRANSACTIONS =====
  transactions: defineTable({
    transactionId: v.string(),
    userId: v.string(),
    type: v.union(
      v.literal("deposit"),
      v.literal("withdrawal"),
      v.literal("game_win"),
      v.literal("game_loss")
    ),
    amount: v.number(),
    status: v.union(
      v.literal("pending"),
      v.literal("completed"),
      v.literal("failed")
    ),
    orangeMoneyReference: v.optional(v.string()),
    description: v.string(),
    createdAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_status", ["status"]),

  // ===== HISTORIQUE DES PARTIES =====
  gameHistory: defineTable({
    historyId: v.string(),
    userId: v.string(),
    gameId: v.string(),
    opponent: v.optional(v.string()),
    result: v.union(v.literal("win"), v.literal("loss"), v.literal("draw")),
    mode: v.union(v.literal("ai"), v.literal("pvp")),
    stake: v.number(),
    winnings: v.number(),
    duration: v.number(), // en secondes
    createdAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_gameId", ["gameId"]),
});
