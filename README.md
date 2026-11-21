# Room-by-room push-optimal Sokoban solver

Push-optimal Sokoban solver for make.fun's [Build the best Sokoban solver, 21 November 2026](https://make.fun/bounty/sokoban-solver-01-run-20261121) bounty ($100 USDC).

The generated levels split into independent rooms off a hallway (a box pushed into the hallway never returns, so each box stays in its room). The solver cuts the level into rooms, solves each room push-optimally with BFS over pushes (dead-square + frozen 2×2 pruning), and concatenates the rooms' move strings. Level optimum = sum of room optima.

- `main.ts` — the whole solver (Node 22, no dependencies)
- Practice set: 1,000,000/1,000,000 (all 5 instances push-optimal)

[![bounty](https://make.fun/badge/sokoban-solver-01-run-20261121.svg)](https://make.fun/bounty/sokoban-solver-01-run-20261121)
[![rank](https://make.fun/badge/sokoban-solver-01-run-20261121/hajilok/sokoban-solver-20261121/rank.svg)](https://make.fun/bounty/sokoban-solver-01-run-20261121)
[![reward](https://make.fun/badge/sokoban-solver-01-run-20261121/hajilok/sokoban-solver-20261121/reward.svg)](https://make.fun/bounty/sokoban-solver-01-run-20261121)
