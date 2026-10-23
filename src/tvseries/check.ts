import axios from "axios";
import { bestInGenre, TvSeries } from "./solution";

const PER_PAGE = 3;

const mk = (
  id: number,
  name: string,
  genre: string,
  imdb_rating: number,
): TvSeries => ({
  name,
  genre,
  imdb_rating,
  id,
  runtime_of_series: "(2000-2010)",
  certificate: "A",
  runtime_of_episodes: "45 min",
  overview: "",
  no_of_votes: 1000,
});

const DB: TvSeries[] = [
  mk(1, "Alpha", "Action, Drama", 8.0),
  mk(2, "Bravo", "Comedy", 9.9),
  mk(3, "Charlie", "Drama", 9.1),
  mk(4, "Delta", "Action", 7.5),
  mk(5, "Echo", "Dramatic, Mystery", 9.8), // "Drama"와 부분 일치만 하는 장르
  mk(6, "Foxtrot", "Drama, Thriller", 9.1), // Charlie와 동점
  mk(7, "Able", "Drama", 9.1), // 동점 중 사전순 최소
  mk(8, "Golf", "Crime, Action", 8.8),
  mk(9, "Hotel", "Action, Crime", 8.8),
  mk(10, "India", "Romance", 6.0),
];

// 실제 URL 대신 가짜 응답으로 axios.get을 대체
let calls = 0;
(axios as any).get = async (url: string) => {
  calls++;
  const page = Number(new URL(url).searchParams.get("page") ?? 1);
  const total_pages = Math.ceil(DB.length / PER_PAGE);
  const data =
    page <= total_pages ? DB.slice((page - 1) * PER_PAGE, page * PER_PAGE) : [];
  return {
    data: { page, per_page: PER_PAGE, total: DB.length, total_pages, data },
  };
};

const cases: { genre: string; expected: string }[] = [
  { genre: "Drama", expected: "Able" }, // 동점 + 부분 일치 제외 + 여러 페이지
  { genre: "Comedy", expected: "Bravo" },
  { genre: "Romance", expected: "India" }, // 마지막 페이지
  { genre: "Crime", expected: "Golf" }, // 8.8 동점, Golf < Hotel
  { genre: "Action", expected: "Golf" },
];

(async () => {
  let failed = 0;
  for (const [i, { genre, expected }] of cases.entries()) {
    calls = 0;
    const actual = await bestInGenre(genre);
    const ok = actual === expected;
    if (!ok) failed++;
    console.log(
      `${ok ? "PASS" : "FAIL"} #${i + 1} (${genre}) pages fetched: ${calls}`,
    );
    if (!ok) console.log(`  expected: ${expected}\n  actual  : ${actual}`);
  }
  console.log(failed === 0 ? "\n모두 통과" : `\n${failed}개 실패`);
  process.exit(failed === 0 ? 0 : 1);
})();
