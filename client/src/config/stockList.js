// 종목 리스트
const stockList = [
  {
    name: "비트코인",
    en_name: "Bitcoin",
    code: "BTC",
    codes: "KRW-BTC",
    category: "coin",
  },
  {
    name: "이더리움",
    en_name: "Ethereum",
    code: "ETH",
    codes: "KRW-ETH",
    category: "coin",
  },
  {
    name: "리플",
    en_name: "ripple",
    code: "XRP",
    codes: "KRW-XRP",
    category: "coin",
  },
  {
    name: "솔라나",
    en_name: "Solana",
    code: "SOL",
    codes: "KRW-SOL",
    category: "coin",
  },
  {
    name: "에이다",
    en_name: "Ada",
    code: "ADA",
    codes: "KRW-ADA",
    category: "coin",
  },
  {
    name: "도지코인",
    en_name: "Dogecoin",
    code: "DOGE",
    codes: "KRW-DOGE",
    category: "coin",
  },
  {
    name: "리퍼리움",
    en_name: "Refereum",
    code: "RFR",
    codes: "KRW-RFR",
    category: "coin",
  },
  {
    name: "샌드박스",
    en_name: "Sandbox",
    code: "SAND",
    codes: "KRW-SAND",
    category: "coin",
  },
  {
    name: "디센트럴랜드",
    en_name: "Decentraland",
    code: "MANA",
    codes: "KRW-MANA",
    category: "coin",
  },
  {
    name: "네오",
    en_name: "NEO",
    code: "NEO",
    codes: "KRW-NEO",
    category: "coin",
  },
  {
    name: "이더리움 클래식",
    en_name: "Ethereum Classic",
    code: "ETC",
    codes: "KRW-ETC",
    category: "coin",
  },
  {
    name: "질리카",
    en_name: "Zilliqa",
    code: "ZIL",
    codes: "KRW-ZIL",
    category: "coin",
  },
  {
    name: "이오스",
    en_name: "EOS",
    code: "EOS",
    codes: "KRW-EOS",
    category: "coin",
  },
  {
    name: "카이버네트워크",
    en_name: "Kyber Network",
    code: "KNC",
    codes: "KRW-KNC",
    category: "coin",
  },
  {
    name: "트론",
    en_name: "tron",
    code: "TRX",
    codes: "KRW-TRX",
    category: "coin",
  },
  {
    name: "이캐시",
    en_name: "eCash",
    code: "XEC",
    codes: "KRW-XEC",
    category: "coin",
  },
  {
    name: "비트코인 캐시",
    en_name: "Bitcoin Cash",
    code: "BCH",
    codes: "KRW-BCH",
    category: "coin",
  },
  {
    name: "테조스",
    en_name: "Tezos",
    code: "XTZ",
    codes: "KRW-XTZ",
    category: "coin",
  },
  {
    name: "삼성전자",
    en_name: null,
    code: "005930",
    codes: null,
    category: "stock",
  },
  {
    name: "LG에너지솔루션",
    en_name: null,
    code: "373220",
    codes: null,
    category: "stock",
  },
  {
    name: "SK하이닉스",
    en_name: null,
    code: "000660",
    codes: null,
    category: "stock",
  },
  {
    name: "삼성바이오로직스",
    en_name: null,
    code: "207940",
    codes: null,
    category: "stock",
  },
  {
    name: "삼성전자우",
    en_name: null,
    code: "005935",
    codes: null,
    category: "stock",
  },
  {
    name: "NAVER",
    en_name: null,
    code: "035420",
    codes: null,
    category: "stock",
  },
  {
    name: "LG화학",
    en_name: null,
    code: "051910",
    codes: null,
    category: "stock",
  },
  {
    name: "현대차",
    en_name: null,
    code: "005380",
    codes: null,
    category: "stock",
  },
  {
    name: "삼성SDI",
    en_name: null,
    code: "006400",
    codes: null,
    category: "stock",
  },
  {
    name: "카카오",
    en_name: null,
    code: "035720",
    codes: null,
    category: "stock",
  },
  {
    name: "기아",
    en_name: null,
    code: "000270",
    codes: null,
    category: "stock",
  },
  {
    name: "POSCO홀딩스",
    en_name: null,
    code: "005490",
    codes: null,
    category: "stock",
  },
  {
    name: "KB금융",
    en_name: null,
    code: "105560",
    codes: null,
    category: "stock",
  },
  {
    name: "셀트리온",
    en_name: null,
    code: "068270",
    codes: null,
    category: "stock",
  },
  {
    name: "신한지주",
    en_name: null,
    code: "055550",
    codes: null,
    category: "stock",
  },
  {
    name: "삼성물산",
    en_name: null,
    code: "028260",
    codes: null,
    category: "stock",
  },
  {
    name: "SK이노베이션",
    en_name: null,
    code: "096770",
    codes: null,
    category: "stock",
  },
  {
    name: "현대모비스",
    en_name: null,
    code: "012330",
    codes: null,
    category: "stock",
  },
  {
    name: "카카오뱅크",
    en_name: null,
    code: "323410",
    codes: null,
    category: "stock",
  },
  {
    name: "SK",
    en_name: null,
    code: "034730",
    codes: null,
    category: "stock",
  },
  {
    name: "LG전자",
    en_name: null,
    code: "066570",
    codes: null,
    category: "stock",
  },
  {
    name: "한국전력",
    en_name: null,
    code: "015760",
    codes: null,
    category: "stock",
  },
  {
    name: "HMM",
    en_name: null,
    code: "011200",
    codes: null,
    category: "stock",
  },
  {
    name: "S-Oil",
    en_name: null,
    code: "010950",
    codes: null,
    category: "stock",
  },
  {
    name: "하나금융지주",
    en_name: null,
    code: "086790",
    codes: null,
    category: "stock",
  },
  {
    name: "삼성생명",
    en_name: null,
    code: "032830",
    codes: null,
    category: "stock",
  },
  {
    name: "크래프톤",
    en_name: null,
    code: "259960",
    codes: null,
    category: "stock",
  },
  {
    name: "LG",
    en_name: null,
    code: "003550",
    codes: null,
    category: "stock",
  },
  {
    name: "KT&G",
    en_name: null,
    code: "033780",
    codes: null,
    category: "stock",
  },
  {
    name: "SK텔레콤",
    en_name: null,
    code: "017670",
    codes: null,
    category: "stock",
  },
  {
    name: "현대중공업",
    en_name: null,
    code: "329180",
    codes: null,
    category: "stock",
  },
  {
    name: "두산에너빌리티",
    en_name: null,
    code: "034020",
    codes: null,
    category: "stock",
  },
  {
    name: "삼성전기",
    en_name: null,
    code: "009150",
    codes: null,
    category: "stock",
  },
  {
    name: "삼성에스디에스",
    en_name: null,
    code: "018260",
    codes: null,
    category: "stock",
  },
  {
    name: "카카오페이",
    en_name: null,
    code: "377300",
    codes: null,
    category: "stock",
  },
  {
    name: "우리금융지주",
    en_name: null,
    code: "316140",
    codes: null,
    category: "stock",
  },
  {
    name: "LG생활건강",
    en_name: null,
    code: "051900",
    codes: null,
    category: "stock",
  },
  {
    name: "고려아연",
    en_name: null,
    code: "010130",
    codes: null,
    category: "stock",
  },
  {
    name: "포스코케미칼",
    en_name: null,
    code: "003670",
    codes: null,
    category: "stock",
  },
  {
    name: "KT",
    en_name: null,
    code: "030200",
    codes: null,
    category: "stock",
  },
  {
    name: "대한항공",
    en_name: null,
    code: "003490",
    codes: null,
    category: "stock",
  },
  {
    name: "삼성화재",
    en_name: null,
    code: "000810",
    codes: null,
    category: "stock",
  },
  {
    name: "엔씨소프트",
    en_name: null,
    code: "036570",
    codes: null,
    category: "stock",
  },
  {
    name: "LG이노텍",
    en_name: null,
    code: "011070",
    codes: null,
    category: "stock",
  },
  {
    name: "아모레퍼시픽",
    en_name: null,
    code: "090430",
    codes: null,
    category: "stock",
  },
  {
    name: "SK바이오사이언스",
    en_name: null,
    code: "302440",
    codes: null,
    category: "stock",
  },
  {
    name: "기업은행",
    en_name: null,
    code: "024110",
    codes: null,
    category: "stock",
  },
  {
    name: "한화솔루션",
    en_name: null,
    code: "009830",
    codes: null,
    category: "stock",
  },
  {
    name: "SK아이이테크놀로지",
    en_name: null,
    code: "361610",
    codes: null,
    category: "stock",
  },
  {
    name: "현대글로비스",
    en_name: null,
    code: "086280",
    codes: null,
    category: "stock",
  },
  {
    name: "한국금융지주",
    en_name: null,
    code: "071050",
    codes: null,
    category: "stock",
  },
  {
    name: "한국조선해양",
    en_name: null,
    code: "009540",
    codes: null,
    category: "stock",
  },
  {
    name: "롯데케미칼",
    en_name: null,
    code: "011170",
    codes: null,
    category: "stock",
  },
  {
    name: "하이브",
    en_name: null,
    code: "352820",
    codes: null,
    category: "stock",
  },
  {
    name: "넷마블",
    en_name: null,
    code: "251270",
    codes: null,
    category: "stock",
  },
  {
    name: "SK스퀘어",
    en_name: null,
    code: "402340",
    codes: null,
    category: "stock",
  },
  {
    name: "SK바이오팜",
    en_name: null,
    code: "326030",
    codes: null,
    category: "stock",
  },
  {
    name: "CJ제일제당",
    en_name: null,
    code: "097950",
    codes: null,
    category: "stock",
  },
  {
    name: "LG유플러스",
    en_name: null,
    code: "032640",
    codes: null,
    category: "stock",
  },
  {
    name: "SKC",
    en_name: null,
    code: "011790",
    codes: null,
    category: "stock",
  },
  {
    name: "F&F",
    en_name: null,
    code: "383220",
    codes: null,
    category: "stock",
  },
  {
    name: "kodex200 선물인버스2x",
    en_name: null,
    code: "252670",
    codes: null,
    category: "stock",
  },
];

export default stockList;
