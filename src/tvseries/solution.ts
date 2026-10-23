import axios, { AxiosResponse } from "axios";

export const BASE_URL = "https://jsonmock.hackerrank.com/api/tvseries";

export interface TvSeries {
  name: string;
  runtime_of_series: string;
  certificate: string;
  runtime_of_episodes: string;
  genre: string; // 예: "Action, Adventure, Drama"
  imdb_rating: number;
  overview: string;
  no_of_votes: number;
  id: number;
}

export interface TvSeriesPage {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: TvSeries[];
}

// 페이지 호출 예: const res = await axios.get<TvSeriesPage>(`${BASE_URL}?page=${page}`);
// 장르가 일치하는 시리즈 중 imdb_rating이 가장 높은 이름을 반환 (동점이면 이름이 사전순으로 앞선 것)
export async function bestInGenre(genre: string): Promise<string> {
  // call page 1 to get initial data and total_pages
  const res = await axios.get<TvSeriesPage>(`${BASE_URL}?page=1`);
  const { data: firstPageData } = res.data;
  const { total_pages } = res.data;
  const apis: Promise<AxiosResponse<TvSeriesPage>>[] = [];
  let best: TvSeries | null = null;

  for (let i = 2; i <= total_pages; i++) {
    apis.push(axios.get<TvSeriesPage>(`${BASE_URL}?page=${i}`));
  }

  const genaralzed = genre.toLowerCase();
  const responses = await Promise.all(apis);

  const allData: TvSeries[] = [...firstPageData];

  for (let i = 0; i < responses.length; i++) {
    // get all data
    allData.push(...responses[i].data.data);
  }

  for (const series of allData) {
    const genres = series.genre.split(",").map((g) => g.trim().toLowerCase());
    if (genres.includes(genaralzed)) {
      if (!best) {
        best = series;
      } else if (series.imdb_rating > best.imdb_rating) {
        best = series;
      } else if (
        series.imdb_rating === best.imdb_rating &&
        series.name < best.name
      ) {
        best = series;
      }
    }
  }

  return best ? best.name : "";
}

// 실행: npx ts-node src/tvseries/solution.ts Drama  (실제 API 호출)
if (require.main === module) {
  bestInGenre(process.argv[2] ?? "Action").then(console.log);
}
