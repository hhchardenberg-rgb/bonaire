// Rasterindeling voor het haaienspel. '#' = muur, '.' = vis, 'o' = kwal (bonuspunten),
// 'P' = startpositie haai, 'E' = startpositie octopus. Alle open vakjes zijn met elkaar
// verbonden (gecontroleerd), zodat het level altijd uit te spelen is.
export const haaiMaze: string[] = [
  "###############",
  "#Po..#...#..o.#",
  "#.##.#.#.#.##.#",
  "#.#..#.#.#..#.#",
  "#.#.##.#.##.#.#",
  "#...........#.#",
  "###.#######.#.#",
  "#...#.......#.#",
  "#.###.#####.#.#",
  "#.....#.....#.#",
  "#.#####.#####.#",
  "#.o..........E#",
  "###############",
];

export const HAAI_COLS = haaiMaze[0].length;
export const HAAI_ROWS = haaiMaze.length;
