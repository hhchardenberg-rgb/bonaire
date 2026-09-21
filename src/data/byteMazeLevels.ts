// Rasterindeling voor Bart's Byte Maze. '#' = muur. Verzamelbare items:
// '.' = datapunt (1 punt), 'D' = floppy disk (5 punten), 'U' = USB-stick
// (5 punten), 'G' = gouden USB-stick (25 bonuspunten). Power-ups (optioneel,
// niet nodig om het level uit te spelen): 'K' = koffie (tijdelijk sneller),
// 'S' = firewall (tijdelijk onkwetsbaar), 'B' = grote rode bug (virussen
// worden tijdelijk kwetsbaar). 'P' = startpositie speler, '1'-'4' =
// startposities virussen. Alle levels zijn volledig verbonden (gecontroleerd
// met een BFS-script), zodat elk item altijd bereikbaar is.
export interface ByteMazeLevel {
  maze: string[];
  virusCount: number;
  tickMs: number;
  virusMoveInterval: number;
}

export const byteMazeLevels: ByteMazeLevel[] = [
  {
    maze: [
      "#############",
      "#P....#....1#",
      "#.####.####.#",
      "#.#.D....#U.#",
      "#.#.####.##.#",
      "#K..#....#S.#",
      "###.#.####.##",
      "#.B.#......2#",
      "#.#######.#.#",
      "#....G......#",
      "#############",
    ],
    virusCount: 2,
    tickMs: 210,
    virusMoveInterval: 2,
  },
  {
    maze: [
      "###################",
      "#P................#",
      "#.....#..#.D..#...#",
      "#..#K......#..U...#",
      "#......#......#...#",
      "#.#.#...G#.#2.....#",
      "#.....D#.....#....#",
      "#..#.....#.#......#",
      "#..1.#.D...U.#.#..#",
      "#.......#.#...B...#",
      "#.#.#..........#..#",
      "#U...S...3........#",
      "###################",
    ],
    virusCount: 3,
    tickMs: 190,
    virusMoveInterval: 2,
  },
  {
    maze: [
      "#####################",
      "#P.......1..........#",
      "#.#.#......#...#.#.U#",
      "#......S#....2......#",
      "#.#.U#...D.#..#.#.#.#",
      "#......#............#",
      "#..#.B......D...#.#.#",
      "#....#..#.#....D....#",
      "#D....K.......#.#.#.#",
      "#.#..#.#.U#.#.......#",
      "#............4......#",
      "#..#....U......#..#.#",
      "#..G................#",
      "#...............3...#",
      "#####################",
    ],
    virusCount: 4,
    tickMs: 170,
    virusMoveInterval: 1,
  },
];
