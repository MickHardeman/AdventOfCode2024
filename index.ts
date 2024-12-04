import http, { Server } from "http";
import solve1 from "./1/problem";
import solve2 from "./2/problem";
import solve3 from "./3/problem";
import solve4 from "./4/problem";

const CURRENT_DAY: number = 4;
const server: Server = http.createServer();

server.listen(() => {
  switch (CURRENT_DAY) {
    case 1:
      solve1();
      break;
    case 2:
      solve2();
      break;
    case 3:
      solve3();
      break;
    case 4:
      solve4();
      break;
  }
});
